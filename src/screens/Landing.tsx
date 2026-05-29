import { Screen } from '../App';
import { 
  ShoppingBasket, 
  Shirt, 
  Smartphone, 
  Pill,
  ChevronLeft,
  ChevronRight,
  Verified,
  Star,
  Bike,
  Navigation,
  Store
} from 'lucide-react';

export const Landing = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  return (
    <div className="pt-20 px-4 md:px-10 max-w-7xl mx-auto space-y-20 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-10 py-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-primary leading-[1.1]">
            Everything you need, delivered with <span className="text-secondary">care.</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg">
            Experience premium shopping from your favorite local vendors, all in one place. Fast, reliable, and uniquely VendoGo.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => onNavigate('client-onboarding')} className="btn-primary">Get Started</button>
            <button onClick={() => onNavigate('login')} className="btn-secondary">Login</button>
            <button onClick={() => onNavigate('vendor-onboarding')} className="btn-ghost">Sell on VendoGo</button>
          </div>
        </div>
        <div className="flex-1 relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2JWLjsVLN-s6SceHccDYRwkN33GRHbrORfZxbA30pGoC7hprqOQ-IQFrszzUI0mvGuLRaAZ1XvR9-13Mu8nzpToyHePe4THubPZ5oGA3usXoaZwhPxO2xjnoU2jvhPt4xNLW2EZ_aZ6INCH9-UL-2WNDP2Q-Txgp3kgoXSO55jJn5PSOYBPALTtAf0SJMRBsA12dCObNle814JHcpS8vaZcWOQbnA0Y8Wc1ic6uL5C2-1U0cIEjiMWgrV1-3CaYgau_h-G_ItSA" 
            alt="Delivery Service"
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
          />
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="space-y-10">
        <h2 className="text-3xl font-display font-bold text-primary">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <CategoryCard icon={<ShoppingBasket />} title="Groceries" desc="Fresh daily picks" color="bg-primary-fixed" />
          <CategoryCard icon={<Store />} title="Fashion" desc="Local designer wear" color="bg-secondary-fixed" />
          <CategoryCard icon={<Smartphone />} title="Electronics" desc="Latest gadgets" color="bg-surface-container-high" />
          <CategoryCard icon={<Pill />} title="Pharmacy" desc="Essential care" color="bg-tertiary-fixed" />
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-display font-bold text-primary">Premium Local Vendors</h2>
            <p className="text-on-surface-variant">Handpicked for quality and excellence.</p>
          </div>
          <div className="flex gap-4">
            <button className="p-3 rounded-full border border-outline-variant hover:bg-white transition-colors"><ChevronLeft /></button>
            <button className="p-3 rounded-full border border-outline-variant hover:bg-white transition-colors"><ChevronRight /></button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x">
          <VendorCard 
            title="Kilele Organics" 
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuAal4zL2aR_uyAxuk0A_drjPnedGHt9ntNFBgttiFu2kJFASg9giPBW8MBaTk7LnGpWO_ppUSFS4YkjvzwuHvGm6332KDyAIyiF_dF3MTkTpMWr7olDZ0GAJbGT9ihKe21JTSrIE1XMzHjFaUthKY24R-QJJKpTGa5p2yeykVzhtmRz3TNd4Ttd7NFclUtsgogtfDD8kCmGqBQnm5TP5DRu4i4uYaaIh1PJXf4EYVU8MSZsG-qzCU7vSd4kMyfxDI5xTRuB9mFxng"
            rating={4.9}
            reviews={120}
          />
          <VendorCard 
            title="Zuri Fashion" 
            img="https://lh3.googleusercontent.com/aida-public/AB6AXuDwmvEaXuQ_CM-xKTi4bgwWjPhv6uF7TTR06V6kIBHo0yj4HMbERptHRpSG1fZa5y4LJX0oUoS8xw1xRB3q2juqy5_j-k7i0t_wRBbcUVte5-XtHm3FPlugGVl1A37BJVRrzDYTdLFGfvwbht-AxxRKfScTlmEuJbFa_MNCrbCQ5sMXFicOe4Qgbt8Q3-vt-G9S1MizUscqCboYOH8KKy5OFSB_xH5AKVqdr0q7fMauPhj-wffXangJJNnFCMEdY_E8rPEDNLsf4A"
            rating={4.8}
            reviews={85}
          />
        </div>
      </section>

      {/* Tracking Feature */}
      <section className="flex flex-col lg:flex-row items-center gap-12 bg-surface-container-low rounded-3xl p-10 shadow-ambient border border-outline-variant/30">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-display font-bold text-primary">Track your joy in real-time.</h2>
          <p className="text-lg text-on-surface-variant">
            Our advanced tracking system keeps you connected to your order. Watch your delivery agent navigate the city with precision and care.
          </p>
          <div className="bg-surface-container-low p-6 rounded-2xl flex items-center gap-6">
             <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-white">
                <Bike className="w-8 h-8" />
             </div>
             <div>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1 font-bold">Active Delivery</p>
                <h4 className="text-xl font-bold">James is 8 mins away</h4>
             </div>
          </div>
        </div>
        <div className="flex-1 h-[400px] w-full rounded-2xl overflow-hidden relative shadow-lg">
           <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNj4aMlE3ZX6ORSFHvy0aVTvAmdD1j1AQqGLtirxeD72xYinJv2wwOlYXDcKClZw_H47Ufuka-4m363iLY-6Yrkz1Z9k7N4ZCg-3zO9ZtS7G4oJNewEZnsR76ufsrPIT3XAE1LhQgRqGsLnqpvQMtpflMCTM_J0JQBHn4uQZn-LYnt5lDiSObQGZEssJ8TgrXDYHNm0tk_Dxhm9Co2R_iRTRg3vjfSgy61n_pJ5GJLeofyK70Uh3eqdDJ8xrBQfpz0RW1zdVppIg" 
              className="w-full h-full object-cover" 
           />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
             <div className="bg-primary-container text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Navigation className="w-4 h-4" />
                <span className="text-sm font-bold">On the way</span>
             </div>
             <div className="w-1 h-8 bg-primary-container/30"></div>
             <div className="w-2 h-2 bg-primary-container rounded-full"></div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-primary rounded-3xl p-12 text-white relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <h3 className="text-4xl font-display font-bold text-white">Sell on VendoGo</h3>
            <p className="text-white/70 text-lg">Grow your local business by reaching thousands of premium customers in your city.</p>
            <button onClick={() => onNavigate('vendor-onboarding')} className="btn-secondary mt-4">Start Selling</button>
          </div>
          <Store className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 group-hover:rotate-12 transition-transform duration-500" />
        </div>
        <div className="bg-primary rounded-3xl p-12 text-white relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <h3 className="text-4xl font-display font-bold text-white">Ride for VendoGo</h3>
            <p className="text-white/70 text-lg">Enjoy flexible hours, competitive pay, and the best support team in the logistics game.</p>
            <button onClick={() => onNavigate('rider-onboarding')} className="btn-secondary mt-4">Join the Fleet</button>
          </div>
          <Bike className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 group-hover:rotate-12 transition-transform duration-500" />
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) => (
  <div className="group glass-panel p-8 rounded-2xl hover:border-primary/20 transition-all cursor-pointer">
    <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-sm text-on-surface-variant mt-1">{desc}</p>
  </div>
);

const VendorCard = ({ title, img, rating, reviews }: { title: string, img: string, rating: number, reviews: number }) => (
  <div className="min-w-[340px] bg-surface-container-lowest rounded-2xl shadow-ambient overflow-hidden snap-start cursor-pointer group hover:-translate-y-2 transition-transform">
    <div className="h-48 overflow-hidden relative">
      <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
        <Verified className="w-4 h-4 text-secondary" />
        <span className="text-xs font-bold">Featured</span>
      </div>
    </div>
    <div className="p-6 flex items-center gap-4">
       <div className="w-12 h-12 rounded-full border-2 border-secondary-fixed p-1">
          <img src={img} className="w-full h-full rounded-full object-cover" />
       </div>
       <div>
         <h4 className="font-bold text-lg">{title}</h4>
         <div className="flex items-center gap-1">
           <Star className="w-4 h-4 text-secondary fill-secondary" />
           <span className="text-sm font-bold">{rating}</span>
           <span className="text-sm text-on-surface-variant">({reviews}+ reviews)</span>
         </div>
       </div>
    </div>
  </div>
);
