import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Bell, 
  ArrowLeft, 
  Search, 
  ShoppingBag, 
  User, 
  Home
} from 'lucide-react';

// --- Screen Imports ---
import { Landing } from './screens/Landing';
import { Marketplace } from './screens/Marketplace';
import { ProductDetail } from './screens/ProductDetail';
import { VendorDashboard } from './screens/VendorDashboard';
import { RiderDashboard } from './screens/RiderDashboard';
import { CustomerDashboard } from './screens/CustomerDashboard';
import { Checkout } from './screens/Checkout';
import { VendorOnboarding } from './screens/VendorOnboarding';
import { RiderOnboarding } from './screens/RiderOnboarding';
import { ClientOnboarding } from './screens/ClientOnboarding';
import { VendorProfile } from './screens/VendorProfile';
import { VendorStore } from './screens/VendorStore';
import { Login } from './screens/Login';

// --- Types ---
export type Screen = 
  | 'landing' 
  | 'marketplace' 
  | 'vendor-dashboard' 
  | 'rider-dashboard' 
  | 'customer-dashboard'
  | 'product-detail'
  | 'checkout'
  | 'vendor-onboarding'
  | 'rider-onboarding'
  | 'client-onboarding'
  | 'vendor-profile'
  | 'vendor-store'
  | 'login';

// --- Global Components ---
const TopAppBar = ({ title, showBack, onBack, onNavigate }: { title?: string, showBack?: boolean, onBack?: () => void, onNavigate: (s: Screen) => void }) => (
  <header className="fixed top-0 w-full z-50 glass-panel border-b shadow-ambient h-16">
    <div className="flex justify-between items-center px-4 md:px-10 h-full max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        {showBack ? (
          <button onClick={onBack} className="p-2 hover:bg-surface-container-low rounded-full active:scale-95 transition-all outline-none">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
        ) : (
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-xl text-primary md:text-2xl">VendoGo</span>
          </button>
        )}
        {title && <h1 className="font-display font-bold text-lg md:text-2xl text-primary">{title}</h1>}
      </div>
      
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-8 mr-4">
          <button onClick={() => onNavigate('marketplace')} className="text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer">Marketplace</button>
          <button onClick={() => onNavigate('vendor-dashboard')} className="text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer">Vendors</button>
          <button onClick={() => onNavigate('rider-dashboard')} className="text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer">Fleet</button>
        </nav>
        <button className="relative p-2 hover:bg-surface-container-low rounded-full transition-colors hidden md:block">
          <Bell className="w-6 h-6 text-primary" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
        </button>
        <button onClick={() => onNavigate('customer-dashboard')} className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center border border-outline-variant/30 md:w-10 md:h-10 cursor-pointer overflow-hidden shadow-sm">
           <img src="https://picsum.photos/seed/customer/100/100" className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  </header>
);

const BottomNavBar = ({ active, onNavigate }: { active: Screen, onNavigate: (s: Screen) => void }) => (
  <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] glass-panel border border-white/20 shadow-2xl z-50 rounded-2xl overflow-hidden backdrop-blur-2xl">
    <div className="flex justify-around items-center py-4 px-4 bg-white/40">
      <BottomNavItem 
        icon={<Home />} 
        label="Home" 
        active={active === 'landing'} 
        onClick={() => onNavigate('landing')} 
      />
      <BottomNavItem 
        icon={<Search />} 
        label="Shop" 
        active={active === 'marketplace' || active === 'product-detail'} 
        onClick={() => onNavigate('marketplace')} 
      />
      <BottomNavItem 
        icon={<ShoppingBag />} 
        label="Cart" 
        active={active === 'checkout'} 
        onClick={() => onNavigate('checkout')} 
      />
      <BottomNavItem 
        icon={<User />} 
        label="Me" 
        active={active === 'customer-dashboard'} 
        onClick={() => onNavigate('customer-dashboard')} 
      />
    </div>
  </nav>
);

const BottomNavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center gap-1 transition-all relative ${
      active ? 'text-primary scale-110' : 'text-on-surface-variant opacity-60'
    }`}
  >
    <div className="p-1">{icon}</div>
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    {active && <motion.div layoutId="nav-dot" className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />}
  </button>
);

// --- Main App ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [history, setHistory] = useState<Screen[]>([]);

  const navigate = (screen: Screen) => {
    setHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(prevHist => prevHist.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('landing');
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-secondary selection:text-primary">
      <TopAppBar 
        onNavigate={navigate} 
        showBack={currentScreen !== 'landing'} 
        onBack={goBack}
        title={currentScreen === 'vendor-dashboard' ? 'Vendor Terminal' : 
               currentScreen === 'rider-dashboard' ? 'Rider Ops' : 
               currentScreen === 'vendor-onboarding' ? 'Vendor Portal' :
               currentScreen === 'rider-onboarding' ? 'Rider Portal' :
               currentScreen === 'client-onboarding' ? 'Get Started' :
               currentScreen === 'vendor-profile' ? 'Vendor Profile' :
               currentScreen === 'vendor-store' ? 'Store' : undefined}
      />
      
      <main className="min-h-screen pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentScreen === 'landing' && <Landing onNavigate={navigate} />}
            {currentScreen === 'marketplace' && <Marketplace onNavigate={navigate} />}
            {currentScreen === 'product-detail' && <ProductDetail onNavigate={navigate} />}
            {currentScreen === 'vendor-dashboard' && <VendorDashboard onNavigate={navigate} />}
            {currentScreen === 'rider-dashboard' && <RiderDashboard onNavigate={navigate} />}
            {currentScreen === 'customer-dashboard' && <CustomerDashboard onNavigate={navigate} />}
            {currentScreen === 'checkout' && <Checkout onNavigate={navigate} />}
            {currentScreen === 'vendor-onboarding' && <VendorOnboarding onNavigate={navigate} />}
            {currentScreen === 'rider-onboarding' && <RiderOnboarding onNavigate={navigate} />}
            {currentScreen === 'client-onboarding' && <ClientOnboarding onNavigate={navigate} />}
            {currentScreen === 'vendor-profile' && <VendorProfile onNavigate={navigate} />}
            {currentScreen === 'vendor-store' && <VendorStore onNavigate={navigate} />}
            {currentScreen === 'login' && <Login onNavigate={navigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNavBar active={currentScreen} onNavigate={navigate} />
    </div>
  );
}
