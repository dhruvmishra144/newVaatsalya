import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export default function HowItWorksPage() {
  const [simulatorStep, setSimulatorStep] = useState(1);
  const [isSimulatorPlaying, setIsSimulatorPlaying] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isSimulatorPlaying) {
      interval = setInterval(() => {
        setSimulatorStep(prev => (prev === 4 ? 1 : prev + 1));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isSimulatorPlaying]);

  const prepSteps = [
    {
      step: 1,
      title: "Unlock Sleeping Fibers",
      subtitle: "Tear nitrogen dual-seal",
      emoji: "🥣",
      description: "Gently open the protective pouch. The hand-cooked basmati grains and spiced lentils sleep in a moisture-free static state with water content under 0.5%. Natural flavors and cow ghee are frozen in microscopic crystalline matrices.",
      color: "bg-amber-500 text-white border-amber-500",
      accentColor: "#FFB500"
    },
    {
      step: 2,
      title: "Thermal Activation Link",
      subtitle: "Add 100°C Boiling Water",
      emoji: "💧",
      description: "Pour boiling water up to the inner marked line. Inside, dehydrated starch cells instantly act as minute pumps, wicking fluid through capillaric attraction to rehydrate structural proteins & vitamins.",
      color: "bg-blue-500 text-white border-blue-500",
      accentColor: "#3B82F6"
    },
    {
      step: 3,
      title: "Steam-Convection Lock",
      subtitle: "Zip closed & steam bake",
      emoji: "🥄",
      description: "Secure the heavy-duty heat zipper. Convection currents circulate within the stand-up thermal pouch, maintaining a steady 95°C temperature that ensures uniform heat absorption from the core out.",
      color: "bg-amber-500 text-white border-amber-500",
      accentColor: "#F59E0B"
    },
    {
      step: 4,
      title: "Complete Flavor Restore",
      subtitle: "Unzip, fluff & savor",
      emoji: "😋",
      description: "At 5 minutes, unzip the bag. The Basmati rice has expanded to 3x its dry size, releasing standard homestyle aromas of cardamoms, fried cumin, and fresh turmeric. Fresh homestyle food is ready to eat!",
      color: "bg-emerald-500 text-white border-emerald-500",
      accentColor: "#10B981"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in" id="how_it_works_page">
      
      {/* Dynamic Keyframes Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes vaporRise {
          0% { transform: translateY(10px) scale(0.9); opacity: 0; }
          40% { opacity: 0.6; }
          100% { transform: translateY(-50px) scale(1.3); opacity: 0; }
        }
        @keyframes fiberPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 1; filter: drop-shadow(0 0 8px rgba(255, 181, 0, 0.4)); }
        }
        @keyframes liquidFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -30; }
        }
        .rise-slow { animation: vaporRise 3s infinite linear; }
        .rise-mid { animation: vaporRise 2.2s infinite linear 0.7s; }
        .rise-fast { animation: vaporRise 1.6s infinite linear 1.4s; }
        .pulse-starch { animation: fiberPulse 2.5s infinite ease-in-out; }
        .flow-fluid { stroke-dasharray: 6, 6; animation: liquidFlow 1.2s infinite linear; }
      `}} />

      {/* 1. HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] text-[#083765]/80 uppercase tracking-widest font-black block">Interactive Laboratory Simulator</span>
        <h1 className="text-4xl font-serif font-black text-[#083765]">How water restores mothers' love</h1>
        <p className="text-sm font-semibold text-slate-500">
          Unlock the advanced physical science of low-temperature vacuum dehydration. Use the controller below to play or click any step to see state transitions!
        </p>
      </div>

      {/* 2. CORE INTERACTIVE CHAMBER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Timeline click tabs */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <span className="text-[10.5px] uppercase font-black text-slate-400 tracking-wider">Preparation Milestones:</span>
          
          <div className="space-y-3.5">
            {prepSteps.map((item) => {
              const isCur = simulatorStep === item.step;
              return (
                <button
                  key={item.step}
                  onClick={() => { setSimulatorStep(item.step); setIsSimulatorPlaying(false); }}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden ${
                    isCur 
                      ? 'bg-amber-50/50 border-[#083765]/30 shadow-sm scale-[1.01]' 
                      : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                  }`}
                  id={`timeline_pill_${item.step}`}
                >
                  {isCur && (
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#FFB500]" />
                  )}
                  
                  <span className={`w-8 h-8 rounded-full border-2 font-black text-xs flex items-center justify-center shrink-0 transition-colors ${
                    isCur ? 'bg-[#083765] text-[#FFB500] border-[#083765]' : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}>
                    {item.step}
                  </span>
                  
                  <div className="space-y-1">
                    <h4 className="font-serif font-black text-[#083765] text-base flex items-center gap-1.5">
                      <span>{item.emoji}</span>
                      <span>{item.title}</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">{item.subtitle}</span>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed pt-1.5">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">Dynamic Play</span>
              <span className="text-xs font-bold text-[#083765]">Step through the 5-Min active cycle</span>
            </div>
            <button
              onClick={() => setIsSimulatorPlaying(!isSimulatorPlaying)}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                isSimulatorPlaying 
                  ? 'bg-rose-600 text-white hover:bg-rose-700 animate-pulse' 
                  : 'bg-[#083765] text-white hover:bg-slate-800'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulatorPlaying ? 'animate-spin' : ''}`} />
              {isSimulatorPlaying ? 'Stop Loop' : 'Auto Play Loop'}
            </button>
          </div>

        </div>

        {/* Right Side: Rehydration Chamber visual simulator block */}
        <div className="lg:col-span-7 flex">
          <div className="bg-[#083765] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl flex-grow flex flex-col justify-between space-y-6 relative overflow-hidden min-h-[500px]">
            
            {/* Holographic background wireframe */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50" />
            
            {/* Header of chamber */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB500]">Molecular Chamber Status</span>
              </div>
              <span className="text-xs font-mono text-slate-400 font-bold">MODE: REAL-TIME RESTORE</span>
            </div>

            {/* Chamber Core Illustration wrapper */}
            <div className="relative flex-1 flex flex-col items-center justify-center py-6 min-h-[250px] z-10" id="chamber_graphics_viewport">
              
              {/* STEAM/VAPOR LAYER PARTICLES */}
              {simulatorStep >= 2 && (
                <div className="absolute top-10 flex gap-6 text-2xl z-20">
                  <span className="rise-slow">💨</span>
                  <span className="rise-mid">💨</span>
                  <span className="rise-fast">💨</span>
                  <span className="rise-slow">💨</span>
                </div>
              )}

              {/* RENDER DYNAMIC MOLECULES */}
              {simulatorStep === 1 && (
                <div className="text-center space-y-4">
                  <div className="text-6xl animate-pulse">🥣</div>
                  <div className="space-y-1">
                    <span className="text-[#FFB500] font-black text-xs uppercase tracking-wider block">Dry Grains State</span>
                    <p className="text-[10px] text-slate-400 max-w-xs block font-semibold leading-relaxed">
                      Lentils & Basmati sleep in an airtight static environment. Moisture index is below 0.5% with high structural integrity.
                    </p>
                  </div>
                </div>
              )}

              {simulatorStep === 2 && (
                <div className="text-center space-y-6 relative">
                  {/* Boiling water flow illustration */}
                  <div className="text-6xl">💧👇</div>
                  <svg className="w-36 h-20 mx-auto" viewBox="0 0 100 40">
                    <path d="M50 0 L50 35" stroke="#3B82F6" strokeWidth="4" fill="none" className="flow-fluid" />
                  </svg>
                  <div className="space-y-1">
                    <span className="text-blue-400 font-black text-xs uppercase tracking-wider block">Fluid Infiltration Active</span>
                    <p className="text-[10px] text-slate-400 max-w-xs block font-semibold leading-relaxed">
                      100°C water enters starch cells. Heat instantly reactivates the cow ghee lipids.
                    </p>
                  </div>
                </div>
              )}

              {simulatorStep === 3 && (
                <div className="text-center space-y-4">
                  <div className="text-7xl animate-pulse">🔒♨️</div>
                  <div className="w-24 h-1 bg-[#FFB500] mx-auto rounded-full animate-pulse" />
                  <div className="space-y-1">
                    <span className="text-amber-400 font-black text-xs uppercase tracking-wider block">Thermal Back-Baking (Convection)</span>
                    <p className="text-[10px] text-slate-300 max-w-xs block font-semibold leading-relaxed">
                      Silicon Ziplock traps pressure inside. Temperature core locked at 95°C.
                    </p>
                  </div>
                </div>
              )}

              {simulatorStep === 4 && (
                <div className="text-center space-y-4 animate-fade-in">
                  <div className="text-7xl pulse-starch">🍲✨</div>
                  <span className="text-emerald-400 font-black text-xs uppercase tracking-wider block">Gourmet Form Restored!</span>
                  <div className="space-y-1">
                    <p className="text-[10px] text-emerald-100 max-w-xs mx-auto font-semibold leading-relaxed">
                      Water absorbed 100%. Traditional basmati rice fibers are fluffy, fragrant, and fully restored to their homestyle state. Add grass-fed ghee!
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Interactive Data Panel summary */}
            <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
              <div className="space-y-1 flex-1">
                <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Chamber Environment Readout</span>
                <span className="text-xs font-black block text-[#FFB500]">
                  {simulatorStep === 1 && "State: Low-Mass Crystalline Solids • 22°C"}
                  {simulatorStep === 2 && "State: Infiltration & Fluid Expansion • 100°C"}
                  {simulatorStep === 3 && "State: Convection Steam Retention • 95°C"}
                  {simulatorStep === 4 && "State: High-Mass Soft Fiber Restored • 75°C"}
                </span>
                <span className="text-[9px] text-slate-400 font-bold block">
                  {simulatorStep === 1 && "Static cell molecules • Zero yeast movement"}
                  {simulatorStep === 2 && "Wicking process starts • Fast metabolic restore"}
                  {simulatorStep === 3 && "Thermal heat lock active • Pressure matrix stable"}
                  {simulatorStep === 4 && "Aromic ghee elements released • Ready for digestion"}
                </span>
              </div>

              {/* Progress visual bar */}
              <div className="flex gap-1.5 sm:flex-col justify-center text-slate-400 font-bold">
                {[1, 2, 3, 4].map((step) => (
                  <span 
                    key={step} 
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px] font-black ${
                      simulatorStep === step 
                        ? 'bg-[#FFB500] text-[#083765] border-[#FFB500]' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    {step}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
