import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { soundEngine } from '../../audio/soundEngine';
import { Radio, Volume2, Power, Signal } from 'lucide-react';

export const RadioScanner: React.FC = () => {
  const isRadioOn = useGameStore((state) => state.isRadioOn);
  const toggleRadio = useGameStore((state) => state.toggleRadio);
  const [freq, setFreq] = useState(440.0);
  const [logMessage, setLogMessage] = useState('RECEIVER STANDBY');

  const handleFreqChange = (newFreq: number) => {
    soundEngine.playKeyClick();
    setFreq(newFreq);
    if (newFreq === 440.0) {
      setLogMessage('CARRIER WAVE MATCHED // ATMOSPHERIC SIGNAL DETECTED');
    } else if (newFreq === 444.4) {
      setLogMessage('NODE 001 FREQUENCY DETECTED // HIGH HARMONIC RESIDUE');
    } else {
      setLogMessage('BACKGROUND COSMIC NOISE');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-crt-dark p-6 text-crt-green font-mono select-none">
      <div className="flex items-center justify-between border-b border-crt-green/30 pb-3 mb-6">
        <div className="flex items-center space-x-2">
          <Radio className="w-6 h-6 text-amber-400 animate-pulse" />
          <h2 className="text-lg font-bold">ATMOSPHERIC RADIO SCANNER (440MHz)</h2>
        </div>

        <button
          onClick={() => toggleRadio()}
          className={`flex items-center space-x-2 px-4 py-1.5 rounded font-bold text-xs transition-colors ${
            isRadioOn
              ? 'bg-red-600 text-white hover:bg-red-500'
              : 'bg-crt-green text-black hover:bg-emerald-300'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{isRadioOn ? 'POWER DOWN SCANNER' : 'POWER UP SCANNER'}</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-6">
        {/* Frequency Dial & Meter */}
        <div className="p-6 bg-black border-2 border-crt-green/40 rounded-xl space-y-4 text-center shadow-inner">
          <div className="text-xs text-crt-green/70 font-bold">TUNED FREQUENCY</div>
          <div className="text-4xl font-extrabold text-amber-400 tracking-wider">
            {freq.toFixed(2)} MHz
          </div>

          <input
            type="range"
            min="435.0"
            max="450.0"
            step="0.1"
            value={freq}
            onChange={(e) => handleFreqChange(parseFloat(e.target.value))}
            className="w-full accent-amber-400 bg-crt-dark cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-crt-green/50">
            <span>435.0 MHz</span>
            <span className="text-amber-400 font-bold">440.0 MHz (PROJECT ECHO)</span>
            <span>450.0 MHz</span>
          </div>
        </div>

        {/* Transmission Log Display */}
        <div className="p-4 bg-crt-dark border border-crt-green/30 rounded space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-crt-green">
            <Signal className={`w-4 h-4 ${isRadioOn ? 'text-crt-green animate-ping' : 'text-stone-600'}`} />
            <span>SIGNAL FEED LOG</span>
          </div>

          <div className="text-xs text-amber-400 font-bold leading-relaxed">
            {isRadioOn ? logMessage : 'RADIO RECEIVER POWERED OFF'}
          </div>

          {isRadioOn && (
            <div className="text-[10px] text-crt-green/60 pt-2 border-t border-crt-green/10">
              AUDIO SPECTRUM: IONOSPHERIC CARRIER WAVE ENCODING ACTIVE.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
