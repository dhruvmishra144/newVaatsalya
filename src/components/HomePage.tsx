"use client";

import { 
  ArrowRight, Shield, Scale, Clock, Star, 
  Globe, Sparkles, Smile, ArrowUpRight,
  TrendingUp, Compass, Baby, Leaf
} from 'lucide-react';
import { useContext } from 'react';
import Link from 'next/link';
import { Product } from '../types';
import { AppContext } from './ClientLayout';

interface HomePageProps {
  products: Product[];
}

export default function HomePage({
  products
}: HomePageProps) {
  
  const context = useContext(AppContext);
  if (!context) return null;
  const { handleAddToCart, setSelectedCategory } = context;

  // Best sellers to preview
  const bestSellers = products.filter(p => p.chefTag === 'Best-Seller' || p.rating >= 4.9).slice(0, 3);

  const customerAudiences = [
    {
      title: "Wilderness Backpackers",
      subtitle: "Featherlight 80g packs",
      description: "Survival meals that expand to massive, hot comfort plates in 5 mins. Ideal dry bags for campers.",
      colorClass: "bg-emerald-50 text-emerald-800 border-emerald-100",
      icon: <Compass className="w-6 h-6 text-emerald-600" />,
      categoryToFilter: "Gourmet Curries",
      image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400&auto=format&fit=crop&q=80"
    },
    {
      title: "Global Dorm Students",
      subtitle: "Reminds you of Mom",
      description: "Miss ghar ka khana? Get traditional taste without mess. Just add water in a kettle.",
      colorClass: "bg-blue-50 text-blue-800 border-blue-100",
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      categoryToFilter: "Ready To Cook",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80"
    },
    {
      title: "Healthy Toddlers Specials",
      subtitle: "Pure organic formulas",
      description: "Sweetened only with powdered dried dates. Zero added refined sugars or preservative stabilizers.",
      colorClass: "bg-pink-50 text-pink-800 border-pink-100",
      icon: <Baby className="w-6 h-6 text-pink-600" />,
      categoryToFilter: "Toddlers' Food",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80"
    },
    {
      title: "The Nomad Value Bundles",
      subtitle: "Bulk travel kits",
      description: "Pre-packed survival suitcase collections. High-carb & high-protein standard meal kits.",
      colorClass: "bg-amber-50 text-amber-800 border-amber-100",
      icon: <TrendingUp className="w-6 h-6 text-amber-600" />,
      categoryToFilter: "Ready To Eat",
      image: "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=400&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in" id="homepage_container">
      
      {/* 1. HERO HEADER AREA */}
      <header className="relative pt-8 pb-16 sm:py-20 bg-linear-to-b from-white to-warm-cream overflow-hidden border-b border-warm-soft">
        {/* Ambient background decoration */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-amber-100/35 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box: Graphic Titles & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy/5 border border-navy/10 rounded-full text-navy text-xs font-black uppercase tracking-wider mx-auto lg:mx-0 shadow-xs">
                <Sparkles className="w-4 h-4 text-accent-orange" />
                <span>Zero Preservative Dehydration Technology</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-serif font-black text-navy leading-tight">
                Moms' Cooked <br/>
                <span className="text-navy relative inline-block">
                  Indian Foods
                  <svg className="absolute bottom-[-6px] left-0 w-full h-2 text-accent-orange/70" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 6 Q 50 1, 100 6" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>. <br/>
                Ready in <span className="text-emerald-700">5 Minutes</span>.
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold">
                Homestyle Indian recipes freeze-dried at peak flavor. No artificial preservatives, MSG or chemical additions. Pack with ease, add hot water, and savor instant warmth.
              </p>

              {/* Graphical Visual Metric Pill row */}
              <div className="grid grid-cols-3 gap-3 pt-2" id="hero_metrics_pills">
                <div className="bg-white p-3.5 rounded-2xl border border-warm-soft shadow-xs flex flex-col items-center lg:items-start space-y-1 group hover:border-navy transition-colors">
                  <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg"><Shield className="w-5 h-5"/></span>
                  <span className="font-extrabold text-navy text-xs">0% Preservative</span>
                  <span className="text-[9px] text-slate-400 font-bold block">Strict Lab Assured</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-warm-soft shadow-xs flex flex-col items-center lg:items-start space-y-1 group hover:border-navy transition-colors">
                  <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Scale className="w-5 h-5"/></span>
                  <span className="font-extrabold text-navy text-xs">80g Pack dry</span>
                  <span className="text-[9px] text-slate-400 font-bold block">Featherlight load</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-warm-soft shadow-xs flex flex-col items-center lg:items-start space-y-1 group hover:border-navy transition-colors">
                  <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Clock className="w-5 h-5"/></span>
                  <span className="font-extrabold text-navy text-xs">9 Months Life</span>
                  <span className="text-[9px] text-slate-400 font-bold block">Nitrogen Sealed</span>
                </div>
              </div>

              {/* Call-to-actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 justify-center lg:justify-start">
                <Link 
                  href="/products"
                  className="w-full sm:w-auto px-8 py-4 bg-navy hover:bg-[#062444] text-accent-orange font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-lg hover:shadow-xl shadow-navy/10 flex items-center justify-center gap-1.5 group cursor-pointer"
                >
                  Explore Delicious Menu
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 text-accent-orange transition-transform" />
                </Link>
                <Link 
                  href="/about"
                  className="w-full sm:w-auto px-6 py-4 bg-white border-2 border-warm-soft text-navy font-black text-sm uppercase tracking-wider rounded-2xl transition-all hover:bg-warm-soft cursor-pointer inline-block text-center"
                >
                  Our Sourcing Story
                </Link>
              </div>

              <div className="flex items-center gap-2.5 justify-center lg:justify-start text-xs font-bold text-slate-400 pt-1">
                <span className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                </span>
                <span>★ 4.9 Rated by 12,000+ Trekking Enthusiasts & Study Abroad Students</span>
              </div>

            </div>

            {/* Right Box: Premium Render / Hero Image */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
                
                {/* Visual framing container */}
                <div className="absolute -inset-1.5 bg-linear-to-tr from-navy via-accent-orange to-yellow-500 rounded-3xl blur-md opacity-25 animate-pulse"></div>
                
                <div className="relative bg-[#FAF5EB] p-3 rounded-3xl border border-amber-900/10 shadow-xl overflow-hidden group">
                  <img 
                    src="/assets/images/vaatsalya.png" 
                    alt="Vaatsalya Specialty Homestyle Foods Header Banner" 
                    className="rounded-2xl w-full object-cover aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 select-none group-hover:scale-[1.015] transition-all duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback in case of absolute local path lookup failure
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm border border-amber-900/10 p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                    <span className="bg-emerald-50 text-emerald-700 p-2 rounded-xl">
                      <Smile className="w-5 h-5 text-emerald-600" />
                    </span>
                    <div>
                      <h4 className="font-serif font-black text-xs text-navy">No Preservatives</h4>
                      <p className="text-[10px] text-slate-500 font-extrabold leading-none mt-1">100% Homemade Touch</p>
                    </div>
                  </div>

                  <div className="absolute top-6 left-6 bg-navy/90 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">
                    ✨ Mom Cooked, Freeze Restored
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 2. CHOOSE BY USE-CASE GRAPHICS BAR (Trekkers, Students, Kids, Value combo) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] text-navy/80 uppercase tracking-widest font-black block">Tailored Lifestyles</span>
          <h2 className="text-3xl font-serif font-black text-navy">Designed to Move With You</h2>
          <p className="text-sm font-semibold text-slate-500">
            Whether you are conquering Himalayan passes, attending late-night study sessions in Munich, or looking for chemical-free quick porridges for babies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="lifestyle_grid_homepage">
          {customerAudiences.map((audience, i) => (
            <div 
              key={i}
              className="bg-white rounded-2xl border border-warm-soft overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Graphic Header Block representing category */}
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0 bg-navy/40 mix-blend-multiply opacity-40 group-hover:opacity-20 transition-opacity z-10"></div>
                <img 
                  src={audience.image} 
                  alt={audience.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-white/95 px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-navy z-25 flex items-center gap-1 border border-slate-100">
                  {audience.icon}
                  {audience.subtitle}
                </span>
              </div>

              {/* Text Context */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif font-black text-lg text-navy leading-snug group-hover:text-navy/80 transition-colors">
                    {audience.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    {audience.description}
                  </p>
                </div>

                <Link
                  href="/products"
                  onClick={() => setSelectedCategory(audience.categoryToFilter)}
                  className={`w-full py-2 px-4 rounded-xl border font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${audience.colorClass}`}
                >
                  Browse {audience.categoryToFilter}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VISUAL DEHYDRATION VS TRADITIONAL INFOGRAPHIC BOARD */}
      <section className="bg-warm-soft py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] text-navy/85 uppercase tracking-widest font-black block">Advanced Preservation vs Junk</span>
            <h2 className="text-3xl font-serif font-black text-navy">The Transparent Nutrition Blueprint</h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Commercial canned foods are highly treated with chemical sodium acid pyrophosphate or MSG. We do NOT cook in laboratories. We cook in a home-style kitchen, then dry it.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual cards comparing features */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <span className="inline-block p-1.5 bg-navy/5 text-navy font-black uppercase text-[10px] tracking-wider rounded-lg">
                ❌ Commercial Conveniences
              </span>
              <ul className="space-y-4 text-xs font-semibold text-slate-500">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-sm shrink-0">✕</span>
                  <span>TBHQ & BHA chemically prolong artificial shelf lines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-sm shrink-0">✕</span>
                  <span>Super-saturated Sodium (Salt Corrosion) strips natural nutrients.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-sm shrink-0">✕</span>
                  <span>Cooked in large, high-pressure industrial vats with hydrogenated oils.</span>
                </li>
              </ul>
            </div>

            {/* Science Infographic SVG Visualizer */}
            <div className="lg:col-span-4 bg-navy text-white p-6 rounded-3xl border border-white/5 shadow-2xl flex flex-col justify-between space-y-6 text-center text-xs min-h-[300px]">
              <span className="text-[10px] text-accent-orange font-black uppercase tracking-widest block">Vaatsalya Pure Chemistry</span>
              
              {/* Graphic representation of water evaporation */}
              <div className="py-2.5 flex justify-center items-center gap-6" id="infographic_atoms">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-black animate-pulse">
                    98%
                  </div>
                  <span className="text-[9px] font-black uppercase text-emerald-400">Nutrients Lock</span>
                </div>
                
                {/* SVG evaporation representation */}
                <div className="relative w-16 h-8 border-b-2 border-dashed border-slate-500 flex justify-center">
                  <div className="absolute top-[-10px] text-[15px]">💨</div>
                  <div className="absolute top-[-25px] text-[10px] text-slate-400 font-extrabold uppercase">Moisture Out</div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/20 flex items-center justify-center text-blue-400 font-black">
                    0%
                  </div>
                  <span className="text-[9px] font-black uppercase text-blue-400">Chemicals</span>
                </div>
              </div>

              <div className="space-y-1 bg-white/5 p-4 rounded-2xl border border-white/10 text-left">
                <h4 className="font-serif font-black text-accent-orange text-sm">Vacuum Vaporization</h4>
                <p className="text-[10px] text-slate-300 font-medium leading-relaxed">
                  Evaporating pure moisture at extreme low temperature locks basmati fiber and cow ghee lipids in custom molecular lattices, re-activating instantly under hot water.
                </p>
              </div>

              <Link 
                href="/about"
                className="w-full text-center hover:text-accent-orange font-black uppercase text-[10px] tracking-wider cursor-pointer block"
              >
                Our Kitchen Journey →
              </Link>
            </div>

            {/* Visual card of Vaatsalya specs */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <span className="inline-block p-1.5 bg-emerald-50 text-emerald-700 font-black uppercase text-[10px] tracking-wider rounded-lg">
                ✓ Vaatsalya Commitment
              </span>
              <ul className="space-y-4 text-xs font-semibold text-navy">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 text-sm font-black shrink-0">✓</span>
                  <span>Pure Cow Ghee and cold-pressed mustard oils roast bases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 text-sm font-black shrink-0">✓</span>
                  <span>Natural vacuum dry prevents food mold growth safely.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 text-sm font-black shrink-0">✓</span>
                  <span>Handcrafted in clean Indian home cooking batches.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 4. DRIP SHOWCASE OF BEST SELLERS (Khichdi, Poha, etc) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-navy/80 uppercase tracking-widest font-black block">Instant Stars</span>
            <h2 className="text-3xl font-serif font-black text-navy">Bestsellers from our Kitchen</h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-black uppercase tracking-wider text-navy bg-accent-orange border border-navy/10 px-4 py-2 rounded-xl hover:bg-navy hover:text-white transition-colors cursor-pointer inline-block"
          >
            Check Full Menu Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestSellers.map((product) => {
            return (
              <article 
                key={product.id}
                className="bg-white rounded-3xl border border-warm-soft overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Section */}
                <div className="p-4 pb-0">
                  <div className="relative h-32 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-warm-soft">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 select-none"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Category marker */}
                    <span className="absolute top-2.5 left-2.5 bg-navy text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-xs">
                      {product.chefTag}
                    </span>

                    <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm text-[8px] font-black uppercase tracking-wider text-[#B48A30] border border-[#FFB500]/20">
                      <Leaf className="w-2.5 h-2.5 text-[#FFB500] fill-[#FFB500]" />
                      <span>Pure Veg</span>
                    </span>

                    <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm p-1.5 px-2 rounded-md flex items-center gap-1 shadow-xs text-[9px] font-black text-slate-600">
                      <Clock className="w-3 h-3 text-navy" />
                      <span>{product.prepTime}</span>
                    </div>
                  </div>
                </div>

                {/* Info and price */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-black text-navy/80">
                      {product.category} • Dry {product.weight}g
                    </span>
                    
                    {/* Social proof placement right under metadata */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      </div>
                      <span className="text-xs font-black text-navy">{product.rating}</span>
                      <span className="text-[10px] text-slate-400 font-bold">({product.reviews} reviews)</span>
                    </div>

                    <h3 className="font-serif font-black text-lg text-navy leading-snug group-hover:text-navy/85 transition-colors pt-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-emerald-700 font-serif font-bold italic">
                      {product.hindiName}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      {product.description.slice(0, 110)}...
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-warm-soft pt-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-black block">Price</span>
                      <span className="text-lg font-black text-navy">₹{product.price}</span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2.5 bg-navy hover:bg-[#062444] text-accent-orange text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>
      </section>

      {/* 5. HEATED TESTIMONIAL QUOTE BANNER */}
      <section className="bg-linear-to-r from-navy to-navy-light text-white py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-serif font-black text-accent-orange">"The pure Desi Ghee smells amazing in high-altitude freezing winds."</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-semibold italic">— Rohan Bhatia, Experienced Mountaineer & Pack Cover Story Winner</p>
          </div>
          <Link 
            href="/about"
            className="shrink-0 text-xs font-black uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl transition-all cursor-pointer border border-white/10 inline-block text-center"
          >
            Read Our Journey Story
          </Link>
        </div>
      </section>

    </div>
  );
}
