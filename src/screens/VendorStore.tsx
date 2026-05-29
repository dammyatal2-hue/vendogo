import { Screen } from '../App';
import {
  Search, Star, ShoppingBag, Heart, MessageCircle,
  Truck, Clock, CheckCircle2, Filter, ChevronDown, Zap
} from 'lucide-react';
import { useState } from 'react';

const STORE = {
  name: 'Kilele Organics',
  tagline: 'Farm-fresh produce, delivered with care',
  banner: 'https://picsum.photos/seed/kilelebanner/1200/400',
  logo: 'https://picsum.photos/seed/kilele/200/200',
  rating: 4.9,
  reviewCount: 128,
  deliveryFee: 1500,
  eta: '30–45 mins',
  isOpen: true,
};

const CATEGORIES = ['All', 'Fresh Produce', 'Honey & Spreads', 'Grains', 'Herbs & Spices', 'Dairy'];

const PRODUCTS = [
  { id: 1, name: 'Premium Avocado Box', price: 15000, category: 'Fresh Produce', rating: 4.9, img: 'https://picsum.photos/seed/avo/400/400', eta: '35 mins', stock: 12 },
  { id: 2, name: 'Organic Honey 1L', price: 8500, category: 'Honey & Spreads', rating: 5.0, img: 'https://picsum.photos/seed/bee/400/400', eta: '30 mins', stock: 8 },
  { id: 3, name: 'Farm Fresh Eggs (30)', price: 6500, category: 'Dairy', rating: 4.8, img: 'https://picsum.photos/seed/eggs/400/400', eta: '40 mins', stock: 20 },
  { id: 4, name: 'Moringa Powder 200g', price: 4500, category: 'Herbs & Spices', rating: 4.7, img: 'https://picsum.photos/seed/moringa/400/400', eta: '30 mins', stock: 15 },
  { id: 5, name: 'Brown Rice 5kg', price: 12000, category: 'Grains', rating: 4.6, img: 'https://picsum.photos/seed/rice/400/400', eta: '45 mins', stock: 6 },
  { id: 6, name: 'Tiger Nuts 500g', price: 3500, category: 'Fresh Produce', rating: 4.8, img: 'https://picsum.photos/seed/nuts/400/400', eta: '30 mins', stock: 18 },
  { id: 7, name: 'Zobo Leaves 200g', price: 2500, category: 'Herbs & Spices', rating: 4.9, img: 'https://picsum.photos/seed/zobo/400/400', eta: '30 mins', stock: 25 },
  { id: 8, name: 'Shea Butter 250ml', price: 5500, category: 'Herbs & Spices', rating: 4.7, img: 'https://picsum.photos/seed/shea/400/400', eta: '35 mins', stock: 10 },
];

export const VendorStore = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [followed, setFollowed] = useState(false);
  const [cart, setCart] = useState<number[]>([]);

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchQ = p.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const addToCart = (id: number) => setCart(c => [...c, id]);
  const inCart = (id: number) => cart.includes(id);

  return (
    <div className="pt-16 pb-32">
      {/* Store Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden bg-surface-container-low">
        <img src={STORE.banner} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-10 pb-5 max-w-7xl mx-auto">
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg shrink-0">
              <img src={STORE.logo} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-white">
              <h1 className="text-xl md:text-2xl font-display font-bold">{STORE.name}</h1>
              <p className="text-white/70 text-sm hidden md:block">{STORE.tagline}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setFollowed(f => !f)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm border transition-all ${followed ? 'bg-white text-primary border-white' : 'border-white/50 text-white hover:border-white'}`}
              >
                <Heart className={`w-4 h-4 ${followed ? 'fill-primary' : ''}`} />
                <span className="hidden md:inline">{followed ? 'Following' : 'Follow'}</span>
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm border border-white/50 text-white hover:border-white transition-all">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden md:inline">Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search + Filter */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search this store..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="input-field pl-11 h-12 text-sm"
                />
              </div>
              <button className="p-3 rounded-xl border border-outline-variant bg-white hover:border-primary transition-colors">
                <Filter className="w-5 h-5 text-on-surface-variant" />
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md scale-105'
                      : 'bg-white text-on-surface-variant border border-outline-variant hover:border-primary/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-sm text-on-surface-variant font-medium">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </p>

            {/* Product Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
                <ShoppingBag className="w-12 h-12 text-outline-variant" />
                <p className="font-bold text-primary">No products found</p>
                <p className="text-sm text-on-surface-variant">Try a different search or category</p>
                <button onClick={() => { setQuery(''); setActiveCategory('All'); }} className="btn-ghost px-6 py-2 h-fit text-sm">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {filtered.map(p => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl overflow-hidden border border-outline-variant/20 shadow-ambient group hover:-translate-y-1 transition-transform"
                  >
                    <div
                      className="aspect-square relative overflow-hidden bg-surface-container-low cursor-pointer"
                      onClick={() => onNavigate('product-detail')}
                    >
                      <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors">
                        <Heart className="w-3.5 h-3.5 text-on-surface-variant" />
                      </button>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm">
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-bold text-primary">{p.eta}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="font-bold text-sm text-primary line-clamp-1">{p.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-extrabold text-primary">₦{p.price.toLocaleString()}</span>
                        <span className="flex items-center gap-1 text-xs font-bold">
                          <Star className="w-3 h-3 text-secondary fill-secondary" />{p.rating}
                        </span>
                      </div>
                      <button
                        onClick={() => inCart(p.id) ? onNavigate('checkout') : addToCart(p.id)}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                          inCart(p.id)
                            ? 'bg-secondary text-primary'
                            : 'bg-primary text-white hover:opacity-90'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        {inCart(p.id) ? 'View Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Store Status */}
            <div className="bg-white rounded-3xl p-5 border border-outline-variant/20 shadow-ambient space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-primary">Store Info</h3>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${STORE.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
                  <span className={`text-xs font-bold ${STORE.isOpen ? 'text-green-700' : 'text-red-600'}`}>
                    {STORE.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-on-surface-variant"><Truck className="w-4 h-4" /> Delivery Fee</span>
                  <span className="font-bold text-primary">₦{STORE.deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-on-surface-variant"><Clock className="w-4 h-4" /> ETA</span>
                  <span className="font-bold text-primary">{STORE.eta}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-on-surface-variant"><Star className="w-4 h-4" /> Rating</span>
                  <span className="font-bold text-primary">{STORE.rating} ★</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('checkout')}
                disabled={cart.length === 0}
                className="w-full btn-primary h-11 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                Checkout {cart.length > 0 && `(${cart.length})`}
              </button>
            </div>

            {/* Request Delivery */}
            <div className="bg-primary rounded-3xl p-5 text-white space-y-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-secondary" />
                <h3 className="font-bold">Request Delivery</h3>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">Need a custom delivery? Request a rider directly from this store.</p>
              <button className="w-full py-2.5 bg-secondary text-primary rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                Request Rider
              </button>
            </div>

            {/* Store Rating */}
            <div className="bg-surface-container-low rounded-3xl p-5 border border-outline-variant/20 space-y-3">
              <h3 className="font-bold text-primary">Store Rating</h3>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-display font-extrabold text-primary">{STORE.rating}</span>
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(STORE.rating) ? 'text-secondary fill-secondary' : 'text-outline-variant'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">{STORE.reviewCount} reviews</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('vendor-profile')}
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-outline-variant rounded-xl text-sm font-bold text-primary hover:border-primary transition-colors"
              >
                View Full Profile <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
