"use client";

import { useState } from 'react';
import { Mail, MapPin, Phone, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Phone className="w-5 h-5 text-amber-500" />,
      title: "Call Us",
      details1: "Milli: 9311501426",
      details2: "Maniesh: 9312501426",
      details3: "WhatsApp: 9999336411",
      bg: "bg-amber-50"
    },
    {
      icon: <Mail className="w-5 h-5 text-navy" />,
      title: "Email Us",
      details1: "vaatsalyafoods@gmail.com",
      details2: "Catering & Bulk Inquiries",
      details3: "",
      bg: "bg-blue-50"
    },
    {
      icon: <MapPin className="w-5 h-5 text-amber-500" />,
      title: "Address 1",
      details1: "13A Rajpur Road Civil lines",
      details2: "New Delhi - 110054",
      details3: "",
      bg: "bg-amber-50"
    },
    {
      icon: <Clock className="w-5 h-5 text-navy" />,
      title: "Business Hours",
      details1: "Monday to Saturday",
      details2: "10:00 am to 4:00 pm",
      details3: "Sunday: Closed",
      bg: "bg-blue-50"
    }
  ];

  const faqs = [
    {
      q: "Where is Vaatsalya Foods main office located?",
      a: "Our central hub is located at 13A Rajpur Road Civil lines, New Delhi - 110054. We supervise all distribution, event catering custom packaging, and franchisee operations from this location."
    },
    {
      q: "Are there any artificial preservatives or chemical powders added?",
      a: "No! Absolutely not. We do not use any stabilizers, chemical MSG, preservatives, or artificial coloring agents. Our food relies purely on our science-backed low-temperature vacuum dehydration to prolong shelf-life."
    },
    {
      q: "How can I trace the sourcing of raw ingredients?",
      a: "Each of our packs supports batch-level tracing. We work directly with organic farm cooperatives across India to source long-grain Basmati rice, Moong dal, cow A2 Desi Ghee, and fresh grade-A organic vegetables."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in" id="contact_page_container">
      
      {/* 1. HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4" id="contact_header_simple">
        <span className="text-[10px] text-navy uppercase tracking-widest font-black bg-amber-50 px-3.5 py-1.5 rounded-full border border-accent-orange/30 inline-block">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4.5xl font-serif font-black text-navy leading-tight">
          Connect with <span className="text-navy border-b-4 border-accent-orange">Vaatsalya Foods</span>
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Have an inquiry about wholesale orders, event catering, franchisee opportunities, or custom travel packages? Drop us a dynamic message. Smt. Vidya's expert kitchen team is dedicated to supporting your food journey.
        </p>
      </div>

      {/* 2. CONTACT CHANNELS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="contact_grid_cards">
        {contactMethods.map((method, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-warm-soft p-6 space-y-4 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
            <div className={`p-3.5 rounded-2xl ${method.bg} flex items-center justify-center`}>
              {method.icon}
            </div>
            <div className="space-y-1.5 w-full">
              <h3 className="font-serif font-black text-navy text-base">{method.title}</h3>
              <p className="text-xs text-navy font-black">{method.details1}</p>
              {method.details2 && <p className="text-[11px] text-slate-500 font-bold">{method.details2}</p>}
              {method.details3 && <p className="text-[11.5px] text-green-700 font-black">{method.details3}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* 3. MAIN FORM & FAQ SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* CONTACT FORM */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-warm-soft p-6 sm:p-8 space-y-6 shadow-xs" id="contact_form_panel">
          <div className="space-y-1.5 border-b border-warm-soft pb-4">
            <h2 className="text-xl font-serif font-black text-navy flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-navy" />
              Send Us a Message
            </h2>
            <p className="text-xs text-slate-400 font-semibold">
              Fill out the form below and Smt. Vidya Kulkarni's team will get back to you within 24 operational hours.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 py-8 animate-fade-in" id="contact_success_message">
              <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-black text-navy text-lg">Thank You For Writing!</h3>
                <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
                  Your message has been safely received. Smt. Vidya's team is looking over it and will nourish a response to your inbox shortly.
                </p>
              </div>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-2 text-xs font-black text-navy hover:underline cursor-pointer"
                id="reset_contact_form"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="actual_contact_form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-navy" htmlFor="contact_name">Full Name</label>
                  <input
                    id="contact_name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="E.g., Dhruv Sharma"
                    className="w-full bg-warm-cream/60 hover:bg-warm-cream focus:bg-white text-xs font-semibold text-navy p-3 rounded-xl border border-slate-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-hidden transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-navy" htmlFor="contact_email">Email Address</label>
                  <input
                    id="contact_email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="E.g., dhruv@example.com"
                    className="w-full bg-warm-cream/60 hover:bg-warm-cream focus:bg-white text-xs font-semibold text-navy p-3 rounded-xl border border-slate-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-navy" htmlFor="contact_phone">Phone (Optional)</label>
                  <input
                    id="contact_phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="E.g., +91 98765 43210"
                    className="w-full bg-warm-cream/60 hover:bg-warm-cream focus:bg-white text-xs font-semibold text-navy p-3 rounded-xl border border-slate-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-hidden transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-navy" htmlFor="contact_subject">Inquiry Type</label>
                  <select
                    id="contact_subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-warm-cream/60 hover:bg-warm-cream focus:bg-white text-xs font-bold text-navy p-3 rounded-xl border border-slate-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-hidden transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Wholesale & Bulk">Wholesale &amp; Bulk Orders</option>
                    <option value="Catering & Events">Catering &amp; Special Events</option>
                    <option value="Ingredient Sourcing">Sourcing Cooperatives</option>
                    <option value="Feedback & Love">Feedback &amp; Recipe Suggestions</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-navy" htmlFor="contact_message">How Can We Help You?</label>
                <textarea
                  id="contact_message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your requirements, destination, or support question..."
                  className="w-full bg-warm-cream/60 hover:bg-warm-cream focus:bg-white text-xs font-semibold text-navy p-3 rounded-xl border border-slate-200 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-hidden transition-all resize-none"
                ></textarea>
              </div>

              <button
                id="submit_contact_button"
                className="w-full bg-navy text-accent-orange py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#062444] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Transmitting Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Dispatch Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* FAQS COLUMN */}
        <div className="lg:col-span-5 space-y-6" id="contact_faq_panel">
          <div className="bg-navy text-white rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[9px] text-accent-orange uppercase tracking-widest font-black block">Immediate Answers</span>
              <h2 className="text-xl font-serif font-black">Frequently Explored</h2>
            </div>

            <div className="space-y-4" id="faqs_accordion">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4 last:border-0 last:pb-0 space-y-2">
                  <h4 className="text-xs font-black text-accent-orange flex items-start gap-1.5">
                    <span className="text-accent-orange">•</span> {faq.q}
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* GOOGLE MAPS PLACEHOLDER */}
          <div className="bg-[#FAF6EC] rounded-3xl p-4 border border-warm-soft space-y-3">
            <span className="text-[10px] font-black uppercase text-navy block">Interactive Map</span>
            <div className="h-44 bg-slate-200 rounded-2xl relative overflow-hidden flex items-center justify-center text-center p-4 border border-slate-100 shadow-inner">
              {/* Artistic representation of map with New Delhi coordinates */}
              <div className="absolute inset-0 bg-cover opacity-60 mix-blend-color-burn" style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/77.2281,28.6757,12,0/400x300?access_token=none')` }} />
              <div className="absolute inset-0 bg-navy/5" />
              <div className="relative z-10 space-y-1 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs font-black text-navy">Vaatsalya Culinary Hub</p>
                <p className="text-[10px] text-slate-500 font-semibold font-sans">13A Rajpur Road Civil lines, New Delhi - 110054</p>
                <a 
                  href="https://maps.google.com/?q=13A+Rajpur+Road+Civil+lines,+New+Delhi,+Delhi+110054" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-block text-[10px] font-black text-navy uppercase tracking-wider pt-1 hover:underline"
                >
                  Get Directions ↗
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
