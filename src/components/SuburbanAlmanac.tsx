import React, { useState } from 'react';
import { ALL_ALMANAC_PLANTS, AlmanacPlantEntry } from '../data/plants';
import { PlantCard, PlantType } from '../types';
import { PlantGraphic } from './Characters';
import { SeedCard } from './SeedCard';
import { soundManager } from '../utils/audio';
import { BookOpen, X, Sparkles, Check, Info } from 'lucide-react';

interface SuburbanAlmanacProps {
  isOpen: boolean;
  onClose: () => void;
  activeDeck: PlantCard[];
  onUpdateActiveDeck?: (newDeck: PlantCard[]) => void;
}

export const SuburbanAlmanac: React.FC<SuburbanAlmanacProps> = ({
  isOpen,
  onClose,
  activeDeck,
  onUpdateActiveDeck
}) => {
  const [selectedPlant, setSelectedPlant] = useState<AlmanacPlantEntry>(ALL_ALMANAC_PLANTS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  if (!isOpen) return null;

  const filteredPlants =
    filterCategory === 'all'
      ? ALL_ALMANAC_PLANTS
      : ALL_ALMANAC_PLANTS.filter((p) => p.category === filterCategory);

  const isInDeck = activeDeck.some((card) => card.type === selectedPlant.type);

  const handleToggleDeck = () => {
    if (!onUpdateActiveDeck) return;
    soundManager.playClick();

    if (isInDeck) {
      if (activeDeck.length <= 4) {
        alert('Minimal dek harus memiliki 4 tanaman untuk bertahan!');
        return;
      }
      onUpdateActiveDeck(activeDeck.filter((c) => c.type !== selectedPlant.type));
    } else {
      if (activeDeck.length >= 8) {
        alert('Dek pertempuran sudah penuh (Maksimal 8 tanaman)! Hapus satu tanaman terlebih dahulu.');
        return;
      }
      const newCard: PlantCard = {
        type: selectedPlant.type as PlantType,
        name: selectedPlant.name,
        cost: selectedPlant.cost,
        cooldown: 7,
        icon: '🌱',
        description: selectedPlant.description
      };
      onUpdateActiveDeck([...activeDeck, newCard]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-scale-up select-none">
      {/* ALMANAC LEATHER BOUND TOME */}
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[750px] bg-[#3e2008] border-8 border-[#261304] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* TOP BOOK EMBOSS HEADER */}
        <div className="w-full bg-gradient-to-r from-[#5a310c] via-[#784315] to-[#5a310c] border-b-4 border-[#261304] px-4 py-2.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-200 border-2 border-amber-600 flex items-center justify-center text-amber-950 shadow-inner">
              <BookOpen className="w-5 h-5 text-amber-900" />
            </div>
            <div>
              <h2
                className="text-base sm:text-xl font-black font-heading text-amber-200 tracking-wider uppercase drop-shadow"
                style={{
                  WebkitTextStroke: '1px #261304',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}
              >
                SUBURBAN ALMANAC: PLANTS
              </h2>
              <p className="text-[10px] sm:text-xs font-bold text-amber-300/80">
                Koleksi Lengkap Karakter Tanaman Penjaga Halaman & Matematika
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-rose-600 hover:bg-rose-700 border-2 border-rose-900 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
            title="Tutup Almanak"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PARCHMENT INNER PAGES (2-Column PvZ Almanac Layout) */}
        <div className="flex-1 bg-[#fbf5dc] p-2 sm:p-4 grid grid-cols-1 md:grid-cols-12 gap-3 overflow-y-auto">
          
          {/* LEFT 7 COLS: THE RECTANGULAR GRID OF CARDS (As shown in p_almanac_big.webp!) */}
          <div className="md:col-span-7 flex flex-col bg-[#faeed1] border-3 border-[#c2a275] rounded-2xl p-2.5 shadow-inner">
            
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-1 border-b border-[#c2a275] scrollbar-none">
              {[
                { id: 'all', label: '🌟 Semua (All)' },
                { id: 'day', label: '☀️ Siang (Day)' },
                { id: 'night', label: '🌙 Malam (Night)' },
                { id: 'pool', label: '🌊 Kolam (Pool)' },
                { id: 'roof', label: '🏠 Genteng (Roof)' },
                { id: 'upgrade', label: '⚡ Upgrade' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playClick();
                    setFilterCategory(tab.id);
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-black font-heading shrink-0 transition-colors ${
                    filterCategory === tab.id
                      ? 'bg-[#783e10] text-amber-100 shadow-sm'
                      : 'bg-[#ede0be] hover:bg-[#e4d4aa] text-[#451a03]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* THE CARDS GRID (Exactly 8-9 items per row just like p_almanac_big.webp!) */}
            <div className="flex-1 overflow-y-auto p-1 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-7 gap-1.5 sm:gap-2 content-start">
              {filteredPlants.map((plant) => {
                const isSelected = selectedPlant.type === plant.type;
                const isDeckMember = activeDeck.some((c) => c.type === plant.type);

                return (
                  <div
                    key={plant.type}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedPlant(plant);
                    }}
                    className="relative cursor-pointer transition-transform hover:scale-105"
                  >
                    <SeedCard
                      card={{
                        type: plant.type as PlantType,
                        name: plant.name,
                        cost: plant.cost,
                        cooldown: 5,
                        icon: '🌱',
                        description: plant.description
                      }}
                      category={plant.category}
                      isSelected={isSelected}
                      showDetailsTooltip={false}
                      size="sm"
                    />

                    {/* Active Deck Check Badge */}
                    {isDeckMember && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 border border-white text-white flex items-center justify-center text-[9px] font-black shadow-md z-30">
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom active deck indicator */}
            <div className="mt-2 pt-1.5 border-t border-[#c2a275] flex items-center justify-between text-[11px] font-bold text-[#783e10]">
              <span>
                🎒 Dek Aktif: <strong>{activeDeck.length}/8 Tanaman</strong>
              </span>
              <span className="text-[10px] text-amber-800">
                Klik kartu untuk membaca info detail di sebelah kanan 👉
              </span>
            </div>

          </div>

          {/* RIGHT 5 COLS: BIG CHARACTER PREVIEW & MATH DOSSIER */}
          <div className="md:col-span-5 flex flex-col justify-between bg-[#f5e9c9] border-3 border-[#c2a275] rounded-2xl p-3 sm:p-4 shadow-md">
            
            <div>
              {/* Plant Big Animated Display Window */}
              <div className="w-full h-36 sm:h-44 rounded-2xl border-3 border-[#783e10] bg-gradient-to-b from-[#38bdf8] via-[#7dd3fc] to-[#4ade80] shadow-inner relative flex items-center justify-center overflow-hidden">
                {/* Sunbeams & Grass Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.4)_10%,transparent_70%)] animate-pulse" />
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#16a34a] border-t-2 border-[#15803d]" />

                {/* Big Plant Graphic */}
                <div className="relative z-10">
                  <PlantGraphic
                    type={selectedPlant.type as PlantType}
                    className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-xl"
                  />
                </div>

                {/* Sun Cost Tag Badge */}
                <div className="absolute top-2 right-2 bg-[#fef08a] border-2 border-[#ca8a04] px-2 py-1 rounded-xl shadow-md flex items-center gap-1.5">
                  <span className="text-sm font-black font-heading text-amber-950">
                    {selectedPlant.cost}
                  </span>
                  <span className="text-sm">☀️</span>
                </div>
              </div>

              {/* Plant Name & Category Badge */}
              <div className="mt-3 flex items-center justify-between flex-wrap gap-1">
                <h3 className="text-lg sm:text-xl font-black font-heading text-[#542d0b]">
                  {selectedPlant.name}
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-400">
                  {selectedPlant.category}
                </span>
              </div>

              {/* Combat Stats Grid */}
              <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[11px] font-bold text-[#451a03]">
                <div className="bg-[#ede0be] p-1.5 rounded-lg border border-[#d6c29b]">
                  <span className="text-[9px] text-[#783e10] uppercase block">Daya Serang:</span>
                  <span className="font-black text-xs text-rose-800">{selectedPlant.damage}</span>
                </div>
                <div className="bg-[#ede0be] p-1.5 rounded-lg border border-[#d6c29b]">
                  <span className="text-[9px] text-[#783e10] uppercase block">Waktu Pengisian:</span>
                  <span className="font-black text-xs text-emerald-800">{selectedPlant.recharge}</span>
                </div>
              </div>

              {/* Mathematical Superpower Box (Konsep Matematika Kelas 4 SD) */}
              <div className="mt-2.5 p-2 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-400 text-emerald-950 shadow-xs">
                <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-emerald-800 mb-0.5 font-heading">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Keahlian Matematika & Pecahan:</span>
                </div>
                <p className="text-xs font-semibold leading-relaxed">
                  {selectedPlant.mathSkill}
                </p>
              </div>

              {/* Lore / Suburban Description */}
              <div className="mt-2 p-2 rounded-xl bg-white/70 border border-[#d6c29b] text-[#451a03]">
                <span className="text-[10px] font-black uppercase text-[#783e10] block mb-0.5">
                  Catatan Suburban:
                </span>
                <p className="text-xs italic leading-relaxed">
                  "{selectedPlant.description}"
                </p>
              </div>
            </div>

            {/* Bottom Button: Add or Remove from Deck */}
            {selectedPlant.playable && onUpdateActiveDeck && (
              <button
                type="button"
                onClick={handleToggleDeck}
                className={`mt-3 w-full py-2.5 px-4 rounded-xl font-black font-heading text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  isInDeck
                    ? 'bg-rose-600 hover:bg-rose-700 text-white border-2 border-rose-800'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-emerald-800'
                }`}
              >
                {isInDeck ? (
                  <>
                    <X className="w-4 h-4" />
                    <span>Hapus dari Dek Pertempuran</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Bawa ke Dek Pertempuran (+ Pilih)</span>
                  </>
                )}
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
