"use client";

import React, { useState, createContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { Product, CartItem } from '../types';

interface AppContextType {
  handleAddToCart: (product: Product, qty?: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Checkout & tracking states
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'processing' | 'success'>('cart');
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    shippingMethod: 'standard'
  });
  
  const [discountCode, setDiscountCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [discountError, setDiscountError] = useState<string>('');
  
  const [simulatedOrderStatus, setSimulatedOrderStatus] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>('');
  const [whatsappShareUrl, setWhatsappShareUrl] = useState<string>('');
  const [completedOrderTotal, setCompletedOrderTotal] = useState<number>(0);

  // Cart helper statistics math
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Methods
  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, { product, quantity: qty }];
    });
    setCheckoutStep('cart');
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.product.id === productId);
      if (idx === -1) return prev;
      const nextQty = prev[idx].quantity + delta;
      if (nextQty <= 0) {
        return prev.filter(item => item.product.id !== productId);
      }
      const next = [...prev];
      next[idx] = { ...next[idx], quantity: nextQty };
      return next;
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Simulated gateway transition submit
  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate final pricing parameters before cart gets emptied
    const cartSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const discountAmount = appliedDiscount ? (cartSubtotal * appliedDiscount.percent) / 100 : 0;
    const shippingCost = cartSubtotal === 0 ? 0 : (cartSubtotal >= 1000 ? 0 : (shippingDetails.shippingMethod === 'express' ? 150 : 50));
    const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);
    const generatedId = "VTS-" + Math.floor(100000 + Math.random() * 900000);
    
    // Construct professional, high-impact order text
    const itemsText = cart.map(item => `• *${item.quantity}x* ${item.product.name} (${item.product.weight}g) - ₹${(item.product.price * item.quantity).toFixed(2)}`).join('\n');
    const discountText = appliedDiscount ? `\n- *Discount (${appliedDiscount.code}):* -₹${discountAmount.toFixed(2)}` : '';
    const deliveryType = shippingDetails.shippingMethod === 'express' ? 'Express Air Link (1-2 days)' : 'Standard ground (3-5 days)';
    
    const whatsappMsg = `*🍲 NEW ORDER FROM VAATSALYA FOODS 🍲*\n*Order ID:* ${generatedId}\n\n👤 *CUSTOMER DETAILS:*\n- *Name:* ${shippingDetails.name}\n- *Phone:* ${shippingDetails.phone}\n- *Email:* ${shippingDetails.email}\n- *Address:* ${shippingDetails.address}, ${shippingDetails.city} - ${shippingDetails.zip}\n\n📋 *ORDERED ITEMS:*\n${itemsText}\n\n💰 *PAYMENT SUMMARY:*\n- *Subtotal:* ₹${cartSubtotal.toFixed(2)}${discountText}\n- *Catering Speed Delivery:* ${shippingCost === 0 ? 'FREE Delivery' : '₹' + shippingCost.toFixed(2)}\n- *ESTIMATED TOTAL:* ₹${cartGrandTotal.toFixed(2)}\n\n🚚 *Shipping Method:* ${deliveryType}`;

    const whatsappUrl = `https://wa.me/919311501426?text=${encodeURIComponent(whatsappMsg)}`;
    setWhatsappShareUrl(whatsappUrl);
    setCompletedOrderTotal(cartGrandTotal);
    
    try {
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.warn("Popup block active. Success screen will show direct action CTA.", err);
    }

    setCheckoutStep('processing');

    setTimeout(() => {
      setOrderId(generatedId);
      setCheckoutStep('success');
      setCart([]); 

      let step = 0;
      setSimulatedOrderStatus(0);
      const interval = setInterval(() => {
        step += 1;
        if (step <= 3) {
          setSimulatedOrderStatus(step);
        } else {
          clearInterval(interval);
        }
      }, 5000);
    }, 1500);
  };

  return (
    <AppContext.Provider value={{ handleAddToCart, selectedCategory, setSelectedCategory }}>
      <div className="min-h-screen bg-warm-cream text-navy font-sans relative" id="app_root">
        <Navbar 
          totalCartItems={totalCartItems}
          setIsCartOpen={setIsCartOpen}
          setCheckoutStep={setCheckoutStep}
        />

        <main className="min-h-[75vh]" id="page_body_viewport">
          {children}
        </main>

        <CartDrawer 
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          cart={cart}
          handleUpdateQuantity={handleUpdateQuantity}
          handleRemoveFromCart={handleRemoveFromCart}
          checkoutStep={checkoutStep}
          setCheckoutStep={setCheckoutStep}
          shippingDetails={shippingDetails}
          setShippingDetails={setShippingDetails}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          appliedDiscount={appliedDiscount}
          setAppliedDiscount={setAppliedDiscount}
          discountError={discountError}
          setDiscountError={setDiscountError}
          orderId={orderId}
          simulatedOrderStatus={simulatedOrderStatus}
          handleSimulatedSubmit={handleSimulatedSubmit}
          whatsappShareUrl={whatsappShareUrl}
          completedOrderTotal={completedOrderTotal}
        />

        <Footer />
      </div>
    </AppContext.Provider>
  );
}
