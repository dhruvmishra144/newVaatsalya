import { Shield, HelpCircle, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import LogoWhite from './logo-white';

export default function Footer() {
  return (
    <footer className="bg-navy text-white py-12 border-t border-white/10" id="footer_container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Summary */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center">
            <LogoWhite className="h-9 w-auto" />
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
            Vaatsalya Foods represents the honest labor of Indian home-makers, combining age-old culinary secrets with scientific low-temp vacuum dehydration. 100% natural, preservative-free homestyle dry meals.
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-wider">
            <Shield className="w-4 h-4 text-accent-orange" />
            <span>Clean Food Lab Certified • ISO 22000 Certified</span>
          </div>
        </div>

        {/* Quick Multi-page Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Navigate</h4>
          <ul className="space-y-2 text-xs font-semibold text-slate-300">
            <li>
              <Link href="/" className="hover:text-accent-orange cursor-pointer">
                Home Showcase
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent-orange cursor-pointer">
                About Us Story
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-accent-orange cursor-pointer">
                Our Delicious Menu
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent-orange cursor-pointer">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="md:col-span-4 space-y-3 text-xs text-slate-300">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Connect & Support</h4>
          <div className="space-y-2 font-semibold">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-accent-orange shrink-0" />
              <span>13A Rajpur Road Civil lines, New Delhi - 110054</span>
            </p>
            <p className="flex items-center gap-2 font-mono">
              <Mail className="w-4 h-4 text-accent-orange shrink-0" />
              <span>vaatsalyafoods@gmail.com</span>
            </p>
            <p className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-accent-orange shrink-0" />
              <span>WhatsApp: 9999336411 | Support: 9311501426</span>
            </p>
          </div>
          <div className="pt-2 text-[10px] text-slate-400 font-bold">
            © {new Date().getFullYear()} Vaatsalya Foods Private Limited. All rights reserved. Made under traditional supervision.
          </div>
        </div>

      </div>
    </footer>
  );
}
