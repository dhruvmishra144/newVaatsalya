"use client";

import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './logo';

interface NavbarProps {
  totalCartItems: number;
  setIsCartOpen: (open: boolean) => void;
  setCheckoutStep: (step: 'cart' | 'details' | 'processing' | 'success') => void;
}

export default function Navbar({
  totalCartItems,
  setIsCartOpen,
  setCheckoutStep
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'about-us', path: '/about', label: 'About Us' },
    { id: 'menu', path: '/products', label: 'Our Menu' },
    { id: 'contact-us', path: '/contact', label: 'Contact Us' }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-warm-soft shadow-sm" id="nav_container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo & Brand title */}
          <Link 
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 group text-left cursor-pointer" 
            id="brand_logo_link"
          >
            <Logo className="h-9 sm:h-11 w-auto group-hover:scale-[1.02] transition-transform duration-300" theme="light" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 font-bold text-xs sm:text-sm" id="nav_links_desktop">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`py-1.5 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-navy/5 text-navy border-b-2 border-accent-orange rounded-b-none' 
                      : 'text-navy-light hover:text-navy'
                  }`}
                  id={`nav_tab_${item.id}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Shopping Cart Indicator Icon & Hamburger UI */}
          <div className="flex items-center gap-3" id="nav_actions">
            
            <button 
              onClick={() => { setIsCartOpen(true); setCheckoutStep('cart'); }}
              className="relative p-2.5 bg-warm-soft/70 hover:bg-navy hover:text-white text-navy rounded-2xl transition-all flex items-center justify-center border border-[#E2E8F0] cursor-pointer shadow-xs"
              name="Shopping Cart Button"
              id="shopping_cart_trigger"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-navy text-accent-orange text-[10px] font-black min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 bg-warm-soft/70 hover:bg-navy hover:text-white text-navy rounded-2xl transition-all flex items-center justify-center border border-[#E2E8F0] cursor-pointer shadow-xs"
              aria-label="Toggle Menu"
              id="mobile_menu_toggle"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Navigation Menu for Mobile View Only */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#FAF7EE] text-navy z-[999] flex flex-col justify-between p-6 animate-fade-in overflow-y-auto" id="mobile_fullscreen_menu">
          
          {/* Header row in full-screen overlay */}
          <div className="flex items-center justify-between pb-4 border-b border-navy/10">
            <div className="flex items-center gap-2">
              <Logo className="h-9 w-auto" theme="light" />
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-white/25 rounded-full text-navy hover:bg-navy hover:text-white transition-all cursor-pointer border border-navy/10"
              aria-label="Close Mobile Menu"
              id="mobile_fullscreen_close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Navigation Links Area */}
          <div className="my-auto py-8">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] text-navy/60 uppercase font-black tracking-widest mb-4">
                ✦ Select Journey
              </p>
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full text-left py-4 text-xl font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-between border-b border-navy/10 ${
                      isActive 
                        ? 'text-navy font-serif font-black border-b-2 border-accent-orange' 
                        : 'text-navy/70 hover:text-navy'
                    }`}
                    id={`mobile_fullscreen_item_${item.id}`}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="text-navy text-xs font-black bg-accent-orange px-2.5 py-1 rounded-full uppercase tracking-widest shadow-2xs">
                        Active
                      </span>
                    ) : (
                      <span className="text-navy/20 text-xs font-black">✦</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer of full-screen menu with contact coordinates */}
          <div className="border-t border-navy/10 pt-6 mt-auto space-y-4 text-center">
            <div className="space-y-1">
              <p className="text-[9px] font-black tracking-widest text-navy uppercase">
                Vaatsalya Indian Spice Journey
              </p>
              <p className="text-xs text-navy/80 font-semibold leading-relaxed">
                Nourishing lives, travel groups, and homes with authentic regional recipes.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-bold">
              <a 
                href="tel:+919311501426" 
                className="py-3 px-4 bg-accent-orange text-navy rounded-xl hover:bg-navy hover:text-white transition-all block text-center shadow-xs"
              >
                📞 Call Team
              </a>
              <a 
                href="https://wa.me/919311501426" 
                target="_blank" 
                rel="noreferrer"
                className="py-3 px-4 bg-navy text-white rounded-xl hover:bg-accent-orange hover:text-navy transition-all block text-center shadow-xs font-black"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
