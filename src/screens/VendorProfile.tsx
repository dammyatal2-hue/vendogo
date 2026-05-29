import { Screen } from '../App';
import {
  MapPin, Star, MessageCircle, Instagram, ShoppingBag,
  CheckCircle2, Package, Clock, Truck, ChevronRight, Heart,
  Share2, Copy, Check, Camera, ChevronDown, ChevronUp,
  type LucideProps
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type React from 'react';
import { TrustScore } from '../components/TrustScore';
import { VerificationBadges, VendorLevelBadge } from '../components/VerificationBadges';
import { BadgeType } from '../lib/types';

const VENDOR = {
  name: 'Kilele Organics',
  tagline: 'Farm-fresh produce delivered to your door',
  location: 'Yaba, Lagos',
  rating: 4.9,
  reviewCount: 128,
  trustScore: 82,
  completedOrders: 1240,
  responseTime: '< 5 mins',
  deliverySuccessRate: 98,
  description: 'We source directly from highland farms across Nigeria. Every product is hand-picked, quality-checked, and packed with care. Serving Lagos since 2019.',
  whatsapp: '2348012345678',
  instagram: 'kileleorganics',
  tiktok: 'kileleorganics',
  banner: 'https://picsum.photos/seed/kilelebanner/1200/400',
  logo: 'https://picsum.photos/seed/kilele/200/200',
  badges: ['verified_seller', 'trusted_vendor', 'fast_delivery'] as BadgeType[],
  level: 'Top Vendor' as const,
  openHours: [
    { day: 'Mon – Fri', hours: '8:00 AM – 8:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 6:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  gallery: [
    'https://picsum.photos/seed/g1/400/400',
    'https://picsum.photos/seed/g2/400/400',
    'https://picsum.photos/seed/g3/400/400',
    'https://picsum.photos/seed/g4/400/400',
    'https://picsum.photos/seed/g5/400/400',
  ],
};

const REVIEWS = [
  { id: 1, name: 'Tunde A.', avatar: 'https://picsum.photos/seed/r1/100/100', rating: 5, comment: "Freshest avocados I've ever had. Delivery was super fast too!", delivery: 'Excellent', date: 'Apr 12' },
  { id: 2, name: 'Amaka O.', avatar: 'https://picsum.photos/seed/r2/100/100', rating: 5, comment: 'Packaging is top-notch. Will definitely order again.', delivery: 'On time', date: 'Apr 10' },
  { id: 3, name: 'Seun B.', avatar: 'https://picsum.photos/seed/r3/100/100', rating: 4, comment: 'Great quality, slight delay but vendor communicated well.', delivery: 'Good', date: 'Apr 8' },
];

const RATING_BREAKDOWN = [
  { stars: 5, count: 98 },
  { stars: 4, count: 20 },
  { stars: 3, count: 6 },
  { stars: 2, count: 2 },
  { stars: 1, count: 2 },
];

const TOP_PRODUCTS = [
  { id: 1, name: 'Premium Avocado Box', price: 15000, rating: 4.9, img: 'https://picsum.photos/seed/avo/400/400' },
  { id: 2, name: 'Organic Honey 1L', price: 8500, rating: 5.0, img: 'https://picsum.photos/seed/bee/400/400' },
  { id: 3, name: 'Farm Fresh Eggs (30)', price: 6500, rating: 4.8, img: 'https://picsum.photos/seed/eggs/400/400' },
  { id: 4, name: 'Moringa Powder 200g', price: 4500, rating: 4.7, img: 'https://picsum.photos/seed/moringa/400/400' },
];

export const VendorProfile = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [followed, setFollowed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [hoursOpen, setHoursOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const totalReviews = RATING_BREAKDOWN.reduce((s, r) => s + r.count, 0);

  return (
    <div className="pt-16 pb-32">
      {/* Sticky Quick Actions Bar */}
      <div className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${stickyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="glass-panel border-b shadow-ambient px-4 md:px-10 py-3 max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={VENDOR.logo} alt={`${VENDOR.name} logo`} className="w-8 h-8 rounded-lg object-cover" />
            <div>
              <p className="font-bold text-sm text-primary leading-none">{VENDOR.name}</p>
              <p className="text-[11px] text-on-surface-variant">{VENDOR.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFollowed(f => !f)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs border transition-all ${followed ? 'bg-primary text-white border-primary' : 'border-outline-variant text-primary'}`}
            >
              <Heart className={`w-3.5 h-3.5 ${followed ? 'fill-white' : ''}`} />
              {followed ? 'Following' : 'Follow'}
            </button>
            <button onClick={() => onNavigate('vendor-store')} className="btn-primary px-4 py-2 text-xs h-fit">
              <ShoppingBag className="w-3.5 h-3.5" /> Shop
            </button>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-52 md:h-72 w-full overflow-hidden bg-surface-container-low">
        <img src={VENDOR.banner} alt={`${VENDOR.name} banner`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white text-xs font-bold hover:bg-white/30 transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-10">
        {/* Header Card */}
        <div ref={headerRef} className="relative -mt-16 bg-white rounded-3xl p-6 md:p-8 shadow-ambient border border-outline-variant/20 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg shrink-0 -mt-14 md:-mt-16">
              <img src={VENDOR.logo} alt={`${VENDOR.name} logo`} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-display font-bold text-primary">{VENDOR.name}</h1>
                <VendorLevelBadge level={VENDOR.level} />
              </div>
              <p className="text-on-surface-variant text-sm">{VENDOR.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-on-surface-variant">
                  <MapPin className="w-4 h-4" /> {VENDOR.location}
                </span>
                <span className="flex items-center gap-1 font-bold text-primary">
                  <Star className="w-4 h-4 text-secondary fill-secondary" /> {VENDOR.rating}
                  <span className="font-normal text-on-surface-variant">({VENDOR.reviewCount} reviews)</span>
                </span>
              </div>
              <VerificationBadges badges={VENDOR.badges} />
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => setFollowed(f => !f)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${followed ? 'bg-primary text-white border-primary' : 'border-outline-variant text-primary hover:border-primary'}`}
              >
                <Heart className={`w-4 h-4 ${followed ? 'fill-white' : ''}`} />
                {followed ? 'Following' : 'Follow'}
              </button>
              <button
                onClick={() => onNavigate('vendor-store')}
                className="btn-primary px-5 py-2.5 h-fit text-sm"
              >
                <ShoppingBag className="w-4 h-4" /> Visit Store
              </button>
            </div>
          </div>
        </div>

        {/* Photo Gallery Strip */}
        <div className="mt-4">
          <button
            onClick={() => setGalleryOpen(o => !o)}
            className="flex items-center gap-2 text-sm font-bold text-primary mb-3 hover:underline"
          >
            <Camera className="w-4 h-4" />
            Photos ({VENDOR.gallery.length})
            {galleryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {galleryOpen && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {VENDOR.gallery.map((src, i) => (
                <div key={i} className="w-28 h-28 md:w-36 md:h-36 shrink-0 rounded-2xl overflow-hidden bg-surface-container-low">
                  <img src={src} alt={`${VENDOR.name} photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Trust Panel */}
            <div className="bg-white rounded-3xl p-6 border border-outline-variant/20 shadow-ambient space-y-5">
              <h2 className="text-xl font-display font-bold text-primary">Trust & Performance</h2>
              <TrustScore score={VENDOR.trustScore} />
              <div className="grid grid-cols-3 gap-4 pt-2">
                <StatPill icon={<Package className="w-4 h-4" />} label="Orders Done" value={VENDOR.completedOrders.toLocaleString()} />
                <StatPill icon={<Clock className="w-4 h-4" />} label="Response" value={VENDOR.responseTime} />
                <StatPill icon={<Truck className="w-4 h-4" />} label="Delivery Rate" value={`${VENDOR.deliverySuccessRate}%`} />
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              <h2 className="text-xl font-display font-bold text-primary">Customer Reviews</h2>

              {/* Rating Summary */}
              <div className="bg-white rounded-3xl p-6 border border-outline-variant/20 shadow-ambient flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center justify-center shrink-0">
                  <span className="text-5xl font-display font-extrabold text-primary">{VENDOR.rating}</span>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.round(VENDOR.rating) ? 'text-secondary fill-secondary' : 'text-outline-variant'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-on-surface-variant mt-1">{VENDOR.reviewCount} reviews</span>
                </div>
                <div className="flex-1 space-y-2">
                  {RATING_BREAKDOWN.map(({ stars, count }) => (
                    <div key={stars} className="flex items-center gap-3 text-xs">
                      <span className="w-4 text-right font-bold text-on-surface-variant">{stars}</span>
                      <Star className="w-3 h-3 text-secondary fill-secondary shrink-0" />
                      <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary rounded-full"
                          style={{ width: `${(count / totalReviews) * 100}%` }}
                        />
                      </div>
                      <span className="w-6 text-on-surface-variant">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {REVIEWS.map(r => (
                  <div key={r.id} className="bg-white rounded-2xl p-5 border border-outline-variant/20 shadow-ambient space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-primary">{r.name}</span>
                          <span className="text-xs text-on-surface-variant">{r.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'text-secondary fill-secondary' : 'text-outline-variant'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{r.comment}</p>
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-xs font-bold text-green-700">Delivery: {r.delivery}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-display font-bold text-primary">Top Products</h2>
                <button onClick={() => onNavigate('vendor-store')} className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {TOP_PRODUCTS.map(p => (
                  <div
                    key={p.id}
                    onClick={() => onNavigate('product-detail')}
                    className="bg-white rounded-2xl overflow-hidden border border-outline-variant/20 shadow-ambient cursor-pointer group hover:-translate-y-1 transition-transform"
                  >
                    <div className="aspect-square overflow-hidden bg-surface-container-low">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 space-y-1">
                      <p className="font-bold text-sm text-primary line-clamp-1">{p.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-extrabold text-primary">₦{p.price.toLocaleString()}</span>
                        <span className="flex items-center gap-1 text-xs font-bold">
                          <Star className="w-3 h-3 text-secondary fill-secondary" />{p.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigate('vendor-store')} className="w-full btn-primary h-12">
                <ShoppingBag className="w-4 h-4" /> Shop Full Store
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* About */}
            <div className="bg-white rounded-3xl p-6 border border-outline-variant/20 shadow-ambient space-y-4">
              <h2 className="text-lg font-display font-bold text-primary">About</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">{VENDOR.description}</p>
              <div className="space-y-3 pt-2 border-t border-outline-variant/20">
                <a
                  href={`https://wa.me/${VENDOR.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
                <div className="flex gap-3">
                  <a
                    href={`https://instagram.com/${VENDOR.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-outline-variant rounded-xl text-sm font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all"
                  >
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                  <a
                    href={`https://tiktok.com/@${VENDOR.tiktok}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-outline-variant rounded-xl text-sm font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all"
                  >
                    <span className="text-xs font-black">TT</span> TikTok
                  </a>
                </div>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-outline-variant rounded-xl text-sm font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Link Copied!' : 'Copy Profile Link'}
                </button>
              </div>
            </div>

            {/* Open Hours */}
            <div className="bg-white rounded-3xl p-6 border border-outline-variant/20 shadow-ambient space-y-3">
              <button
                onClick={() => setHoursOpen(o => !o)}
                className="w-full flex items-center justify-between font-bold text-primary"
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Open Hours
                </span>
                {hoursOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-bold text-xs">Open now · Closes 8:00 PM</span>
              </div>
              {hoursOpen && (
                <div className="space-y-2 pt-2 border-t border-outline-variant/20">
                  {VENDOR.openHours.map(({ day, hours }) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">{day}</span>
                      <span className={`font-bold ${hours === 'Closed' ? 'text-red-500' : 'text-primary'}`}>{hours}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery Info */}
            <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/20 space-y-3">
              <h3 className="font-bold text-primary">Delivery Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Delivery Fee</span>
                  <span className="font-bold text-primary">₦1,500 – ₦3,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">ETA</span>
                  <span className="font-bold text-primary">30 – 60 mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Min. Order</span>
                  <span className="font-bold text-primary">₦3,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatPill = ({ icon, label, value }: { icon: React.ReactElement<LucideProps>; label: string; value: string }) => (
  <div className="bg-surface-container-low rounded-2xl p-4 space-y-2 text-center">
    <div className="flex justify-center text-primary">{icon}</div>
    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">{label}</p>
    <p className="font-display font-extrabold text-primary text-lg leading-none">{value}</p>
  </div>
);
