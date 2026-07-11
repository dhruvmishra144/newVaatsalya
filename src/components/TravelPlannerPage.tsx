import { useState, useMemo } from 'react';
import { 
  Luggage, AlertCircle, ShoppingCart 
} from 'lucide-react';

interface TravelPlannerProps {
  handleAddTravelBundle: (days: number, mealsPerDay: number, profile: 'mild' | 'regular' | 'spicy') => void;
}

export default function TravelPlannerPage({
  handleAddTravelBundle
}: TravelPlannerProps) {
  const [travelDays, setTravelDays] = useState(7);
  const [mealsPerDay, setMealsPerDay] = useState(2);
  const [customizerPackage, setCustomizerPackage] = useState<'mild' | 'regular' | 'spicy'>('regular');
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);

  // Math metrics
  const totalMeals = useMemo(() => travelDays * mealsPerDay, [travelDays, mealsPerDay]);
  const estimatedDryWeightGrams = useMemo(() => totalMeals * 85, [totalMeals]);
  const estimatedCannedWeightGrams = useMemo(() => totalMeals * 480, [totalMeals]); // Heavy tiffins or tins

  const handleOrderBundle = () => {
    handleAddTravelBundle(travelDays, mealsPerDay, customizerPackage);
    setAddedSuccessfully(true);
    setTimeout(() => setAddedSuccessfully(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in" id="travel_planner_page">
      
      {/* 1. HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] text-[#083765]/80 uppercase tracking-widest font-black block">Lightweight Suitcase Calculator</span>
        <h1 className="text-4xl font-serif font-black text-[#083765]">Survival Backpack customizer</h1>
        <p className="text-sm font-semibold text-slate-500 leading-relaxed">
          Estimate carry weights instantly! Map out your flight connections, deep canyon treks or hostel quarters, and pack high-nutrient home food without paying for excess airlines luggage fees.
        </p>
      </div>

      {/* 2. MAIN PLANNER GRID CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Parameters control panel */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#F4EFE6] p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-black text-[#083765] border-b border-[#F4EFE6] pb-2">
              📊 Customizer Parameters
            </h3>

            {/* Travel Days Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-black uppercase text-slate-400">Travel/Camp Duration:</label>
                <span className="text-sm font-serif font-black text-[#083765]">{travelDays} Days</span>
              </div>
              <input 
                type="range" 
                min={2} 
                max={30} 
                value={travelDays}
                onChange={(e) => setTravelDays(parseInt(e.target.value))}
                className="w-full accent-[#083765] bg-slate-100 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 font-extrabold float-left">2 Days (Weekend)</span>
              <span className="text-[10px] text-slate-400 font-extrabold float-right">30 Days (Abroad)</span>
            </div>

            {/* Meals Per Day Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-black uppercase text-slate-400">Nutritious Meals Per Day:</label>
                <span className="text-sm font-serif font-black text-[#083765]">{mealsPerDay} Meals</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={3} 
                value={mealsPerDay}
                onChange={(e) => setMealsPerDay(parseInt(e.target.value))}
                className="w-full accent-[#083765] bg-slate-100 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 font-extrabold float-left">1 (Emergency breakfast)</span>
              <span className="text-[10px] text-slate-400 font-extrabold float-right">3 (Complete Mains)</span>
            </div>

            {/* Spice and Recipe Profiling */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-black uppercase text-slate-400 block">Select Spiciness DNA:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'mild', label: 'Mild 🌱', desc: 'No chili / Toddler care' },
                  { value: 'regular', label: 'Medium 🍲', desc: 'Classic comfort spices' },
                  { value: 'spicy', label: 'Spicy 🌶️', desc: 'Tangy Punjabi masala' }
                ].map((prof) => (
                  <button
                    key={prof.value}
                    onClick={() => setCustomizerPackage(prof.value as 'mild' | 'regular' | 'spicy')}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      customizerPackage === prof.value 
                        ? 'border-[#083765] bg-[#FCFAF2] text-[#083765]' 
                        : 'border-slate-100 hover:border-slate-200 text-slate-500'
                    }`}
                  >
                    <span className="font-extrabold block text-xs leading-none">{prof.label}</span>
                    <span className="text-[8.5px] text-slate-400 font-bold block mt-1.5 leading-tight">{prof.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bundle recommendation details */}
          <div className="bg-[#FCFAF2] p-4.5 rounded-2xl border border-[#F4EFE6] space-y-3">
            <div className="flex justify-between items-center text-xs font-black">
              <span className="text-slate-400">Total Dry Meals Earmarked:</span>
              <span className="text-[#083765] text-sm">{totalMeals} Pouches</span>
            </div>
            
            <button
              onClick={handleOrderBundle}
              disabled={addedSuccessfully}
              className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                addedSuccessfully 
                  ? 'bg-emerald-600 text-white shadow-emerald-200' 
                  : 'bg-[#083765] text-[#FFB500] hover:bg-[#062444] shadow-blue-100'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {addedSuccessfully ? '✓ Added Travel Bundle!' : 'Load Custom Bundle to Cart'}
            </button>
          </div>

        </div>

        {/* Right column: Graphic visualization board (Interactive Suitcase filling) */}
        <div className="lg:col-span-7 bg-[#083765] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
            <span className="text-[10px] font-black uppercase text-[#FFB500] tracking-widest flex items-center gap-1.5">
              <Luggage className="w-4 h-4" /> Visual Backpack Weight Loader
            </span>
            <span className="text-[9px] text-[#FCFAF2]/60 font-mono">ESTIMATOR: CALIBRATED</span>
          </div>

          {/* Dynamic suitcase illustration with pouches inside */}
          <div className="relative py-4 flex-1 flex flex-col items-center justify-center" id="visual_backpack_loading_chamber">
            
            {/* The suitcase outer shell representation */}
            <div className="w-56 sm:w-60 h-64 border-4 border-dashed border-slate-500 bg-slate-800/40 rounded-3xl p-4 flex flex-col justify-between shadow-inner relative">
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-14 h-4 border-2 border-dashed border-slate-500 rounded-t-md" />
              
              <div className="text-[9.5px] font-mono text-slate-500 font-extrabold uppercase tracking-wide text-center">
                Backpack Capacity Map
              </div>

              {/* Dynamic physical pouches rendered inside */}
              <div className="grid grid-cols-5 gap-1.5 items-center justify-items-center max-h-44 overflow-y-auto p-1 py-2">
                {Array.from({ length: Math.min(25, totalMeals) }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-7 h-8 bg-[#FFB500] hover:bg-[#EAA308] text-[#083765] rounded-md flex flex-col justify-center items-center font-black animate-fade-in text-[8px] border border-white/15 cursor-pointer shadow-xs"
                    title={`Pouch #${i+1}: Homestyle nutrient cell`}
                  >
                    <span>🍲</span>
                    <span className="text-[6.5px] font-mono leading-none">85g</span>
                  </div>
                ))}
                {totalMeals > 25 && (
                  <div className="w-7 h-8 bg-[#FFB500]/20 text-[#FFB500]/70 rounded-md flex items-center justify-center font-mono text-[9px] border border-dashed border-slate-500">
                    +{totalMeals - 25}
                  </div>
                )}
              </div>

              <div className="text-[9.5px] font-black text-center text-[#FFB500] uppercase tracking-wider animate-pulse pt-2 border-t border-slate-700/60">
                ★ {totalMeals} Pouches loaded ({estimatedDryWeightGrams}g Total)
              </div>
            </div>

          </div>

          {/* Two weights compared side-by-side inside block */}
          <div className="grid grid-cols-2 gap-4 bg-white/5 border border-white/10 p-4.5 rounded-2xl z-10 text-xs font-semibold">
            
            {/* Vaatsalya lightweight profile */}
            <div className="space-y-1.5 border-r border-[#F4EFE6]/10 pr-2">
              <span className="text-[9px] uppercase font-black text-emerald-400 block tracking-wider">Vaatsalya Featherlight Weight:</span>
              <div className="flex items-center gap-2">
                <span className="text-xl">🥗</span>
                <div>
                  <span className="text-sm font-black text-emerald-400 block">{(estimatedDryWeightGrams / 1000).toFixed(2)} kg</span>
                  <span className="text-[8.5px] text-slate-400 block font-bold">100% dry food load</span>
                </div>
              </div>
            </div>

            {/* Traditional packaged weight profile */}
            <div className="space-y-1.5 pl-2">
              <span className="text-[9px] uppercase font-black text-rose-400 block tracking-wider">Traditional Packed Items:</span>
              <div className="flex items-center gap-2">
                <span className="text-xl">🥫</span>
                <div>
                  <span className="text-sm font-black text-rose-400 block">{(estimatedCannedWeightGrams / 1000).toFixed(2)} kg</span>
                  <span className="text-[8.5px] text-slate-400 block font-bold">Heavy water-weight drag</span>
                </div>
              </div>
            </div>

          </div>

          <div className="inline-flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-wider">
            <AlertCircle className="w-4 h-4 text-[#FFB500] shrink-0" />
            <span>Saves approx. {((estimatedCannedWeightGrams - estimatedDryWeightGrams) / 1000).toFixed(1)} kg excess payload weight! Suitcase approved bounds!</span>
          </div>

        </div>

      </div>

    </div>
  );
}
