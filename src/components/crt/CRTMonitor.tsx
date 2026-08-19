import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CRTScreenOverlay } from './CRTScreenOverlay';
import { SettingsModal } from './SettingsModal';
import { Power, Sliders, Shield, Cpu, Activity, Wifi, Radio } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

export const CRTMonitor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bootState = useGameStore((state) => state.bootState);
  const setBootState = useGameStore((state) => state.setBootState);
  const archiveIntegrity = useGameStore((state) => state.archiveIntegrity);
  const isRadioOn = useGameStore((state) => state.isRadioOn);
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
    <div className="relative w-screen h-screen bg-black overflow-hidden flex flex-col justify-between m-0 p-0 select-none font-mono">
      {/* Futuristic 2087 Cyber HUD Header */}
      <div className="relative z-50 w-full bg-stone-950 border-b border-crt-green/40 px-3 py-1.5 flex items-center justify-between text-xs text-crt-green">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 font-bold tracking-widest text-amber-400">
            <Cpu className="w-4 h-4 text-crt-green animate-pulse" />
            <span>ORBIT 2087 WORKSTATION // NODE 001</span>
          </div>

          <div className="hidden md:flex items-center space-x-3 text-[11px] text-crt-green/80">
            <div className="flex items-center space-x-1">
              <Wifi className="w-3 h-3 text-crt-green" />
              <span>CARRIER WAVE: <span className="text-crt-green font-bold">440.0 MHz</span></span>
            </div>

            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-amber-400" />
              <span>IONIZATION: <span className="text-amber-400 font-bold">99.4%</span></span>
            </div>
          </div>
        </div>

        {/* HUD Quick Tools & Power */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-1 text-[11px]">
            <span className="text-stone-400">INTEGRITY:</span>
            <span className="text-amber-400 font-bold">{archiveIntegrity}%</span>
          </div>

          {/* CRT Config Button */}
          <button
            onClick={() => {
              soundEngine.playKeyClick();
              setShowSettings(true);
            }}
            className="flex items-center space-x-1 px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-crt-green rounded border border-crt-green/40 text-xs transition-colors"
            title="Display & Audio Config"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-bold">CONFIG</span>
          </button>

          {/* Power Toggle Button */}
          <button
            onClick={handlePowerToggle}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded font-bold text-xs shadow-md transition-all ${
              isPoweredOn
                ? 'bg-red-900/80 hover:bg-red-800 text-red-200 border border-red-700'
                : 'bg-crt-green hover:bg-emerald-400 text-black border border-emerald-300 animate-pulse'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isPoweredOn ? 'PWR DOWN' : 'PWR ON'}</span>
          </button>
        </div>
      </div>

      {/* 100% Full-Bleed Viewport Screen Content */}
      <div className="relative flex-1 w-full h-full bg-crt-dark overflow-hidden">
        <CRTScreenOverlay>{children}</CRTScreenOverlay>
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
};
