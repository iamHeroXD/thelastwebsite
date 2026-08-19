import React, { useState, useEffect } from 'react';
import { PortalShell } from './components/portal/PortalShell';
import { EndingModal } from './components/endings/EndingModal';
import { DebugOverlay } from './components/debug/DebugOverlay';

export const App: React.FC = () => {
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
    <>
      <PortalShell />
      <EndingModal />
      {showDebug && <DebugOverlay onClose={() => setShowDebug(false)} />}
    </>
  );
};
