import { Screen } from '../App';
import { 
  ShoppingBag, 
  Settings, 
  MapPin, 
  Star, 
  Clock, 
  ChevronRight, 
  CreditCard, 
  Heart,
  Package,
  Truck,
  CheckCircle2,
  Bell,
  LogOut,
  Gift,
  ArrowRight
} from 'lucide-react';

export const CustomerDashboard = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  return (
    <div className="pt-20 px-4 md:px-10 max-w-7xl mx-auto space-y-6 md:space-y-10 pb-32 overflow-x-hidden w-full">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] shadow-ambient border border-outline-variant/30">
         <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full ring-4 ring-secondary/20 p-2 overflow-hidden bg-surface-container-low transition-all group-hover:ring-secondary/40 shadow-xl">
               <img src="https://picsum.photos/seed/customer/400/400" className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <button className="absolute bottom-1 right-1 p-2 md:p-3 bg-primary text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all outline outline-4 outline-white">
               <Settings className="w-5 h-5" />
            </button>
         </div>
         <div className="text-center md:text-left space-y-2 flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 justify-center md:justify-start">
               <h1 className="text-2xl md:text-4xl font-display font-bold text-primary">Ayo Balogun</h1>
               <span className="bg-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm h-fit">Elite Member</span>
            </div>
            <p className="text-on-surface-variant font-medium text-sm md:text-base break-all">ayo.b@example.com • +234 812 345 6789</p>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
               <div className="flex items-center gap-1 text-primary">
                  <Package className="w-4 h-4" />
                  <span className="text-sm font-bold">42 Orders</span>
               </div>
               <span className="text-outline-variant">•</span>
               <div className="flex items-center gap-1 text-primary">
                  <Star className="w-4 h-4 text-secondary fill-secondary" />
                  <span className="text-sm font-bold">Elite Status</span>
               </div>
            </div>
         </div>
         <div className="flex gap-3 w-full md:w-auto">
            <button className="p-3 bg-surface-container-low rounded-2xl hover:bg-surface-container-high transition-colors"><Bell className="w-5 h-5 md:w-6 md:h-6 text-primary" /></button>
            <button className="btn-primary px-6 flex-1 md:flex-none md:px-8">Edit Profile</button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 w-full min-w-0">
         {/* Main Content: Orders & Favorites */}
         <div className="lg:col-span-2 space-y-8 md:space-y-12 min-w-0 w-full">
            {/* Active Orders */}
            <section className="space-y-4 w-full min-w-0">
               <div className="flex items-center gap-3">
                  <h2 className="text-xl md:text-2xl font-display font-bold text-primary whitespace-nowrap">Active Orders</h2>
                  <div className="h-[1px] flex-1 bg-outline-variant opacity-30"></div>
               </div>
               <div className="bg-primary/5 border border-primary/10 rounded-2xl md:rounded-3xl p-4 md:p-8 space-y-4 md:space-y-6 relative overflow-hidden group w-full">
                  <div className="flex justify-between items-start">
                     <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary">
                           <Truck className="w-5 h-5 animate-bounce" />
                           <span className="font-bold">On the way</span>
                        </div>
                        <h3 className="text-base md:text-xl font-bold text-primary">Order #VG-19283</h3>
                           <p className="text-xs md:text-sm text-on-surface-variant">Arriving in approx. 12 mins • 3 Items</p>
                     </div>
                     <button className="p-3 bg-white rounded-full shadow-sm hover:scale-110 transition-transform"><ChevronRight /></button>
                  </div>
                  <div className="h-2 bg-white/40 rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[65%] rounded-full shadow-inner"></div>
                  </div>
                  <div className="flex gap-3 items-center flex-wrap">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-12 h-12 bg-white rounded-lg p-1 border border-outline-variant/30 shadow-sm">
                           <img src={`https://picsum.photos/seed/p${i+20}/100/100`} className="w-full h-full object-cover rounded-md" />
                        </div>
                     ))}
                     <div className="flex-1"></div>
                     <button className="text-primary font-bold text-sm hover:underline whitespace-nowrap">Track Dispatcher →</button>
                  </div>
               </div>
            </section>

            {/* Favorite Vendors */}
            <section className="space-y-4 w-full min-w-0">
               <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-display font-bold text-primary">Favorite Vendors</h2>
                  <button className="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
                     Manage List <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
               <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
                  <VendorCircle name="Kilele Organics" img="https://picsum.photos/seed/kilele/200/200" />
                  <VendorCircle name="Zuri Fashion" img="https://picsum.photos/seed/zuri/200/200" />
                  <VendorCircle name="TechHub" img="https://picsum.photos/seed/tech/200/200" />
                  <VendorCircle name="BeePure" img="https://picsum.photos/seed/bee/200/200" />
                  <div className="min-w-[120px] flex flex-col items-center gap-3 group cursor-pointer">
                     <div className="w-20 h-20 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
                        <Star className="w-8 h-8 text-outline-variant group-hover:text-primary animate-pulse" />
                     </div>
                     <span className="text-xs font-bold text-on-surface-variant">Add More</span>
                  </div>
               </div>
            </section>

            {/* Recent Orders Table */}
            <section className="space-y-4 w-full min-w-0">
               <h2 className="text-xl md:text-2xl font-display font-bold text-primary">Order History</h2>
               <div className="bg-white rounded-2xl md:rounded-3xl border border-outline-variant/30 shadow-ambient overflow-hidden w-full">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 md:p-6 border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors cursor-pointer last:border-0 group">
                       <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-surface-container-low rounded-2xl flex items-center justify-center shrink-0">
                             <Package className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                          </div>
                          <div>
                             <h4 className="font-bold flex items-center gap-2 flex-wrap">
                                ₦12,500
                                <span className="bg-surface-container-high px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest text-on-surface-variant">Delivered</span>
                             </h4>
                             <p className="text-xs md:text-sm text-on-surface-variant mt-0.5">Apr {15-i}, 2024 • 2 Items</p>
                          </div>
                       </div>
                       <button className="btn-ghost py-2 px-3 md:px-4 text-xs h-fit md:opacity-0 md:group-hover:opacity-100 transition-opacity">Reorder</button>
                    </div>
                  ))}
               </div>
            </section>
         </div>

         {/* Sidebar: Subscriptions & Rewards */}
         <div className="space-y-6 md:space-y-8 w-full min-w-0">
            <div className="bg-secondary-fixed rounded-3xl p-6 md:p-8 space-y-6 shadow-ambient border border-secondary shadow-lg shadow-secondary/10 relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
                     <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary">VendoGo Elite</h3>
                  <p className="text-primary opacity-80 text-sm leading-relaxed">
                     Your membership expires in 12 days. Renew now to keep enjoying free delivery and double rewards.
                  </p>
                  <button className="w-full btn-primary h-14 shadow-lg shadow-primary/20">Renew Membership</button>
               </div>
               <Star className="absolute -bottom-10 -right-10 w-48 h-48 text-primary/5 group-hover:-rotate-12 transition-transform duration-700" />
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-ambient space-y-6">
               <h3 className="text-xl font-bold text-primary">Saved Methods</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 group cursor-pointer hover:border-primary/40 transition-all">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-primary rounded-md flex items-center justify-center text-white text-[8px] font-bold italic">VISA</div>
                        <span className="text-sm font-bold text-on-surface">•••• 4242</span>
                     </div>
                     <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-all" />
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-outline-variant rounded-2xl text-sm font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all">
                     <CreditCard className="w-5 h-5" />
                     Add New Method
                  </button>
               </div>
            </div>

            <button className="w-full flex items-center justify-between p-6 bg-surface-container-low hover:bg-red-50 hover:text-red-600 rounded-3xl transition-all group">
               <div className="flex items-center gap-4">
                  <LogOut className="w-6 h-6" />
                  <span className="font-bold">Sign Out</span>
               </div>
               <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
            </button>
         </div>
      </div>
    </div>
  );
};

const VendorCircle = ({ name, img }: { name: string, img: string }) => (
  <div className="min-w-[120px] flex flex-col items-center gap-3 group cursor-pointer">
     <div className="w-20 h-20 rounded-full border-2 border-transparent group-hover:border-secondary transition-all p-1 overflow-hidden">
        <img src={img} className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform" />
     </div>
     <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors text-center whitespace-nowrap overflow-hidden text-ellipsis w-full px-2">{name}</span>
  </div>
);
