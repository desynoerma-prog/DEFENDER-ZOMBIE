import React from 'react';
import { soundManager } from '../utils/audio';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  const steps = [
    {
      icon: '🌻',
      title: 'Tanam Bunga Matahari',
      desc: 'Tanam Bunga Matahari di kolom kiri kebun untuk memproduksi Matahari (Sun) secara berkala.'
    },
    {
      icon: '☀️',
      title: 'Kumpulkan Energi Matahari',
      desc: 'Klik bola matahari yang jatuh dari langit atau dihasilkan bunga untuk menambah saldo energimu.'
    },
    {
      icon: '🌱',
      title: 'Tata & Susun Tanaman Penembak',
      desc: 'Gunakan energi matahari untuk membeli Penembak Pecahan, Penembak Es, dan Benteng Kacang di petak rumput 5×9.'
    },
    {
      icon: '🧟‍♂️',
      title: 'Tembak Zombie yang Memasuki Rumah',
      desc: 'Tanaman otomatis menembakkan proyektil energi ke zombie yang berjalan mendekati rumah di jalur yang sama.'
    },
    {
      icon: '🧠',
      title: 'Setiap Zombie Gugur = 1 Soal Matematika!',
      desc: 'Saat zombie berhasil dikalahkan, akan muncul soal matematika pecahan/persen/desimal. Jawab benar untuk mendapatkan bonus +100 Matahari!'
    },
    {
      icon: '🚜',
      title: 'Mesin Pemotong Rumput',
      desc: 'Di depan rumah terdapat mesin pemotong rumput sebagai garis pertahanan darurat jika zombie menembus barisan tanaman.'
    },
    {
      icon: '🏆',
      title: 'Selesaikan Semua Gelombang',
      desc: 'Kalahkan seluruh gelombang zombie dan Boss Raja Persen untuk memenangkan level!'
    }
  ];

  return (
    <div id="how-to-play-modal" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="clay-card max-w-xl w-full p-5 sm:p-7 bg-white animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
              Cara Bermain — Tata Kebun & Lawan Zombie!
            </h3>
          </div>
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

        {/* Steps */}
        <div className="space-y-2.5 overflow-y-auto pr-1">
          {steps.map((st, idx) => (
            <div key={idx} className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-start gap-3">
              <span className="text-2xl shrink-0 p-1 bg-white rounded-xl shadow-xs border border-emerald-100">
                {st.icon}
              </span>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-emerald-950 font-heading">
                  {idx + 1}. {st.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t text-center">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="clay-btn clay-btn-green px-8 py-2.5 text-sm sm:text-base font-bold rounded-xl"
          >
            Paham, Ayo Mulai Menata Kebun! 🌱
          </button>
        </div>

      </div>
    </div>
  );
};
