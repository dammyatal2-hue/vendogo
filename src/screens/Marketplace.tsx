import { Screen } from '../App';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Star, 
  Heart, 
  ShoppingBag,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = ["All", "Groceries", "Fresh Products", "Fashion", "Electronics", "Pharmacy", "Books"];

const PRODUCTS = [
  { id: 1, name: "Premium Avocado Box", price: 15000, category: "Groceries", rating: 4.9, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxv39I6oN9X02v3q1e9R6o9T9pP1N-z_3o6_N6r6X1rC_4v5y1y2z3a4b5c6d7e8f9", vendor: "Kilele Organics" },
  { id: 2, name: "Luxury Lace Fabric", price: 45000, category: "Fashion", rating: 4.8, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAal4zL2aR_uyAxuk0A_drjPnedGHt9ntNFBgttiFu2kJFASg9giPBW8MBaTk7LnGpWO_ppUSFS4YkjvzwuHvGm6332KDyAIyiF_dF3MTkTpMWr7olDZ0GAJbGT9ihKe21JTSrIE1XMzHjFaUthKY24R-QJJKpTGa5p2yeykVzhtmRz3TNd4Ttd7NFclUtsgogtfDD8kCmGqBQnm5TP5DRu4i4uYaaIh1PJXf4EYVU8MSZsG-qzCU7vSd4kMyfxDI5xTRuB9mFxng", vendor: "Zuri Fashion" },
  { id: 3, name: "Wireless Headphones", price: 85000, category: "Electronics", rating: 4.7, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwmvEaXuQ_CM-xKTi4bgwWjPhv6uF7TTR06V6kIBHo0yj4HMbERptHRpSG1fZa5y4LJX0oUoS8xw1xRB3q2juqy5_j-k7i0t_wRBbcUVte5-XtHm3FPlugGVl1A37BJVRrzDYTdLFGfvwbht-AxxRKfScTlmEuJbFa_MNCrbCQ5sMXFicOe4Qgbt8Q3-vt-G9S1MizUscqCboYOH8KKy5OFSB_xH5AKVqdr0q7fMauPhj-wffXangJJNnFCMEdY_E8rPEDNLsf4A", vendor: "TechHub" },
  { id: 4, name: "Organic Honey 1L", price: 8500, category: "Groceries", rating: 5.0, img: "https://picsum.photos/seed/bee/400/400", vendor: "BeePure" },
  { id: 5, name: "Designer Silk Scarf", price: 12000, category: "Fashion", rating: 4.6, img: "https://picsum.photos/seed/scarf/400/400", vendor: "Zuri Fashion" },
  { id: 6, name: "Vitamin C Serum", price: 9500, category: "Pharmacy", rating: 4.8, img: "https://picsum.photos/seed/serum/400/400", vendor: "CarePlus" },
];

export const Marketplace = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 px-4 md:px-10 max-w-7xl mx-auto space-y-10 pb-24">
      {/* Search & Header */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-4xl font-display font-bold text-primary">Discover Excellence</h1>
          <div className="relative flex-1 max-w-xl">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
             <input 
                type="text" 
                placeholder="Search products, vendors, categories..." 
                className="input-field pl-12 h-14"
             />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
           <button className="p-3 rounded-lg border border-outline-variant bg-white shadow-sm hover:surface-container-low transition-colors">
              <Filter className="w-5 h-5" />
           </button>
           <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
           {CATEGORIES.map(cat => (
             <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-lg scale-105' 
                    : 'bg-white text-on-surface-variant border border-outline-variant hover:border-primary/40'
                }`}
             >
                {cat}
             </button>
           ))}
        </div>
      </div>

      {/* Promotions / Deals */}
      <div className="grid md:grid-cols-2 gap-8">
         <div className="bg-secondary-fixed rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between h-64 group shadow-ambient">
            <div className="relative z-10">
               <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-4 text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                 <Sparkles className="w-3 h-3" />
                 Special Offer
               </div>
               <h3 className="text-3xl font-display font-bold text-primary leading-tight">Fresh Organics<br/>Delivery ₦0.00</h3>
            </div>
            <button className="relative z-10 flex items-center gap-2 font-bold text-primary bg-white px-6 py-3 rounded-xl w-fit group-hover:gap-4 transition-all">
               Shop Now <ArrowRight className="w-4 h-4" />
            </button>
            <ShoppingBag className="absolute -bottom-8 -right-8 w-48 h-48 text-primary/5 group-hover:-rotate-12 transition-transform" />
         </div>
         <div className="bg-primary rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between h-64 group shadow-ambient">
            <div className="relative z-10">
               <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-4 text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                 <Sparkles className="w-3 h-3" />
                 Member Rewards
               </div>
               <h3 className="text-3xl font-display font-bold text-white leading-tight">Elite Members Save<br/>up to 15% Daily</h3>
            </div>
            <button className="relative z-10 flex items-center gap-2 font-bold text-primary bg-secondary px-6 py-3 rounded-xl w-fit group-hover:gap-4 transition-all">
               Join Elite <ArrowRight className="w-4 h-4" />
            </button>
            <Filter className="absolute -bottom-8 -right-8 w-48 h-48 text-white/5 group-hover:-rotate-12 transition-transform" />
         </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
         {filteredProducts.map(product => (
           <div 
             key={product.id} 
             onClick={() => onNavigate('product-detail')}
             className="bg-white rounded-2xl shadow-ambient overflow-hidden cursor-pointer group hover:-translate-y-2 transition-transform border border-outline-variant/10"
           >
              <div className="aspect-[4/4] relative overflow-hidden bg-surface-container-low">
                 <img 
                    src={product.img || `https://picsum.photos/seed/${product.id}/500/500`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                 />
                 <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-on-surface-variant group-hover:text-red-500 transition-colors" />
                 </button>
                 {product.rating >= 4.9 && (
                   <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Best Seller
                   </div>
                 )}
              </div>
              <div className="p-5 space-y-2 text-primary">
                 <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">{product.category}</p>
                 <h3 className="font-bold text-lg group-hover:text-secondary-fixed-dim transition-colors line-clamp-1">{product.name}</h3>
                 <div className="flex items-center justify-between">
                    <p className="font-display font-extrabold text-2xl">₦{product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                       <Star className="w-4 h-4 text-secondary fill-secondary" />
                       <span className="text-sm font-bold">{product.rating}</span>
                    </div>
                 </div>
                 <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
                   <p className="text-xs text-on-surface-variant font-medium">By {product.vendor}</p>
                   <button className="p-2 rounded-full bg-surface-container-low hover:bg-primary hover:text-white transition-all active:scale-90">
                      <ShoppingBag className="w-4 h-4" />
                   </button>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* Pagination / Load More */}
      <div className="flex justify-center pt-10">
         <button className="btn-ghost flex items-center gap-2">
            Show more outcomes <ChevronRight className="w-4 h-4" />
         </button>
      </div>
    </div>
  );
};
