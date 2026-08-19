import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CRTScreenOverlay } from './CRTScreenOverlay';
import { SettingsModal } from './SettingsModal';
import { Power, Sliders, Info, ShieldAlert } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

export const CRTMonitor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bootState = useGameStore((state) => state.bootState);
  const setBootState = useGameStore((state) => state.setBootState);
  const archiveIntegrity = useGameStore((state) => state.archiveIntegrity);
  const [showSettings, setShowSettings] = useState(false);

  const handlePowerToggle = () => {
    soundEngine.playPowerClick();
    if (bootState === 'OFF') {
      setBootState('BOOTING');
    } else {
      setBootState('OFF');
    }
  };

  const isPoweredOn = bootState !== 'OFF';

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center p-2 md:p-6 select-none font-mono">
      {/* Dark Ambient Room Environment Background & Faint Reflections */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-black to-neutral-950 pointer-events-none opacity-90" />
      
      {/* Floating Dust Particles Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#00ff66_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Main Physical CRT Monitor Outer Frame */}
      <div className="relative w-full max-w-[1400px] h-full max-h-[920px] bg-neutral-900 border-4 border-stone-800 rounded-3xl p-4 md:p-8 shadow-[0_0_100px_rgba(0,0,0,0.9)] flex flex-col justify-between z-10">
        
        {/* CRT Top Ventilation Slits & Brand Stamping */}
        <div className="w-full flex items-center justify-between px-4 pb-2 border-b border-stone-800 text-stone-600 text-xs">
          <div className="flex space-x-2">
            <span className="w-12 h-1 bg-stone-800 rounded" />
            <span className="w-12 h-1 bg-stone-800 rounded" />
            <span className="w-12 h-1 bg-stone-800 rounded" />
          </div>
          <div className="tracking-widest font-bold text-stone-500 flex items-center space-x-2">
            <span>ORBIT TERMINAL WORKSTATION — MODEL 2087-C</span>
          </div>
          <div className="flex space-x-2">
            <span className="w-12 h-1 bg-stone-800 rounded" />
            <span className="w-12 h-1 bg-stone-800 rounded" />
          </div>
        </div>

        {/* CRT Inner Screen Bezel */}
        <div className="relative flex-1 w-full my-3 bg-stone-950 border-8 border-stone-800 rounded-2xl p-2 md:p-4 shadow-inner overflow-hidden">
          {/* Inner Curved Glass & Screen Shader Overlay */}
          <CRTScreenOverlay>{children}</CRTScreenOverlay>
        </div>

        {/* CRT Bottom Control Panel & Bezel Buttons */}
        <div className="w-full bg-stone-900 border-t border-stone-800 pt-3 px-4 flex flex-wrap items-center justify-between gap-4">
          
          {/* Diagnostic Status Indicator */}
          <div className="flex items-center space-x-4 text-xs text-stone-400">
            <div className="flex items-center space-x-2">
              <span className="text-stone-500 font-bold">SYSTEM STATUS:</span>
              <span className={isPoweredOn ? 'text-crt-green font-bold animate-pulse' : 'text-stone-600'}>
                {isPoweredOn ? 'ACTIVE // ONLINE' : 'STANDBY'}
              </span>
            </div>

            {isPoweredOn && (
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-stone-500 font-bold">ARCHIVE INTEGRITY:</span>
                <span className="text-amber-400 font-bold">{archiveIntegrity}%</span>
              </div>
            )}
          </div>

          {/* Hardware Buttons & Power LED */}
          <div className="flex items-center space-x-3">
            {/* CRT Settings Button */}
            <button
              onClick={() => {
                soundEngine.playKeyClick();
                setShowSettings(true);
              }}
              className="flex items-center space-x-1 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-700 text-xs transition-colors"
              title="CRT Display & Audio Controls"
            >
              <Sliders className="w-4 h-4 text-crt-green" />
              <span className="hidden md:inline">CONFIG</span>
            </button>

            {/* Power Status LED Light */}
            <div className="flex items-center space-x-2 px-2 py-1 bg-stone-950 border border-stone-800 rounded">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isPoweredOn
                    ? 'bg-crt-green shadow-[0_0_10px_#00ff66]'
                    : 'bg-red-950 border border-red-800'
                }`}
              />
              <span className="text-[10px] text-stone-500 font-bold uppercase">
                {isPoweredOn ? 'PWR' : 'OFF'}
              </span>
            </div>

            {/* Physical Power Button */}
            <button
              onClick={handlePowerToggle}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg font-bold text-xs shadow-md transition-all ${
                isPoweredOn
                  ? 'bg-red-900/80 hover:bg-red-800 text-red-200 border border-red-700'
                  : 'bg-crt-green hover:bg-emerald-400 text-black border border-emerald-300 animate-pulse-glow'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{isPoweredOn ? 'POWER DOWN' : 'POWER ON'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
};
