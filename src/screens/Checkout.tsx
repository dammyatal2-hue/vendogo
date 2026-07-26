import { Screen } from '../App';
import { 
  ArrowLeft, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  ChevronRight, 
  Truck, 
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export const Checkout = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const placeOrder = async () => {
    setError('');
    setIsSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsSubmitting(false);
      setError('Please sign in before placing an order.');
      return;
    }

    const { data, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: user.id,
        subtotal: 15000,
        delivery_fee: 2500,
        tax: 1125,
        total: 18625,
        delivery_address: '22 Victoria Island, Apartment 4B, Lagos, Nigeria',
        payment_method: 'card',
        items: [{
          name: 'Premium Hass Avocado Box',
          quantity: 1,
          unit_price: 15000,
        }],
      })
      .select('order_number')
      .single();

    setIsSubmitting(false);
    if (orderError) {
      setError(orderError.message);
      return;
    }
    setOrderNumber(data.order_number);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="pt-24 px-4 flex justify-center items-center h-[70vh]">
         <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-ambient text-center space-y-8 border border-outline-variant/20 relative overflow-hidden">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 animate-bounce">
               <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-2">
               <h1 className="text-3xl font-display font-bold text-primary">Your order is placed!</h1>
               <p className="text-on-surface-variant font-medium">Order #{orderNumber} is being prepared. We'll notify you when it's out for delivery.</p>
            </div>
            <div className="space-y-4">
               <button onClick={() => onNavigate('customer-dashboard')} className="w-full btn-primary h-14">Track Order</button>
               <button onClick={() => onNavigate('marketplace')} className="w-full btn-ghost h-14">Continue Shopping</button>
            </div>
            <div className="absolute top-0 right-0 w-full h-1 bg-green-500"></div>
         </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-10 max-w-7xl mx-auto pb-24">
      <div className="grid lg:grid-cols-3 gap-12">
         {/* Checkout Steps */}
         <div className="lg:col-span-2 space-y-12">
            <h1 className="text-4xl font-display font-bold text-primary">Checkout</h1>
            
            {/* Delivery Address */}
            <section className="space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary font-bold">1</div>
                  <h2 className="text-2xl font-display font-bold text-primary">Delivery Address</h2>
               </div>
               <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-3xl border-2 border-primary shadow-sm space-y-4 relative">
                     <div className="flex justify-between items-start">
                        <MapPin className="w-6 h-6 text-primary" />
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Home</span>
                     </div>
                     <div>
                        <h4 className="font-bold text-lg text-primary">Ayo Balogun</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">22 Victoria Island, Apartment 4B, Lagos, Nigeria</p>
                        <p className="text-sm font-bold text-primary mt-2">+234 812 345 6789</p>
                     </div>
                  </div>
                  <button className="bg-surface-container-low border-2 border-dashed border-outline-variant rounded-3xl p-6 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-white transition-all group">
                     <Plus className="w-8 h-8 text-outline-variant group-hover:text-primary transition-colors" />
                     <span className="font-bold text-on-surface-variant group-hover:text-primary transition-colors">Add New Address</span>
                  </button>
               </div>
            </section>

            {/* Delivery Method */}
            <section className="space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary font-bold">2</div>
                  <h2 className="text-2xl font-display font-bold text-primary">Delivery Method</h2>
               </div>
               <div className="space-y-4">
                  <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-ambient flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-surface-container-low rounded-2xl flex items-center justify-center">
                           <Truck className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                           <h4 className="font-bold text-lg">Standard Delivery</h4>
                           <p className="text-sm text-on-surface-variant">Arrives in 30-45 mins</p>
                        </div>
                     </div>
                     <span className="font-display font-extrabold text-xl text-primary">₦2,500</span>
                  </div>
               </div>
            </section>

            {/* Payment Method */}
            <section className="space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary font-bold">3</div>
                  <h2 className="text-2xl font-display font-bold text-primary">Payment Method</h2>
               </div>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <PaymentCard icon={<CreditCard />} name="Card" active={true} />
                  <PaymentCard icon={<Wallet />} name="Wallet" />
                  <PaymentCard icon={<ChevronRight />} name="Transfer" />
               </div>
               <div className="mt-8">
                  <h4 className="font-bold text-sm text-on-surface-variant uppercase tracking-widest mb-4">Saved Cards</h4>
                  <div className="flex items-center justify-between p-6 bg-white rounded-3xl border-2 border-primary shadow-sm group cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-primary rounded text-white flex items-center justify-center text-[10px] font-bold italic">VISA</div>
                        <div>
                           <p className="font-bold">Ayo Balogun</p>
                           <p className="text-sm text-on-surface-variant">•••• 4242</p>
                        </div>
                     </div>
                     <div className="w-6 h-6 rounded-full border-4 border-primary bg-white ring-2 ring-primary/20"></div>
                  </div>
               </div>
            </section>
         </div>

         {/* Order Summary */}
         <div className="space-y-8">
            <div className="bg-white rounded-[40px] p-10 border border-outline-variant/30 shadow-ambient space-y-8 sticky top-24">
               <h3 className="text-2xl font-display font-bold text-primary flex items-center gap-3">
                  Order Summary
                  <span className="bg-surface-container-low text-primary text-xs px-2 py-1 rounded font-bold">3 Items</span>
               </h3>
               
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <div className="w-16 h-16 rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm bg-surface-container-low">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxv39I6oN9X02v3q1e9R6o9T9pP1N-z_3o6_N6r6X1rC_4v5y1y2z3a4b5c6d7e8f9" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-sm line-clamp-1">Premium Hass Avocado Box</h4>
                        <p className="text-xs text-on-surface-variant">Qty: 1</p>
                        <p className="font-bold text-primary mt-1">₦15,000</p>
                     </div>
                  </div>
               </div>

               <div className="pt-6 border-t border-outline-variant/30 space-y-4">
                  <div className="relative">
                     <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                     <input 
                        type="text" 
                        placeholder="Promo Code" 
                        className="w-full bg-surface-container-low border border-transparent focus:border-primary focus:bg-white px-10 py-4 rounded-xl text-sm transition-all outline-none" 
                     />
                     <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary font-bold text-sm hover:underline px-2">Apply</button>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-on-surface-variant">
                        <span>Subtotal</span>
                        <span className="font-bold text-on-surface">₦15,000</span>
                     </div>
                     <div className="flex justify-between text-on-surface-variant">
                        <span>Delivery Fee</span>
                        <span className="font-bold text-on-surface">₦2,500</span>
                     </div>
                     <div className="flex justify-between text-on-surface-variant">
                        <span>Tax (VAT)</span>
                        <span className="font-bold text-on-surface">₦1,125</span>
                     </div>
                     <div className="pt-4 flex justify-between items-center">
                        <span className="text-xl font-display font-bold text-primary">Total Pay</span>
                        <span className="text-3xl font-display font-extrabold text-primary">₦18,625</span>
                     </div>
                  </div>
               </div>

               {error && <p role="alert" className="text-sm text-red-600 bg-red-50 rounded-xl p-3">{error}</p>}
               <button disabled={isSubmitting} onClick={placeOrder} className="w-full btn-primary h-16 shadow-lg shadow-primary/20 text-lg disabled:opacity-50">
                  {isSubmitting ? 'Placing Order…' : 'Place Order'}
                  <ShieldCheck className="w-6 h-6 ml-2" />
               </button>
               
               <p className="text-center text-[10px] text-on-surface-variant font-medium leading-relaxed px-4">
                  By placing your order, you agree to VendoGo's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

const PaymentCard = ({ icon, name, active }: { icon: any, name: string, active?: boolean }) => (
  <div className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 cursor-pointer transition-all ${
    active ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant/30 bg-white hover:border-primary/40'
  }`}>
     <div className={`${active ? 'text-primary' : 'text-on-surface-variant'}`}>{icon && <div className="scale-125">{icon}</div>}</div>
     <span className={`font-bold text-sm ${active ? 'text-primary' : 'text-on-surface-variant'}`}>{name}</span>
  </div>
);
