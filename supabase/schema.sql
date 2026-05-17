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

create policy "Vendors can view own profile"
  on vendor_profiles for select using (auth.uid() = user_id);

create policy "Vendors can update own profile"
  on vendor_profiles for update using (auth.uid() = user_id);

create policy "Vendors can insert own profile"
  on vendor_profiles for insert with check (auth.uid() = user_id);

-- Function to auto-update trust score
create or replace function update_trust_score()
returns trigger as $$
declare
  score integer := 0;
begin
  if new.phone_verified then score := score + 10; end if;
  if new.account_name is not null and new.account_name != '' then score := score + 20; end if;
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

create policy "Clients can manage own profile"
  on client_profiles for all using (auth.uid() = user_id);
