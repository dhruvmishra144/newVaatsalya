"use client";

import { Star, Award, CheckCircle } from 'lucide-react';

export default function StoryPage() {
  const storyMilestones = [
    {
      title: "1. Premium Sourcing Only",
      subtitle: "The building blocks of taste",
      emoji: "🌾",
      desc: "We exclusively source long-grain fragrant Basmati, high-protein Moong lentils, hand-milled turmeric, and pure cow A2 Desi Ghee directly from organic family farm cooperatives. No refined white sugars or highly-processed vegetable oils are ever allowed in our kitchen.",
      image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&auto=format&fit=crop&q=80"
    },
    {
      title: "2. Handcrafted by Mothers",
      subtitle: "The lineage of love",
      emoji: "👩‍🍳",
      desc: "Our recipes are curated and slow-cooked in small, meticulously hygienic batches by traditional Indian mothers/homemakers. They roast the grains in clay-stove settings, tempering spices precisely to capture that authentic, comforting homestyle flavor.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&auto=format&fit=crop&q=80"
    },
    {
      title: "3. Low-Temp Dehydration",
      subtitle: "Preserving without chemicals",
      emoji: "💨",
      desc: "Immediately after cooking, the food enters our low-temperature vacuum chamber. We gently evaporate water moisture at sub-zero vacuum boiling points. This locks 98% of natural minerals, fibers, and vitamins in a static state without using chemical stabilizers.",
      image: "https://images.unsplash.com/photo-1547306733-5c3c0ca662f5?w=400&auto=format&fit=crop&q=80"
    },
    {
      title: "4. Travel Anywhere Comfort",
      subtitle: "Ghar ka Khana Globally",
      emoji: "🎒",
      desc: "Packed in sturdy nitrogen-flushed stand-up pouches, the food reaches hot-plate camping trails, busy corporate boardrooms, or foreign hostel rooms. Just add boiling water to rehydrate the home-cooked taste you love.",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in" id="story_page_container">
      
      {/* 1. HERO STORY TITLE */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] text-navy/80 uppercase tracking-widest font-black block">Our Heritage & Integrity</span>
        <h1 className="text-4xl font-serif font-black text-navy">Moms' Cooking • Scientific Preservation</h1>
        <p className="text-sm font-semibold text-slate-500">
          Learn how we fuse ancient culinary wisdom with advanced zero-chemical dehydration science to pack authentic homestyle Indian nutrition in featherlight bags.
        </p>
      </div>

      {/* 2. CHRONOLOGICAL GRAPHIC MATRIX PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="story_highlights_grid">
        {storyMilestones.map((milestone, index) => (
          <div 
            key={index}
            className="bg-white rounded-3xl border border-warm-soft overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Visual Header Graphic */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-navy/35 opacity-40 mix-blend-multiply group-hover:opacity-20 transition-opacity z-10" />
              <img 
                src={milestone.image} 
                alt={milestone.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 select-none"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-white/95 text-navy p-2.5 px-3.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-sm z-20 flex items-center gap-1.5 border border-slate-100">
                <span className="text-sm">{milestone.emoji}</span>
                {milestone.subtitle}
              </span>
            </div>

            {/* Core copy */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-serif font-black text-navy text-xl leading-tight group-hover:text-navy/80 transition-colors">
                  {milestone.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {milestone.desc}
                </p>
              </div>

              {/* Security indicators */}
              <div className="border-t border-warm-soft pt-4 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-600" /> Natural Ingredients</span>
                <span className="text-navy">No MSG Added</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 3. STORY TEAM MOTHERS QUOTE */}
      <section className="bg-linear-to-r from-amber-50 to-warm-cream border-2 border-dashed border-amber-300 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 justify-between max-w-5xl mx-auto">
        <div className="space-y-3 max-w-2xl">
          <div className="flex text-amber-500">
            <Star className="w-4 h-4 fill-amber-500" />
            <Star className="w-4 h-4 fill-amber-500" />
            <Star className="w-4 h-4 fill-amber-500" />
            <Star className="w-4 h-4 fill-amber-500" />
            <Star className="w-4 h-4 fill-amber-500" />
          </div>
          <h3 className="text-xl font-serif font-black text-navy">
            "We cook just like we feed our children."
          </h3>
          <p className="text-xs text-slate-600 font-semibold leading-relaxed">
            Our kitchens do not use raw powder pre-mixes or fast-food techniques. We roast raw moong dal flour in Desi Ghee under direct monitoring, so the Sheera sweetness dates smell fresh and tender. Safety and clean, nutritive value is our primary guarantee.
          </p>
          <span className="text-[10px] uppercase font-black tracking-widest text-navy block">
            — Smt. Vidya Kulkarni, Quality Superintendent & Traditional Cook
          </span>
        </div>
        <span className="p-4 bg-amber-100 text-navy rounded-full shrink-0">
          <Award className="w-8 h-8" />
        </span>
      </section>

    </div>
  );
}
