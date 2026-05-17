import { Screen } from '../App';
import { 
  Store, 
  MapPin, 
  FileCheck, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2,
  Camera,
  Layers,
  ShieldCheck,
  Building
} from 'lucide-react';
import { useState } from 'react';

const STEPS = [
  { id: 1, title: 'Identity', desc: 'Tell us about your business', icon: <Building /> },
  { id: 2, title: 'Location', desc: 'Where do you operate?', icon: <MapPin /> },
  { id: 3, title: 'Verification', desc: 'Legal & Tax info', icon: <FileCheck /> },
  { id: 4, title: 'Storefront', desc: 'Visuals & Branding', icon: <Store /> }
];

export const VendorOnboarding = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else setIsSuccess(true);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (isSuccess) {
    return (
      <div className="pt-24 px-4 flex justify-center items-center h-[70vh]">
         <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-ambient text-center space-y-8 border border-outline-variant/20 relative overflow-hidden">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto text-white shadow-xl ring-8 ring-primary/10">
               <ShieldCheck className="w-12 h-12" />
            </div>
            <div className="space-y-4">
               <h1 className="text-3xl font-display font-bold text-primary">Application Received!</h1>
               <p className="text-on-surface-variant font-medium">Our team will review your business details and get back to you within 48 hours.</p>
            </div>
            <div className="space-y-4">
               <button onClick={() => onNavigate('landing')} className="w-full btn-primary h-14">Return Home</button>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-10 max-w-7xl mx-auto pb-24 h-full flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-12">
        {/* Progress Bar */}
        <div className="space-y-6">
           <div className="flex justify-between items-center px-2">
              {STEPS.map(step => (
                <div key={step.id} className="flex flex-col items-center gap-3">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${
                      currentStep >= step.id ? 'bg-primary text-white scale-110 shadow-primary/20' : 'bg-surface-container-low text-on-surface-variant'
                   }`}>
                      {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                   </div>
                   <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      currentStep >= step.id ? 'text-primary' : 'text-on-surface-variant opacity-50'
                   }`}>{step.title}</span>
                </div>
              ))}
           </div>
           <div className="h-2 bg-surface-container-low rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-primary transition-all duration-700 ease-out absolute left-0" 
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              ></div>
           </div>
        </div>

        {/* Form Content */}
        <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-ambient border border-outline-variant/20 space-y-10 min-h-[500px] flex flex-col justify-between">
           <div className="space-y-8">
              <div className="space-y-2">
                 <h2 className="text-4xl font-display font-extrabold text-primary">{STEPS[currentStep - 1].title}</h2>
                 <p className="text-on-surface-variant text-lg">{STEPS[currentStep - 1].desc}</p>
              </div>

              {currentStep === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Business Name</label>
                      <input type="text" placeholder="e.g. Kilele Organics" className="input-field" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Category</label>
                      <select className="input-field appearance-none bg-no-repeat bg-[right_1.5rem_center]">
                         <option>Groceries</option>
                         <option>Fashion</option>
                         <option>Electronics</option>
                         <option>Other</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Business Description</label>
                      <textarea placeholder="Tell us what makes your store premium..." className="input-field min-h-[120px]"></textarea>
                   </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                   <div className="flex flex-col items-center gap-4 p-10 border-2 border-dashed border-outline-variant rounded-3xl group hover:border-primary transition-colors cursor-pointer bg-surface-container-low/30">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                         <Camera className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-center">
                         <p className="font-bold text-primary">Upload Store Logo</p>
                         <p className="text-xs text-on-surface-variant">Recommended size: 500x500px</p>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Store Banner Color</label>
                      <div className="flex gap-4">
                         {['#0D2C24', '#D4AF37', '#151c27', '#F9F9FF'].map(c => (
                           <div key={c} className="w-12 h-12 rounded-full cursor-pointer ring-offset-2 hover:ring-2 ring-primary transition-all shadow-sm" style={{ backgroundColor: c }}></div>
                         ))}
                         <div className="w-12 h-12 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center cursor-pointer hover:border-primary">
                            <Layers className="w-4 h-4 text-outline-variant" />
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {currentStep !== 1 && currentStep !== 4 && (
                 <div className="py-20 flex flex-col items-center justify-center text-on-surface-variant">
                    <p className="font-bold italic opacity-40">Step {currentStep} Information Inputs...</p>
                 </div>
              )}
           </div>

           <div className="flex items-center justify-between pt-10 border-t border-outline-variant/10">
              <button 
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 font-bold transition-all ${
                  currentStep === 1 ? 'opacity-0' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                 <ArrowLeft className="w-5 h-5" />
                 Back
              </button>
              <button onClick={nextStep} className="btn-primary px-10 h-16 shadow-lg shadow-primary/20 text-lg">
                 {currentStep === 4 ? 'Submit Application' : 'Next Step'}
                 <ChevronRight className="w-5 h-5 ml-2" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
