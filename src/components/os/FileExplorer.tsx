import React, { useState } from 'react';
import { FSNode } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';
import { soundEngine } from '../../audio/soundEngine';
import { Folder, FileText, Lock, Unlock, ChevronRight, FileCode, Shield } from 'lucide-react';

export const FileExplorer: React.FC = () => {
  const fileSystem = useGameStore((state) => state.fileSystem);
  const unlockFileNode = useGameStore((state) => state.unlockFileNode);
  const discoverEvidence = useGameStore((state) => state.discoverEvidence);

  const [currentFolder, setCurrentFolder] = useState<FSNode>(fileSystem);
  const [selectedFile, setSelectedFile] = useState<FSNode | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [unlockError, setUnlockError] = useState('');

  const handleFolderClick = (folder: FSNode) => {
    soundEngine.playKeyClick();
    setCurrentFolder(folder);
    setSelectedFile(null);
  };

  const handleFileClick = (file: FSNode) => {
    soundEngine.playDiskSeek();
    setSelectedFile(file);
    setUnlockError('');

    if (file.id === 'usr-kyle') {
      discoverEvidence('ev-kyle-journal');
    } else if (file.id === 'arc-signal') {
      discoverEvidence('ev-horizon7-full');
    }
  };

  const handleUnlockFile = (file: FSNode) => {
    if (passwordInput.trim().toUpperCase() === 'ECHO-2087-VOID') {
      unlockFileNode(file.id);
      setSelectedFile({ ...file, locked: false });
      setPasswordInput('');
      setUnlockError('');
      soundEngine.playDiscovery();
      discoverEvidence('ev-order804');
    } else {
      soundEngine.playGlitch();
      setUnlockError('ACCESS DENIED // INVALID CLEARANCE KEY');
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-crt-dark text-crt-green font-mono text-xs select-none">
      {/* Directory Navigation Tree */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-crt-green/30 p-3 space-y-2 overflow-y-auto">
        <div className="flex items-center space-x-1 font-bold text-crt-green/80 pb-2 border-b border-crt-green/20">
          <Shield className="w-4 h-4 text-amber-400" />
          <span>DIRECTORY TREE</span>
        </div>

        {fileSystem.children?.map((folder) => (
          <div key={folder.id} className="space-y-1">
            <button
              onClick={() => handleFolderClick(folder)}
              className={`w-full flex items-center space-x-2 px-2 py-1 rounded text-left transition-colors ${
                currentFolder.id === folder.id
                  ? 'bg-crt-green text-black font-bold'
                  : 'hover:bg-crt-green/20 text-crt-green'
              }`}
            >
              <Folder className="w-4 h-4 fill-current" />
              <span>{folder.name}</span>
            </button>

            {/* Sub-files preview */}
            {currentFolder.id === folder.id && (
              <div className="ml-4 space-y-1 border-l border-crt-green/30 pl-2 pt-1">
                {folder.children?.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => handleFileClick(file)}
                    className={`w-full flex items-center justify-between px-2 py-0.5 rounded text-left transition-colors ${
                      selectedFile?.id === file.id
                        ? 'bg-amber-400 text-black font-bold'
                        : 'hover:bg-crt-green/10 text-crt-green/80'
                    }`}
                  >
                    <div className="flex items-center space-x-1 truncate">
                      {file.locked ? (
                        <Lock className="w-3 h-3 text-red-400" />
                      ) : (
                        <FileText className="w-3 h-3" />
                      )}
                      <span className="truncate">{file.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* File Inspector & Contents Viewer */}
      <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto bg-black/40">
        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-crt-green/30 pb-2">
              <div className="flex items-center space-x-2">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm">{selectedFile.name}</span>
              </div>
              <div className="text-crt-green/60 text-[10px] space-x-3">
                <span>SIZE: {selectedFile.size || '1.2 KB'}</span>
                <span>MODIFIED: {selectedFile.modified}</span>
              </div>
            </div>

            {/* If Locked File */}
            {selectedFile.locked ? (
              <div className="p-6 border border-red-500/60 bg-red-950/30 rounded space-y-4 text-center">
                <Lock className="w-8 h-8 text-red-400 mx-auto animate-bounce" />
                <h3 className="text-sm font-bold text-red-400">ENCRYPTED FILE NODE</h3>
                <p className="text-xs text-crt-green/80">
                  This document is protected by Project Echo Clearance Level 4. Passphrase required.
                </p>

                <div className="flex items-center justify-center space-x-2 max-w-xs mx-auto">
                  <input
                    type="password"
                    placeholder="ENTER DECRYPTION KEY..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUnlockFile(selectedFile)}
                    className="w-full px-3 py-1 bg-black border border-red-500/60 rounded text-red-300 font-mono focus:outline-none"
                  />
                  <button
                    onClick={() => handleUnlockFile(selectedFile)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-xs"
                  >
                    DECRYPT
                  </button>
                </div>

                {unlockError && <div className="text-xs text-red-400 font-bold">{unlockError}</div>}
              </div>
            ) : (
              /* Unlocked Content Viewer */
              <div className="p-3 border border-crt-green/30 bg-crt-dark rounded font-mono text-xs whitespace-pre-wrap leading-relaxed text-crt-green">
                {selectedFile.content}
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-crt-green/40 space-y-2">
            <Folder className="w-12 h-12 stroke-1" />
            <span>Select a file from the directory tree to inspect contents.</span>
          </div>
        )}
      </div>
    </div>
  );
};
