import React, { useState } from 'react';
import {
  PlantCard,
  PlacedPlant,
  ZombieInstance,
  ProjectileInstance,
  SunOrb,
  LawnMower,
  FloatingText,
  ArenaTheme,
  AdventureLevel
} from '../types';
import { PLANT_CARDS } from '../data/plants';
import {
  PlantGraphic,
  ZombieGraphic,
  LawnMowerGraphic,
  PoolCleanerGraphic,
  RoofCleanerGraphic,
  LilyPadGraphic,
  FlowerPotGraphic,
  SunOrbGraphic
} from './Characters';
import { soundManager } from '../utils/audio';
import { Volume2, VolumeX, Pause, Play, LogOut, X, AlertTriangle, BookOpen } from 'lucide-react';
import { SeedCard } from './SeedCard';

interface PvZLawnProps {
  sun: number;
  placedPlants: PlacedPlant[];
  zombies: ZombieInstance[];
  projectiles: ProjectileInstance[];
  sunOrbs: SunOrb[];
  lawnMowers: LawnMower[];
  floatingTexts: FloatingText[];
  selectedPlantCard: PlantCard | null;
  cardCooldowns: Record<string, number>;
  isShovelSelected: boolean;
  score: number;
  currentWave: number;
  totalWaves: number;
  isPaused: boolean;
  isMuted: boolean;
  arenaTheme: ArenaTheme;
  adventureLevel: AdventureLevel;
  playerName?: string;
  activeDeck?: PlantCard[];
  onOpenAlmanac?: () => void;
  onSelectPlantCard: (card: PlantCard | null) => void;
  onSelectShovel: () => void;
  onTileClick: (row: number, col: number) => void;
  onCollectSun: (id: string, value: number) => void;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onChangeArenaTheme?: (theme: ArenaTheme) => void;
  onCloseGame: () => void;
}

