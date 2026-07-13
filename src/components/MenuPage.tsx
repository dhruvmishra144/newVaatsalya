"use client";

import { useState, useMemo, useContext } from 'react';
import { 
  Plus, Minus, ShoppingBag, Star, Clock, 
  ChevronDown, Search, Filter, Leaf, X
} from 'lucide-react';
import { Product } from '../types';
import { AppContext } from './ClientLayout';

interface MenuPageProps {
  products: Product[];
}

export default function MenuPage({
  products
}: MenuPageProps) {
  
  const context = useContext(AppContext);
  if (!context) return null;
  const { handleAddToCart, selectedCategory, setSelectedCategory } = context;

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});

  const categories = ['All', 'Gourmet Curries', "Toddlers' Food", 'Ready To Cook', 'Ready To Eat', 'Snacks', 'Jain food', 'Achars'];

  // Handle local quantity triggers
  const getQty = (id: string) => localQuantities[id] || 1;
  const updateQty = (id: string, delta: number) => {
    setLocalQuantities(prev => {
      const cur = prev[id] || 1;
      const next = Math.max(1, cur + delta);
      return { ...prev, [id]: next };
    });
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.hindiName.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in" id="menu_page_container">
      
      {/* 1. SECTION MAIN HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] text-navy/80 uppercase tracking-widest font-black block">Specialty Indian Kitchen</span>
        <h1 className="text-4xl font-serif font-black text-navy">Taste of Home, Dehydrated with Love</h1>
        <p className="text-sm font-semibold text-slate-500 leading-relaxed">
          No chemicals, no raw powder pre-mixes. We cook complete homestyle dishes inside our kitchen, and preserve them in specialized nitrogen standup pouches. Simply add hot water.
        </p>
      </div>

      {/* 2. DYNAMIC CONTROLLER BAR (Search + Filter Tabs) */}
      <div className="bg-white rounded-3xl border border-warm-soft p-4 sm:p-6 shadow-xs space-y-4" id="menu_controllers">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Live search input field */}
          <div className="relative flex-1 max-w-md flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </span>
              <input 
                type="text"
                placeholder="Search recipes (e.g. Khichdi, Poha, Toddler...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-warm-cream border border-warm-soft rounded-2xl text-xs font-semibold focus:outline-none focus:border-navy text-navy placeholder:text-slate-400 shadow-xs"
                id="menu_search_box"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-navy cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider shrink-0 bg-slate-100 p-2 rounded-xl border border-slate-200">
                {filteredProducts.length} Matches
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-navy" />
            <span>Filter categories:</span>
          </div>

        </div>

        {/* Categories Tab selectors */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-warm-soft">
          {categories.map((category) => {
            const isSel = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`py-2 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isSel 
                    ? 'bg-navy text-accent-orange shadow-md border border-navy' 
                    : 'bg-warm-cream hover:bg-warm-soft/60 text-navy-light border border-warm-soft'
                }`}
                id={`menu_filter_tab_${category.replace(/\s+/g, '_')}`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <span className="text-4xl">🥣</span>
          <h3 className="text-lg font-serif font-black text-navy">No Recipes Found</h3>
          <p className="text-xs text-slate-400 font-bold max-w-sm mx-auto">
            We couldn't find any dishes matching "{searchQuery}". Try selecting "All" or searching other mom classics.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="px-5 py-2.5 bg-navy text-accent-orange text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-[#062444] cursor-pointer"
          >
            Clear current query
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="menu_products_grid">
          {filteredProducts.map((product) => {
            const isDetailsExpanded = expandedProduct === product.id;
            const currentQty = getQty(product.id);
            
            return (
              <article 
                key={product.id}
                className="bg-white rounded-3xl border border-warm-soft overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Section */}
                <div className="pt-5 flex justify-center">
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-warm-soft shadow-xs">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-101 transition-all duration-300 select-none"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Category marker */}
                    {product.chefTag && (
                      <span className="absolute top-2 left-2 bg-navy text-warm-cream text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                        {product.chefTag}
                      </span>
                    )}

                    <span className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm p-1 rounded-md flex items-center gap-0.5 shadow-sm text-[8px] font-black uppercase tracking-wider text-[#B48A30] border border-[#FFB500]/20">
                      <Leaf className="w-2.5 h-2.5 text-[#FFB500] fill-[#FFB500]" />
                    </span>

                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm p-1 px-1.5 rounded-md flex items-center gap-1 shadow-xs text-[9px] font-black text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-navy" />
                      <span>{product.prepTime}</span>
                    </div>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] uppercase font-black tracking-wider text-navy/85">
                        {product.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-extrabold">
                        Dry {product.weight}g → Makes {product.makesWeight}g
                      </span>
                    </div>

                    {/* Social proof placement right under metadata */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      </div>
                      <span className="text-xs font-black text-navy">{product.rating}</span>
                      <span className="text-[10px] text-slate-400 font-bold">({product.reviews} reviews)</span>
                    </div>

                    <h3 className="font-serif font-black text-lg text-navy leading-snug group-hover:text-navy/80 transition-colors pt-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-emerald-700 font-serif font-bold italic">
                      {product.hindiName}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      {product.description}
                    </p>
                  </div>

                  {/* Expandable Facts & Nutrition Drawer */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                    <button
                      onClick={() => setExpandedProduct(isDetailsExpanded ? null : product.id)}
                      className="w-full px-4 py-2.5 text-left text-[11px] font-black uppercase text-slate-500 tracking-wider flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer"
                      id={`expand_btn_${product.id}`}
                    >
                      <span>🍲 {isDetailsExpanded ? 'Hide Nutrition Profile' : 'Show Ingredients & Nutrition'}</span>
                      <ChevronDown className={`w-4 h-4 transition-all ${isDetailsExpanded ? 'rotate-180 text-navy' : 'text-slate-400'}`} />
                    </button>

                    {isDetailsExpanded && (
                      <div className="p-4 border-t border-slate-100 space-y-4 bg-white text-xs animate-fade-in" id={`details_body_${product.id}`}>
                        {/* Ingredients lists */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] uppercase tracking-wider font-black text-slate-400 block">Recipe Ingredients:</span>
                          <div className="flex flex-wrap gap-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            {product.ingredients.map((ing, k) => (
                              <span key={k} className="bg-white text-navy px-2 py-0.5 rounded-md text-[10px] font-bold border border-slate-100 shadow-xs">
                                {ing}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Nutrition DNA Bar representation */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] uppercase tracking-wider font-black text-slate-400 block">Relative Macronutrient DNA Bar:</span>
                          <div className="h-6 w-full rounded-full bg-slate-100 flex overflow-hidden border border-slate-200">
                            {(() => {
                              const p = product.nutrition.protein;
                              const c = product.nutrition.carbs;
                              const f = product.nutrition.fats;
                              const sum = p + c + f;
                              const pPct = (p / sum) * 100;
                              const cPct = (c / sum) * 100;
                              const fPct = (f / sum) * 100;
                              return (
                                <>
                                  <div style={{ width: `${pPct}%` }} className="bg-emerald-500 flex items-center justify-center text-[8px] font-black text-white px-1 truncate" title={`Protein: ${p}g`}>
                                    P: {p}g
                                  </div>
                                  <div style={{ width: `${cPct}%` }} className="bg-amber-500 flex items-center justify-center text-[8px] font-black text-white px-1 truncate" title={`Carbohydrates: ${c}g`}>
                                    C: {c}g
                                  </div>
                                  <div style={{ width: `${fPct}%` }} className="bg-[#DF562E] flex items-center justify-center text-[8px] font-black text-white px-1 truncate" title={`Fats: ${f}g`}>
                                    F: {f}g
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                          <div className="flex justify-between items-center text-[8px] font-black text-slate-400 uppercase tracking-wider px-1">
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Protein ({product.nutrition.protein}g)</span>
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Carbs ({product.nutrition.carbs}g)</span>
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#DF562E]"></span> Fats ({product.nutrition.fats}g)</span>
                          </div>
                        </div>

                        {/* Hydro Requirement & Spicy rating */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          
                          {/* Hydro sachet metrics */}
                          <div className="bg-[#FAF5EB] p-2.5 rounded-xl border border-amber-900/5 space-y-1">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Fluid Required:</span>
                            <div className="flex items-center gap-2">
                              <span className="text-base">💧</span>
                              <div>
                                <span className="block text-xs font-black text-navy">Add {product.makesWeight - product.weight}ml Water</span>
                                <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Yields {(product.makesWeight / product.weight).toFixed(1)}x dry mass</span>
                              </div>
                            </div>
                          </div>

                          {/* Spice indicator gauge */}
                          <div className="bg-[#FAF5EB] p-2.5 rounded-xl border border-amber-900/5 space-y-1">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Spice Level:</span>
                            <div className="flex items-center gap-2">
                              <span className="text-base">{product.isSpicy === "Spicy" ? "🌶️" : "🌱"}</span>
                              <div>
                                <span className="block text-xs font-black text-navy leading-none">
                                  {product.isSpicy}
                                </span>
                                <div className="flex gap-0.5 mt-1.5">
                                  <span className="w-3 h-1 rounded-sm bg-red-500"></span>
                                  <span className={`w-3 h-1 rounded-sm ${product.isSpicy !== "Mild" ? "bg-red-500" : "bg-slate-200"}`}></span>
                                  <span className={`w-3 h-1 rounded-sm ${product.isSpicy === "Spicy" ? "bg-red-500" : "bg-slate-200"}`}></span>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                        
                        <div className="bg-amber-50 border border-amber-900/5 p-2 rounded-xl text-center text-[9px] font-bold text-slate-500">
                          Energy: <span className="text-navy font-black text-xs">{product.nutrition.calories} kcal</span> | Ghee Roasted | Sodium: {product.nutrition.sodium}
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Quantity & Add to Cart Controls */}
                  <div className="flex items-center justify-between border-t border-warm-soft pt-4 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-black block">Price</span>
                      <span className="text-xl font-black text-navy leading-none">
                        ₹{product.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity dial */}
                      <div className="flex items-center gap-2 bg-warm-cream border border-slate-200 rounded-xl p-1 shadow-xs">
                        <button 
                          onClick={() => updateQty(product.id, -1)}
                          className="p-1.5 hover:bg-warm-soft rounded-lg text-slate-500 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-black px-1 leading-none text-navy">{currentQty}</span>
                        <button 
                          onClick={() => updateQty(product.id, 1)}
                          className="p-1.5 hover:bg-warm-soft rounded-lg text-slate-500 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          handleAddToCart(product, currentQty);
                          // Reset local quantity
                          setLocalQuantities(prev => ({ ...prev, [product.id]: 1 }));
                        }}
                        className="px-4 py-3 bg-navy hover:bg-[#062444] text-accent-orange text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-navy/10 flex items-center gap-1.5 cursor-pointer"
                        id={`add_to_cart_cta_${product.id}`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>

                  </div>
                </div>

              </article>
            );
          })}
        </div>
      )}

      {/* 4. EVENT & PARTY PACKS SECTION (Your Food Cost-Effective Processing) */}
      <section className="bg-linear-to-br from-navy to-navy-light text-white p-6 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden" id="event_packs_container">
        {/* Subtle blue/yellow accent decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Text and stats */}
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-orange text-navy rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm">
              🎉 Party orders & Bulk processing
            </div>
            <h2 className="text-2xl sm:text-3.5xl font-serif font-black text-white leading-tight">
              Your Food Packs for <br className="hidden sm:inline"/>
              <span className="text-accent-orange">Events & Large Parties</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed max-w-2xl">
              Planning a family gathering, standard corporate trekking group, or custom travel event? Process your customized mother-cooked food packs at an extremely cost-effective price. We package and dehydrate in personalized batches with direct door-to-door courier options.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10 font-bold">
                <span className="text-emerald-400 font-black text-sm">✓</span>
                <span>Additional GST applicable as per guidelines</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10 font-bold">
                <span className="text-emerald-400 font-black text-sm">✓</span>
                <span>Delivery charges extra</span>
              </div>
            </div>
            
            <p className="text-[10px] text-amber-500 font-black tracking-wide pt-1">
              * Note: Rs 150 per item will be charged if the number of dynamic customized dishes exceeds allowed baseline quantities.
            </p>
          </div>

          {/* Visual banner thumbnail with action button */}
          <div className="md:col-span-4 bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col space-y-4">
            <img 
              src="https://images.unsplash.com/photo-1555244162-803834f70033?w=400&auto=format&fit=crop&q=80" 
              alt="Indian meal catering" 
              className="w-full h-32 rounded-xl object-cover hover:scale-[1.02] transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            
            <a 
              href="https://wa.me/919999336411?text=Hello,%20I'm%20interested%20in%20ordering%20Food%20Packs%20for%20an%20Upcoming%20Event"
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-3 bg-accent-orange hover:bg-accent-orange-hover text-navy font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              Consult Catering Expert
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
