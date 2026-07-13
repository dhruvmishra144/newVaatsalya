import React, { useMemo } from 'react';
import { 
  ShoppingBag, X, ArrowRight, Minus, Plus, Trash2, 
  Shield, CheckCircle 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cart: CartItem[];
  handleUpdateQuantity: (productId: string, delta: number) => void;
  handleRemoveFromCart: (productId: string) => void;
  checkoutStep: 'cart' | 'details' | 'processing' | 'success';
  setCheckoutStep: (step: 'cart' | 'details' | 'processing' | 'success') => void;
  shippingDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    shippingMethod: string;
  };
  setShippingDetails: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    shippingMethod: string;
  }>>;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  appliedDiscount: { code: string; percent: number } | null;
  setAppliedDiscount: (discount: { code: string; percent: number } | null) => void;
  discountError: string;
  setDiscountError: (err: string) => void;
  orderId: string;
  simulatedOrderStatus: number;
  handleSimulatedSubmit: (e: React.FormEvent) => void;
  whatsappShareUrl: string;
  completedOrderTotal: number;
}

export default function CartDrawer({
  isCartOpen,
  setIsCartOpen,
  cart,
  handleUpdateQuantity,
  handleRemoveFromCart,
  checkoutStep,
  setCheckoutStep,
  shippingDetails,
  setShippingDetails,
  discountCode,
  setDiscountCode,
  appliedDiscount,
  setAppliedDiscount,
  discountError,
  setDiscountError,
  orderId,
  simulatedOrderStatus,
  handleSimulatedSubmit,
  whatsappShareUrl,
  completedOrderTotal
}: CartDrawerProps) {

  // Cart subtotal mathematics
  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedDiscount) return 0;
    return (cartSubtotal * appliedDiscount.percent) / 100;
  }, [cartSubtotal, appliedDiscount]);

  const shippingCost = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    if (cartSubtotal >= 1000) return 0; // Free shipping above ₹1000
    return shippingDetails.shippingMethod === 'express' ? 150 : 50;
  }, [cartSubtotal, shippingDetails.shippingMethod]);

  const cartGrandTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - discountAmount + shippingCost);
  }, [cartSubtotal, discountAmount, shippingCost]);

  const totalCartItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Apply visual coupon codes
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setDiscountError('');
    const code = discountCode.trim().toUpperCase();
    if (code === 'MOMSLOVE') {
      setAppliedDiscount({ code: 'MOMSLOVE (15% OFF)', percent: 15 });
    } else if (code === 'STUDENT20' || code === 'TRAVEL20') {
      setAppliedDiscount({ code: `${code} (20% OFF)`, percent: 20 });
    } else if (code === 'WELCOME10') {
      setAppliedDiscount({ code: 'WELCOME10 (10% OFF)', percent: 10 });
    } else {
      setDiscountError('Invalid coupon. Try WELCOME10, MOMSLOVE or STUDENT20');
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-xs" id="cart_overlay_wrapper">
      
      {/* Dark overlay backdrop mask */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-navy/75 backdrop-blur-sm transition-opacity"
        id="cart_backdrop"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10" id="cart_drawer_panel">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between" id="cart_body_container">
          
          {/* 1. Header block */}
          <div className="px-6 py-4.5 bg-warm-cream border-b border-warm-soft flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-accent-orange" />
              <h2 className="text-base sm:text-lg font-serif font-black text-navy">Vaatsalya Express Basket</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1 hover:bg-slate-100 rounded-full text-slate-500 hover:text-navy transition-all cursor-pointer border border-transparent hover:border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Steps indicator bar */}
          {checkoutStep !== 'cart' && checkoutStep !== 'success' && (
            <div className="bg-[#FAF5EB] px-6 py-2 border-b border-warm-soft flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <button 
                onClick={() => setCheckoutStep('cart')}
                className="hover:text-accent-orange cursor-pointer"
              >
                1. Cart ({totalCartItems})
              </button>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <span className={checkoutStep === 'details' ? 'text-navy font-extrabold' : 'text-slate-400'}>2. Shipping details</span>
              {checkoutStep === 'processing' && (
                <>
                  <ArrowRight className="w-3 h-3 text-slate-400 animate-pulse" />
                  <span className="text-emerald-700 animate-pulse">3. Secure Checkout</span>
                </>
              )}
            </div>
          )}

          {/* 2. Main content area scroll */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* STAGE A: Empty state */}
            {cart.length === 0 && checkoutStep === 'cart' && (
              <div className="text-center py-16 flex flex-col items-center justify-center space-y-4">
                <span className="text-5xl pt-6 block">🥣</span>
                <h3 className="font-serif font-black text-xl text-navy">Empty Gourmet Basket</h3>
                <p className="text-xs text-slate-400 font-semibold max-w-xs leading-relaxed">
                  You haven't loaded any mouthwatering home-cooked meals yet. Explore our traveler items & breakfast menus!
                </p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-navy text-accent-orange text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#062444] cursor-pointer shadow-sm shadow-blue-100"
                >
                  Browse Culinary Menu
                </button>
              </div>
            )}

            {/* STAGE B: Cart items list */}
            {checkoutStep === 'cart' && cart.length > 0 && (
              <div className="space-y-4 font-semibold" id="cart_line_items">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block mb-2">Itemized List ({totalCartItems})</span>
                {cart.map((item) => (
                  <div 
                    key={item.product.id} 
                    className="flex items-center gap-3 bg-warm-cream/40 p-3 rounded-2xl border border-warm-soft hover:bg-warm-cream/80 transition-colors shadow-xs"
                  >
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-16 h-16 rounded-xl object-cover border border-slate-100 select-none shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-serif font-black text-navy truncate leading-tight">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-bold">
                        Dry package {item.product.weight}g
                      </p>
                      
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-xs font-black text-navy">
                          ₹{item.product.price} <span className="text-slate-400 font-medium font-sans">x {item.quantity}</span>
                        </span>
                        
                        {/* Quantity actions */}
                        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-0.5 shadow-xs">
                          <button 
                            onClick={() => handleUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black px-1.5">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleRemoveFromCart(item.product.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* STAGE C: Delivery Info Address Fields Form */}
            {checkoutStep === 'details' && (
              <form onSubmit={handleSimulatedSubmit} className="space-y-4 font-semibold text-xs" id="shipping_details_form">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mb-2">Delivery Coordinates</span>
                
                <div className="space-y-1">
                  <label className="text-slate-500 block font-bold">Recipient Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="E.g. Siddharth Patel"
                    value={shippingDetails.name}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                    className="w-full border-2 border-warm-soft p-3 rounded-xl focus:outline-none focus:border-navy"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 block font-bold">Student/Personal Email *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="student.siddharth@gmail.com"
                    value={shippingDetails.email}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                    className="w-full border-2 border-warm-soft p-3 rounded-xl focus:outline-none focus:border-navy"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 block font-bold">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    pattern="[0-9+ \-]{10,15}"
                    title="Please enter a valid 10-15 digit phone number"
                    placeholder="+91 99999 88888"
                    value={shippingDetails.phone}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                    className="w-full border-2 border-warm-soft p-3 rounded-xl focus:outline-none focus:border-navy"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 block font-bold">Complete Shipping Address *</label>
                  <textarea 
                    required
                    rows={2}
                    placeholder="Hostel Block C, Suite 305, IIT Mumbai Campus"
                    value={shippingDetails.address}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                    className="w-full border-2 border-warm-soft p-3 rounded-xl focus:outline-none focus:border-navy font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-slate-500 block font-bold">City *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Mumbai"
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                      className="w-full border-2 border-warm-soft p-3 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 block font-bold">Postal Code *</label>
                    <input 
                      type="text" 
                      required
                      pattern="[0-9a-zA-Z\- ]{4,10}"
                      title="Please enter a valid postal code (4-10 alphanumeric characters)"
                      placeholder="400076"
                      value={shippingDetails.zip}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, zip: e.target.value })}
                      className="w-full border-2 border-warm-soft p-3 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 block font-bold">Shipping Speed Method</label>
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setShippingDetails({ ...shippingDetails, shippingMethod: 'standard' })}
                      className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        shippingDetails.shippingMethod === 'standard' 
                          ? 'border-navy bg-warm-cream text-navy' 
                          : 'border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="font-extrabold block text-xs">Standard ground</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{cartSubtotal >= 1000 ? 'FREE' : '₹50'} • 3-5 days</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShippingDetails({ ...shippingDetails, shippingMethod: 'express' })}
                      className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        shippingDetails.shippingMethod === 'express' 
                          ? 'border-navy bg-warm-cream text-navy' 
                          : 'border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className="font-extrabold block text-xs">Express Air Link</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{cartSubtotal >= 1000 ? 'FREE' : '₹150'} • 1-2 days</span>
                    </button>
                  </div>
                </div>

                {/* Secret Submit trigger */}
                <button type="submit" id="simulated_checkout_submit" className="hidden" />
              </form>
            )}

            {/* STAGE D: Payment Progress Loader */}
            {checkoutStep === 'processing' && (
              <div className="text-center py-16 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-navy animate-spin mb-2" />
                <h3 className="font-serif font-black text-lg text-navy">Processing secure order...</h3>
                <p className="text-xs text-slate-400 font-bold max-w-xs leading-relaxed">
                  Authenticating homestyle nutrition request. Connecting dispatch and packing queue system...
                </p>
                <div className="inline-flex items-center gap-1.5 p-1.5 px-3 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-wider text-slate-500">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" /> AES-256 Encrypted Tunnel
                </div>
              </div>
            )}

            {/* STAGE E: Receipt success & Dynamic simulated Live Shipment Stepper */}
            {checkoutStep === 'success' && (
              <div className="space-y-6 animate-fade-in" id="receipt_checkout_success">
                
                <div className="text-center py-4 flex flex-col items-center justify-center space-y-1">
                  <span className="w-12 h-12 rounded-full bg-emerald-100 text-[#10B981] flex items-center justify-center shadow-md shadow-emerald-200 mb-2 font-black text-xl">
                    ✓
                  </span>
                  <h3 className="font-serif font-black text-2xl text-navy">Order Earmarked!</h3>
                  <p className="text-xs text-slate-400 font-bold">
                    Moms' kitchen works are now entering the drying cycle.
                  </p>
                </div>

                {/* WhatsApp Dispatch Success Banner Alert */}
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4.5 space-y-3.5 text-center shadow-xs" id="whatsapp_dispatch_success_toast">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-black text-xs uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                    💬 Dispatch Confirmed!
                  </div>
                  <p className="text-[11.5px] text-emerald-700 font-bold leading-relaxed">
                    A WhatsApp message containing all of your customer details, quantities, and the exact total of <span className="font-black text-navy">₹{(completedOrderTotal || cartGrandTotal).toFixed(2)}</span> has been automatically prepared and sent to Milli (<span className="font-extrabold underline decoration-emerald-500/20">+91 9311501426</span>).
                  </p>
                  {whatsappShareUrl && (
                    <a 
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md w-full cursor-pointer"
                    >
                      💬 If WhatsApp did not open, click here
                    </a>
                  )}
                </div>

                {/* Receipt Card */}
                <div className="bg-[#FAF5EB]/50 border border-warm-soft p-4 rounded-2xl text-xs font-semibold text-navy leading-relaxed space-y-2">
                  <div className="flex justify-between border-b border-warm-soft pb-2 font-black text-navy">
                    <span>Transaction Bill ID:</span>
                    <span className="text-navy font-mono">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Recipient:</span>
                    <span>{shippingDetails.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 max-w-[280px] truncate font-bold">
                    <span>Address:</span>
                    <span>{shippingDetails.address}, {shippingDetails.city}</span>
                  </div>
                  <div className="flex justify-between border-t border-warm-soft pt-2 font-black text-sm">
                    <span>Amount Captured:</span>
                    <span className="text-navy font-mono">₹{(completedOrderTotal || cartGrandTotal).toFixed(2)}</span>
                  </div>
                </div>

                {/* Simulated Shipment live progress card */}
                <div className="bg-[#FAF5EB]/30 border border-warm-soft p-4 rounded-2xl space-y-4">
                  <h4 className="font-serif font-black text-xs text-navy uppercase tracking-wider text-center border-b border-warm-soft pb-2">
                    🚚 Live packaging status
                  </h4>
                  
                  <div className="relative pl-5 space-y-5 border-l-2 border-slate-200 text-xs">
                    
                    {/* CONFIRMED */}
                    <div className="relative">
                      <span className={`absolute -left-7.5 top-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        simulatedOrderStatus >= 0 ? 'bg-emerald-600 text-white' : 'bg-slate-200'
                      }`}>
                        ✓
                      </span>
                      <h5 className={`font-bold ${simulatedOrderStatus >= 0 ? 'text-navy' : 'text-slate-400'}`}>
                        Order Received & Cow Ghee Earmarked
                      </h5>
                      <p className="text-[9.5px] text-slate-400 leading-tight">Ingredients selected from local Pune organic farms.</p>
                    </div>

                    {/* COOKING AND DEHYDRATING */}
                    <div className="relative">
                      <span className={`absolute -left-7.5 top-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        simulatedOrderStatus >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200'
                      }`}>
                        {simulatedOrderStatus === 0 ? '⏳' : simulatedOrderStatus >= 1 ? '✓' : ''}
                      </span>
                      <h5 className={`font-bold ${simulatedOrderStatus >= 1 ? 'text-navy' : 'text-slate-400'}`}>
                        Homestyle Mom Cooking & Vacuum Drying
                      </h5>
                      <p className="text-[9.5px] text-slate-400 leading-tight">Gentle dehydration extracting water below 0.5% moisture.</p>
                    </div>

                    {/* NITROGEN SEAL COURIER DISPATCH */}
                    <div className="relative">
                      <span className={`absolute -left-7.5 top-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        simulatedOrderStatus >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200'
                      }`}>
                        {simulatedOrderStatus === 1 ? '⏳' : simulatedOrderStatus >= 2 ? '✓' : ''}
                      </span>
                      <h5 className={`font-bold ${simulatedOrderStatus >= 2 ? 'text-navy' : 'text-slate-400'}`}>
                        Nitrogen Purging & Courier Dispatch
                      </h5>
                      <p className="text-[9.5px] text-slate-400 leading-tight">Heat seal zipper pouches loaded into express air transit.</p>
                    </div>

                    {/* AIRPORT HUB PREP FOR CUSTOMS */}
                    <div className="relative">
                      <span className={`absolute -left-7.5 top-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        simulatedOrderStatus >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200'
                      }`}>
                        {simulatedOrderStatus === 2 ? '⏳' : simulatedOrderStatus >= 3 ? '🎉' : ''}
                      </span>
                      <h5 className={`font-bold ${simulatedOrderStatus >= 3 ? 'text-navy' : 'text-slate-400'}`}>
                        Arrival at destination customs / suitcase ready
                      </h5>
                      <p className="text-[9.5px] text-slate-400 leading-tight">Enjoy gourmet homestyle nutrients in 5 mins anytime!</p>
                    </div>

                  </div>

                  {simulatedOrderStatus < 3 && (
                    <div className="text-[9px] text-accent-orange text-center font-black animate-pulse">
                      🔄 Packaging pipeline updating automatically...
                    </div>
                  )}

                </div>

                {whatsappShareUrl && (
                  <div className="space-y-2.5 pt-2" id="whatsapp_dispatch_section">
                    <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-2">
                      <p className="text-[10px] text-emerald-800 font-extrabold leading-normal">
                        To double-verify your delivery slots and finalize active preparation, click below to send this summary to Milli on WhatsApp:
                      </p>
                      <a 
                        href={whatsappShareUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-green-500/10 flex items-center justify-center gap-2 cursor-pointer select-none"
                      >
                        💬 Confirm Order on WhatsApp
                      </a>
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => { setCheckoutStep('cart'); setIsCartOpen(false); }}
                  className="w-full py-3 bg-navy text-accent-orange font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#062444] text-center block cursor-pointer transition-colors shadow-xs"
                >
                  Back to Culinary Menu
                </button>

              </div>
            )}

          </div>

          {/* 3. Sticky footer calculations block */}
          {checkoutStep !== 'success' && cart.length > 0 && (
            <div className="px-6 py-4 bg-warm-soft border-t border-slate-200 space-y-3 shadow-inner">
              
              {/* Coupon Form input */}
              {checkoutStep === 'cart' && (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Coupon code (E.g. WELCOME10)"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-navy text-navy font-bold"
                  />
                  <button 
                    type="submit" 
                    className="p-2 py-1.5 bg-navy hover:bg-navy-light text-white rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer select-none"
                  >
                    Apply code
                  </button>
                </form>
              )}

              {discountError && (
                <div className="text-red-600 text-[10px] font-bold bg-red-50 p-1.5 rounded-lg border border-red-100 text-center">
                  ✕ {discountError}
                </div>
              )}

              {appliedDiscount && (
                <div className="text-green-700 text-[10px] font-black bg-emerald-50/50 p-1.5 rounded-lg border border-emerald-100 text-center flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Coupon Activated: {appliedDiscount.code}
                </div>
              )}

              {/* Subtotal mathematics */}
              <div className="space-y-1.5 font-semibold text-slate-500 leading-none">
                <div className="flex justify-between">
                  <span>Cart Items Subtotal:</span>
                  <span className="text-navy font-black">₹{cartSubtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount code coupon:</span>
                    <span className="font-black">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Catering Speed Delivery:</span>
                  <span className="text-navy font-black">
                    {shippingCost === 0 ? 'FREE Delivery' : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black text-navy">
                  <span>Estimate Total Charge:</span>
                  <span className="text-navy font-mono font-black">₹{cartGrandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Secure Checkout trigger */}
              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('details')}
                  className="w-full py-3.5 bg-accent-orange hover:bg-accent-orange-hover text-navy font-black text-xs uppercase tracking-widest rounded-xl transition-colors shadow-md shadow-amber-100 text-center flex items-center justify-center gap-1.5 pointer-events-auto cursor-pointer select-none"
                >
                  Proceed to Secure Checkout <ArrowRight className="w-4 h-4 animate-pulse" />
                </button>
              ) : checkoutStep === 'details' ? (
                <button
                  onClick={() => {
                    const form = document.getElementById('shipping_details_form') as HTMLFormElement;
                    if (form) form.requestSubmit();
                  }}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/15"
                >
                  Confirm & Send Order via WhatsApp 💬
                </button>
              ) : null}

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
