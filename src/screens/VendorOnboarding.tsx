import { Screen } from '../App';
import {
  Store, MapPin, FileCheck, ChevronRight, ArrowLeft,
  CheckCircle2, Camera, Layers, ShieldCheck, Building,
  Phone, CreditCard, Share2, GraduationCap, Upload, Eye, EyeOff
} from 'lucide-react';
import { useState } from 'react';
import { NIGERIAN_BANKS, computeTrustScore, getVendorLevel, SocialLinks } from '../lib/types';
import { TrustScore } from '../components/TrustScore';
import { VerificationBadges, VendorLevelBadge } from '../components/VerificationBadges';
import { supabase } from '../lib/supabase';

const STEPS = [
  { id: 1, title: 'Identity',   desc: 'Tell us about your business',  icon: <Building /> },
  { id: 2, title: 'Location',   desc: 'Where do you operate?',        icon: <MapPin /> },
  { id: 3, title: 'Phone',      desc: 'Verify your phone number',     icon: <Phone /> },
  { id: 4, title: 'Bank',       desc: 'Add your payout account',      icon: <CreditCard /> },
  { id: 5, title: 'Social',     desc: 'Link your social presence',    icon: <Share2 /> },
  { id: 6, title: 'Storefront', desc: 'Visuals & branding',           icon: <Store /> },
];

