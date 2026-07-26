import { Screen } from '../App';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Star, 
  Verified, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Plus,
  Minus,
  Share2,
  Heart
} from 'lucide-react';
import { useState } from 'react';

export const ProductDetail = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-10 grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-6">
           <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-surface-container-low shadow-ambient group relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxv39I6oN9X02v3q1e9R6o9T9pP1N-z_3o6_N6r6X1rC_4v5y1y2z3a4b5c6d7e8f9"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6 flex flex-col gap-4">
                 <button className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all active:scale-95">
                    <Heart className="w-5 h-5 text-primary" />
                 </button>
                 <button className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all active:scale-95">
                    <Share2 className="w-5 h-5 text-primary" />
                 </button>
              </div>
           </div>
           <div className="grid grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-all cursor-pointer shadow-sm">
                   <img src={`https://picsum.photos/seed/prod${i}/200/200`} className="w-full h-full object-cover" />
                </div>
              ))}
           </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-on-surface-variant font-bold uppercase tracking-widest text-[10px]">
                 <span>Fresh Products</span>
                 <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                 <span>Kilele Organics</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">Premium Hass Avocado Box</h1>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-1 bg-secondary-container px-3 py-1 rounded-full text-primary">
                    <Star className="w-4 h-4 fill-primary" />
                    <span className="font-bold">4.9</span>
                    <span className="text-sm opacity-60 ml-1">(128 Reviews)</span>
                 </div>
                 <div className="flex items-center gap-1 text-primary">
                    <Verified className="w-4 h-4" />
                    <span className="text-sm font-bold">Verified Organic</span>
                 </div>
              </div>
           </div>

           <div className="space-y-2">
              <p className="text-on-surface-variant line-through text-lg">₦18,000</p>
              <h2 className="text-5xl font-display font-extrabold text-primary">₦15,000 <span className="text-lg font-sans font-medium text-on-surface-variant">/ Box of 12</span></h2>
           </div>

           <div className="space-y-4 pt-6 border-t border-outline-variant/30">
              <p className="text-lg leading-relaxed text-on-surface-variant">
                 Hand-picked from the highlands of Kilele, these Hass avos are known for their creamy texture and rich, nutty flavor. Perfect for gourmet salsas, salads, or your morning sourdough toast.
              </p>
              <ul className="space-y-3">
                 <li className="flex items-center gap-3 text-on-surface">
                   <div className="w-2 h-2 rounded-full bg-primary" />
                   <span>Arrives in eco-friendly, plastic-free packaging</span>
                 </li>
                 <li className="flex items-center gap-3 text-on-surface">
                   <div className="w-2 h-2 rounded-full bg-primary" />
                   <span>Guaranteed fresh or money-back</span>
                 </li>
              </ul>
           </div>

           {/* Features Grid */}
           <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-surface-container-low p-4 rounded-2xl space-y-2">
                 <Truck className="w-6 h-6 text-primary" />
                 <p className="text-xs font-bold">Fast Delivery</p>
                 <p className="text-[10px] text-on-surface-variant">Under 45 mins</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl space-y-2">
                 <ShieldCheck className="w-6 h-6 text-primary" />
                 <p className="text-xs font-bold">Secure Pay</p>
                 <p className="text-[10px] text-on-surface-variant">Encrypted transactions</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl space-y-2">
                 <RotateCcw className="w-6 h-6 text-primary" />
                 <p className="text-xs font-bold">Easy Returns</p>
                 <p className="text-[10px] text-on-surface-variant">7-day policy</p>
              </div>
           </div>

           {/* Vendor Info Card */}
           <div className="glass-panel p-6 rounded-3xl flex items-center justify-between border-primary/10 shadow-sm">
              <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                    <img src="https://picsum.photos/seed/kilele/200/200" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h4 className="font-bold text-xl">Kilele Organics</h4>
                    <p className="text-sm text-on-surface-variant">Lagos, Trusted since 2019</p>
                 </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('vendor-store')}
                aria-label="View Kilele Organics store"
                className="btn-ghost px-6 py-2 h-fit"
              >
                View Store
              </button>
           </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full glass-panel border-t shadow-ambient z-50 py-4 px-4 md:px-10">
         <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="hidden md:block">
               <h4 className="font-display font-bold text-xl text-primary">Premium Hass Avocado Box</h4>
               <p className="text-sm font-bold text-primary opacity-60">₦15,000</p>
            </div>
            <div className="flex items-center gap-4 flex-1 md:flex-initial">
               <div className="flex items-center border border-outline-variant rounded-xl p-1 bg-white shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-surface-container-low rounded-lg transition-colors active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-surface-container-low rounded-lg transition-colors active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
               </div>
               <button onClick={() => onNavigate('checkout')} className="flex-1 md:flex-initial btn-primary h-14 px-10 shadow-lg shadow-primary/20">
                  Add to Cart
                  <ShoppingBag className="w-5 h-5 ml-2" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
