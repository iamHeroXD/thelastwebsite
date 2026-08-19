import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Volume2, Eye, RotateCcw, X, Sliders, Palette } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';
import { CRTPhosphorTheme } from '../../types/game';

export const SettingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const crtSettings = useGameStore((state) => state.crtSettings);
  const updateCRTSettings = useGameStore((state) => state.updateCRTSettings);
  const resetGame = useGameStore((state) => state.resetGame);

  const themes: { id: CRTPhosphorTheme; name: string; color: string }[] = [
    { id: 'green', name: 'CYBER GREEN', color: '#00ff66' },
    { id: 'amber', name: 'AMBER PHOSPHOR', color: '#ffb000' },
    { id: 'cyan', name: 'CYAN MATRIX', color: '#00e5ff' },
    { id: 'white', name: 'VINTAGE WHITE', color: '#e5e5e5' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-crt-bezel border-2 border-crt-green rounded-lg shadow-2xl p-6 text-crt-green font-mono relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-crt-green/40 pb-3 mb-6">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-crt-green" />
            <h2 className="text-xl font-bold tracking-widest uppercase">SYSTEM & CRT CONFIGURATION</h2>
          </div>
          <button
            onClick={() => {
              soundEngine.playKeyClick();
              onClose();
            }}
            className="p-1 hover:bg-crt-green hover:text-black rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* PHOSPHOR COLOR THEME */}
          <div className="space-y-2 border-b border-crt-green/20 pb-4">
            <div className="flex items-center space-x-2 text-crt-green/80 font-bold text-xs">
              <Palette className="w-4 h-4" />
              <span>PHOSPHOR COLOR SCHEME</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    soundEngine.playKeyClick();
                    updateCRTSettings({ phosphorTheme: t.id });
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 border rounded text-xs transition-colors ${
                    crtSettings.phosphorTheme === t.id
                      ? 'border-white font-bold bg-white/10'
                      : 'border-crt-green/30 hover:border-crt-green'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: t.color }} />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* DISPLAY / CRT SECTION */}
          <div className="space-y-3 border-b border-crt-green/20 pb-4">
            <div className="flex items-center space-x-2 text-crt-green/80 font-bold text-xs">
              <Eye className="w-4 h-4" />
              <span>VISUAL & CRT SHADER SETTINGS</span>
            </div>

            {/* CRT Intensity Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>CRT EFFECT INTENSITY</span>
                <span>{Math.round(crtSettings.intensity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={crtSettings.intensity}
                onChange={(e) => updateCRTSettings({ intensity: parseFloat(e.target.value) })}
                className="w-full accent-crt-green bg-crt-dark cursor-pointer"
              />
            </div>

            {/* Brightness Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>SCREEN BRIGHTNESS</span>
                <span>{Math.round(crtSettings.brightness * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                value={crtSettings.brightness}
                onChange={(e) => updateCRTSettings({ brightness: parseFloat(e.target.value) })}
                className="w-full accent-crt-green bg-crt-dark cursor-pointer"
              />
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={crtSettings.scanlines}
                  onChange={(e) => updateCRTSettings({ scanlines: e.target.checked })}
                  className="accent-crt-green"
                />
                <span>SCANLINES</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={crtSettings.chromatic}
                  onChange={(e) => updateCRTSettings({ chromatic: e.target.checked })}
                  className="accent-crt-green"
                />
                <span>CHROMATIC ABERRATION</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={crtSettings.flicker}
                  onChange={(e) => updateCRTSettings({ flicker: e.target.checked })}
                  className="accent-crt-green"
                />
                <span>SCREEN FLICKER</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={crtSettings.reducedMotion}
                  onChange={(e) => updateCRTSettings({ reducedMotion: e.target.checked })}
                  className="accent-crt-green"
                />
                <span>REDUCED MOTION</span>
              </label>
            </div>
          </div>

          {/* AUDIO SECTION */}
          <div className="space-y-3 border-b border-crt-green/20 pb-4">
            <div className="flex items-center space-x-2 text-crt-green/80 font-bold text-xs">
              <Volume2 className="w-4 h-4" />
              <span>SYNTHESIZED AUDIO CONTROLS</span>
            </div>

            {/* Master Volume */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>MASTER VOLUME</span>
                <span>{Math.round(crtSettings.audioVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={crtSettings.audioVolume}
                onChange={(e) => updateCRTSettings({ audioVolume: parseFloat(e.target.value) })}
                className="w-full accent-crt-green bg-crt-dark cursor-pointer"
              />
            </div>

            {/* Ambient Synth Volume */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>ATMOSPHERIC SYNTH SOUNDTRACK</span>
                <span>{Math.round(crtSettings.musicVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={crtSettings.musicVolume}
                onChange={(e) => updateCRTSettings({ musicVolume: parseFloat(e.target.value) })}
                className="w-full accent-crt-green bg-crt-dark cursor-pointer"
              />
            </div>

            {/* CRT Electrical Hum Volume */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>CRT ELECTRICAL HUM (60Hz)</span>
                <span>{Math.round(crtSettings.humVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={crtSettings.humVolume}
                onChange={(e) => updateCRTSettings({ humVolume: parseFloat(e.target.value) })}
                className="w-full accent-crt-green bg-crt-dark cursor-pointer"
              />
            </div>

            {/* Mute Toggle */}
            <label className="flex items-center space-x-2 text-xs cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={crtSettings.muted}
                onChange={(e) => updateCRTSettings({ muted: e.target.checked })}
                className="accent-crt-green"
              />
              <span className="font-bold text-amber-400">MUTE ALL SOUNDS</span>
            </label>
          </div>

          {/* GAME RESET SECTION */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all investigation progress and memory storage?')) {
                  resetGame();
                  onClose();
                }
              }}
              className="flex items-center space-x-2 px-3 py-1.5 border border-red-500/60 text-red-400 hover:bg-red-500 hover:text-black rounded text-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESET ARCHIVE SAVE DATA</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playKeyClick();
                onClose();
              }}
              className="px-5 py-1.5 bg-crt-green text-black font-bold rounded hover:bg-emerald-300 text-xs transition-colors"
            >
              APPLY & CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
