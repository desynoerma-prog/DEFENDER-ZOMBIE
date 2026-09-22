import React from 'react';
import { PlantType, ZombieType } from '../types';

interface PlantProps {
  type: PlantType;
  isShooting?: boolean;
  hpPercent?: number;
  className?: string;
}

export const PlantGraphic: React.FC<PlantProps> = ({
  type,
  isShooting,
  hpPercent = 1,
  className = 'w-14 h-14'
}) => {
  // 1. SUNFLOWER (Bunga Matahari) - Sangat ceria, kelopak berlapis, senyum bahagia
  if (type === 'sunflower') {
    return (
      <svg viewBox="0 0 100 100" className={`${className} anim-sunflower`} fill="none">
        {/* Soft ground shadow */}
        <ellipse cx="50" cy="92" rx="28" ry="6" fill="#14532d" opacity="0.4" />
        
        {/* Leafy feet / base leaves */}
        <path d="M30 88 Q20 82 22 90 Q36 94 44 88" fill="#15803d" />
        <path d="M70 88 Q80 82 78 90 Q64 94 56 88" fill="#15803d" />
        
        {/* Curved bouncy green stem */}
        <path d="M49 68 Q46 80 50 88" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" />
        <path d="M51 68 Q48 80 52 88" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
        
        {/* Stem Leaves */}
        <ellipse cx="34" cy="76" rx="11" ry="5" fill="#4ade80" transform="rotate(-25 34 76)" />
        <ellipse cx="64" cy="74" rx="11" ry="5" fill="#4ade80" transform="rotate(22 64 74)" />

        {/* Outer Golden Petals */}
        <g className="anim-spin-slow" style={{ transformOrigin: '50px 42px' }}>
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <path
              key={`p1_${i}`}
              d="M50 14 Q44 26 46 36 Q54 36 56 26 Z"
              fill={i % 2 === 0 ? '#fbbf24' : '#f59e0b'}
              stroke="#d97706"
              strokeWidth="0.75"
              transform={`rotate(${angle} 50 42)`}
            />
          ))}
        </g>

        {/* Inner Bright Sun Petals for 3D depth */}
        <g style={{ transformOrigin: '50px 42px' }}>
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle, i) => (
            <ellipse
              key={`p2_${i}`}
              cx="50"
              cy="23"
              rx="7"
              ry="11"
              fill="#fef08a"
              stroke="#facc15"
              strokeWidth="0.5"
              transform={`rotate(${angle} 50 42)`}
            />
          ))}
        </g>

        {/* Sun Face Disk */}
        <circle cx="50" cy="42" r="22" fill="#78350f" />
        <circle cx="49" cy="41" r="20" fill="#92400e" />
        <circle cx="48" cy="40" r="18" fill="#b45309" />

        {/* Rosy Blushing Cheeks */}
        <ellipse cx="36" cy="48" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
        <ellipse cx="62" cy="48" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />

        {/* Expressive Anime/Cartoon Big Eyes with highlights */}
        <ellipse cx="42" cy="38" rx="4" ry="6" fill="#0f172a" />
        <ellipse cx="56" cy="38" rx="4" ry="6" fill="#0f172a" />
        {/* Eye highlights */}
        <circle cx="41" cy="35" r="2" fill="white" />
        <circle cx="43" cy="40" r="1" fill="white" />
        <circle cx="55" cy="35" r="2" fill="white" />
        <circle cx="57" cy="40" r="1" fill="white" />

        {/* Wide happy open smile with tongue */}
        <path d="M42 46 Q49 55 56 46 Z" fill="#451a03" />
        <path d="M44 49 Q49 54 54 49 Z" fill="#fb7185" />
      </svg>
    );
  }

  // 2. PEASHOOTER (Penembak Pecahan) - Leher melengkung dinamis, mata berbinar, moncong terompet
  if (type === 'peashooter') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${className} ${isShooting ? 'anim-shoot' : 'anim-breathe'}`}
        fill="none"
      >
        {/* Shadow */}
        <ellipse cx="46" cy="92" rx="26" ry="6" fill="#14532d" opacity="0.4" />

        {/* Root Leaves */}
        <path d="M24 88 Q14 80 20 90 Q34 94 42 88" fill="#15803d" />
        <path d="M66 88 Q78 80 72 90 Q58 94 50 88" fill="#15803d" />
        <path d="M44 91 Q48 96 52 91" fill="#166534" />

        {/* Flexible Curved Neck */}
        <path
          d={isShooting ? 'M44 72 Q38 84 46 88' : 'M46 70 Q42 82 48 88'}
          stroke="#22c55e"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d={isShooting ? 'M46 72 Q40 84 48 88' : 'M48 70 Q44 82 50 88'}
          stroke="#16a34a"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Back bouncing leaf / ponytail */}
        <path
          d={isShooting ? 'M30 38 Q10 24 16 46 Q28 44 34 42' : 'M32 36 Q12 18 18 42 Q28 42 36 40'}
          fill="#4ade80"
          stroke="#16a34a"
          strokeWidth="1.5"
        />

        {/* Main Head Bulb */}
        <ellipse cx={isShooting ? '45' : '48'} cy="44" rx="24" ry="22" fill="#22c55e" />
        <ellipse cx={isShooting ? '43' : '46'} cy="40" rx="20" ry="18" fill="#4ade80" />

        {/* Cannon Snout pointing right */}
        {/* Snout tube */}
        <path
          d={
            isShooting
              ? 'M58 35 L76 31 L80 57 L60 53 Z'
              : 'M60 36 L74 34 L76 54 L62 52 Z'
          }
          fill="#16a34a"
        />
        {/* Flared Snout Ring */}
        <ellipse
          cx={isShooting ? '78' : '75'}
          cy="44"
          rx={isShooting ? '9' : '8'}
          ry={isShooting ? '15' : '13'}
          fill="#22c55e"
          stroke="#15803d"
          strokeWidth="2"
        />
        {/* Dark Inside of Snout Barrel */}
        <ellipse
          cx={isShooting ? '78' : '75'}
          cy="44"
          rx={isShooting ? '5.5' : '4.5'}
          ry={isShooting ? '10.5' : '9'}
          fill="#052e16"
        />
        {isShooting && (
          <circle cx="80" cy="44" r="5" fill="#86efac" className="animate-ping" />
        )}

        {/* Expressive Cartoon Big Eyes */}
        <ellipse cx={isShooting ? '42' : '44'} cy="36" rx="5" ry="7.5" fill="#0f172a" />
        <circle cx={isShooting ? '41' : '43'} cy="33" r="2.2" fill="white" />
        <circle cx={isShooting ? '43' : '45'} cy="38" r="1.2" fill="white" />

        <ellipse cx={isShooting ? '54' : '56'} cy="36" rx="5" ry="7.5" fill="#0f172a" />
        <circle cx={isShooting ? '53' : '55'} cy="33" r="2.2" fill="white" />
        <circle cx={isShooting ? '55' : '57'} cy="38" r="1.2" fill="white" />

        {/* Determined Eyebrow Ridges */}
        <path
          d={isShooting ? 'M37 28 Q44 26 49 30' : 'M39 28 Q44 29 49 30'}
          stroke="#15803d"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d={isShooting ? 'M51 30 Q56 26 61 28' : 'M51 30 Q56 29 61 28'}
          stroke="#15803d"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 3. THREEPEATER (Penembak Tiga Kepala) - 3 Kepala Sekaligus! Senjata Super Kuat!
  if (type === 'threepeater') {
    return (
      <svg
        viewBox="0 0 110 110"
        className={`${className} ${isShooting ? 'anim-shoot' : 'anim-breathe'}`}
        fill="none"
      >
        {/* Shadow */}
        <ellipse cx="55" cy="100" rx="36" ry="7" fill="#14532d" opacity="0.45" />

        {/* Broad Root Leaf Pad */}
        <path d="M22 96 Q10 88 18 100 Q36 102 46 96" fill="#15803d" />
        <path d="M86 96 Q98 88 90 100 Q72 102 62 96" fill="#15803d" />

        {/* Central Thick Branch Trunk */}
        <path d="M54 74 Q52 88 54 96" stroke="#16a34a" strokeWidth="12" strokeLinecap="round" />
        <path d="M54 74 L30 46" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" />
        <path d="M54 74 L55 36" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
        <path d="M54 74 L78 48" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" />

        {/* --- HEAD 1: LEFT HEAD (Angled slightly up) --- */}
        <g transform="translate(6, 4)">
          <path d="M24 36 Q10 24 14 42" fill="#4ade80" stroke="#16a34a" strokeWidth="1.2" />
          <ellipse cx="28" cy="38" rx="14" ry="13" fill="#22c55e" />
          <ellipse cx="27" cy="36" rx="11" ry="10" fill="#4ade80" />
          {/* Snout */}
          <path d="M36 34 L46 32 L47 46 L38 44 Z" fill="#16a34a" />
          <ellipse cx="46" cy="39" rx="5" ry="8" fill="#22c55e" stroke="#15803d" strokeWidth="1.2" />
          <ellipse cx="46" cy="39" rx="3" ry="5.5" fill="#052e16" />
          {/* Eyes */}
          <circle cx="26" cy="33" r="3.2" fill="#0f172a" />
          <circle cx="25" cy="32" r="1.2" fill="white" />
          <circle cx="33" cy="33" r="3.2" fill="#0f172a" />
          <circle cx="32" cy="32" r="1.2" fill="white" />
        </g>

        {/* --- HEAD 2: TOP CENTER HEAD (Commanding leader) --- */}
        <g transform="translate(18, -4)">
          <path d="M32 26 Q16 12 20 32" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5" />
          <ellipse cx="37" cy="28" rx="16" ry="15" fill="#22c55e" />
          <ellipse cx="35" cy="25" rx="13" ry="12" fill="#4ade80" />
          {/* Snout */}
          <path d="M46 22 L58 20 L59 36 L48 34 Z" fill="#16a34a" />
          <ellipse cx="58" cy="28" rx="6" ry="9" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
          <ellipse cx="58" cy="28" rx="3.5" ry="6.5" fill="#052e16" />
          {isShooting && <circle cx="61" cy="28" r="4" fill="#86efac" className="animate-ping" />}
          {/* Eyes with fierce focus */}
          <ellipse cx="34" cy="23" rx="3.8" ry="4.8" fill="#0f172a" />
          <circle cx="33" cy="21" r="1.5" fill="white" />
          <ellipse cx="42" cy="23" rx="3.8" ry="4.8" fill="#0f172a" />
          <circle cx="41" cy="21" r="1.5" fill="white" />
          <path d="M30 17 L38 19" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          <path d="M40 19 L47 17" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* --- HEAD 3: RIGHT HEAD (Angled forward-down) --- */}
        <g transform="translate(36, 12)">
          <path d="M36 34 Q22 24 26 40" fill="#4ade80" stroke="#16a34a" strokeWidth="1.2" />
          <ellipse cx="40" cy="36" rx="14" ry="13" fill="#22c55e" />
          <ellipse cx="38" cy="34" rx="11" ry="10" fill="#4ade80" />
          {/* Snout */}
          <path d="M48 32 L58 31 L59 45 L50 43 Z" fill="#16a34a" />
          <ellipse cx="58" cy="38" rx="5" ry="8" fill="#22c55e" stroke="#15803d" strokeWidth="1.2" />
          <ellipse cx="58" cy="38" rx="3" ry="5.5" fill="#052e16" />
          {/* Eyes */}
          <circle cx="37" cy="31" r="3.2" fill="#0f172a" />
          <circle cx="36" cy="30" r="1.2" fill="white" />
          <circle cx="44" cy="31" r="3.2" fill="#0f172a" />
          <circle cx="43" cy="30" r="1.2" fill="white" />
        </g>

        {/* Badge '3X' on the base trunk */}
        <rect x="47" y="78" width="16" height="12" rx="4" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
        <text x="50" y="87" fill="#fef08a" fontSize="8" fontWeight="black">3×</text>
      </svg>
    );
  }

  // 4. ICESHOOTER (Penembak Es) - Mahkota kristal es, warna biru es mengilap
  if (type === 'iceshooter') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${className} ${isShooting ? 'anim-shoot' : 'anim-breathe'}`}
        fill="none"
      >
        <ellipse cx="46" cy="92" rx="26" ry="6" fill="#0369a1" opacity="0.35" />

        {/* Icy Root Pads */}
        <path d="M24 88 Q14 80 20 90 Q34 94 42 88" fill="#0284c7" />
        <path d="M66 88 Q78 80 72 90 Q58 94 50 88" fill="#0284c7" />

        {/* Stem */}
        <path d="M46 70 Q42 82 48 88" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />
        <path d="M48 70 Q44 82 50 88" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

        {/* Ice Crystal Spikes on head */}
        <path d="M26 34 L10 24 L22 44 Z" fill="#bae6fd" stroke="#38bdf8" strokeWidth="1" />
        <path d="M28 20 L16 8 L36 22 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
        <path d="M38 14 L30 2 L46 16 Z" fill="#bae6fd" stroke="#38bdf8" strokeWidth="1" />

        {/* Main Ice Head */}
        <ellipse cx="48" cy="44" rx="24" ry="22" fill="#38bdf8" />
        <ellipse cx="46" cy="40" rx="20" ry="18" fill="#7dd3fc" />

        {/* Ice Snout */}
        <path d="M60 36 L74 34 L76 54 L62 52 Z" fill="#0284c7" />
        <ellipse cx="75" cy="44" rx="8" ry="13" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" />
        <ellipse cx="75" cy="44" rx="4.5" ry="9" fill="#082f49" />
        {isShooting && <circle cx="78" cy="44" r="5" fill="#e0f2fe" className="animate-ping" />}

        {/* Eyes */}
        <ellipse cx="44" cy="36" rx="5" ry="7.5" fill="#082f49" />
        <circle cx="43" cy="33" r="2.2" fill="white" />
        <ellipse cx="56" cy="36" rx="5" ry="7.5" fill="#082f49" />
        <circle cx="55" cy="33" r="2.2" fill="white" />

        {/* Floating snowflake sparkles */}
        <text x="14" y="56" fill="#bae6fd" fontSize="10" className="animate-pulse">❄</text>
        <text x="68" y="24" fill="#e0f2fe" fontSize="8" className="animate-pulse">✨</text>
      </svg>
    );
  }

  // 5. WALL-NUT (Benteng Kacang) - Kacang bulat kokoh, mata bulat lucu, retak jika tergigit
  if (type === 'wallnut') {
    const isCracked = hpPercent < 0.65;
    const isHeavyCracked = hpPercent < 0.35;

    return (
      <svg viewBox="0 0 100 100" className={`${className} anim-breathe`} fill="none">
        <ellipse cx="50" cy="92" rx="28" ry="7" fill="#78350f" opacity="0.35" />

        {/* Textured Round Nut Shell */}
        <ellipse cx="50" cy="52" rx="30" ry="38" fill="#78350f" />
        <ellipse cx="48" cy="49" rx="27" ry="35" fill="#92400e" />
        <ellipse cx="46" cy="46" rx="24" ry="32" fill="#b45309" />
        <ellipse cx="43" cy="42" rx="20" ry="28" fill="#d97706" opacity="0.6" />

        {/* Shell Segments / Vertical Ridges */}
        <path d="M38 18 Q32 50 36 84" stroke="#78350f" strokeWidth="2.5" opacity="0.4" fill="none" />
        <path d="M62 18 Q68 50 64 84" stroke="#78350f" strokeWidth="2.5" opacity="0.4" fill="none" />

        {/* Big Googly Cartoon Nut Eyes */}
        <ellipse cx="40" cy="40" rx="8.5" ry="11" fill="white" stroke="#78350f" strokeWidth="1.5" />
        <ellipse cx="42" cy="40" rx="4.5" ry="6.5" fill="#1e1b4b" />
        <circle cx="41" cy="37" r="2" fill="white" />

        <ellipse cx="60" cy="40" rx="8.5" ry="11" fill="white" stroke="#78350f" strokeWidth="1.5" />
        <ellipse cx="62" cy="40" rx="4.5" ry="6.5" fill="#1e1b4b" />
        <circle cx="61" cy="37" r="2" fill="white" />

        {/* Mouth & Expressions */}
        {isHeavyCracked ? (
          // Panicked toothy expression
          <g>
            <path d="M42 66 Q50 60 58 66" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
            <path d="M68 34 Q70 30 72 34 Q70 38 68 34" fill="#38bdf8" /> {/* Sweat drop */}
          </g>
        ) : isCracked ? (
          // Worried mouth
          <path d="M44 64 Q50 61 56 64" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
        ) : (
          // Cheerful friendly smile
          <path d="M44 60 Q50 68 56 60" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Dynamic Shell Cracks when damaged */}
        {isCracked && (
          <g stroke="#451a03" strokeWidth="2.5" strokeLinecap="round">
            <path d="M26 36 L34 44 L30 54" />
            <path d="M34 44 L40 46" />
          </g>
        )}
        {isHeavyCracked && (
          <g stroke="#451a03" strokeWidth="3" strokeLinecap="round">
            <path d="M66 50 L74 58 L70 72" />
            <path d="M74 58 L80 62" />
            <path d="M46 72 L50 82" />
          </g>
        )}
      </svg>
    );
  }

  // 6. POTATO MINE (Ranjau Persen) - Tertanam di tanah, antena berkedip siap meledak
  if (type === 'potatomine') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <ellipse cx="50" cy="88" rx="32" ry="8" fill="#573618" opacity="0.4" />
        {/* Dirt Mound */}
        <ellipse cx="50" cy="82" rx="28" ry="12" fill="#78350f" />
        <circle cx="34" cy="84" r="3" fill="#92400e" />
        <circle cx="66" cy="85" r="3.5" fill="#92400e" />

        {/* Cute Chubby Potato Head */}
        <ellipse cx="50" cy="68" rx="22" ry="18" fill="#a16207" />
        <ellipse cx="48" cy="65" rx="19" ry="15" fill="#ca8a04" />

        {/* Spring Antenna stalk */}
        <path d="M50 50 Q46 42 50 36" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
        {/* Flashing Red Beacon */}
        <circle cx="50" cy="30" r="8" fill="#ef4444" className="animate-ping" opacity="0.75" />
        <circle cx="50" cy="30" r="7" fill="#dc2626" />
        <circle cx="48" cy="28" r="2.5" fill="#fca5a5" />

        {/* Eyes */}
        <circle cx="43" cy="67" r="3.5" fill="#1e1b4b" />
        <circle cx="42" cy="65" r="1.2" fill="white" />
        <circle cx="57" cy="67" r="3.5" fill="#1e1b4b" />
        <circle cx="56" cy="65" r="1.2" fill="white" />

        {/* Buck teeth smile */}
        <rect x="47" y="74" width="3" height="4" fill="white" rx="0.5" />
        <rect x="51" y="74" width="3" height="4" fill="white" rx="0.5" />
      </svg>
    );
  }

  // 7. CHERRY BOMB (Bom Ceri) - Dua bersaudara ceri merah membara dengan sumbu menyala
  if (type === 'cherrybomb') {
    return (
      <svg viewBox="0 0 100 100" className={`${className} animate-bounce`} fill="none">
        <ellipse cx="50" cy="94" rx="30" ry="6" fill="#881337" opacity="0.35" />

        {/* Flexible Joining Stems */}
        <path d="M34 56 Q48 18 50 16 Q52 18 66 56" stroke="#15803d" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M50 16 Q64 6 72 10" stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Fuse Sparks */}
        <circle cx="50" cy="14" r="5" fill="#facc15" className="animate-ping" />
        <circle cx="50" cy="14" r="4" fill="#f97316" />

        {/* Left Cherry Brother */}
        <circle cx="34" cy="65" r="20" fill="#be123c" />
        <circle cx="31" cy="59" r="16" fill="#e11d48" />
        <circle cx="28" cy="55" r="12" fill="#fb7185" opacity="0.6" />
        {/* Fierce Angry Eyes */}
        <ellipse cx="30" cy="60" rx="4" ry="5.5" fill="#0f172a" />
        <circle cx="29" cy="58" r="1.5" fill="white" />
        <ellipse cx="40" cy="60" rx="4" ry="5.5" fill="#0f172a" />
        <circle cx="39" cy="58" r="1.5" fill="white" />
        <path d="M26 53 L34 57" stroke="#4c0519" strokeWidth="2" strokeLinecap="round" />
        <path d="M37 57 L44 53" stroke="#4c0519" strokeWidth="2" strokeLinecap="round" />
        {/* Gritted mouth */}
        <rect x="31" y="70" width="10" height="4" rx="1" fill="#4c0519" />
        <rect x="33" y="71" width="3" height="2" fill="white" />
        <rect x="37" y="71" width="3" height="2" fill="white" />

        {/* Right Cherry Brother */}
        <circle cx="66" cy="65" r="20" fill="#be123c" />
        <circle cx="63" cy="59" r="16" fill="#e11d48" />
        <circle cx="60" cy="55" r="12" fill="#fb7185" opacity="0.6" />
        {/* Fierce Eyes */}
        <ellipse cx="60" cy="60" rx="4" ry="5.5" fill="#0f172a" />
        <circle cx="59" cy="58" r="1.5" fill="white" />
        <ellipse cx="70" cy="60" rx="4" ry="5.5" fill="#0f172a" />
        <circle cx="69" cy="58" r="1.5" fill="white" />
        <path d="M56 53 L64 57" stroke="#4c0519" strokeWidth="2" strokeLinecap="round" />
        <path d="M67 57 L74 53" stroke="#4c0519" strokeWidth="2" strokeLinecap="round" />
        {/* Gritted mouth */}
        <rect x="61" y="70" width="10" height="4" rx="1" fill="#4c0519" />
        <rect x="63" y="71" width="3" height="2" fill="white" />
        <rect x="67" y="71" width="3" height="2" fill="white" />
      </svg>
    );
  }

  // 8. REPEATER (Penembak Ganda) - Hijau lebih gelap, alis tajam bertekad, 2 daun belakang
  if (type === 'repeater') {
    return (
      <svg viewBox="0 0 100 100" className={`${className} ${isShooting ? 'anim-shoot' : 'anim-breathe'}`} fill="none">
        <ellipse cx="50" cy="94" rx="28" ry="6" fill="#14532d" opacity="0.4" />
        {/* Root Leaves */}
        <path d="M30 90 Q18 84 22 92 Q36 96 46 90" fill="#14532d" />
        <path d="M70 90 Q82 84 78 92 Q64 96 54 90" fill="#14532d" />
        {/* Stem */}
        <path d="M47 64 Q42 82 48 90" stroke="#15803d" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="32" cy="74" rx="10" ry="5" fill="#22c55e" transform="rotate(-28 32 74)" />
        {/* TWO Back Leaves characteristic of Repeater */}
        <path d="M22 36 Q10 26 12 42 Q20 44 26 38" fill="#166534" stroke="#14532d" strokeWidth="1.5" />
        <path d="M18 46 Q6 38 10 52 Q18 52 24 46" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
        {/* Dark Green Head */}
        <circle cx="48" cy="42" r="23" fill="#15803d" />
        <circle cx="45" cy="38" r="19" fill="#16a34a" />
        {/* Snout Barrel */}
        <path d="M58 35 L76 31 L78 51 L60 47 Z" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
        <ellipse cx="76" cy="41" rx="6" ry="10" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
        <ellipse cx="76" cy="41" rx="4" ry="7.5" fill="#052e16" />
        {/* Focused Fierce Eyebrows */}
        <path d="M36 28 L47 33" stroke="#052e16" strokeWidth="3" strokeLinecap="round" />
        <path d="M51 33 L62 28" stroke="#052e16" strokeWidth="3" strokeLinecap="round" />
        {/* Eyes */}
        <ellipse cx="42" cy="38" rx="4" ry="6" fill="#0f172a" />
        <circle cx="41" cy="36" r="1.8" fill="white" />
        <ellipse cx="54" cy="38" rx="4" ry="6" fill="#0f172a" />
        <circle cx="53" cy="36" r="1.8" fill="white" />
      </svg>
    );
  }

  // 9. CHOMPER (Bunga Pemangsa Ungu) - Mulut raksasa dengan gigi taring putih tajam & tenggorokan merah muda
  if (type === 'chomper') {
    return (
      <svg viewBox="0 0 100 100" className={`${className} anim-breathe`} fill="none">
        <ellipse cx="50" cy="94" rx="28" ry="6" fill="#14532d" opacity="0.4" />
        {/* Thorny Green Base & Stem */}
        <path d="M26 90 Q16 82 20 92 Q34 96 46 90" fill="#15803d" />
        <path d="M74 90 Q84 82 80 92 Q66 96 54 90" fill="#15803d" />
        <path d="M48 68 Q44 82 48 90" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />
        {/* Stem Spikes */}
        <polygon points="43,76 36,74 43,80" fill="#15803d" />
        <polygon points="53,72 60,70 53,76" fill="#15803d" />
        {/* Green Collar Cup */}
        <path d="M30 64 Q50 74 70 64 Q50 56 30 64" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />
        {/* Big Purple Upper Jaw */}
        <path d="M28 44 Q50 18 72 44 Q50 52 28 44" fill="#7e22ce" stroke="#581c87" strokeWidth="2" />
        <path d="M32 42 Q50 24 68 42" fill="#a855f7" />
        {/* Big Purple Lower Jaw */}
        <path d="M30 46 Q50 70 70 46 Q50 52 30 46" fill="#6b21a8" stroke="#581c87" strokeWidth="2" />
        {/* Pink Inner Mouth Throat */}
        <ellipse cx="50" cy="46" rx="16" ry="9" fill="#f43f5e" />
        <ellipse cx="50" cy="46" rx="9" ry="5" fill="#9f1239" />
        {/* Sharp White Jagged Teeth (Upper Jaw) */}
        <polygon points="34,42 38,47 42,42" fill="white" />
        <polygon points="42,42 46,48 50,42" fill="white" />
        <polygon points="50,42 54,48 58,42" fill="white" />
        <polygon points="58,42 62,47 66,42" fill="white" />
        {/* Sharp White Teeth (Lower Jaw) */}
        <polygon points="36,49 40,44 44,49" fill="white" />
        <polygon points="44,49 48,43 52,49" fill="white" />
        <polygon points="52,49 56,43 60,49" fill="white" />
        <polygon points="60,49 64,44 68,49" fill="white" />
        {/* Yellow-Green Leaf Crest on top */}
        <path d="M50 20 Q54 8 62 12 Q56 22 50 20" fill="#22c55e" />
      </svg>
    );
  }

  // 10. SQUASH (Labu Hijau Pemarah) - Alis tebal mengerut, bibir merengut, siap melompat
  if (type === 'squash') {
    return (
      <svg viewBox="0 0 100 100" className={`${className} anim-breathe`} fill="none">
        <ellipse cx="50" cy="94" rx="30" ry="6" fill="#14532d" opacity="0.4" />
        {/* Stem on head */}
        <path d="M48 20 Q44 10 52 8 Q56 12 52 20" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
        {/* Squash Body: Pear/Bell shaped with ribs */}
        <path
          d="M34 32 Q50 26 66 32 Q80 50 78 78 Q74 92 50 92 Q26 92 22 78 Q20 50 34 32 Z"
          fill="#84cc16"
          stroke="#4d7c0f"
          strokeWidth="2.5"
        />
        {/* Vertical Ribbing Grooves */}
        <path d="M38 34 Q32 60 36 88" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 28 Q50 60 50 92" stroke="#65a30d" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M62 34 Q68 60 64 88" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" />
        {/* Thick Furrowed Unibrow */}
        <path d="M30 46 Q50 56 70 46 Q64 40 50 46 Q36 40 30 46 Z" fill="#365314" />
        {/* Grumpy Eyes Under Brow */}
        <ellipse cx="39" cy="52" rx="4.5" ry="5.5" fill="#fef08a" stroke="#365314" strokeWidth="1" />
        <circle cx="41" cy="52" r="2.2" fill="#0f172a" />
        <ellipse cx="61" cy="52" rx="4.5" ry="5.5" fill="#fef08a" stroke="#365314" strokeWidth="1" />
        <circle cx="59" cy="52" r="2.2" fill="#0f172a" />
        {/* Deep Frowning Mouth */}
        <path d="M38 74 Q50 66 62 74" stroke="#14532d" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 11. JALAPENO (Cabai Api Membara) - Merah membara, gigi geram, api menyala di mahkota
  if (type === 'jalapeno') {
    return (
      <svg viewBox="0 0 100 100" className={`${className} animate-pulse`} fill="none">
        <ellipse cx="50" cy="94" rx="24" ry="5" fill="#7f1d1d" opacity="0.4" />
        {/* Fiery Blast Flame at top */}
        <g className="animate-bounce">
          <path d="M46 22 Q40 6 48 2 Q52 10 56 4 Q60 14 54 22 Z" fill="#facc15" />
          <path d="M48 20 Q44 10 50 6 Q54 12 52 20 Z" fill="#ea580c" />
        </g>
        {/* Green Calyx Stalk */}
        <path d="M42 24 Q50 18 58 24 Q52 26 42 24" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
        {/* Hot Red Pepper Body */}
        <path
          d="M40 24 Q60 24 62 38 Q66 64 56 86 Q52 92 48 92 Q44 92 40 84 Q34 60 38 38 Q38 24 40 24 Z"
          fill="#dc2626"
          stroke="#991b1b"
          strokeWidth="2.5"
        />
        {/* Hot Pepper Highlight */}
        <path d="M42 32 Q40 54 44 74" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" />
        {/* Angry Slanted Eyebrows */}
        <path d="M38 38 L48 43" stroke="#450a0a" strokeWidth="3" strokeLinecap="round" />
        <path d="M52 43 L62 38" stroke="#450a0a" strokeWidth="3" strokeLinecap="round" />
        {/* Intense Eyes */}
        <ellipse cx="43" cy="46" rx="3.5" ry="5" fill="#fef08a" />
        <circle cx="44" cy="46" r="2" fill="#450a0a" />
        <ellipse cx="57" cy="46" rx="3.5" ry="5" fill="#fef08a" />
        <circle cx="56" cy="46" r="2" fill="#450a0a" />
        {/* Gritting White Teeth */}
        <rect x="42" y="58" width="16" height="6" rx="1.5" fill="#450a0a" />
        <rect x="44" y="59" width="3.5" height="4" fill="white" />
        <rect x="48" y="59" width="3.5" height="4" fill="white" />
        <rect x="52" y="59" width="3.5" height="4" fill="white" />
      </svg>
    );
  }

  // 12. TORCHWOOD (Kayu Obor Api) - Batang kayu tersenyum dengan kobaran api menyala di atas kepala
  if (type === 'torchwood') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <ellipse cx="50" cy="94" rx="28" ry="6" fill="#451a03" opacity="0.4" />
        {/* Roaring Fire on top */}
        <g className="animate-pulse">
          <path d="M34 38 Q26 18 40 10 Q42 22 50 6 Q58 18 64 8 Q72 20 66 38 Z" fill="#ea580c" />
          <path d="M38 36 Q32 22 42 16 Q46 24 50 12 Q56 22 60 16 Q64 26 62 36 Z" fill="#facc15" />
          <circle cx="50" cy="28" r="8" fill="#fef08a" className="animate-ping" opacity="0.7" />
        </g>
        {/* Wooden Tree Trunk Stump */}
        <path
          d="M32 38 Q50 42 68 38 L72 88 Q50 94 28 88 Z"
          fill="#78350f"
          stroke="#451a03"
          strokeWidth="2.5"
        />
        {/* Tree Bark Grooves & Rings */}
        <path d="M40 44 L38 84" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
        <path d="M60 44 L62 84" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
        {/* Burning Fiery Eyes inside trunk */}
        <ellipse cx="42" cy="56" rx="4" ry="5.5" fill="#facc15" />
        <circle cx="42" cy="56" r="2" fill="#78350f" />
        <ellipse cx="58" cy="56" rx="4" ry="5.5" fill="#facc15" />
        <circle cx="58" cy="56" r="2" fill="#78350f" />
        {/* Friendly Wooden Knot Smile */}
        <path d="M44 72 Q50 78 56 72" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 13. TALL-NUT (Kacang Raksasa) - Tubuh tinggi kokoh, alis bertekad kuat, pertahanan terhebat
  if (type === 'tallnut') {
    const isCracked = hpPercent < 0.66;
    const isHeavyCracked = hpPercent < 0.33;

    return (
      <svg viewBox="0 0 100 120" className={className} fill="none">
        <ellipse cx="50" cy="114" rx="30" ry="6" fill="#451a03" opacity="0.4" />
        {/* Towering Tall-nut Body */}
        <path
          d="M26 40 Q26 14 50 14 Q74 14 74 40 L76 96 Q76 112 50 112 Q24 112 24 96 Z"
          fill="#92400e"
          stroke="#451a03"
          strokeWidth="3"
        />
        <path
          d="M30 40 Q30 18 50 18 Q70 18 70 40 L72 94 Q72 108 50 108 Q28 108 28 94 Z"
          fill="#b45309"
        />
        {/* Stern Heavy Eyebrows */}
        <path d="M32 36 L47 40" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
        <path d="M53 40 L68 36" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
        {/* Resolute Stoic Eyes */}
        <ellipse cx="40" cy="46" rx="5" ry="7" fill="#0f172a" />
        <circle cx="41" cy="44" r="2.2" fill="white" />
        <ellipse cx="60" cy="46" rx="5" ry="7" fill="#0f172a" />
        <circle cx="59" cy="44" r="2.2" fill="white" />
        {/* Gritted Mouth */}
        {isCracked ? (
          <path d="M42 76 Q50 72 58 76" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
        ) : (
          <path d="M42 74 Q50 78 58 74" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
        )}
        {/* Cracks when damaged */}
        {isCracked && (
          <g stroke="#451a03" strokeWidth="3" strokeLinecap="round">
            <path d="M28 50 L38 60 L34 72" />
          </g>
        )}
        {isHeavyCracked && (
          <g stroke="#451a03" strokeWidth="3.5" strokeLinecap="round">
            <path d="M72 60 L62 70 L66 84" />
            {/* Tear drop when heavily damaged like in PvZ! */}
            <path d="M38 56 Q36 64 38 66 Q42 66 40 56" fill="#38bdf8" />
          </g>
        )}
      </svg>
    );
  }

  // 14. GATLING PEA (Meriam Helm Militer 4 Laras) - Helm baja tentara hijau & 4 laras putar
  if (type === 'gatlingpea') {
    return (
      <svg viewBox="0 0 100 100" className={`${className} ${isShooting ? 'anim-shoot' : 'anim-breathe'}`} fill="none">
        <ellipse cx="50" cy="94" rx="28" ry="6" fill="#14532d" opacity="0.4" />
        {/* Root leaves & stem */}
        <path d="M30 90 Q18 84 22 92 Q36 96 46 90" fill="#14532d" />
        <path d="M70 90 Q82 84 78 92 Q64 96 54 90" fill="#14532d" />
        <path d="M47 64 Q42 82 48 90" stroke="#15803d" strokeWidth="8" strokeLinecap="round" />
        {/* Dark Green Head */}
        <circle cx="46" cy="44" r="22" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
        {/* Military Steel Helmet on Head */}
        <path
          d="M26 38 Q26 16 48 16 Q70 16 70 38 Q74 44 48 44 Q24 44 26 38 Z"
          fill="#365314"
          stroke="#14532d"
          strokeWidth="2.5"
        />
        {/* Helmet Rim & Chin Strap */}
        <path d="M24 40 L72 40" stroke="#1a2e05" strokeWidth="3" strokeLinecap="round" />
        <path d="M34 40 L38 58 L46 58" stroke="#78350f" strokeWidth="2" fill="none" />
        {/* Gatling Quad-Barrel Muzzle (4 Gun Barrels) */}
        <g transform="translate(56, 32)">
          <rect x="0" y="4" width="22" height="18" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
          {/* 4 Barrel Tubes */}
          <rect x="18" y="5" width="8" height="4" rx="1" fill="#64748b" stroke="#0f172a" strokeWidth="1" />
          <rect x="18" y="15" width="8" height="4" rx="1" fill="#64748b" stroke="#0f172a" strokeWidth="1" />
          <circle cx="26" cy="7" r="1.5" fill="#020617" />
          <circle cx="26" cy="17" r="1.5" fill="#020617" />
          {isShooting && (
            <circle cx="28" cy="11" r="5" fill="#facc15" className="animate-ping" />
          )}
        </g>
        {/* Fierce Eyes */}
        <ellipse cx="40" cy="46" rx="4" ry="6" fill="#0f172a" />
        <circle cx="39" cy="44" r="1.8" fill="white" />
        <ellipse cx="52" cy="46" rx="4" ry="6" fill="#0f172a" />
        <circle cx="51" cy="44" r="1.8" fill="white" />
      </svg>
    );
  }

  // 15. TWIN SUNFLOWER (Bunga Matahari Kembar) - Dua kepala tersenyum berdampingan
  if (type === 'twinsunflower') {
    return (
      <svg viewBox="0 0 110 100" className={`${className} anim-sunflower`} fill="none">
        <ellipse cx="55" cy="94" rx="36" ry="6" fill="#14532d" opacity="0.4" />
        {/* Root leaves */}
        <path d="M26 90 Q16 84 20 92 Q34 96 46 90" fill="#15803d" />
        <path d="M84 90 Q94 84 90 92 Q76 96 64 90" fill="#15803d" />
        {/* Split Y Stem */}
        <path d="M55 76 Q54 88 55 92" stroke="#16a34a" strokeWidth="9" strokeLinecap="round" />
        <path d="M55 76 Q42 66 38 54" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" />
        <path d="M55 76 Q68 66 72 54" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" />

        {/* LEFT FLOWER HEAD */}
        <g transform="translate(4, 2)">
          {/* Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => (
            <ellipse
              key={`tp1_${i}`}
              cx="34"
              cy="36"
              rx="5.5"
              ry="9.5"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="0.5"
              transform={`rotate(${ang} 34 36)`}
            />
          ))}
          {/* Face Disk */}
          <circle cx="34" cy="36" r="14" fill="#92400e" />
          <circle cx="33" cy="35" r="12" fill="#b45309" />
          {/* Eyes & Smile */}
          <ellipse cx="29" cy="34" rx="2.5" ry="4" fill="#0f172a" />
          <circle cx="28.5" cy="32.5" r="1" fill="white" />
          <ellipse cx="39" cy="34" rx="2.5" ry="4" fill="#0f172a" />
          <circle cx="38.5" cy="32.5" r="1" fill="white" />
          <circle cx="25" cy="38" r="2" fill="#f43f5e" opacity="0.6" />
          <circle cx="43" cy="38" r="2" fill="#f43f5e" opacity="0.6" />
          <path d="M29 38 Q34 44 39 38" stroke="#451a03" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* RIGHT FLOWER HEAD */}
        <g transform="translate(38, 2)">
          {/* Petals */}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((ang, i) => (
            <ellipse
              key={`tp2_${i}`}
              cx="34"
              cy="36"
              rx="5.5"
              ry="9.5"
              fill="#f59e0b"
              stroke="#d97706"
              strokeWidth="0.5"
              transform={`rotate(${ang} 34 36)`}
            />
          ))}
          {/* Face Disk */}
          <circle cx="34" cy="36" r="14" fill="#92400e" />
          <circle cx="33" cy="35" r="12" fill="#b45309" />
          {/* Eyes & Smile */}
          <ellipse cx="29" cy="34" rx="2.5" ry="4" fill="#0f172a" />
          <circle cx="28.5" cy="32.5" r="1" fill="white" />
          <ellipse cx="39" cy="34" rx="2.5" ry="4" fill="#0f172a" />
          <circle cx="38.5" cy="32.5" r="1" fill="white" />
          <circle cx="25" cy="38" r="2" fill="#f43f5e" opacity="0.6" />
          <circle cx="43" cy="38" r="2" fill="#f43f5e" opacity="0.6" />
          <path d="M29 38 Q34 44 39 38" stroke="#451a03" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  // Fallback generic or Almanac specialty plant
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <ellipse cx="50" cy="94" rx="28" ry="6" fill="#14532d" opacity="0.35" />
      <circle cx="50" cy="50" r="30" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      <circle cx="42" cy="45" r="5" fill="#0f172a" />
      <circle cx="58" cy="45" r="5" fill="#0f172a" />
      <path d="M42 60 Q50 68 58 60" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

interface ZombieProps {
  type: ZombieType;
  isEating?: boolean;
  isHit?: boolean;
  isFrozen?: boolean;
  className?: string;
}

export const ZombieGraphic: React.FC<ZombieProps> = ({
  type,
  isEating,
  isHit,
  isFrozen,
  className = 'w-16 h-20'
}) => {
  const filterClass = isHit
    ? 'brightness-150 saturate-200'
    : isFrozen
    ? 'hue-rotate-180 brightness-110'
    : '';

  return (
    <svg
      viewBox="0 0 100 120"
      className={`${className} ${isEating ? 'animate-pulse' : 'anim-zombie-walk'} ${filterClass}`}
      fill="none"
    >
      {/* Shadow */}
      <ellipse cx="48" cy="114" rx="28" ry="6" fill="#1e293b" opacity="0.4" />

      {/* Shuffling Legs with Tattered Jeans */}
      {/* Back leg */}
      <rect x="35" y="80" width="11" height="26" rx="4" fill="#1e3a8a" />
      <ellipse cx="38" cy="108" rx="8" ry="4.5" fill="#334155" />
      {/* Front leg with torn knee */}
      <rect x="49" y="82" width="11" height="25" rx="4" fill="#2563eb" />
      <circle cx="54" cy="94" r="3" fill="#84cc16" /> {/* Exposed grey-green knee */}
      <ellipse cx="56" cy="108" rx="8" ry="4.5" fill="#1e293b" />

      {/* Ragged Brown Business Coat & Body */}
      <rect x="28" y="44" width="40" height="40" rx="8" fill="#78350f" />
      <rect x="32" y="44" width="32" height="36" rx="6" fill="#854d0e" />

      {/* White Shirt Collar & Crooked Red Tie */}
      <polygon points="44,44 48,52 44,54" fill="#f8fafc" />
      <polygon points="52,44 48,52 52,54" fill="#f8fafc" />
      <path d="M48 50 L45 68 L48 74 L51 68 Z" fill="#dc2626" />

      {/* Shambling Arms reaching out to the left */}
      <g className={isEating ? 'animate-bounce' : ''}>
        {/* Back arm */}
        <path d="M46 54 L20 48 L14 54" stroke="#65a30d" strokeWidth="6.5" strokeLinecap="round" />
        <circle cx="13" cy="54" r="3" fill="#65a30d" />
        {/* Front arm reaching forward */}
        <path d="M44 60 L18 56 L12 63" stroke="#84cc16" strokeWidth="7" strokeLinecap="round" />
        <circle cx="11" cy="63" r="3.5" fill="#84cc16" />
        {/* Claw fingers */}
        <path d="M12 60 L6 62 M12 64 L5 66 M12 67 L7 70" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Zombie Head - Distinctive PvZ Shape */}
      <ellipse cx="48" cy="30" rx="23" ry="21" fill="#65a30d" />
      <ellipse cx="46" cy="27" rx="20" ry="18" fill="#84cc16" />
      <ellipse cx="44" cy="24" rx="16" ry="14" fill="#a3e635" opacity="0.6" />

      {/* Zombie Ear */}
      <ellipse cx="69" cy="32" rx="4" ry="6" fill="#65a30d" />

      {/* Mismatched Bulging Cartoon Zombie Eyes */}
      {/* Left eye (Smaller, bloodshot look) */}
      <circle cx="38" cy="26" r="7.5" fill="white" stroke="#4d7c0f" strokeWidth="1" />
      <circle cx="37" cy="26" r="3" fill="#1e1b4b" />
      <circle cx="36" cy="25" r="1" fill="white" />
      {/* Right eye (Huge bulging eyeball) */}
      <circle cx="56" cy="25" r="9.5" fill="white" stroke="#4d7c0f" strokeWidth="1" />
      <circle cx="55" cy="25" r="4.2" fill="#1e1b4b" />
      <circle cx="54" cy="24" r="1.5" fill="white" />

      {/* Open Slack Jaw with Crooked Decayed Teeth */}
      <path d="M36 38 Q48 48 58 38 Q56 46 46 47 Q38 46 36 38 Z" fill="#365314" />
      {/* Crooked square teeth */}
      <rect x="40" y="38" width="3.5" height="4.5" fill="#fef08a" stroke="#713f12" strokeWidth="0.5" />
      <rect x="46" y="38" width="3.5" height="3.5" fill="#fef08a" stroke="#713f12" strokeWidth="0.5" />
      <rect x="52" y="38" width="3" height="4" fill="#fef08a" stroke="#713f12" strokeWidth="0.5" />
      {/* Comic Blue Drool Drop */}
      <path d="M38 42 Q37 49 39 49 Q41 49 40 42 Z" fill="#38bdf8" opacity="0.85" />

      {/* 1. CONEHEAD GEAR */}
      {type === 'conehead' && (
        <g>
          <path d="M48 -2 L28 24 L68 24 Z" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
          <path d="M46 -2 L30 24 L52 24 Z" fill="#f97316" />
          <rect x="26" y="22" width="44" height="6" rx="2.5" fill="#c2410c" />
          {/* Reflective safety stripe with scuffs */}
          <polygon points="36,12 60,12 62,17 34,17" fill="white" opacity="0.9" />
          <line x1="42" y1="12" x2="40" y2="17" stroke="#9a3412" strokeWidth="1" />
        </g>
      )}

      {/* 2. BUCKETHEAD GEAR */}
      {type === 'buckethead' && (
        <g>
          <rect x="28" y="4" width="40" height="25" rx="5" fill="#64748b" stroke="#334155" strokeWidth="2" />
          {/* Metallic highlight */}
          <rect x="32" y="5" width="8" height="23" fill="#cbd5e1" opacity="0.5" />
          <ellipse cx="48" cy="5" rx="20" ry="4" fill="#94a3b8" />
          <ellipse cx="48" cy="29" rx="20" ry="4" fill="#475569" />
          {/* Wire Handle dangling */}
          <path d="M26 16 Q20 30 28 32" stroke="#334155" strokeWidth="2.5" fill="none" />
          <circle cx="28" cy="16" r="2.5" fill="#1e293b" />
        </g>
      )}

      {/* 3. FLAG ZOMBIE */}
      {type === 'flag' && (
        <g>
          <line x1="72" y1="8" x2="72" y2="92" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M72 12 L100 24 L72 36 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
          <text x="81" y="27" fill="white" fontSize="11" fontWeight="black">%</text>
        </g>
      )}

      {/* 4. PERCENT KING (BOSS ZOMBIE) - Mahkota megah, jubah bangsawan & kacamata monokel emas */}
      {type === 'percent_king' && (
        <g>
          {/* Royal Purple Cape */}
          <path d="M24 46 Q10 80 18 102 L76 102 Q84 80 70 46 Z" fill="#581c87" stroke="#3b0764" strokeWidth="2" />
          <path d="M30 46 L38 52 M64 46 L56 52" stroke="#f59e0b" strokeWidth="3" />

          {/* Golden Royal Crown */}
          <path
            d="M26 14 L34 -2 L46 8 L58 -2 L66 14 Z"
            fill="#f59e0b"
            stroke="#b45309"
            strokeWidth="2.5"
          />
          {/* Gemstones on crown */}
          <circle cx="34" cy="0" r="3.5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
          <circle cx="46" cy="9" r="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
          <circle cx="58" cy="0" r="3.5" fill="#10b981" stroke="#047857" strokeWidth="1" />

          {/* Golden Monocle on Right Eye */}
          <circle cx="56" cy="25" r="10.5" stroke="#f59e0b" strokeWidth="3" fill="none" />
          <line x1="66" y1="28" x2="72" y2="48" stroke="#f59e0b" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
};

export const LawnMowerGraphic: React.FC<{ isTriggered?: boolean; className?: string }> = ({
  isTriggered,
  className = 'w-12 h-10'
}) => {
  return (
    <svg
      viewBox="0 0 80 60"
      className={`${className} ${isTriggered ? 'animate-bounce' : ''}`}
      fill="none"
    >
      {/* Heavy Rubber Wheels */}
      <circle cx="18" cy="48" r="9.5" fill="#0f172a" />
      <circle cx="18" cy="48" r="4.5" fill="#94a3b8" />
      <circle cx="58" cy="48" r="9.5" fill="#0f172a" />
      <circle cx="58" cy="48" r="4.5" fill="#94a3b8" />

      {/* Red LawnMower Engine Chassis */}
      <rect x="12" y="24" width="52" height="20" rx="7" fill="#dc2626" />
      <rect x="20" y="15" width="34" height="13" rx="4" fill="#b91c1c" />

      {/* Engine Cooling Grill */}
      <line x1="24" y1="20" x2="50" y2="20" stroke="#7f1d1d" strokeWidth="2" />
      <line x1="24" y1="24" x2="50" y2="24" stroke="#7f1d1d" strokeWidth="2" />

      {/* Metal Starter Pull Cord & Exhaust */}
      <rect x="46" y="11" width="7" height="6" fill="#334155" rx="1" />

      {/* Metal Handlebar */}
      <path d="M14 26 L2 8 L6 6" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};

export const PoolCleanerGraphic: React.FC<{
  isTriggered?: boolean;
  className?: string;
}> = ({ isTriggered = false, className = 'w-12 h-9' }) => {
  return (
    <svg
      viewBox="0 0 80 60"
      className={`${className} ${isTriggered ? 'animate-bounce' : ''}`}
      fill="none"
    >
      {/* Heavy Blue Rubber Wheels */}
      <circle cx="20" cy="48" r="9" fill="#0f172a" />
      <circle cx="20" cy="48" r="4.5" fill="#38bdf8" />
      <circle cx="58" cy="48" r="9" fill="#0f172a" />
      <circle cx="58" cy="48" r="4.5" fill="#38bdf8" />

      {/* Aquatic Blue Body Tank */}
      <rect x="14" y="24" width="50" height="20" rx="8" fill="#0284c7" />
      <rect x="22" y="16" width="34" height="12" rx="4" fill="#38bdf8" />

      {/* White Suction Horn / Funnel Pipe */}
      <path d="M52 24 L74 14 L76 34 L56 28 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <ellipse cx="75" cy="24" rx="3" ry="10" fill="#0369a1" />

      {/* Water bubbles */}
      <circle cx="68" cy="18" r="2.5" fill="#e0f2fe" opacity="0.8" />
      <circle cx="62" cy="12" r="1.5" fill="#e0f2fe" opacity="0.8" />

      {/* Chrome Handlebar */}
      <path d="M16 26 L4 10 L8 8" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};

export const LilyPadGraphic: React.FC<{ className?: string }> = ({
  className = 'w-14 h-6'
}) => {
  return (
    <svg viewBox="0 0 90 45" className={`${className} filter drop-shadow-md`} fill="none">
      {/* Water ripple shadow */}
      <ellipse cx="45" cy="24" rx="42" ry="17" fill="#0369a1" opacity="0.35" />
      {/* Outer Lily Pad Rim */}
      <ellipse cx="45" cy="22" rx="40" ry="16" fill="#15803d" />
      {/* Inner Lily Pad Surface */}
      <ellipse cx="44" cy="20" rx="37" ry="14" fill="#22c55e" />
      {/* Lily Pad Cut Notch */}
      <path d="M44 20 L80 14 L78 28 Z" fill="#0284c7" />
      {/* Veins */}
      <path d="M44 20 Q30 12 18 16" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M44 20 Q26 24 16 24" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M44 20 Q34 28 26 31" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M44 20 Q54 28 62 30" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M44 20 Q52 14 62 12" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      {/* Tiny Pink Water Flower */}
      <circle cx="30" cy="14" r="3" fill="#f43f5e" />
      <circle cx="30" cy="14" r="1.5" fill="#fef08a" />
    </svg>
  );
};

export const FlowerPotGraphic: React.FC<{ className?: string }> = ({
  className = 'w-12 h-8'
}) => {
  return (
    <svg viewBox="0 0 80 50" className={`${className} filter drop-shadow-md`} fill="none">
      {/* Ground Shadow */}
      <ellipse cx="40" cy="46" rx="34" ry="4" fill="#451a03" opacity="0.4" />
      
      {/* Terracotta Pot Body (tapering downwards) */}
      <path
        d="M14 16 L22 43 C23 45, 57 45, 58 43 L66 16 Z"
        fill="#b45309"
        stroke="#78350f"
        strokeWidth="2"
      />
      {/* Body Inner Shadow & Clay Gradient Tone */}
      <path
        d="M20 18 L25 41 C27 43, 53 43, 55 41 L60 18 Z"
        fill="#d97706"
      />
      {/* Side shade */}
      <path
        d="M14 16 L22 43 C23 44, 34 44, 30 43 L20 16 Z"
        fill="#92400e"
        opacity="0.5"
      />
      
      {/* Thick Rolled Terracotta Rim */}
      <ellipse cx="40" cy="14" rx="30" ry="7" fill="#b45309" stroke="#78350f" strokeWidth="2" />
      <ellipse cx="40" cy="13" rx="28" ry="5.5" fill="#d97706" />
      <ellipse cx="38" cy="12" rx="24" ry="3.5" fill="#f59e0b" opacity="0.6" />
      
      {/* Rich Dark Organic Soil inside pot */}
      <ellipse cx="40" cy="14" rx="25" ry="4.5" fill="#271305" stroke="#1c0b02" strokeWidth="1" />
      <circle cx="32" cy="14" r="1.2" fill="#451a03" />
      <circle cx="46" cy="14" r="1.5" fill="#451a03" />
      <circle cx="39" cy="15" r="1" fill="#451a03" />
    </svg>
  );
};

export const RoofCleanerGraphic: React.FC<{
  isTriggered?: boolean;
  className?: string;
}> = ({ isTriggered = false, className = 'w-12 h-9' }) => {
  return (
    <svg
      viewBox="0 0 80 60"
      className={`${className} ${isTriggered ? 'animate-bounce' : ''}`}
      fill="none"
    >
      {/* Steel Wheels for sloping roof */}
      <circle cx="18" cy="48" r="9" fill="#334155" />
      <circle cx="18" cy="48" r="4" fill="#94a3b8" />
      <circle cx="56" cy="48" r="9" fill="#334155" />
      <circle cx="56" cy="48" r="4" fill="#94a3b8" />
      
      {/* Metal Chassis Rail */}
      <rect x="10" y="38" width="56" height="6" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
      
      {/* Spring Coiled Mechanism & Cleaning Barrel */}
      <rect x="18" y="20" width="42" height="18" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
      <circle cx="39" cy="29" r="6" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
      <line x1="24" y1="24" x2="24" y2="34" stroke="#475569" strokeWidth="2" />
      <line x1="30" y1="24" x2="30" y2="34" stroke="#475569" strokeWidth="2" />
      <line x1="48" y1="24" x2="48" y2="34" stroke="#475569" strokeWidth="2" />
      <line x1="54" y1="24" x2="54" y2="34" stroke="#475569" strokeWidth="2" />

      {/* Front Scraper Blade */}
      <path d="M60 26 L74 38 L62 44 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />

      {/* Silver Pull Handle extending back */}
      <path d="M18 24 L6 10 L10 8" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};

export const SunOrbGraphic: React.FC<{ className?: string }> = ({
  className = 'w-12 h-12'
}) => {
  return (
    <svg viewBox="0 0 80 80" className={`${className} animate-pulse drop-shadow-lg`} fill="none">
      {/* Radiant Glowing Corona */}
      <circle cx="40" cy="40" r="34" fill="#fde047" opacity="0.35" className="animate-ping" />
      {/* 8 Sun Rays */}
      <g className="animate-spin" style={{ transformOrigin: '40px 40px', animationDuration: '8s' }}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <polygon
            key={i}
            points="37,4 43,4 40,0"
            fill="#f59e0b"
            stroke="#d97706"
            strokeWidth="1.5"
            transform={`rotate(${angle} 40 40)`}
          />
        ))}
      </g>
      {/* Outer Golden Orb */}
      <circle cx="40" cy="40" r="26" fill="#facc15" stroke="#eab308" strokeWidth="3" />
      {/* Inner Glowing Gradient Effect */}
      <circle cx="37" cy="37" r="20" fill="#fef08a" />
      {/* Cute Cheerful Eyes */}
      <ellipse cx="33" cy="37" rx="3.5" ry="4.5" fill="#451a03" />
      <circle cx="32" cy="35" r="1.5" fill="white" />
      <ellipse cx="47" cy="37" rx="3.5" ry="4.5" fill="#451a03" />
      <circle cx="46" cy="35" r="1.5" fill="white" />
      {/* Rosy Cheeks */}
      <circle cx="28" cy="42" r="3.5" fill="#f87171" opacity="0.75" />
      <circle cx="52" cy="42" r="3.5" fill="#f87171" opacity="0.75" />
      {/* Happy Open Smile */}
      <path d="M34 44 Q40 50 46 44" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

