import React, { useState, useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { CRTMonitor } from './components/crt/CRTMonitor';
import { BootSequence } from './components/os/BootSequence';
import { Desktop } from './components/os/Desktop';
import { EndingModal } from './components/endings/EndingModal';
import { DebugOverlay } from './components/debug/DebugOverlay';

export const App: React.FC = () => {
  const bootState = useGameStore((state) => state.bootState);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && (e.key === 'D' || e.key === 'd')) {
        setShowDebug((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CRTMonitor>
      {bootState === 'OFF' || bootState === 'BOOTING' ? (
        <BootSequence />
      ) : (
        <Desktop />
      )}
      <EndingModal />
      {showDebug && <DebugOverlay onClose={() => setShowDebug(false)} />}
    </CRTMonitor>
  );
};
