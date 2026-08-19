import React from 'react';
import { useGameStore } from './store/useGameStore';
import { CRTMonitor } from './components/crt/CRTMonitor';
import { BootSequence } from './components/os/BootSequence';
import { Desktop } from './components/os/Desktop';
import { EndingModal } from './components/endings/EndingModal';

export const App: React.FC = () => {
  const bootState = useGameStore((state) => state.bootState);

  return (
    <CRTMonitor>
      {bootState === 'OFF' || bootState === 'BOOTING' ? (
        <BootSequence />
      ) : (
        <Desktop />
      )}
      <EndingModal />
    </CRTMonitor>
  );
};