export const PvZLawn: React.FC<PvZLawnProps> = ({
  sun,
  placedPlants,
  zombies,
  projectiles,
  sunOrbs,
  lawnMowers,
  floatingTexts,
  selectedPlantCard,
  cardCooldowns,
  isShovelSelected,
  score,
  currentWave,
  totalWaves,
  isPaused,
  isMuted,
  arenaTheme,
  adventureLevel,
  playerName,
  activeDeck = PLANT_CARDS,
  onOpenAlmanac,
  onSelectPlantCard,
  onSelectShovel,
  onTileClick,
  onCollectSun,
  onTogglePause,
  onToggleMute,
  onChangeArenaTheme,
  onCloseGame
}) => {
  const [hoveredTile, setHoveredTile] = useState<{ row: number; col: number } | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);

  // Dynamic rows: Water has 6 rows (2 grass, 2 pool, 2 grass), Roof and Garden have 5 rows
  const ROWS = arenaTheme === 'water' ? 6 : 5;
  const COLS = 9;
  const rowHeightPercent = 100 / ROWS;

  // Water pool rows are index 2 and 3 in the 6-row water stage
  const isWaterRow = (r: number) => arenaTheme === 'water' && (r === 2 || r === 3);

  const handleOpenCloseModal = () => {
    soundManager.playClick();
    setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    soundManager.playClick();
    setShowExitConfirm(false);
    onCloseGame();
  };

  const handleCancelExit = () => {
    soundManager.playClick();
    setShowExitConfirm(false);
  };

  return (
    <div
      id="pvz-lawn-container"
      className="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none font-sans px-2 pb-6"
    >
      {/* 1. TOP WOODEN SEED BANK & HUD */}
      <div className="w-full bg-[#543213] border-4 border-[#341d08] rounded-2xl p-1.5 sm:p-2.5 shadow-2xl flex items-center justify-between gap-1 sm:gap-3 flex-wrap">
        
        {/* Left: Sun Counter with Golden Orb & Taped Paper */}
        <div className="flex items-center gap-1 bg-[#3a200a] p-1 sm:p-1.5 rounded-xl border-2 border-[#783e10] shadow-inner">
          <div className="relative flex items-center justify-center">
            <SunOrbGraphic className="w-8 h-8 sm:w-10 sm:h-10 animate-spin" />
          </div>
          {/* Taped paper sun tag */}
          <div className="bg-[#fef08a] border-2 border-[#ca8a04] px-2 py-0.5 rounded-md shadow-xs flex flex-col items-center justify-center min-w-[45px] sm:min-w-[60px]">
            <span className="text-[9px] font-black uppercase text-amber-900 leading-none">SUN</span>
            <span className="text-sm sm:text-base font-black text-amber-950 font-heading leading-tight">
              {sun}
            </span>
          </div>
        </div>

        {/* Center: Plant Seed Cards Horizontal Bank */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 px-1 max-w-[55vw] sm:max-w-none scrollbar-none">
          {(activeDeck || PLANT_CARDS).map((card) => {
            const isAffordable = sun >= card.cost;
            const cooldownLeft = cardCooldowns[card.type] || 0;
            const isSelected = selectedPlantCard?.type === card.type;

            return (
              <SeedCard
                key={card.type}
                card={card}
                isAffordable={isAffordable}
                cooldownLeft={cooldownLeft}
                isSelected={isSelected}
                size="md"
                onClick={() => {
                  if (isAffordable && cooldownLeft === 0) {
                    soundManager.playClick();
                    onSelectPlantCard(isSelected ? null : card);
                  }
                }}
              />
            );
          })}
        </div>

        {/* Right: Shovel Slot, Almanac Tome, Audio, Pause, and Stone MENU / CLOSE Button */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Shovel in dark wood slot */}
          <button
            id="shovel-btn"
            type="button"
            onClick={() => {
              soundManager.playClick();
              onSelectShovel();
            }}
            className={`w-11 h-14 sm:w-14 sm:h-16 rounded-xl border-2 sm:border-3 flex flex-col items-center justify-center transition-transform ${
              isShovelSelected
                ? 'border-yellow-300 bg-amber-400 ring-3 ring-yellow-300 scale-105 shadow-lg'
                : 'border-[#3a200a] bg-[#2a1606] hover:bg-[#3e220a] shadow-inner cursor-pointer'
            }`}
            title="Sekop: Cabut Tanaman"
          >
            <span className="text-lg sm:text-2xl drop-shadow">⛏️</span>
            <span className="text-[8px] sm:text-[9px] font-black uppercase text-amber-200 mt-0.5 font-heading">
              Sekop
            </span>
          </button>

          {/* Suburban Almanac Button */}
          {onOpenAlmanac && (
            <button
              id="almanac-btn"
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenAlmanac();
              }}
              className="w-11 h-14 sm:w-14 sm:h-16 rounded-xl border-2 sm:border-3 border-[#783e10] bg-gradient-to-b from-[#783e10] via-[#5a310c] to-[#3a1d06] hover:brightness-110 flex flex-col items-center justify-center text-amber-200 shadow-md transition-transform active:scale-95 cursor-pointer"
              title="Buka Almanak Tanaman (Lihat Seluruh Karakter)"
            >
              <BookOpen className="w-5 h-5 text-amber-300 drop-shadow" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase text-amber-200 mt-0.5 font-heading">
                Almanak
              </span>
            </button>
          )}

          {/* Quick Audio & Pause buttons */}
          <div className="flex flex-col gap-1">
            <button
              onClick={onTogglePause}
              className="p-1 sm:p-1.5 bg-[#3a200a] hover:bg-[#4a2b10] border border-[#783e10] text-amber-200 rounded-lg shadow-sm"
              title={isPaused ? 'Lanjutkan' : 'Jeda'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onToggleMute}
              className="p-1 sm:p-1.5 bg-[#3a200a] hover:bg-[#4a2b10] border border-[#783e10] text-amber-200 rounded-lg shadow-sm"
              title="Suara"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-300" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Stone Textured "MENU / CLOSE" Button */}
          <button
            id="close-game-btn"
            onClick={handleOpenCloseModal}
            className="h-14 sm:h-16 px-2.5 sm:px-4 rounded-xl border-3 border-stone-800 bg-gradient-to-b from-stone-500 via-stone-600 to-stone-700 hover:from-stone-400 hover:to-stone-600 text-lime-300 font-black font-heading flex flex-col items-center justify-center shadow-lg transition-all active:scale-95 group"
            title="Menu / Tutup Permainan"
          >
            <span
              className="text-xs sm:text-sm font-black tracking-wider uppercase drop-shadow"
              style={{
                WebkitTextStroke: '1px #14532d',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              MENU
            </span>
            <span className="text-[8px] sm:text-[9px] text-rose-300 font-bold uppercase mt-0.5 flex items-center gap-0.5">
              <LogOut className="w-2.5 h-2.5" />
              <span>Close</span>
            </span>
          </button>

        </div>

      </div>

      {/* 2. PROGRESS, STATS & THEME SWITCHER RIBBON */}
      <div className="w-full flex items-center justify-between px-3 py-1 bg-amber-100/95 border-x-2 border-b-2 border-amber-300 rounded-b-xl text-xs font-bold text-amber-950 font-heading shadow-xs flex-wrap gap-1">
        <div className="flex items-center gap-2">
          {playerName && (
            <span className="text-[11px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
              👤 {playerName}
            </span>
          )}
          <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
            Level: {adventureLevel.toUpperCase()}
          </span>
          <span>⭐ Skor: <strong className="text-emerald-800">{score}</strong></span>
          <span className="hidden sm:inline text-slate-600">| Gelombang {currentWave} / {totalWaves}</span>
        </div>

        <div className="flex items-center gap-2">
          {onChangeArenaTheme && (
            <div className="flex items-center gap-1 bg-white/80 px-1.5 py-0.5 rounded-lg border border-amber-300">
              <span className="text-[10px] text-slate-700 font-extrabold hidden sm:inline">Latar:</span>
              <button
                onClick={() => onChangeArenaTheme('garden')}
                className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${arenaTheme === 'garden' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
              >
                🌱 Taman
              </button>
              <button
                onClick={() => onChangeArenaTheme('water')}
                className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${arenaTheme === 'water' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}
              >
                🌊 Air (Pool)
              </button>
              <button
                onClick={() => onChangeArenaTheme('roof')}
                className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${arenaTheme === 'roof' ? 'bg-amber-700 text-white' : 'text-slate-600'}`}
              >
                🏠 Genteng (Roof)
              </button>
            </div>
          )}

          <button
            onClick={handleOpenCloseModal}
            className="px-2 py-0.5 bg-rose-100 hover:bg-rose-200 border border-rose-300 rounded-lg text-[10px] font-black text-rose-800 flex items-center gap-1"
          >
            <X className="w-3 h-3 text-rose-600" />
            <span>Tutup</span>
          </button>
        </div>
      </div>

      {/* 3. THE BATTLEFIELD: GENTENG (ROOF), WATER POOL, OR GARDEN */}
      <div
        className={`w-full relative mt-2 rounded-2xl overflow-hidden border-4 shadow-2xl transition-all ${
          arenaTheme === 'roof'
            ? 'border-[#451a03] bg-[#7c2d12]'
            : arenaTheme === 'water'
            ? 'border-[#4a2e12] bg-[#386b24]'
            : 'border-[#3e220a] bg-[#1b5e20]'
        }`}
      >
        {/* TOP SCENERY BORDER */}
        {arenaTheme === 'roof' ? (
          /* ROOF SKY & CLOUDS HORIZON (As in PvZ Roof Stage screenshot!) */
          <div className="w-full h-8 bg-gradient-to-b from-[#38bdf8] via-[#7dd3fc] to-[#bae6fd] border-b-2 border-[#78350f] relative overflow-hidden flex items-end justify-between px-4">
            {/* Drifting Clouds */}
            <div className="absolute top-1 left-8 w-14 h-4 bg-white/80 rounded-full blur-[0.5px]" />
            <div className="absolute top-2 right-20 w-20 h-5 bg-white/70 rounded-full blur-[0.5px]" />
            {/* Treetops peeking over the rooftop */}
            <div className="flex gap-1 items-end z-10 opacity-70">
              <div className="w-6 h-4 bg-emerald-700 rounded-t-full" />
              <div className="w-8 h-6 bg-emerald-800 rounded-t-full" />
              <div className="w-7 h-5 bg-emerald-600 rounded-t-full" />
            </div>
            {/* Terracotta Roof Ridge Capping (Nok Genteng) */}
            <div className="w-full absolute bottom-0 left-0 right-0 h-2 bg-[#9a3412] border-t border-[#c2410c] [background-image:repeating-linear-gradient(90deg,#7c2d12_0px,#7c2d12_14px,#9a3412_14px,#9a3412_16px)]" />
          </div>
        ) : (
          /* GARDEN / WATER BACKYARD FENCE */
          <div className="w-full h-3 bg-[repeating-linear-gradient(90deg,#854d0e_0px,#854d0e_16px,#713f12_16px,#713f12_18px)] border-b border-[#3e220a]" />
        )}

        {/* LEFT DOCK AREA (Roof Cleaners on Gutter / Pool Cleaners / Lawnmowers) */}
        <div
          className={`absolute left-0 top-8 bottom-0 w-14 sm:w-20 z-10 flex flex-col justify-around items-center py-1 border-r-3 ${
            arenaTheme === 'roof'
              ? 'bg-gradient-to-r from-stone-600 via-stone-500 to-stone-400 border-stone-800 shadow-inner'
              : arenaTheme === 'water'
              ? 'bg-[#d1d5db] border-[#9ca3af] [background-image:radial-gradient(#9ca3af_1px,transparent_1px)] [background-size:10px_10px]'
              : 'bg-[#3e220a] border-yellow-400/60'
          }`}
        >
          {/* ROOF GUTTER / CHIMNEY LEDGE DETAILS */}
          {arenaTheme === 'roof' && (
            <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden flex flex-col justify-between p-1">
              <div className="text-[10px] text-amber-200">🧱</div>
              {/* Drain Rivets */}
              <div className="w-full h-0.5 bg-stone-800" />
              <div className="text-[10px] text-stone-200">🔩</div>
              <div className="w-full h-0.5 bg-stone-800" />
              <div className="text-[10px] text-amber-200">🧱</div>
            </div>
          )}

          {/* WATER PATIO PROPS */}
          {arenaTheme === 'water' && (
            <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden flex flex-col justify-between p-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-400 border border-slate-700 shadow-sm" />
              <div className="text-sm">🐥</div>
              <div className="w-7 h-7 rounded-full bg-rose-700 border-2 border-slate-900 shadow-md flex items-center justify-center">
                <div className="w-3 h-0.5 bg-slate-900" />
              </div>
            </div>
          )}

          {/* LawnMowers / Pool Cleaners / Roof Cleaners per row */}
          {lawnMowers.map((mower) => {
            const isPoolRow = isWaterRow(mower.row);

            return (
              <div key={mower.row} className="relative w-full flex items-center justify-center z-10">
                {mower.active && (
                  arenaTheme === 'roof' ? (
                    <RoofCleanerGraphic
                      isTriggered={mower.isTriggered}
                      className="w-10 h-7 sm:w-13 sm:h-9 drop-shadow-md"
                    />
                  ) : isPoolRow ? (
                    <PoolCleanerGraphic
                      isTriggered={mower.isTriggered}
                      className="w-10 h-7 sm:w-13 sm:h-9 drop-shadow-md"
                    />
                  ) : (
                    <LawnMowerGraphic
                      isTriggered={mower.isTriggered}
                      className="w-9 h-7 sm:w-12 sm:h-9 drop-shadow-md"
                    />
                  )
                )}
              </div>
            );
          })}
        </div>

        {/* 4. THE 9-COLUMN BATTLEFIELD GRID (GENTENG / POOL / GARDEN) */}
        <div
          className={`ml-14 sm:ml-20 grid grid-cols-9 ${
            arenaTheme === 'water'
              ? 'grid-rows-6 h-[420px] sm:h-[540px] md:h-[580px]'
              : 'grid-rows-5 h-[350px] sm:h-[460px] md:h-[500px]'
          }`}
        >
          {Array.from({ length: ROWS }).map((_, r) => {
            const inPool = isWaterRow(r);

            return (
              <React.Fragment key={r}>
                {Array.from({ length: COLS }).map((_, c) => {
                  const isCheckered = (r + c) % 2 === 0;
                  const plantOnTile = placedPlants.find((p) => p.row === r && p.col === c);
                  const isHovered = hoveredTile?.row === r && hoveredTile?.col === c;

                  // ROOF STAGE SPECIFIC PERSPECTIVE & TILE STYLING
                  // As seen in images (5).jpg: Slanted red clay terracotta tiles!
                  // Left columns (0 to 4) represent the sloped incline, right columns (5 to 8) level out at the crest.
                  let tileClass = '';
                  if (arenaTheme === 'roof') {
                    // Terracotta Clay Roof Shingle Styling
                    tileClass = isCheckered
                      ? 'bg-gradient-to-b from-[#ea580c] via-[#c2410c] to-[#9a3412]'
                      : 'bg-gradient-to-b from-[#f97316] via-[#c2410c] to-[#7c2d12]';
                  } else if (inPool) {
                    // SWIMMING POOL TILE
                    tileClass = isCheckered
                      ? 'bg-gradient-to-b from-[#38bdf8] to-[#0284c7]'
                      : 'bg-gradient-to-b from-[#0ea5e9] to-[#0369a1]';
                  } else {
                    // GRASS TILE
                    tileClass = isCheckered ? 'bg-[#4caf50]' : 'bg-[#43a047]';
                  }

                  return (
                    <div
                      key={`${r}-${c}`}
                      id={`lawn-tile-${r}-${c}`}
                      onClick={() => onTileClick(r, c)}
                      onMouseEnter={() => setHoveredTile({ row: r, col: c })}
                      onMouseLeave={() => setHoveredTile(null)}
                      className={`relative flex items-center justify-center transition-colors cursor-pointer ${tileClass} ${
                        arenaTheme === 'roof'
                          ? 'border-b-3 border-[#7c2d12] border-r-2 border-[#451a03]/40 shadow-xs'
                          : 'border-r border-black/10'
                      } ${
                        // Pool Stone Coping Border for top and bottom edge of swimming pool
                        r === 2 && inPool ? 'border-t-3 border-[#fed7aa]' : ''
                      } ${
                        r === 3 && inPool ? 'border-b-3 border-[#fed7aa]' : ''
                      } ${isHovered && selectedPlantCard ? 'ring-2 ring-yellow-300 ring-inset bg-yellow-200/40' : ''}`}
                    >
                      {/* ROOF SHINGLE RIDGE LAYER (Layered Terracotta Clay Ridges like in PvZ Roof Stage!) */}
                      {arenaTheme === 'roof' && (
                        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between overflow-hidden opacity-85">
                          {/* Top Shingle Row */}
                          <div className="h-[30%] border-b border-[#7c2d12]/50 bg-gradient-to-b from-white/10 to-black/10 relative">
                            <div className="absolute top-0.5 right-1 w-full h-0.5 bg-amber-200/20" />
                          </div>
                          {/* Middle Shingle Row */}
                          <div className="h-[35%] border-b border-[#7c2d12]/60 bg-gradient-to-b from-white/10 to-black/10 relative">
                            <div className="absolute top-0.5 right-1 w-full h-0.5 bg-amber-200/20" />
                          </div>
                          {/* Bottom Thick Shingle Overlap Ridge */}
                          <div className="h-[35%] border-b-2 border-[#451a03] bg-gradient-to-b from-[#ea580c] to-[#7c2d12] relative">
                            <div className="absolute bottom-0 w-full h-1 bg-[#451a03]/60" />
                          </div>
                          {/* Slanted Roof Shingle Vertical Groove */}
                          <div className="absolute inset-0 [background-image:repeating-linear-gradient(90deg,transparent_0px,transparent_34px,#451a03_34px,#451a03_36px)] opacity-35" />
                        </div>
                      )}

                      {/* SWIMMING POOL WATER REFLECTIONS */}
                      {inPool && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                          <div className="w-full h-full opacity-35 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:18px_18px] animate-pulse" />
                          {(c === 2 || c === 6) && (
                            <div className="absolute top-2 right-2 text-[10px] text-white/70 animate-ping">
                              ✨
                            </div>
                          )}
                        </div>
                      )}

                      {/* GARDEN FLOWERS */}
                      {!inPool && arenaTheme === 'garden' && (r === 0 || r === ROWS - 1) && (c % 3 === 1) && (
                        <div className="absolute bottom-1 right-1 text-[8px] opacity-40 pointer-events-none">
                          🌼
                        </div>
                      )}

                      {/* Plant Placed on this Tile */}
                      {plantOnTile && (
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                          
                          {/* ON ROOF: AUTHENTIC TERRACOTTA FLOWER POT (As in images 5.jpg, every plant sits in a pot!) */}
                          {arenaTheme === 'roof' && (
                            <div className="absolute -bottom-1.5 z-0 pointer-events-none">
                              <FlowerPotGraphic className="w-11 h-7 sm:w-14 sm:h-9" />
                            </div>
                          )}

                          {/* IN POOL: Floating Lily Pad Base under the Plant */}
                          {inPool && (
                            <div className="absolute -bottom-1 z-0 pointer-events-none">
                              <LilyPadGraphic className="w-12 h-6 sm:w-14 sm:h-7" />
                            </div>
                          )}

                          {/* Plant Graphic */}
                          <PlantGraphic
                            type={plantOnTile.type}
                            className={`relative z-10 ${arenaTheme === 'roof' ? 'w-9 h-9 sm:w-12 sm:h-12 -mt-2' : 'w-10 h-10 sm:w-14 sm:h-14'} drop-shadow-md`}
                          />

                          {/* Plant Health Bar if damaged */}
                          {plantOnTile.hp < plantOnTile.maxHp && (
                            <div className="absolute -top-1 w-8 sm:w-10 bg-black/70 rounded-full h-1 p-0.2 z-20">
                              <div
                                className="bg-emerald-400 h-full rounded-full transition-all"
                                style={{ width: `${(plantOnTile.hp / plantOnTile.maxHp) * 100}%` }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Hover preview of selected plant */}
                      {isHovered && selectedPlantCard && !plantOnTile && (
                        <div className="relative z-10 opacity-60 scale-90 pointer-events-none">
                          {arenaTheme === 'roof' && (
                            <div className="absolute -bottom-1.5 -left-1 z-0">
                              <FlowerPotGraphic className="w-11 h-7 sm:w-14 sm:h-9" />
                            </div>
                          )}
                          {inPool && (
                            <div className="absolute -bottom-1 -left-2 z-0">
                              <LilyPadGraphic className="w-12 h-6" />
                            </div>
                          )}
                          <PlantGraphic type={selectedPlantCard.type} className="w-10 h-10 sm:w-12 sm:h-12" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>

        {/* BOTTOM ROOF EAVES / LEVEL CORNICE (As in images 5.jpg bottom-right curved white-stone molding!) */}
        {arenaTheme === 'roof' && (
          <div className="w-full h-4 bg-gradient-to-r from-[#78350f] via-[#fed7aa] to-[#fde047] border-t-2 border-[#451a03] shadow-md flex items-center justify-between px-6">
            <span className="text-[8px] font-black text-amber-950 font-heading uppercase tracking-widest opacity-80">
              🏠 ATAP GENTENG KELAS 4 SD
            </span>
            <div className="flex gap-2">
              <span className="text-[8px] text-amber-900 font-bold">☀️ CERAH BERAWAN</span>
            </div>
          </div>
        )}

        {/* ZOMBIES LAYER (Positioned Absolutely on Grid) */}
        {zombies.map((zombie) => {
          const topPercent = (zombie.row * rowHeightPercent) + 1;
          const inPool = isWaterRow(zombie.row);

          return (
            <div
              key={zombie.id}
              className="absolute z-15 pointer-events-none transition-all duration-75 flex flex-col items-center"
              style={{
                top: `${topPercent}%`,
                left: `${zombie.x}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {/* Zombie Health Bar */}
              <div className="w-10 sm:w-14 bg-black/80 rounded-full h-1.5 p-0.5 mb-0.5 border border-white/20">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-150"
                  style={{ width: `${Math.max(0, (zombie.hp / zombie.maxHp) * 100)}%` }}
                />
              </div>

              {/* In Pool: Water Ripple and Swim splash */}
              {inPool && (
                <div className="absolute -bottom-2 z-20 flex items-center justify-center">
                  <div className="w-12 h-3 bg-sky-300/60 rounded-full border border-white/50 animate-ping" />
                  <span className="absolute -top-3 text-[10px]">💦</span>
                </div>
              )}

              {/* In Roof: Zombie Climbing / Walking on Shingles */}
              {arenaTheme === 'roof' && (
                <div className="absolute -bottom-1 z-0 w-8 h-2 bg-black/30 rounded-full blur-[1px]" />
              )}

              {/* Zombie Graphic */}
              <ZombieGraphic
                type={zombie.type}
                isEating={zombie.isEating}
                isHit={zombie.isHit}
                isFrozen={zombie.isFrozen}
                className="w-12 h-16 sm:w-16 sm:h-22"
              />
            </div>
          );
        })}

        {/* FLYING PROJECTILES LAYER */}
        {projectiles.map((proj) => {
          const topPercent = (proj.row * rowHeightPercent) + (rowHeightPercent * 0.42);

          return (
            <div
              key={proj.id}
              className="absolute z-20 pointer-events-none"
              style={{
                top: `${topPercent}%`,
                left: `${proj.x}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {proj.isIce ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-sky-300 border-2 border-white shadow-md shadow-sky-400 animate-pulse flex items-center justify-center">
                  <span className="text-[7px] text-sky-950 font-black">❄</span>
                </div>
              ) : proj.text === '3×' ? (
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-emerald-400 to-amber-300 border-2 border-emerald-800 shadow-lg shadow-amber-300 flex items-center justify-center ring-2 ring-emerald-300 animate-pulse">
                  <span className="text-[8px] sm:text-[9px] text-emerald-950 font-black font-heading">3×</span>
                </div>
              ) : (
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-lime-400 border-2 border-emerald-700 shadow-md shadow-lime-500 flex items-center justify-center">
                  <span className="text-[7px] text-emerald-950 font-black">%</span>
                </div>
              )}
            </div>
          );
        })}

        {/* FALLING & SUNFLOWER SUN ORBS LAYER */}
        {sunOrbs.map((sunOrb) => (
          <div
            key={sunOrb.id}
            onClick={() => onCollectSun(sunOrb.id, sunOrb.value)}
            className="absolute z-30 cursor-pointer animate-bounce transition-all duration-300"
            style={{
              top: `${sunOrb.y}%`,
              left: `${sunOrb.x}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <SunOrbGraphic className="w-11 h-11 sm:w-14 sm:h-14" />
          </div>
        ))}

        {/* FLOATING TEXT NOTIFICATIONS LAYER */}
        {floatingTexts.map((ft) => (
          <div
            key={ft.id}
            className={`absolute z-35 font-heading font-black text-sm sm:text-base pointer-events-none animate-float-up drop-shadow-md ${ft.color}`}
            style={{
              top: `${ft.y}%`,
              left: `${ft.x}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {ft.text}
          </div>
        ))}

      </div>

      {/* 5. EXIT CONFIRMATION MODAL */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fef3c7] border-4 border-[#78350f] rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl animate-scale-up text-[#451a03]">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-100 border-3 border-amber-500 flex items-center justify-center text-3xl shadow-inner">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-heading uppercase text-[#78350f]">
              Akhiri Permainan?
            </h3>

            <p className="text-sm font-bold text-amber-900 mt-2 mb-4 leading-relaxed">
              Apakah kamu yakin ingin menutup dan kembali ke Layar Utama?
            </p>

            <div className="bg-amber-200/80 rounded-xl p-2.5 mb-5 text-xs font-bold text-amber-950 flex justify-around">
              <span>⭐ Skor: <strong>{score}</strong></span>
              <span>Gelombang: <strong>{currentWave}/{totalWaves}</strong></span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCancelExit}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black font-heading text-sm shadow-md transition-transform active:scale-95"
              >
                Lanjutkan
              </button>

              <button
                onClick={handleConfirmExit}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black font-heading text-sm shadow-md transition-transform active:scale-95"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
