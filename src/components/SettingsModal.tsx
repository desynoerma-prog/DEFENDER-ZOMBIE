import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, AlertTriangle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface SettingsModalProps {
  onClose: () => void;
  onResetProgress: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  onResetProgress,
  isMuted,
  onToggleMute
}) => {
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  return (
    <div id="settings-modal" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="clay-card max-w-md w-full p-5 sm:p-7 bg-white animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h3 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
            ⚙️ Pengaturan Permainan
          </h3>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-slate-600 font-bold text-xl p-1"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Settings options */}
        <div className="space-y-4">
          
          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-2.5">
              {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
              <div>
                <span className="font-extrabold text-sm text-slate-800 font-heading block">
                  Efek Suara (Audio)
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {isMuted ? 'Suara dimatikan' : 'Suara aktif (Web Audio)'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onToggleMute();
                soundManager.playClick();
              }}
              className={`clay-btn px-4 py-1.5 text-xs sm:text-sm rounded-xl font-bold ${
                isMuted ? 'clay-btn-white text-slate-600' : 'clay-btn-green'
              }`}
            >
              {isMuted ? 'Nyalakan' : 'Aktif'}
            </button>
          </div>

          {/* Educational Standard Notice */}
          <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs text-indigo-950 leading-relaxed font-medium">
            <span className="font-bold block text-indigo-900 mb-0.5">ℹ️ Notasi Standar Indonesia:</span>
            Pecahan desimal menggunakan tanda koma (contoh: 0,25 bukan 0.25) sesuai kurikulum matematika sekolah dasar Indonesia.
          </div>

          {/* Reset Progress Section */}
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl">
            {!confirmReset ? (
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-xs text-rose-900 font-heading block">
                    Reset Data Permainan
                  </span>
                  <span className="text-[11px] text-rose-700">
                    Hapus skor tinggi dan lencana tersimpan
                  </span>
                </div>
                <button
                  onClick={() => setConfirmReset(true)}
                  className="text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 px-3 py-1.5 rounded-xl border border-rose-300"
                >
                  Reset
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-center">
                <span className="text-xs font-extrabold text-rose-900 flex items-center justify-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Yakin ingin mereset semua kemajuan?
                </span>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      onResetProgress();
                      setConfirmReset(false);
                      onClose();
                    }}
                    className="clay-btn clay-btn-coral px-4 py-1.5 text-xs font-bold rounded-xl"
                  >
                    Ya, Reset
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="clay-btn clay-btn-white px-4 py-1.5 text-xs font-bold rounded-xl"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t text-center">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="clay-btn clay-btn-blue px-6 py-2 text-sm font-bold rounded-xl"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
};
