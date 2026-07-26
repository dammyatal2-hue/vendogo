import { useState } from 'react';
import { Screen } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, User, CreditCard, Bell, CheckCircle2,
  ChevronRight, ArrowLeft, Camera, Navigation,
  ShoppingBasket, Shirt, Smartphone, Pill, Home,
  Bike, Star, Verified, Package, Zap, Shield,
  ToggleLeft, ToggleRight, Store, Heart, Coffee
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// ─── Types ───────────────────────────────────────────────────────────────────

type PaymentMethod = 'opay' | 'palmpay' | 'bank_transfer' | 'cash';

interface OnboardingData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  deliveryNotes: string;
  categories: string[];
  paymentMethod: PaymentMethod | '';
  notifications: {
    orderUpdates: boolean;
    promotions: boolean;
    deliveryTracking: boolean;
    vendorMessages: boolean;
  };
}

const INITIAL_DATA: OnboardingData = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  state: 'Lagos',
  deliveryNotes: '',
  categories: [],
  paymentMethod: '',
  notifications: {
    orderUpdates: true,
    promotions: false,
    deliveryTracking: true,
    vendorMessages: true,
  },
};

const STEPS = [
  { id: 1, label: 'Welcome' },
  { id: 2, label: 'Profile' },
  { id: 3, label: 'Address' },
  { id: 4, label: 'Interests' },
  { id: 5, label: 'Payment' },
  { id: 6, label: 'Alerts' },
  { id: 7, label: 'Done' },
];

const CATEGORIES = [
  { id: 'fashion',    label: 'Fashion',         icon: Shirt,          color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'food',       label: 'Food & Drinks',   icon: Coffee,         color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'electronics',label: 'Electronics',     icon: Smartphone,     color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'beauty',     label: 'Beauty',          icon: Heart,          color: 'bg-pink-50 text-pink-700 border-pink-200' },
  { id: 'groceries',  label: 'Groceries',       icon: ShoppingBasket, color: 'bg-green-50 text-green-700 border-green-200' },
  { id: 'pharmacy',   label: 'Pharmacy',        icon: Pill,           color: 'bg-red-50 text-red-700 border-red-200' },
  { id: 'home',       label: 'Home Essentials', icon: Home,           color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'stores',     label: 'Local Stores',    icon: Store,          color: 'bg-teal-50 text-teal-700 border-teal-200' },
];

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; sub: string; color: string }[] = [
  { id: 'opay',          label: 'OPay',          sub: 'Mobile wallet',    color: 'bg-green-500' },
  { id: 'palmpay',       label: 'PalmPay',       sub: 'Mobile wallet',    color: 'bg-red-500' },
  { id: 'bank_transfer', label: 'Bank Transfer', sub: 'Any Nigerian bank', color: 'bg-primary' },
  { id: 'cash',          label: 'Cash on Delivery', sub: 'Pay at doorstep', color: 'bg-secondary' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0 ${on ? 'bg-primary' : 'bg-outline-variant'}`}
  >
    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${on ? 'left-7' : 'left-1'}`} />
  </button>
);

const StepDot = ({ step, current }: { step: number; current: number; [key: string]: unknown }) => (
  <div className={`h-1.5 rounded-full transition-all duration-500 ${
    step < current ? 'bg-primary flex-1' :
    step === current ? 'bg-primary flex-[2]' :
    'bg-outline-variant/40 flex-1'
  }`} />
);

// ─── Steps ────────────────────────────────────────────────────────────────────

const StepWelcome = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col items-center text-center space-y-8 py-4">
    <div className="relative w-full max-w-xs mx-auto h-52">
      <div className="absolute inset-0 bg-primary/5 rounded-3xl overflow-hidden">
        <img
          src="https://picsum.photos/seed/vendogo-market/600/400"
          className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          alt="marketplace"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-surface-container-lowest/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-ambient border border-outline-variant/20">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-lg text-primary">VendoGo</span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">Your city's marketplace</p>
        </div>
      </div>
    </div>

    <div className="space-y-3 max-w-sm">
      <h1 className="text-3xl md:text-4xl font-display font-bold text-primary leading-tight">
        Welcome to <span className="text-secondary">VendoGo</span>
      </h1>
      <p className="text-on-surface-variant leading-relaxed">
        Shop from the best local vendors around you. Fast delivery, secure payments, and a premium experience — all in one place.
      </p>
    </div>

    <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
      {[
        { icon: Store,   label: 'Local Vendors' },
        { icon: Zap,     label: 'Fast Delivery' },
        { icon: Shield,  label: 'Secure Pay' },
      ].map(({ icon: Icon, label }) => (
        <div key={label} className="bg-surface-container-low rounded-2xl p-4 flex flex-col items-center gap-2 border border-outline-variant/20">
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[11px] font-bold text-primary text-center leading-tight">{label}</span>
        </div>
      ))}
    </div>

    <button onClick={onNext} className="btn-primary w-full max-w-sm h-14 text-base shadow-lg shadow-primary/20">
      Get Started <ChevronRight className="w-5 h-5" />
    </button>
  </div>
);

