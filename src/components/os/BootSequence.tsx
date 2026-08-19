import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { soundEngine } from '../../audio/soundEngine';
import { Terminal, Shield, Play, RotateCcw, Cpu } from 'lucide-react';

export const BootSequence: React.FC = () => {
  const setBootState = useGameStore((state) => state.setBootState);
  const archiveIntegrity = useGameStore((state) => state.archiveIntegrity);
  const unlockedUrls = useGameStore((state) => state.unlockedUrls);

  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [horizontalBeam, setHorizontalBeam] = useState(true);

  useEffect(() => {
    // Phase 1: Thin expanding CRT beam line
    const beamTimer = setTimeout(() => {
      setHorizontalBeam(false);
      soundEngine.playBootBeep();
    }, 800);

    // Phase 2: Sequential authentic POST boot messages
    const sequence = [
      'INITIALIZING ORBIT ARCHIVE WORKSTATION...',
      'MEMORY CHECK ............ 640KB BASE / 64MB EXTENDED .... OK',
      'HARDWARE BUS ............ BUS_TYPE_ISA_64 .... OK',
      'SYSTEM CLOCK ............ ERROR [LAST SYNC: 2087-11-03 23:59:59]',
      'IONOSPHERIC RECEIVER .... FREQUENCY 440MHZ DETECTED',
      'NETWORK ADAPTER ......... FOUND (CARRIER WAVE LINK)',
      'RECOVERY MODE ............ ACTIVE [NODE 001]',
      '------------------------------------------------------------------',
      '> SCANNING ATMOSPHERIC FREQUENCIES FOR SURVIVING WEBSITES...',
      '> 10 NODES FOUND',
      '> INTERNET ACCESS RESTORED',
      '------------------------------------------------------------------',
      'SYSTEM READY.'
    ];

    let lineIndex = 0;
    const lineInterval = setInterval(() => {
      if (lineIndex < sequence.length) {
        soundEngine.playKeyClick();
        if (sequence[lineIndex].includes('OK') || sequence[lineIndex].includes('FOUND')) {
          soundEngine.playDiskSeek();
        }
        setBootLines((prev) => [...prev, sequence[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(lineInterval);
        setTimeout(() => {
          soundEngine.playDiscovery();
          setBootComplete(true);
        }, 500);
      }
    }, 180);

    return () => {
      clearTimeout(beamTimer);
      clearInterval(lineInterval);
    };
  }, []);

  const handleEnterArchive = () => {
    soundEngine.playKeyClick();
    setBootState('BROWSER');
  };

  return (
    <div className="relative w-full h-full bg-crt-dark p-6 md:p-12 flex flex-col justify-between select-none overflow-hidden">
      {/* Thin Horizontal CRT Beam Expansion Effect */}
      {horizontalBeam && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 bg-black">
          <div className="w-full h-1 bg-crt-green shadow-[0_0_25px_#00ff66] animate-pulse" />
        </div>
      )}

      {/* Top Header System Telemetry */}
      <div className="flex justify-between items-center text-xs text-crt-green/70 border-b border-crt-green/30 pb-2">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-crt-green" />
          <span className="font-bold">ORBIT BIOS v4.81 — RECOVERY TERMINAL</span>
        </div>
        <div>
          <span>DATE: 2087-11-03</span>
        </div>
      </div>

      {/* Center Console Output Log */}
      <div className="flex-1 my-6 space-y-1.5 overflow-y-auto text-xs md:text-sm font-mono tracking-wide">
        {bootLines.map((line, idx) => (
          <div
            key={idx}
            className={`${
              line.includes('ERROR')
                ? 'text-amber-400 font-bold'
                : line.includes('RESTORED') || line.includes('READY')
                ? 'text-crt-green font-bold'
                : 'text-crt-green/90'
            }`}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Bottom Title & Action Buttons when boot is complete */}
      {bootComplete && (
        <div className="border-t-2 border-crt-green/40 pt-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-widest text-crt-green drop-shadow-[0_0_15px_rgba(0,255,102,0.6)] uppercase">
              THE LAST WEBSITE ON EARTH
            </h1>
            <p className="text-sm md:text-base text-amber-400 font-bold tracking-wide mt-2">
              The internet is dead. Something is still online.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleEnterArchive}
              className="flex items-center space-x-2 px-6 py-3 bg-crt-green hover:bg-emerald-300 text-black font-extrabold rounded shadow-[0_0_20px_rgba(0,255,102,0.5)] transition-all hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>ENTER ARCHIVE BROWSER</span>
            </button>

            <button
              onClick={() => setBootState('DESKTOP')}
              className="flex items-center space-x-2 px-5 py-3 border border-crt-green hover:bg-crt-green/20 text-crt-green font-bold rounded transition-all"
            >
              <Terminal className="w-5 h-5" />
              <span>OPEN OS DESKTOP</span>
            </button>

            <div className="ml-auto text-xs text-crt-green/60 flex items-center space-x-3">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>RECOVERED SITES: {unlockedUrls.length} / 10</span>
              <span>INTEGRITY: {archiveIntegrity}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
