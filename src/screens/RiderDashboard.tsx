import { Screen } from '../App';
import { 
  Bike, 
  MapPin, 
  Navigation, 
  DollarSign, 
  Star, 
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  Shield,
  Bell,
  ArrowUpRight
} from 'lucide-react';

export const RiderDashboard = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  return (
    <div className="pt-24 px-4 md:px-10 max-w-7xl mx-auto space-y-10 pb-32">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 rounded-full border-4 border-white shadow-ambient overflow-hidden">
              <img src="https://picsum.photos/seed/rider1/200/200" className="w-full h-full object-cover" />
           </div>
           <div>
              <h1 className="text-3xl font-display font-bold text-primary">Good morning, James!</h1>
              <div className="flex items-center gap-2 text-sm">
                 <span className="w-2 h-2 rounded-full bg-green-500"></span>
                 <span className="font-bold text-on-surface-variant">Active & Online</span>
                 <span className="text-outline-variant mx-1">•</span>
                 <span className="text-on-surface-variant">Fleet Member since 2023</span>
              </div>
           </div>
        </div>
        <div className="bg-white p-2 rounded-2xl shadow-ambient border border-outline-variant/30 flex items-center gap-1">
           <button className="px-6 py-2 rounded-xl bg-primary text-white font-bold text-sm shadow-lg">Online</button>
           <button className="px-6 py-2 rounded-xl text-on-surface-variant font-bold text-sm hover:bg-surface-container-low transition-colors">Offline</button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         <StatsBox label="Today's Earnings" value="₦14,200" icon={<DollarSign className="w-5 h-5" />} color="bg-primary" />
         <StatsBox label="Deliveries" value="12" icon={<Bike className="w-5 h-5" />} color="bg-secondary" />
         <StatsBox label="Rating" value="4.95" icon={<Star className="w-5 h-5" />} color="bg-amber-400" />
         <StatsBox label="Online Hours" value="6.5h" icon={<Clock className="w-5 h-5" />} color="bg-blue-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
         {/* Live Order Card */}
         <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-display font-bold text-primary">Active Delivery</h2>
            <div className="bg-white rounded-3xl overflow-hidden shadow-ambient border-2 border-primary/20 relative">
               <div className="bg-primary p-6 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                        <Navigation className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-xs uppercase tracking-widest font-bold opacity-70">Current Task</p>
                        <h3 className="text-xl font-bold">Pick-up from Kilele Organics</h3>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-xs font-bold opacity-70">Est. Earning</p>
                     <p className="text-2xl font-display font-extrabold text-secondary">₦1,250</p>
                  </div>
               </div>

               <div className="p-8 space-y-8">
                  <div className="flex gap-6">
                     <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"></div>
                        <div className="w-0.5 h-16 bg-outline-variant my-1 border-dashed border-l-2"></div>
                        <MapPin className="w-5 h-5 text-secondary" />
                     </div>
                     <div className="flex-1 space-y-8">
                        <div>
                           <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Pick-up</p>
                           <h4 className="font-bold text-lg">Kilele Organics, Block 4</h4>
                           <p className="text-sm text-on-surface-variant mt-1">1.2km away • 5 mins approx.</p>
                        </div>
                        <div>
                           <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Drop-off</p>
                           <h4 className="font-bold text-lg">22 Victoria Island, Apartment 4B</h4>
                           <p className="text-sm text-on-surface-variant mt-1">4.5km from vendor • 12 mins approx.</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <button className="flex-1 bg-surface-container-low text-primary py-4 rounded-xl font-bold hover:bg-surface-container-high transition-colors">Order Details</button>
                     <button className="flex-1 btn-primary py-4 shadow-lg shadow-primary/20">Start Navigation</button>
                  </div>
               </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-6 pt-4">
               <h2 className="text-2xl font-display font-bold text-primary">Recent Activity</h2>
               <div className="space-y-4">
                  {[1,2].map(i => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-outline-variant/30 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center">
                             <CheckCircle2 className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                             <h4 className="font-bold">Delivered to Sarah O.</h4>
                             <p className="text-sm text-on-surface-variant">Completed at 09:15 • ₦1,050 Earned</p>
                          </div>
                       </div>
                       <ChevronRight className="w-5 h-5 text-on-surface-variant" />
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Earnings & Goals Sidebar */}
         <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-ambient space-y-6">
               <h3 className="text-xl font-display font-bold text-primary">Weekly Goal</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Progress</p>
                        <p className="text-3xl font-display font-bold">₦68k <span className="text-lg font-sans text-on-surface-variant">/ ₦100k</span></p>
                     </div>
                     <p className="text-sm font-bold text-primary">68%</p>
                  </div>
                  <div className="h-3 bg-surface-container-low rounded-full overflow-hidden">
                     <div className="h-full bg-secondary w-[68%] rounded-full shadow-inner"></div>
                  </div>
                  <div className="p-4 bg-primary-container/10 border border-primary/10 rounded-2xl">
                     <p className="text-xs text-primary font-medium leading-relaxed">
                        You're on track! Only ₦32,000 more to hit your weekly bonus ₦5,000.
                     </p>
                  </div>
               </div>
            </div>

            <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden group shadow-xl">
               <div className="relative z-10 space-y-4">
                  <Shield className="w-10 h-10 text-secondary" />
                  <h3 className="text-xl font-bold">Fleet Protection</h3>
                  <p className="text-sm text-primary-fixed-dim">Your insurance is active and covers all deliveries today. Drive safe!</p>
                  <button className="flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg border border-white/20">
                     View Benefits
                     <ArrowUpRight className="w-4 h-4" />
                  </button>
               </div>
               <Bike className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 opacity-50 group-hover:rotate-12 transition-transform duration-700" />
            </div>

            <div className="bg-surface-container-low rounded-3xl p-8 flex items-center justify-between group cursor-pointer hover:bg-white transition-all border border-transparent hover:border-outline-variant">
               <div className="flex items-center gap-4">
                  <Bell className="w-6 h-6 text-primary" />
                  <span className="font-bold">Notifications</span>
               </div>
               <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-[10px] font-bold text-primary shadow-sm">3</div>
            </div>
         </div>
      </div>
    </div>
  );
};

const StatsBox = ({ label, value, icon, color }: { label: string, value: string, icon: any, color: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-ambient flex flex-col justify-between gap-4 group hover:border-primary/20 transition-all">
     <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>
        {icon}
     </div>
     <div className="space-y-1">
        <p className="text-[10px] leading-tight flex-wrap font-bold uppercase tracking-widest text-on-surface-variant line-clamp-1">{label}</p>
        <p className="text-2xl font-display font-extrabold text-primary">{value}</p>
     </div>
  </div>
);