export const VendorOnboarding = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('Lagos');
  const [city, setCity] = useState('');
  const [deliveryRadius, setDeliveryRadius] = useState('');

  // Step 3 — Phone
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);

  // Step 4 — Bank
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  // Step 5 — Social + Student
  const [social, setSocial] = useState<SocialLinks>({});
  const [isStudent, setIsStudent] = useState(false);
  const [schoolName, setSchoolName] = useState('');

  const trustData = {
    phone_verified: phoneVerified,
    social_verified: false,
    student_verified: false,
  };
  const trustScore = computeTrustScore(trustData);
  const vendorLevel = getVendorLevel(trustScore);

  const normalizedPhone = `+234${phone.replace(/\D/g, '').replace(/^0/, '')}`;

  const handleSendOtp = async () => {
    setError('');
    const { error: otpError } = await supabase.auth.signInWithOtp({
      phone: normalizedPhone,
    });
    if (otpError) {
      setError(otpError.message);
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    setError('');
    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone: normalizedPhone,
      token: otp,
      type: 'sms',
    });
    if (verifyError) {
      setError(verifyError.message);
      return;
    }
    setPhoneVerified(true);
  };

  const handleAccountNumberChange = (val: string) => {
    setAccountNumber(val.replace(/\D/g, ''));
    setAccountName('');
  };

  const submitApplication = async () => {
    setError('');
    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsSubmitting(false);
      setError('Verify your phone number before submitting.');
      return;
    }

    const { error: submitError } = await supabase.from('vendor_profiles').upsert({
      user_id: user.id,
      business_name: businessName,
      category,
      description,
      state,
      city,
      delivery_radius_km: deliveryRadius ? Number(deliveryRadius) : null,
      phone: normalizedPhone,
      bank_name: bankName || null,
      account_number: accountNumber || null,
      account_name: accountName || null,
      social_links: social,
      is_student_vendor: isStudent,
      school_name: schoolName || null,
    }, { onConflict: 'user_id' });

    setIsSubmitting(false);
    if (submitError) {
      setError(submitError.message);
      return;
    }
    setIsSuccess(true);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) setCurrentStep(s => s + 1);
    else void submitApplication();
  };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(s => s - 1); };

  if (isSuccess) {
    const badges = [
      ...(phoneVerified ? ['verified_seller' as const] : []),
    ];
    return (
      <div className="pt-24 px-4 flex justify-center items-center min-h-[70vh]">
        <div className="max-w-md w-full bg-surface-container-lowest p-10 rounded-[40px] shadow-ambient text-center space-y-8 border border-outline-variant/20">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto text-white shadow-xl ring-8 ring-primary/10">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-display font-bold text-primary">Application Received!</h1>
            <p className="text-on-surface-variant font-medium">Our team will review your details and get back to you within 48 hours.</p>
          </div>
          <div className="bg-surface-container-low rounded-3xl p-6 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-primary">Your Trust Score</span>
              <VendorLevelBadge level={vendorLevel} />
            </div>
            <TrustScore score={trustScore} />
            {badges.length > 0 && <VerificationBadges badges={badges} />}
          </div>
          <button onClick={() => onNavigate('landing')} className="w-full btn-primary h-14">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-10 max-w-7xl mx-auto pb-24 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-10">

        {/* Progress Steps */}
        <div className="space-y-4">
          <div className="flex justify-between items-start px-1 overflow-x-auto no-scrollbar gap-2">
            {STEPS.map(step => (
              <div key={step.id} className="flex flex-col items-center gap-2 min-w-[48px]">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${
                  currentStep >= step.id ? 'bg-primary text-white scale-110 shadow-primary/20' : 'bg-surface-container-low text-on-surface-variant'
                }`}>
                  {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest text-center ${
                  currentStep >= step.id ? 'text-primary' : 'text-on-surface-variant opacity-50'
                }`}>{step.title}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-700 ease-out"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Live Trust Score Preview */}
        {currentStep >= 3 && (
          <div className="bg-surface-container-low rounded-2xl px-6 py-4 border border-outline-variant/20">
            <TrustScore score={trustScore} compact />
          </div>
        )}

        {/* Form Card */}
        <div className="bg-surface-container-lowest p-8 md:p-12 rounded-[40px] shadow-ambient border border-outline-variant/20 space-y-8 min-h-[480px] flex flex-col justify-between">
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary">{STEPS[currentStep - 1].title}</h2>
              <p className="text-on-surface-variant">{STEPS[currentStep - 1].desc}</p>
            </div>

            {/* Step 1 — Identity */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Business Name</label>
                  <input required type="text" placeholder="e.g. Kilele Organics" value={businessName} onChange={e => setBusinessName(e.target.value)} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="input-field appearance-none">
                    <option>Groceries</option>
                    <option>Fashion</option>
                    <option>Electronics</option>
                    <option>Food & Drinks</option>
                    <option>Beauty & Health</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Business Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell us what makes your store unique..." className="input-field min-h-[100px]" />
                </div>
              </div>
            )}

            {/* Step 2 — Location */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">State</label>
                  <select value={state} onChange={e => setState(e.target.value)} className="input-field appearance-none">
                    <option>Lagos</option><option>Abuja</option><option>Rivers</option>
                    <option>Oyo</option><option>Kano</option><option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">City / Area</label>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Yaba, Lagos" className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Delivery Radius (km)</label>
                  <input type="number" min="1" value={deliveryRadius} onChange={e => setDeliveryRadius(e.target.value)} placeholder="e.g. 5" className="input-field" />
                </div>
              </div>
            )}

            {/* Step 3 — Phone OTP */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in slide-in-from-right-4 duration-500">
                {phoneVerified ? (
                  <div className="flex items-center gap-3 p-5 bg-green-50 border border-green-200 rounded-2xl">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <div>
                      <p className="font-bold text-green-700">Phone Verified</p>
                      <p className="text-sm text-green-600">{phone} — +10 trust points</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Phone Number</label>
                      <div className="flex gap-3">
                        <span className="input-field w-20 text-center font-bold shrink-0">+234</span>
                        <input
                          type="tel" placeholder="8012345678" maxLength={11}
                          value={phone} onChange={e => setPhone(e.target.value)}
                          className="input-field flex-1"
                        />
                      </div>
                    </div>
                    {!otpSent ? (
                      <button
                        onClick={handleSendOtp}
                        disabled={phone.length < 10}
                        className="btn-primary w-full h-12 disabled:opacity-40"
                      >
                        Send OTP
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-primary ml-1">Enter 6-digit OTP</label>
                          <input
                            type="text" placeholder="••••••" maxLength={6}
                            value={otp} onChange={e => setOtp(e.target.value)}
                            className="input-field tracking-[0.5em] text-center text-xl font-bold"
                          />
                        </div>
                        <button
                          onClick={handleVerifyOtp}
                          disabled={otp.length !== 6}
                          className="btn-primary w-full h-12 disabled:opacity-40"
                        >
                          Verify OTP
                        </button>
                        <button onClick={() => setOtpSent(false)} className="text-sm text-on-surface-variant hover:text-primary w-full text-center">
                          Resend OTP
                        </button>
                      </div>
                    )}
                  </>
                )}
                <p className="text-xs text-on-surface-variant text-center">
                  Phone verification adds <span className="font-bold text-primary">+10</span> to your trust score
                </p>
              </div>
            )}

            {/* Step 4 — Bank */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Bank / Wallet</label>
                  <select
                    className="input-field appearance-none"
                    value={bankName}
                    onChange={e => { setBankName(e.target.value); setAccountName(''); }}
                  >
                    <option value="">Select bank or wallet</option>
                    {NIGERIAN_BANKS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Account Number</label>
                  <input
                    type="text" placeholder="10-digit account number" maxLength={10}
                    value={accountNumber}
                    onChange={e => handleAccountNumberChange(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Account Name</label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={e => setAccountName(e.target.value)}
                    placeholder="Name shown on the account"
                    className="input-field"
                  />
                </div>
                <p className="text-xs text-on-surface-variant">Your payout details will be verified during application review.</p>
              </div>
            )}

            {/* Step 5 — Social + Student */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-4">
                  <p className="text-sm font-bold text-primary">Social Media Links <span className="font-normal text-on-surface-variant">(optional — adds +15)</span></p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">IG</span>
                      <input
                        type="text" placeholder="instagram.com/yourbusiness"
                        value={social.instagram ?? ''}
                        onChange={e => setSocial(s => ({ ...s, instagram: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">TT</span>
                      <input
                        type="text" placeholder="tiktok.com/@yourbusiness"
                        value={social.tiktok ?? ''}
                        onChange={e => setSocial(s => ({ ...s, tiktok: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">WA</span>
                      <input
                        type="text" placeholder="WhatsApp Business number"
                        value={social.whatsapp ?? ''}
                        onChange={e => setSocial(s => ({ ...s, whatsapp: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-outline-variant/20 pt-6 space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setIsStudent(v => !v)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                        isStudent ? 'bg-primary border-primary' : 'border-outline-variant group-hover:border-primary'
                      }`}
                    >
                      {isStudent && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <p className="font-bold text-primary flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" /> I am a student vendor
                      </p>
                      <p className="text-xs text-on-surface-variant">Adds 🎓 Student Vendor badge +15 trust points</p>
                    </div>
                  </label>

                  {isStudent && (
                    <div className="space-y-3 pl-8 animate-in slide-in-from-top-2 duration-300">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-primary ml-1">School Name</label>
                        <input
                          type="text" placeholder="e.g. University of Lagos"
                          value={schoolName} onChange={e => setSchoolName(e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-outline-variant rounded-2xl hover:border-primary transition-colors cursor-pointer bg-surface-container-low/30 group">
                        <Upload className="w-6 h-6 text-on-surface-variant group-hover:text-primary transition-colors" />
                        <p className="text-sm font-bold text-on-surface-variant group-hover:text-primary">Upload School ID <span className="font-normal">(optional)</span></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 6 — Storefront */}
            {currentStep === 6 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="flex flex-col items-center gap-4 p-10 border-2 border-dashed border-outline-variant rounded-3xl group hover:border-primary transition-colors cursor-pointer bg-surface-container-low/30">
                  <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-primary">Upload Store Logo</p>
                    <p className="text-xs text-on-surface-variant">Recommended: 500×500px</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Store Banner Color</label>
                  <div className="flex gap-4">
                    {['#0D2C24', '#D4AF37', '#151c27', '#F9F9FF'].map(c => (
                      <div key={c} className="w-12 h-12 rounded-full cursor-pointer ring-offset-2 hover:ring-2 ring-primary transition-all shadow-sm" style={{ backgroundColor: c }} />
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center cursor-pointer hover:border-primary">
                      <Layers className="w-4 h-4 text-outline-variant" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-outline-variant/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 font-bold transition-all ${
                currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <div className="flex flex-col items-end gap-2">
              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <button disabled={isSubmitting || (currentStep === STEPS.length && (!businessName || !phoneVerified))} onClick={nextStep} className="btn-primary px-10 h-14 shadow-lg shadow-primary/20 text-base disabled:opacity-50">
              {isSubmitting ? 'Submitting…' : currentStep === STEPS.length ? 'Submit Application' : 'Next Step'}
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
