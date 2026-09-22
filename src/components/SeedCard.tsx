import React from 'react';
import { PlantCard, PlantType } from '../types';
import { PlantGraphic } from './Characters';

interface SeedCardProps {
  card: PlantCard;
  isAffordable?: boolean;
  cooldownLeft?: number;
  isSelected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  category?: 'day' | 'night' | 'pool' | 'fog' | 'roof' | 'upgrade';
  showDetailsTooltip?: boolean;
  className?: string;
}

export const SeedCard: React.FC<SeedCardProps> = ({
  card,
  isAffordable = true,
  cooldownLeft = 0,
  isSelected = false,
  onClick,
  size = 'md',
  category = 'day',
  showDetailsTooltip = true,
  className = ''
}) => {
  const isReady = isAffordable && cooldownLeft === 0;

  // Background style inside the card matching p_almanac_big.webp
  let bgGradient = 'from-[#38bdf8] via-[#7dd3fc] to-[#86efac]'; // Day / default
  if (category === 'night' || card.type === 'chomper') {
    bgGradient = 'from-[#1e1b4b] via-[#4c1d95] to-[#701a75]';
  } else if (category === 'pool') {
    bgGradient = 'from-[#0369a1] via-[#0284c7] to-[#38bdf8]';
  } else if (category === 'roof' || card.type === 'squash' || card.type === 'jalapeno') {
    bgGradient = 'from-[#7c2d12] via-[#c2410c] to-[#ea580c]';
  } else if (category === 'upgrade' || card.type === 'gatlingpea' || card.type === 'twinsunflower') {
    bgGradient = 'from-[#831843] via-[#be185d] to-[#f472b6]';
  }

  // Size dimensions
  const dims =
    size === 'sm'
      ? 'w-12 h-16 sm:w-14 sm:h-18'
      : size === 'lg'
      ? 'w-20 h-28 sm:w-24 sm:h-32'
      : 'w-13 h-17 sm:w-16 sm:h-21';

  return (
    <button
      id={`seed-card-${card.type}`}
      type="button"
      onClick={onClick}
      disabled={!isReady && onClick !== undefined}
      title={showDetailsTooltip ? `${card.name} (${card.cost} Matahari)` : undefined}
      className={`relative ${dims} rounded-lg sm:rounded-xl border-2 sm:border-3 flex flex-col justify-between p-0.5 sm:p-1 transition-all select-none shrink-0 ${
        isSelected
          ? 'border-yellow-300 ring-4 ring-yellow-400 scale-105 bg-[#fef08a] shadow-xl z-20'
          : isReady
          ? 'border-[#783e10] bg-[#fbf5dc] hover:scale-103 hover:border-amber-500 cursor-pointer shadow-md'
          : 'border-stone-600 bg-stone-300 opacity-65 cursor-not-allowed'
      } ${className}`}
    >
      {/* 1. TOP/CENTER PORTRAIT WINDOW (Matching authentic Almanac frame in p_almanac_big.webp) */}
      <div
        className={`w-full flex-1 rounded-md sm:rounded-lg overflow-hidden border border-[#542d0b]/60 relative bg-gradient-to-b ${bgGradient} flex items-center justify-center`}
      >
        {/* Sky Grass Blades at window base for authentic PvZ look */}
        {(category === 'day' || category === 'roof') && (
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#22c55e] border-t border-[#15803d]/40 flex justify-around opacity-60">
            <div className="w-0.5 h-1.5 bg-[#166534]" />
            <div className="w-0.5 h-2 bg-[#166534]" />
            <div className="w-0.5 h-1 bg-[#166534]" />
            <div className="w-0.5 h-1.5 bg-[#166534]" />
          </div>
        )}

        {/* The Plant Graphic */}
        <div className="w-full h-full flex items-center justify-center p-0.5">
          <PlantGraphic
            type={card.type as PlantType}
            className={size === 'lg' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-9 h-9 sm:w-12 sm:h-12'}
          />
        </div>
      </div>

      {/* 2. BOTTOM SUN COST RECTANGLE (Exact match to p_almanac_big.webp: Cost on left, Sun on right) */}
      <div className="w-full mt-0.5 bg-[#fffbeb] border border-[#b45309] rounded sm:rounded-md px-1 py-0.2 flex items-center justify-between shadow-inner leading-none">
        {/* Sun Cost Number in black bold PvZ Almanac Font */}
        <span className="text-[10px] sm:text-xs font-black text-[#1e1b4b] font-heading tracking-tight">
          {card.cost}
        </span>

        {/* Yellow Golden Sun Icon (PvZ Almanac Badge) */}
        <div className="relative w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            {/* Sun Rays */}
            <circle cx="20" cy="20" r="14" fill="#facc15" stroke="#eab308" strokeWidth="2" />
            <polygon points="20,2 23,8 17,8" fill="#f59e0b" />
            <polygon points="20,38 23,32 17,32" fill="#f59e0b" />
            <polygon points="2,20 8,23 8,17" fill="#f59e0b" />
            <polygon points="38,20 32,23 32,17" fill="#f59e0b" />
            <polygon points="7,7 13,10 9,14" fill="#f59e0b" />
            <polygon points="33,33 27,30 31,26" fill="#f59e0b" />
            <polygon points="33,7 27,10 31,14" fill="#f59e0b" />
            <polygon points="7,33 13,30 9,26" fill="#f59e0b" />
            {/* Smiling Center */}
            <circle cx="20" cy="20" r="9" fill="#fef08a" />
            <circle cx="17" cy="18" r="1.5" fill="#78350f" />
            <circle cx="23" cy="18" r="1.5" fill="#78350f" />
            <path d="M17 22 Q20 25 23 22" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 3. COOLDOWN OVERLAY (Dark sweep timer) */}
      {cooldownLeft > 0 && (
        <div className="absolute inset-0 bg-black/65 rounded-lg sm:rounded-xl flex flex-col items-center justify-center z-10">
          <span className="text-white font-black text-xs sm:text-sm font-heading drop-shadow">
            {cooldownLeft}s
          </span>
        </div>
      )}
    </button>
  );
};