const StepProfile = ({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) => (
  <div className="space-y-5">
    <div className="flex flex-col items-center gap-3 pb-2">
      <div className="relative group cursor-pointer">
        <div className="w-20 h-20 rounded-full bg-surface-container-low border-2 border-dashed border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors overflow-hidden">
          <Camera className="w-7 h-7 text-on-surface-variant group-hover:text-primary transition-colors" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow">
          <span className="text-white text-xs font-bold">+</span>
        </div>
      </div>
      <p className="text-xs text-on-surface-variant">Add profile photo <span className="opacity-60">(optional)</span></p>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-bold text-primary ml-1">Full Name</label>
      <input
        type="text" placeholder="e.g. Amara Okafor"
        value={data.fullName}
        onChange={e => onChange({ fullName: e.target.value })}
        className="input-field"
      />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-bold text-primary ml-1">Phone Number</label>
      <div className="flex gap-2">
        <span className="input-field w-20 text-center font-bold shrink-0 flex items-center justify-center">+234</span>
        <input
          type="tel" placeholder="8012345678" maxLength={11}
          value={data.phone}
          onChange={e => onChange({ phone: e.target.value })}
          className="input-field flex-1"
        />
      </div>
    </div>
    <div className="space-y-2">
      <label className="text-sm font-bold text-primary ml-1">Email Address</label>
      <input
        type="email" placeholder="you@example.com"
        value={data.email}
        onChange={e => onChange({ email: e.target.value })}
        className="input-field"
      />
    </div>
  </div>
);

const StepAddress = ({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) => (
  <div className="space-y-5">
    <button className="w-full flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl hover:bg-primary/10 transition-colors group">
      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
        <Navigation className="w-5 h-5 text-white" />
      </div>
      <div className="text-left">
        <p className="font-bold text-primary text-sm">Use Current Location</p>
        <p className="text-xs text-on-surface-variant">Auto-detect your address</p>
      </div>
      <ChevronRight className="w-4 h-4 text-primary ml-auto group-hover:translate-x-1 transition-transform" />
    </button>

    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-outline-variant/30" />
      <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">or enter manually</span>
      <div className="flex-1 h-px bg-outline-variant/30" />
    </div>

    <div className="space-y-2">
      <label className="text-sm font-bold text-primary ml-1">Home Address</label>
      <input
        type="text" placeholder="e.g. 12 Bode Thomas Street, Surulere"
        value={data.address}
        onChange={e => onChange({ address: e.target.value })}
        className="input-field"
      />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-bold text-primary ml-1">State</label>
      <select value={data.state} onChange={e => onChange({ state: e.target.value })} className="input-field appearance-none">
        <option>Lagos</option><option>Abuja</option><option>Rivers</option>
        <option>Oyo</option><option>Kano</option><option>Other</option>
      </select>
    </div>
    <div className="space-y-2">
      <label className="text-sm font-bold text-primary ml-1">Delivery Notes <span className="font-normal text-on-surface-variant">(optional)</span></label>
      <textarea
        placeholder="e.g. Blue gate, call on arrival..."
        value={data.deliveryNotes}
        onChange={e => onChange({ deliveryNotes: e.target.value })}
        className="input-field min-h-[80px] resize-none"
      />
    </div>

    <div className="bg-surface-container-low rounded-2xl p-4 flex items-center gap-3 border border-outline-variant/20">
      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
      <p className="text-sm text-on-surface-variant">You can save multiple addresses later from your profile.</p>
    </div>
  </div>
);

const StepCategories = ({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) => {
  const toggle = (id: string) => {
    const next = data.categories.includes(id)
      ? data.categories.filter(c => c !== id)
      : [...data.categories, id];
    onChange({ categories: next });
  };
  return (
    <div className="space-y-5">
      <p className="text-sm text-on-surface-variant">Pick what you shop for most. We'll personalise your feed.</p>
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map(({ id, label, icon: Icon, color }) => {
          const selected = data.categories.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                selected
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/30'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${selected ? 'bg-primary' : color.split(' ')[0] + ' ' + color.split(' ')[1]}`}>
                <Icon className={`w-4 h-4 ${selected ? 'text-white' : ''}`} />
              </div>
              <span className={`text-sm font-bold leading-tight ${selected ? 'text-primary' : 'text-on-surface'}`}>{label}</span>
              {selected && <CheckCircle2 className="w-4 h-4 text-primary ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>
      {data.categories.length > 0 && (
        <p className="text-xs text-center text-primary font-bold">{data.categories.length} selected</p>
      )}
    </div>
  );
};

const StepPayment = ({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) => (
  <div className="space-y-4">
    <p className="text-sm text-on-surface-variant">Choose your preferred payment method. You can add more later.</p>
    <div className="space-y-3">
      {PAYMENT_OPTIONS.map(opt => {
        const selected = data.paymentMethod === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange({ paymentMethod: opt.id })}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
              selected ? 'border-primary bg-primary/5' : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/30'
            }`}
          >
            <div className={`w-10 h-10 ${opt.color} rounded-xl flex items-center justify-center shrink-0`}>
              <span className="text-white text-[10px] font-bold leading-tight text-center px-1">{opt.label.split(' ')[0]}</span>
            </div>
            <div className="text-left flex-1">
              <p className={`font-bold text-sm ${selected ? 'text-primary' : 'text-on-surface'}`}>{opt.label}</p>
              <p className="text-xs text-on-surface-variant">{opt.sub}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              selected ? 'border-primary bg-primary' : 'border-outline-variant'
            }`}>
              {selected && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          </button>
        );
      })}
    </div>
    <div className="bg-surface-container-low rounded-2xl p-4 flex items-start gap-3 border border-outline-variant/20">
      <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
      <p className="text-xs text-on-surface-variant">Your payment details are encrypted and never stored on our servers.</p>
    </div>
  </div>
);

const StepNotifications = ({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) => {
  const update = (key: keyof OnboardingData['notifications']) => {
    onChange({ notifications: { ...data.notifications, [key]: !data.notifications[key] } });
  };
  const items: { key: keyof OnboardingData['notifications']; label: string; sub: string }[] = [
    { key: 'orderUpdates',     label: 'Order Updates',      sub: 'Confirmation, dispatch & delivery' },
    { key: 'deliveryTracking', label: 'Delivery Tracking',  sub: 'Live rider location updates' },
    { key: 'vendorMessages',   label: 'Vendor Messages',    sub: 'Replies and store announcements' },
    { key: 'promotions',       label: 'Promotions & Deals', sub: 'Discounts and flash sales' },
  ];
  return (
    <div className="space-y-4">
      <p className="text-sm text-on-surface-variant">Stay in the loop. You can change these anytime.</p>
      <div className="space-y-3">
        {items.map(({ key, label, sub }) => (
          <div key={key} className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/20">
            <div className="space-y-0.5 pr-4">
              <p className="font-bold text-sm text-on-surface">{label}</p>
              <p className="text-xs text-on-surface-variant">{sub}</p>
            </div>
            <Toggle on={data.notifications[key]} onToggle={() => update(key)} />
          </div>
        ))}
      </div>
    </div>
  );
};

const StepComplete = ({ data, onNavigate }: { data: OnboardingData; onNavigate: (s: Screen) => void }) => (
  <div className="flex flex-col items-center text-center space-y-8 py-2">
    <div className="relative">
      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-xl ring-8 ring-primary/10 mx-auto">
        <CheckCircle2 className="w-12 h-12 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-md">
        <Star className="w-4 h-4 text-primary fill-primary" />
      </div>
    </div>

    <div className="space-y-2 max-w-xs">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">
        {data.fullName ? `You're all set, ${data.fullName.split(' ')[0]}!` : "You're all set!"}
      </h2>
      <p className="text-on-surface-variant text-sm leading-relaxed">
        Your VendoGo account is ready. Start exploring local vendors and get your first order delivered.
      </p>
    </div>

    <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
      {[
        { label: '200+', sub: 'Vendors' },
        { label: '30min', sub: 'Avg. Delivery' },
        { label: '4.8★', sub: 'Avg. Rating' },
      ].map(({ label, sub }) => (
        <div key={sub} className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/20">
          <p className="font-display font-bold text-lg text-primary">{label}</p>
          <p className="text-[11px] text-on-surface-variant font-bold">{sub}</p>
        </div>
      ))}
    </div>

    <div className="w-full max-w-sm space-y-3">
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {['Kilele Organics', 'Zuri Fashion', 'TechHub'].map((name, i) => (
          <div key={name} className="min-w-[120px] bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 shadow-ambient shrink-0">
            <div className="h-16 overflow-hidden">
              <img src={`https://picsum.photos/seed/${name}/200/100`} className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
              <p className="text-[11px] font-bold text-primary truncate">{name}</p>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-secondary fill-secondary" />
                <span className="text-[10px] text-on-surface-variant">4.{9 - i}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-3 w-full max-w-sm">
      <button onClick={() => onNavigate('marketplace')} className="btn-primary w-full h-14 text-base shadow-lg shadow-primary/20">
        Start Shopping <ChevronRight className="w-5 h-5" />
      </button>
      <button onClick={() => onNavigate('landing')} className="btn-ghost w-full h-12">
        Explore Marketplace
      </button>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const ClientOnboarding = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const update = (partial: Partial<OnboardingData>) => setData(d => ({ ...d, ...partial }));
  const next = () => setStep(s => Math.min(s + 1, STEPS.length));
  const finish = async () => {
    setError('');
    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsSubmitting(false);
      setError('Please sign in before saving your customer profile.');
      return;
    }

    const { error: saveError } = await supabase.from('client_profiles').upsert({
      user_id: user.id,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email || user.email,
      address: data.address,
      state: data.state,
      delivery_notes: data.deliveryNotes,
      categories: data.categories,
      preferred_payment: data.paymentMethod || null,
      notif_order_updates: data.notifications.orderUpdates,
      notif_promotions: data.notifications.promotions,
      notif_delivery_tracking: data.notifications.deliveryTracking,
      notif_vendor_messages: data.notifications.vendorMessages,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

    setIsSubmitting(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    next();
  };
  const back = () => setStep(s => Math.max(s - 1, 1));
  const skip = () => next();

  const isLastStep = step === STEPS.length;
  const isFirstStep = step === 1;
  const showNav = step > 1 && step < STEPS.length;

  const STEP_TITLES: Record<number, string> = {
    2: 'Your Profile',
    3: 'Delivery Address',
    4: 'Shopping Interests',
    5: 'Payment Method',
    6: 'Notifications',
  };

  const STEP_DESCS: Record<number, string> = {
    2: 'Let us know who you are',
    3: 'Where should we deliver?',
    4: 'Personalise your experience',
    5: 'How would you like to pay?',
    6: 'Choose what to hear about',
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 flex flex-col items-center">
      <div className="w-full max-w-md space-y-6">

        {/* Progress bar — hidden on welcome & complete */}
        {!isFirstStep && !isLastStep && (
          <div className="space-y-3">
            <div className="flex gap-1.5">
              {STEPS.slice(1, -1).map(st => {
                const cur = step as number;
                return <StepDot key={st.id} step={st.id} current={cur} />;
              })}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Step {step - 1} of {STEPS.length - 2}
              </span>
              <button onClick={skip} className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors">
                Skip
              </button>
            </div>
          </div>
        )}

        {/* Card */}
        <div className="bg-surface-container-lowest rounded-[32px] shadow-ambient border border-outline-variant/20 overflow-hidden">
          {/* Card header — hidden on welcome & complete */}
          {showNav && (
            <div className="px-8 pt-8 pb-0 space-y-1">
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-primary">
                {STEP_TITLES[step]}
              </h2>
              <p className="text-on-surface-variant text-sm">{STEP_DESCS[step]}</p>
            </div>
          )}

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 && <StepWelcome onNext={next} />}
                {step === 2 && <StepProfile data={data} onChange={update} />}
                {step === 3 && <StepAddress data={data} onChange={update} />}
                {step === 4 && <StepCategories data={data} onChange={update} />}
                {step === 5 && <StepPayment data={data} onChange={update} />}
                {step === 6 && <StepNotifications data={data} onChange={update} />}
                {step === 7 && <StepComplete data={data} onNavigate={onNavigate} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer nav — steps 2–6 only */}
          {showNav && (
            <div className="px-6 md:px-8 pb-6 md:pb-8 flex items-center justify-between border-t border-outline-variant/10 pt-5">
              <button
                onClick={back}
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-bold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="flex flex-col items-end gap-2">
              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              <button disabled={isSubmitting} onClick={step === 6 ? finish : next} className="btn-primary px-8 h-12 shadow-md shadow-primary/20 disabled:opacity-50">
                {isSubmitting ? 'Saving…' : step === 6 ? 'Finish' : 'Continue'}
                <ChevronRight className="w-4 h-4" />
              </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
