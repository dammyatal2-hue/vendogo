import { Screen } from '../App';
import { 
  Bike, 
  User, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2,
  Camera,
  CreditCard,
  Truck
} from 'lucide-react';
import { useState } from 'react';

const STEPS = [
  { id: 1, title: 'Identity', desc: 'Personal details & ID', icon: <User /> },
  { id: 2, title: 'Vehicle', desc: 'License & Vehicle info', icon: <Bike /> },
  { id: 3, title: 'Coverage', desc: 'Service areas', icon: <MapPin /> },
  { id: 4, title: 'Verification', desc: 'Background check', icon: <ShieldCheck /> }
];

export const RiderOnboarding = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
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
               <Bike className="w-12 h-12" />
            </div>
            <div className="space-y-4">
               <h1 className="text-3xl font-display font-bold text-primary">Ride with VendoGo!</h1>
               <p className="text-on-surface-variant font-medium">Your application is in review. Download the Fleet App to track your status.</p>
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
                <div className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-primary ml-1">First Name</label>
                         <input type="text" placeholder="James" className="input-field" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-primary ml-1">Last Name</label>
                         <input type="text" placeholder="Ige" className="input-field" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Email Address</label>
                      <input type="email" placeholder="james.ige@example.com" className="input-field" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">National ID / Passport</label>
                      <div className="flex items-center gap-4 p-6 border-2 border-dashed border-outline-variant rounded-2xl cursor-pointer hover:border-primary transition-all">
                         <Camera className="w-6 h-6 text-on-surface-variant" />
                         <span className="text-sm font-bold text-on-surface-variant">Click to upload doc</span>
                      </div>
                   </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <VehicleTypeCard icon={<Bike />} label="Motorcycle" active={true} />
                      <VehicleTypeCard icon={<Truck />} label="Van/Car" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Vehicle License Plate</label>
                      <input type="text" placeholder="LAG-123-XY" className="input-field" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Driver's License ID</label>
                      <input type="text" placeholder="DL-9283-K" className="input-field" />
                   </div>
                </div>
              )}

              {currentStep > 2 && (
                 <div className="py-20 flex flex-col items-center justify-center text-on-surface-variant">
                    <p className="font-bold italic opacity-40">Step {currentStep} Background Verification...</p>
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
                 {currentStep === 4 ? 'Complete Registration' : 'Next Step'}
                 <ChevronRight className="w-5 h-5 ml-2" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const VehicleTypeCard = ({ icon, label, active }: { icon: any, label: string, active?: boolean }) => (
  <div className={`p-8 rounded-3xl border-2 flex flex-col items-center gap-4 cursor-pointer transition-all ${
    active ? 'border-primary bg-primary/5' : 'border-outline-variant/30 bg-white hover:border-primary/40'
  }`}>
     <div className={`scale-150 ${active ? 'text-primary' : 'text-on-surface-variant'}`}>{icon}</div>
     <span className={`font-bold text-sm ${active ? 'text-primary' : 'text-on-surface-variant'}`}>{label}</span>
  </div>
);
