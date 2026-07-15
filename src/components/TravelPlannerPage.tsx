import { useState, useMemo } from 'react';
import { 
  Luggage, AlertCircle, ShoppingCart, CheckCircle
} from 'lucide-react';

interface TravelPlannerProps {
  handleAddTravelBundle: (days: number, mealsPerDay: number, profile: 'mild' | 'regular' | 'spicy') => void;
}

export default function TravelPlannerPage({
  handleAddTravelBundle
}: TravelPlannerProps) {
  const [activeTab, setActiveTab] = useState<'backpack' | 'processing'>('backpack');
  
  // Tab A: Backpack state
  const [travelDays, setTravelDays] = useState(7);
  const [mealsPerDay, setMealsPerDay] = useState(2);
  const [customizerPackage, setCustomizerPackage] = useState<'mild' | 'regular' | 'spicy'>('regular');
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);

  // Tab B: Dehydration Processing state
  const [dehydratedWeights, setDehydratedWeights] = useState({
    kaleChane: '',
    shahiPaneer: '',
  });
  const [dispatchMethod, setDispatchMethod] = useState('courier');
  const [deliveryDate, setDeliveryDate] = useState('');
  
  // Controlled Checkout details for processing
  const [processingDetails, setProcessingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isProcessingSubmitted, setIsProcessingSubmitted] = useState(false);

  // Math metrics (Backpack)
  const totalMeals = useMemo(() => travelDays * mealsPerDay, [travelDays, mealsPerDay]);
  const estimatedDryWeightGrams = useMemo(() => totalMeals * 85, [totalMeals]);
  const estimatedCannedWeightGrams = useMemo(() => totalMeals * 480, [totalMeals]); // Heavy tiffins or tins

  const handleOrderBundle = () => {
    handleAddTravelBundle(travelDays, mealsPerDay, customizerPackage);
    setAddedSuccessfully(true);
    setTimeout(() => setAddedSuccessfully(false), 3000);
  };

  // Processing calculations
  const kcWeight = Number(dehydratedWeights.kaleChane) || 0;
  const spWeight = Number(dehydratedWeights.shahiPaneer) || 0;
  const totalWeightGrams = kcWeight + spWeight;
  const totalWeightKg = totalWeightGrams / 1000;
  const baseProcessingRate = 350; // ₹350/kg
  const totalCost = totalWeightKg * baseProcessingRate;

  const handleWeightChange = (item: 'kaleChane' | 'shahiPaneer', val: string) => {
    if (val === '') {
      setDehydratedWeights(prev => ({ ...prev, [item]: '' }));
      return;
    }
    const num = Math.min(70, Math.max(0, parseInt(val) || 0));
    setDehydratedWeights(prev => ({ ...prev, [item]: num.toString() }));
  };

  const handleProcessingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingSubmitted(true);
    setTimeout(() => {
      setIsProcessingSubmitted(false);
      setDehydratedWeights({ kaleChane: '', shahiPaneer: '' });
      setDeliveryDate('');
      setProcessingDetails({ name: '', email: '', phone: '', address: '' });
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in" id="travel_planner_page">
      
      {/* 1. HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] text-[#083765]/80 uppercase tracking-widest font-black block">Lightweight Carrying Calculator</span>
        <h1 className="text-4xl font-serif font-black text-[#083765]">Backpack & Custom Processing</h1>
        <p className="text-sm font-semibold text-slate-500 leading-relaxed">
          Estimate carry weights or book custom dehydration processing. Pack high-nutrient food without paying for excess luggage fees.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center border-b border-warm-soft max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('backpack')}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider text-center border-b-4 transition-all cursor-pointer ${
            activeTab === 'backpack' 
              ? 'border-navy text-navy font-black' 
              : 'border-transparent text-slate-400 hover:text-navy/70'
          }`}
        >
          💼 Backpack Loader
        </button>
        <button
          onClick={() => setActiveTab('processing')}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider text-center border-b-4 transition-all cursor-pointer ${
            activeTab === 'processing' 
              ? 'border-navy text-navy font-black' 
              : 'border-transparent text-slate-400 hover:text-navy/70'
          }`}
        >
          🍳 Custom Processing
        </button>
      </div>

      {/* MODE A: Backpack Weight Customizer */}
      {activeTab === 'backpack' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-in">
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50" />
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
              <span className="text-[10px] font-black uppercase text-[#FFB500] tracking-widest flex items-center gap-1.5">
                <Luggage className="w-4 h-4" /> Visual Backpack Weight Loader
              </span>
              <span className="text-[9px] text-[#FCFAF2]/60 font-mono">ESTIMATOR: CALIBRATED</span>
            </div>

            {/* Dynamic suitcase illustration with pouches inside */}
            <div className="relative py-4 flex-1 flex flex-col items-center justify-center" id="visual_backpack_loading_chamber">
              <div className="w-56 sm:w-60 h-64 border-4 border-dashed border-slate-500 bg-slate-800/40 rounded-3xl p-4 flex flex-col justify-between shadow-inner relative">
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-14 h-4 border-2 border-dashed border-slate-500 rounded-t-md" />
                <div className="text-[9.5px] font-mono text-slate-500 font-extrabold uppercase tracking-wide text-center">
                  Backpack Capacity Map
                </div>
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
      ) : (
        /* MODE B: Custom Dehydration Processing (Mom's Cooked Food) */
        <div className="bg-white rounded-3xl border border-[#F4EFE6] p-6 sm:p-10 shadow-xs max-w-4xl mx-auto animate-fade-in">
          
          <div className="border-b border-[#F4EFE6] pb-4 mb-6">
            <h2 className="text-2.5xl font-serif font-black text-[#083765] text-center" id="processing_section_title">
              Mom's Cooked Food
            </h2>
            <p className="text-xs text-slate-500 font-semibold text-center mt-1">
              Custom dehydration processing service. Bring your raw home dishes and preserve them for long travels.
            </p>
          </div>

          {isProcessingSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 py-8 animate-fade-in" id="processing_success">
              <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-black text-navy text-lg">Booking Confirmed!</h3>
                <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
                  Your custom food dehydration processing order has been scheduled successfully. Please keep your food portions ready.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleProcessingSubmit} className="space-y-6 text-xs font-semibold text-navy">
              
              {/* 1. Item Portions Grid */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-slate-400 block">
                  1. Input Portion Weights (Dehydrated Items)
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Kale Chane Input */}
                  <div className="space-y-1">
                    <label className="text-navy block font-bold" htmlFor="kc_weight_input">
                      Kale Chane Portion (g)
                    </label>
                    <input 
                      id="kc_weight_input"
                      type="number" 
                      min={0} 
                      max={70} 
                      value={dehydratedWeights.kaleChane} 
                      onChange={(e) => handleWeightChange('kaleChane', e.target.value)} 
                      placeholder="0"
                      className="w-full border border-slate-200 focus:border-navy rounded-xl p-3 focus:outline-none text-xs font-semibold text-navy bg-warm-cream/50"
                    />
                    <p className="text-[10px] text-slate-400 font-bold mt-1">
                      Maximum 70g per portion for dehydrated items.
                    </p>
                  </div>

                  {/* Shahi Paneer Input */}
                  <div className="space-y-1">
                    <label className="text-navy block font-bold" htmlFor="sp_weight_input">
                      Shahi Paneer Portion (g)
                    </label>
                    <input 
                      id="sp_weight_input"
                      type="number" 
                      min={0} 
                      max={70} 
                      value={dehydratedWeights.shahiPaneer} 
                      onChange={(e) => handleWeightChange('shahiPaneer', e.target.value)} 
                      placeholder="0"
                      className="w-full border border-slate-200 focus:border-navy rounded-xl p-3 focus:outline-none text-xs font-semibold text-navy bg-warm-cream/50"
                    />
                    <p className="text-[10px] text-slate-400 font-bold mt-1">
                      Maximum 70g per portion for dehydrated items.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Dispatch/Shipping Choice */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 block">
                  2. How would you like to send your food to us?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'courier', label: 'Courier Dispatch 📦', desc: 'Secure doorstep pickup' },
                    { value: 'self', label: 'Self Drop-off 🏢', desc: 'Deliver to our culinary hub' }
                  ].map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setDispatchMethod(method.value)}
                      className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        dispatchMethod === method.value 
                          ? 'border-navy bg-warm-cream text-navy' 
                          : 'border-slate-100 hover:border-slate-200 text-slate-500'
                      }`}
                    >
                      <span className="font-extrabold block text-xs leading-none">{method.label}</span>
                      <span className="text-[9px] text-slate-400 font-bold block mt-1.5 leading-tight">{method.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Delivery Scheduling Date Picker */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 block" htmlFor="processing_delivery_date">
                  3. Delivery Date Selection
                </label>
                <input
                  id="processing_delivery_date"
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full border border-slate-200 focus:border-navy rounded-xl p-3 focus:outline-none text-xs font-semibold text-navy bg-warm-cream/50"
                />
                <div className="p-3 bg-amber-50/50 border border-amber-200/50 rounded-xl text-[10px] font-black text-amber-800 flex items-center gap-1.5 mt-1">
                  <span className="text-xs">⚠️</span>
                  <span>Porter charges apply.</span>
                </div>
              </div>

              {/* 4. Totals and Calculations Display */}
              <div className="bg-[#FCFAF2] p-4.5 rounded-2xl border border-[#F4EFE6] space-y-4">
                <h4 className="font-serif font-black text-[#083765] text-sm border-b border-[#F4EFE6] pb-1.5 flex items-center justify-between">
                  <span>Weight & Pricing Details</span>
                  <span className="text-emerald-700 text-xs font-black">Base Rate: ₹350/kg</span>
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-400">Total Dry Weight:</span>
                    <span className="text-[#083765] font-black">{totalWeightKg.toFixed(3)} kg</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold border-l border-slate-200 pl-4">
                    <span className="text-slate-400">Processing Charge:</span>
                    <span className="text-[#083765] text-lg font-black font-mono">₹{totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* 5. Checkout Coordinates */}
              <div className="space-y-4 pt-2 border-t border-[#F4EFE6]">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">
                  4. Shipping Details Coordinates
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-500 block font-bold" htmlFor="proc_name">Full Name *</label>
                    <input 
                      id="proc_name"
                      type="text" 
                      required
                      placeholder="E.g., Dhruv Sharma"
                      value={processingDetails.name}
                      onChange={(e) => setProcessingDetails({ ...processingDetails, name: e.target.value })}
                      className="w-full border border-slate-200 focus:border-navy p-3 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 block font-bold" htmlFor="proc_email">Email Address *</label>
                    <input 
                      id="proc_email"
                      type="email" 
                      required
                      placeholder="dhruv@example.com"
                      value={processingDetails.email}
                      onChange={(e) => setProcessingDetails({ ...processingDetails, email: e.target.value })}
                      className="w-full border border-slate-200 focus:border-navy p-3 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 block font-bold" htmlFor="proc_phone">Phone Number *</label>
                    <input 
                      id="proc_phone"
                      type="tel" 
                      required
                      placeholder="+91 99999 88888"
                      value={processingDetails.phone}
                      onChange={(e) => setProcessingDetails({ ...processingDetails, phone: e.target.value })}
                      className="w-full border border-slate-200 focus:border-navy p-3 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 block font-bold" htmlFor="proc_address">Pickup & Delivery Address *</label>
                  <textarea 
                    id="proc_address"
                    required
                    rows={2}
                    placeholder="E.g., Hostel Block C, Suite 305, IIT Delhi"
                    value={processingDetails.address}
                    onChange={(e) => setProcessingDetails({ ...processingDetails, address: e.target.value })}
                    className="w-full border border-slate-200 focus:border-navy p-3 rounded-xl focus:outline-none font-semibold"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={totalWeightGrams === 0}
                className="w-full py-4 bg-navy text-accent-orange hover:bg-[#062444] rounded-xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Custom Dehydration Processing
              </button>

            </form>
          )}

        </div>
      )}

    </div>
  );
}
