-- Vendor profiles table
create table if not exists vendor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  business_name text not null,
  category text,
  description text,
  phone text,
  phone_verified boolean default false,
  bank_name text,
  account_number text,
  account_name text,
  bank_verified boolean default false,
  social_links jsonb default '{}',
  social_verified boolean default false,
  is_student_vendor boolean default false,
  school_name text,
  school_id_url text,
  student_verified boolean default false,
  selfie_url text,
  logo_url text,
  trust_score integer default 0,
  vendor_level text default 'New Seller',
  verification_status text default 'pending',
  verification_badges text[] default '{}',
  completed_orders integer default 0,
  positive_reviews integer default 0,
  response_time_minutes integer default 0,
  verification_documents text[] default '{}',
  state text,
  city text,
  delivery_radius_km integer,
  banner_color text,
  joined_date timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists vendor_profiles_user_id_key
  on vendor_profiles(user_id);

alter table vendor_profiles
  add column if not exists bank_verified boolean default false;

-- Admin review table
create table if not exists vendor_reviews (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid references vendor_profiles(id) on delete cascade,
  reviewed_by uuid references auth.users(id),
  action text not null, -- 'approved' | 'rejected' | 'suspended' | 'badge_assigned'
  note text,
  badge_assigned text,
  created_at timestamptz default now()
);

-- RLS
alter table vendor_profiles enable row level security;
alter table vendor_reviews enable row level security;

drop policy if exists "Vendors can view own profile" on vendor_profiles;
drop policy if exists "Anyone can view approved vendors" on vendor_profiles;
drop policy if exists "Vendors can update own profile" on vendor_profiles;
drop policy if exists "Vendors can insert own profile" on vendor_profiles;

create policy "Anyone can view approved vendors"
  on vendor_profiles for select
  using (verification_status = 'approved' or auth.uid() = user_id);

create policy "Vendors can update own profile"
  on vendor_profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Vendors can insert own profile"
  on vendor_profiles for insert with check (auth.uid() = user_id);

-- Never trust clients to award verification, badges, or marketplace metrics.
create or replace function protect_vendor_managed_fields()
returns trigger
security definer
set search_path = public, auth
as $$
begin
  if coalesce(auth.jwt() ->> 'role', '') = 'service_role' then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.phone_verified := exists (
      select 1 from auth.users
      where id = auth.uid()
        and phone_confirmed_at is not null
        and phone = new.phone
    );
    new.social_verified := false;
    new.student_verified := false;
    new.bank_verified := false;
    new.trust_score := 0;
    new.vendor_level := 'New Seller';
    new.verification_status := 'pending';
    new.verification_badges := '{}';
    new.completed_orders := 0;
    new.positive_reviews := 0;
    new.response_time_minutes := 0;
  else
    new.user_id := old.user_id;
    new.phone_verified := old.phone_verified;
    new.social_verified := old.social_verified;
    new.student_verified := old.student_verified;
    new.bank_verified := old.bank_verified;
    new.trust_score := old.trust_score;
    new.vendor_level := old.vendor_level;
    new.verification_status := old.verification_status;
    new.verification_badges := old.verification_badges;
    new.completed_orders := old.completed_orders;
    new.positive_reviews := old.positive_reviews;
    new.response_time_minutes := old.response_time_minutes;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists vendor_protect_managed_fields_trigger on vendor_profiles;
create trigger vendor_protect_managed_fields_trigger
  before insert or update on vendor_profiles
  for each row execute function protect_vendor_managed_fields();

-- Function to auto-update trust score
create or replace function update_trust_score()
returns trigger as $$
declare
  score integer := 0;
begin
  if new.phone_verified then score := score + 10; end if;
  if new.bank_verified then score := score + 20; end if;
  if new.social_verified then score := score + 15; end if;
  if new.student_verified then score := score + 15; end if;
  if new.completed_orders > 0 then score := score + 20; end if;
  if new.positive_reviews > 0 then score := score + 20; end if;
  new.trust_score := least(score, 100);
  new.vendor_level := case
    when new.trust_score >= 80 then 'Top Vendor'
    when new.trust_score >= 55 then 'Trusted Vendor'
    when new.trust_score >= 30 then 'Verified Seller'
    else 'New Seller'
  end;
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

create trigger vendor_trust_score_trigger
  before insert or update on vendor_profiles
  for each row execute function update_trust_score();

-- Orders are created by authenticated customers and initially remain unpaid.
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default
    ('VG-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
  customer_id uuid not null references auth.users(id) on delete restrict,
  items jsonb not null,
  subtotal numeric(12,2) not null check (subtotal >= 0),
  delivery_fee numeric(12,2) not null check (delivery_fee >= 0),
  tax numeric(12,2) not null check (tax >= 0),
  total numeric(12,2) not null check (total >= 0),
  delivery_address text not null,
  payment_method text not null,
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'preparing', 'dispatched', 'delivered', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

drop policy if exists "Customers can create own orders" on orders;
drop policy if exists "Customers can view own orders" on orders;

create policy "Customers can create own orders"
  on orders for insert with check (auth.uid() = customer_id);

create policy "Customers can view own orders"
  on orders for select using (auth.uid() = customer_id);

create table if not exists rider_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text,
  vehicle_type text not null check (vehicle_type in ('motorcycle', 'car')),
  license_plate text not null,
  drivers_license text not null,
  verification_status text not null default 'pending'
    check (verification_status in ('pending', 'approved', 'rejected', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table rider_applications enable row level security;

drop policy if exists "Riders can create own application" on rider_applications;
drop policy if exists "Riders can view own application" on rider_applications;
drop policy if exists "Riders can update own pending application" on rider_applications;

create policy "Riders can create own application"
  on rider_applications for insert with check (
    auth.uid() = user_id and verification_status = 'pending'
  );

create policy "Riders can view own application"
  on rider_applications for select using (auth.uid() = user_id);

create policy "Riders can update own pending application"
  on rider_applications for update
  using (auth.uid() = user_id and verification_status = 'pending')
  with check (auth.uid() = user_id and verification_status = 'pending');

-- ─── Client / Customer Profiles ──────────────────────────────────────────────

create table if not exists client_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  email text,
  avatar_url text,
  -- address
  address text,
  state text,
  delivery_notes text,
  -- preferences
  categories text[] default '{}',
  -- payment
  preferred_payment text,
  -- notifications
  notif_order_updates boolean default true,
  notif_promotions boolean default false,
  notif_delivery_tracking boolean default true,
  notif_vendor_messages boolean default true,
  -- meta
  onboarding_completed boolean default false,
  joined_date timestamptz default now(),
  updated_at timestamptz default now()
);

alter table client_profiles enable row level security;

create unique index if not exists client_profiles_user_id_key
  on client_profiles(user_id);

drop policy if exists "Clients can manage own profile" on client_profiles;
create policy "Clients can manage own profile"
  on client_profiles for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
