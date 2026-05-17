import { Screen } from '../App';
import { 
  LineChart, 
  ShoppingBag, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Search,
  MoreVertical,
  ChevronRight,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { TrustScore } from '../components/TrustScore';
import { VerificationBadges, VendorLevelBadge } from '../components/VerificationBadges';
import { BadgeType } from '../lib/types';

export const VendorDashboard = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const mockBadges: BadgeType[] = ['verified_seller', 'fast_delivery'];
  const mockTrustScore = 45;

  return (
    <div className="pt-24 px-4 md:px-10 max-w-7xl mx-auto space-y-10 pb-24">
      {/* Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
           <div className="flex items-center gap-3 flex-wrap">
             <h1 className="text-4xl font-display font-bold text-primary">Kilele Organics</h1>
             <VendorLevelBadge level="Verified Seller" />
           </div>
           <p className="text-on-surface-variant flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live: 24 active orders
           </p>
           <div className="pt-1">
             <VerificationBadges badges={mockBadges} />
           </div>
        </div>
        <div className="flex gap-4">
           <button className="btn-ghost flex items-center gap-2 h-14">
              <Package className="w-5 h-5" />
              Manage Inventory
           </button>
           <button className="btn-primary flex items-center gap-2 h-14 group">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              Add Product
           </button>
        </div>
      </div>

      {/* Analytics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatsCard 
            title="Total Revenue" 
            value="₦4.2M" 
            trend="+12.5%" 
            up={true} 
            icon={<LineChart className="text-primary" />} 
         />
         <StatsCard 
            title="Active Orders" 
            value="156" 
            trend="+8.2%" 
            up={true} 
            icon={<ShoppingBag className="text-primary" />} 
         />
         <StatsCard 
            title="Customers" 
            value="2.8k" 
            trend="-2.4%" 
            up={false} 
            icon={<Users className="text-primary" />} 
         />
         <StatsCard 
            title="Avg. Completion" 
            value="38m" 
            trend="+5s" 
            up={false} 
            icon={<Clock className="text-primary" />} 
         />
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
         {/* Order Management */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-display font-bold text-primary">Live Orders</h2>
               <button className="text-primary font-bold text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-4">
               {[1,2,3].map(i => (
                 <div key={i} className="bg-white rounded-2xl p-6 border border-outline-variant/30 shadow-ambient flex items-center justify-between group hover:border-primary/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-surface-container-low rounded-xl flex items-center justify-center">
                          <ShoppingBag className="w-7 h-7 text-primary" />
                       </div>
                       <div>
                          <h4 className="font-bold text-lg">Order #VG-92{i}</h4>
                          <p className="text-sm text-on-surface-variant">3 Items • ₦12,500 • Today, 14:2{i}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="hidden md:flex flex-col items-end">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                             i === 1 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {i === 1 ? 'Preparing' : 'Ready for Pickup'}
                          </span>
                       </div>
                       <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Sidebar: Insights & Tips */}
         <div className="space-y-8">
            <div className="space-y-6">
               <h2 className="text-2xl font-display font-bold text-primary">Performance</h2>
               <div className="bg-primary rounded-3xl p-8 text-white space-y-6 shadow-xl">
                  <div className="space-y-2">
                     <p className="text-xs uppercase tracking-widest text-white/60 font-bold">Health Score</p>
                     <p className="text-4xl font-display font-bold">94/100</p>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between text-xs">
                        <span className="font-bold">Completion Rate</span>
                        <span>98%</span>
                     </div>
                     <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary w-[98%] rounded-full"></div>
                     </div>
                  </div>
                  <button className="w-full py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-bold border border-white/20">
                     View Breakdown
                  </button>
               </div>
               <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/20 space-y-3">
                  <TrustScore score={mockTrustScore} />
               </div>
            </div>

            <div className="bg-secondary-fixed rounded-3xl p-8 space-y-4">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <AlertCircle className="w-6 h-6 text-primary" />
               </div>
               <h3 className="text-xl font-bold text-primary">Improve your visibility</h3>
               <p className="text-sm text-primary opacity-70">Vendors with verified high-res images get up to 40% more orders. Update your catalog today.</p>
               <button className="text-sm font-bold text-primary hover:underline">See how →</button>
            </div>
         </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, trend, up, icon }: { title: string, value: string, trend: string, up: boolean, icon: any }) => (
  <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-ambient space-y-4 relative overflow-hidden group hover:border-primary/20 transition-all">
     <div className="flex justify-between items-start">
        <div className="w-12 h-12 bg-surface-container-low rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
           {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${up ? 'text-green-600' : 'text-red-600'}`}>
           {up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
           {trend}
        </div>
     </div>
     <div className="space-y-1">
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">{title}</p>
        <p className="text-3xl font-display font-extrabold text-primary">{value}</p>
     </div>
  </div>
);
