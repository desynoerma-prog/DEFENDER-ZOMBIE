import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameScreen,
  Question,
  PlantCard,
  PlacedPlant,
  ZombieInstance,
  ProjectileInstance,
  SunOrb,
  LawnMower,
  FloatingText,
  UserStats,
  AdventureLevel,
  ArenaTheme,
  StudentProfile
} from './types';
import { PLANT_CARDS } from './data/plants';
import { LEVELS } from './data/levels';
import { QUESTION_BANK, getRandomizedQuestion, getQuestionsByAdventureLevel } from './data/questions';
import {
  loadUserStats,
  saveUserStats,
  unlockBadge,
  loadCurrentStudentProfile,
  saveCurrentStudentProfile,
  loadGamePreferences,
  saveGamePreferences
} from './utils/storage';
import { soundManager } from './utils/audio';

import { MainMenu } from './components/MainMenu';
import { TitleScreen } from './components/TitleScreen';
import { LevelSelect } from './components/LevelSelect';
import { ClassroomMode } from './components/ClassroomMode';
import { PvZLawn } from './components/PvZLawn';
import { ZombieDefeatedModal } from './components/ZombieDefeatedModal';
import { VictoryModal } from './components/VictoryModal';
import { GameOverModal } from './components/GameOverModal';
import { BadgesModal } from './components/BadgesModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { SettingsModal } from './components/SettingsModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { SuburbanAlmanac } from './components/SuburbanAlmanac';
import { PvZMusicPlayer } from './components/PvZMusicPlayer';

export default function App() {
  // Navigation & Screens - Defaults to the authentic PvZ Title Screen on front page
  const [screen, setScreen] = useState<GameScreen>('TITLE');
  const [showBadges, setShowBadges] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showAlmanac, setShowAlmanac] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.isMuted);

  // Active Deck for Combat (from Almanac)
  const [activeDeck, setActiveDeck] = useState<PlantCard[]>(() => PLANT_CARDS);

  // User persistent profile & Preferences
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats);
  const [currentProfile, setCurrentProfile] = useState<StudentProfile>(loadCurrentStudentProfile);
  const [adventureLevel, setAdventureLevel] = useState<AdventureLevel>(() => loadGamePreferences().adventureLevel);
  const [arenaTheme, setArenaTheme] = useState<ArenaTheme>(() => loadGamePreferences().arenaTheme);
  const [unlockedBadgeName, setUnlockedBadgeName] = useState<string | undefined>(undefined);

  // Active Level
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const activeLevel = LEVELS.find((l) => l.id === selectedLevelId) || LEVELS[0];

  // PvZ Sun Currency & Selection
  const [sun, setSun] = useState<number>(100);
  const [selectedPlantCard, setSelectedPlantCard] = useState<PlantCard | null>(null);
  const [cardCooldowns, setCardCooldowns] = useState<Record<string, number>>({});
  const [isShovelSelected, setIsShovelSelected] = useState<boolean>(false);

  // PvZ Battlefield State
  const [placedPlants, setPlacedPlants] = useState<PlacedPlant[]>([]);
  const [zombies, setZombies] = useState<ZombieInstance[]>([]);
  const [projectiles, setProjectiles] = useState<ProjectileInstance[]>([]);
  const [sunOrbs, setSunOrbs] = useState<SunOrb[]>([]);
  const [lawnMowers, setLawnMowers] = useState<LawnMower[]>([
    { row: 0, active: true, isTriggered: false, x: 0 },
    { row: 1, active: true, isTriggered: false, x: 0 },
    { row: 2, active: true, isTriggered: false, x: 0 },
    { row: 3, active: true, isTriggered: false, x: 0 },
    { row: 4, active: true, isTriggered: false, x: 0 },
  ]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  // Waves & Score
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [highestCombo, setHighestCombo] = useState<number>(0);
  const [currentWave, setCurrentWave] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  // Zombie Defeated Math Challenge Modal
  const [pendingDefeatQuestion, setPendingDefeatQuestion] = useState<{
    question: Question;
    zombieName: string;
  } | null>(null);

  // Refs for tracking timers
  const lastSkySunTimeRef = useRef<number>(Date.now());
  const lastZombieSpawnRef = useRef<number>(Date.now());
  const zombiesSpawnedInWaveRef = useRef<number>(0);

  // Audio Toggle
  const handleToggleMute = () => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
  };

  // Helper to add floating text
  const addFloatingText = (x: number, y: number, text: string, color: string) => {
    const id = `ft_${Date.now()}_${Math.random()}`;
    setFloatingTexts((prev) => [...prev, { id, x, y, text, color, opacity: 1 }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  };

  // Start Level
  const startLevel = (levelId: number) => {
    setSelectedLevelId(levelId);
    setSun(100); // Initial 100 Sun
    setSelectedPlantCard(null);
    setCardCooldowns({});
    setIsShovelSelected(false);
    setPlacedPlants([]);
    setZombies([]);
    setProjectiles([]);
    setSunOrbs([]);
    const totalRows = arenaTheme === 'water' ? 6 : 5;
    setLawnMowers(
      Array.from({ length: totalRows }, (_, r) => ({
        row: r,
        active: true,
        isTriggered: false,
        x: 0
      }))
    );
    setScore(0);
    setCombo(0);
    setHighestCombo(0);
    setCurrentWave(1);
    setIsPaused(false);
    setQuestionsAnswered(0);
    setCorrectAnswers(0);
    setShowVictory(false);
    setShowGameOver(false);
    setPendingDefeatQuestion(null);

    lastSkySunTimeRef.current = Date.now();
    lastZombieSpawnRef.current = Date.now();
    zombiesSpawnedInWaveRef.current = 0;

    // Spawn 1 initial sun orb dropping from sky
    spawnSkySun();

    setScreen('PLAYING');
  };

  // Spawn Sun from Sky
  const spawnSkySun = () => {
    const randomCol = Math.floor(Math.random() * 8) + 1; // 1 to 8
    const randomRow = Math.floor(Math.random() * 5); // 0 to 4
    const newSun: SunOrb = {
      id: `sun_sky_${Date.now()}_${Math.random()}`,
      x: randomCol * 10 + 5,
      y: randomRow * 18 + 15,
      targetY: randomRow * 18 + 15,
      value: 25,
      createdAt: Date.now()
    };
    setSunOrbs((prev) => [...prev, newSun]);
  };

  // Collect Sun when clicked
  const handleCollectSun = (sunId: string, value: number) => {
    soundManager.playClick();
    setSun((prev) => prev + value);
    setSunOrbs((prev) => prev.filter((s) => s.id !== sunId));
    addFloatingText(50, 20, `+${value} ☀️`, 'text-amber-500 font-extrabold text-xl');
  };

  // Select Shovel
  const handleSelectShovel = () => {
    setSelectedPlantCard(null);
    setIsShovelSelected((prev) => !prev);
  };

  // Tile Click (Plant or Dig)
  const handleTileClick = (row: number, col: number) => {
    if (isPaused) return;

    const existingPlant = placedPlants.find((p) => p.row === row && p.col === col);

    // If Shovel is active: dig up plant
    if (isShovelSelected) {
      if (existingPlant) {
        soundManager.playClick();
        setPlacedPlants((prev) => prev.filter((p) => p.id !== existingPlant.id));
        addFloatingText(col * 10 + 10, row * 18 + 15, 'Tanaman Dicabut ⛏️', 'text-amber-700');
        setIsShovelSelected(false);
      }
      return;
    }

    // If Plant Card is selected: plant on empty tile
    if (selectedPlantCard) {
      if (existingPlant) {
        addFloatingText(col * 10 + 10, row * 18 + 15, 'Petak Sudah Terisi!', 'text-rose-500');
        return;
      }

      if (sun < selectedPlantCard.cost) {
        addFloatingText(col * 10 + 10, row * 18 + 15, 'Matahari Kurang!', 'text-rose-500');
        return;
      }

      // Check cooldown
      if ((cardCooldowns[selectedPlantCard.type] || 0) > 0) return;

      soundManager.playShoot();
      setSun((prev) => prev - selectedPlantCard.cost);

      // Base HP for plants
      let maxHp = 100;
      if (selectedPlantCard.type === 'tallnut') maxHp = 800; // Giant Wall
      else if (selectedPlantCard.type === 'wallnut') maxHp = 400; // Tanky
      else if (selectedPlantCard.type === 'threepeater') maxHp = 180;
      else if (selectedPlantCard.type === 'gatlingpea') maxHp = 160;
      else if (selectedPlantCard.type === 'chomper') maxHp = 150;
      else if (selectedPlantCard.type === 'potatomine') maxHp = 80;

      const newPlant: PlacedPlant = {
        id: `plant_${row}_${col}_${Date.now()}`,
        type: selectedPlantCard.type,
        row,
        col,
        hp: maxHp,
        maxHp,
        lastShootTime: Date.now(),
        lastSunTime: Date.now(),
        armedTime: Date.now() + 5000 // potatomine arms after 5s
      };

      setPlacedPlants((prev) => [...prev, newPlant]);

      // Set card cooldown
      setCardCooldowns((prev) => ({
        ...prev,
        [selectedPlantCard.type]: selectedPlantCard.cooldown
      }));

      // Instant Cherry Bomb logic (3x3 area blast)
      if (selectedPlantCard.type === 'cherrybomb') {
        setTimeout(() => {
          soundManager.playCannon();
          // Kill all zombies in 3x3 area
          setZombies((prev) =>
            prev.map((z) => {
              const inRow = Math.abs(z.row - row) <= 1;
              const zCol = Math.floor(z.x / 11);
              const inCol = Math.abs(zCol - col) <= 1;
              if (inRow && inCol) {
                return { ...z, hp: 0 };
              }
              return z;
            })
          );
          // Remove cherry bomb plant
          setPlacedPlants((prev) => prev.filter((p) => p.id !== newPlant.id));
          addFloatingText(col * 10 + 10, row * 18 + 15, '💥 CHERRY BOOM! 💥', 'text-rose-600 font-black');
        }, 1000);
      }

      // Jalapeno lane incinerator logic (clears the entire row!)
      if (selectedPlantCard.type === 'jalapeno') {
        setTimeout(() => {
          soundManager.playCannon();
          setZombies((prev) =>
            prev.map((z) => {
              if (z.row === row) {
                return { ...z, hp: 0, isHit: true };
              }
              return z;
            })
          );
          setPlacedPlants((prev) => prev.filter((p) => p.id !== newPlant.id));
          addFloatingText(50, row * 18 + 15, '🔥 JALAPENO FIRE! -1000 HP 🔥', 'text-amber-500 font-black text-xl');
        }, 1000);
      }

      setSelectedPlantCard(null);
    }
  };

  // Cooldown countdown tick
  useEffect(() => {
    // Stop cooldown timer if paused, not playing, or math question is active
    if (isPaused || screen !== 'PLAYING' || pendingDefeatQuestion !== null) return;

    const timer = setInterval(() => {
      setCardCooldowns((prev) => {
        const next: Record<string, number> = {};
        for (const key of Object.keys(prev)) {
          if (prev[key] > 1) {
            next[key] = prev[key] - 1;
          }
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, screen, pendingDefeatQuestion]);

  // Main PvZ Game Loop (Tick every 100ms)
  // Requirement 1: "di bagian soal ketika muncul, maka seketika hentikan/Jeda permainan berikan waktu untuk pengguna/pemain berfikir dan menjawab."
  useEffect(() => {
    if (isPaused || screen !== 'PLAYING' || showVictory || showGameOver || pendingDefeatQuestion !== null) return;

    const gameInterval = setInterval(() => {
      const now = Date.now();

      // 1. SUN PRODUCTION:
      // (a) Sky Sun drops every 9 seconds
      if (now - lastSkySunTimeRef.current >= 9000) {
        lastSkySunTimeRef.current = now;
        spawnSkySun();
      }

      // (b) Sunflowers produce sun every 9 seconds (Twin Sunflower produces 50!)
      placedPlants.forEach((plant) => {
        if (plant.type === 'sunflower' || plant.type === 'twinsunflower') {
          if (!plant.lastSunTime || now - plant.lastSunTime >= 8500) {
            plant.lastSunTime = now;
            // Spawn sun right beside sunflower
            const sunX = plant.col * 10 + 8;
            const sunY = plant.row * 18 + 14;
            const isTwin = plant.type === 'twinsunflower';

            setSunOrbs((prev) => [
              ...prev,
              {
                id: `sun_flower_${Date.now()}_1_${Math.random()}`,
                x: sunX,
                y: sunY,
                targetY: sunY,
                value: 25,
                createdAt: now
              },
              ...(isTwin
                ? [
                    {
                      id: `sun_flower_${Date.now()}_2_${Math.random()}`,
                      x: sunX + 3,
                      y: sunY,
                      targetY: sunY,
                      value: 25,
                      createdAt: now
                    }
                  ]
                : [])
            ]);
          }
        }
      });

      // 2. PLANTS ATTACKING & SHOOTING AT ZOMBIES:
      placedPlants.forEach((plant) => {
        const plantX = plant.col * 10 + 5;

        // PEASHOOTER & ICESHOOTER
        if (plant.type === 'peashooter' || plant.type === 'iceshooter') {
          const targetZombie = zombies.find((z) => z.row === plant.row && z.x > plantX && z.hp > 0);

          if (targetZombie) {
            if (!plant.lastShootTime || now - plant.lastShootTime >= 1500) {
              plant.lastShootTime = now;
              soundManager.playShoot();

              // Spawn pea projectile
              const isIce = plant.type === 'iceshooter';
              setProjectiles((prev) => [
                ...prev,
                {
                  id: `pea_${Date.now()}_${Math.random()}`,
                  row: plant.row,
                  x: plantX + 4,
                  speed: 3.5,
                  damage: 30,
                  isIce,
                  text: isIce ? '❄' : '%'
                }
              ]);
            }
          }
        }

        // REPEATER & GATLING PEA (Multi-shot rapid peas)
        else if (plant.type === 'repeater' || plant.type === 'gatlingpea') {
          const targetZombie = zombies.find((z) => z.row === plant.row && z.x > plantX && z.hp > 0);

          if (targetZombie) {
            const shootInterval = plant.type === 'gatlingpea' ? 1200 : 1400;
            if (!plant.lastShootTime || now - plant.lastShootTime >= shootInterval) {
              plant.lastShootTime = now;

              if (plant.type === 'gatlingpea') {
                // 4 Rapid Machine Gun Peas
                [0, 100, 200, 300].forEach((delay, idx) => {
                  setTimeout(() => {
                    soundManager.playShoot();
                    setProjectiles((prev) => [
                      ...prev,
                      {
                        id: `gatling_${Date.now()}_${idx}_${Math.random()}`,
                        row: plant.row,
                        x: plantX + 4 + idx * 0.8,
                        speed: 4.2,
                        damage: 30,
                        text: '4×'
                      }
                    ]);
                  }, delay);
                });
              } else {
                // Repeater: 2 Rapid Peas
                soundManager.playShoot();
                setTimeout(() => soundManager.playShoot(), 120);
                setProjectiles((prev) => [
                  ...prev,
                  {
                    id: `rep_${Date.now()}_1_${Math.random()}`,
                    row: plant.row,
                    x: plantX + 4,
                    speed: 3.8,
                    damage: 30,
                    text: '2×'
                  },
                  {
                    id: `rep_${Date.now()}_2_${Math.random()}`,
                    row: plant.row,
                    x: plantX + 1.5,
                    speed: 3.8,
                    damage: 30,
                    text: '2×'
                  }
                ]);
              }
            }
          }
        }

        // CHOMPER (Devours adjacent zombie)
        else if (plant.type === 'chomper') {
          const prey = zombies.find((z) => z.row === plant.row && z.x >= plantX && z.x <= plantX + 10 && z.hp > 0);
          if (prey && (!plant.lastShootTime || now - plant.lastShootTime >= 10000)) {
            plant.lastShootTime = now;
            soundManager.playHit();
            prey.hp -= 400;
            prey.isHit = true;
            addFloatingText(prey.x, plant.row * 18 + 10, '🦷 CHOMP! -400 HP', 'text-purple-700 font-black');
          }
        }

        // SQUASH (Crushes zombie in front)
        else if (plant.type === 'squash') {
          const target = zombies.find((z) => z.row === plant.row && Math.abs(z.x - plantX) <= 8 && z.hp > 0);
          if (target) {
            soundManager.playCannon();
            target.hp -= 500;
            target.isHit = true;
            addFloatingText(target.x, plant.row * 18 + 10, '💥 SQUASH! -500 HP', 'text-lime-700 font-black');
            // Remove squash after attack
            setPlacedPlants((plants) => plants.filter((p) => p.id !== plant.id));
          }
        } else if (plant.type === 'threepeater') {
          // Threepeater is the super-strong plant that shoots 3 projectiles at once!
          const plantX = plant.col * 10 + 5;
          const hasTargetInRow = zombies.some((z) => z.row === plant.row && z.x > plantX && z.hp > 0);
          const hasTargetNearby = zombies.some((z) => Math.abs(z.row - plant.row) <= 1 && z.x > plantX && z.hp > 0);

          if (hasTargetInRow || hasTargetNearby) {
            if (!plant.lastShootTime || now - plant.lastShootTime >= 1400) {
              plant.lastShootTime = now;
              soundManager.playShoot();
              setTimeout(() => soundManager.playShoot(), 100);
              setTimeout(() => soundManager.playShoot(), 200);

              // Fires a high-powered 3-pea salvo in its lane (3x damage burst!)
              const salvo: ProjectileInstance[] = [
                {
                  id: `three_${Date.now()}_1_${Math.random()}`,
                  row: plant.row,
                  x: plantX + 5,
                  speed: 4.0,
                  damage: 35,
                  text: '3×'
                },
                {
                  id: `three_${Date.now()}_2_${Math.random()}`,
                  row: plant.row,
                  x: plantX + 2.5,
                  speed: 4.0,
                  damage: 35,
                  text: '3×'
                },
                {
                  id: `three_${Date.now()}_3_${Math.random()}`,
                  row: plant.row,
                  x: plantX,
                  speed: 4.0,
                  damage: 35,
                  text: '3×'
                }
              ];

              // If zombies are in row above (row - 1), shoot into that row as well!
              if (plant.row > 0 && zombies.some((z) => z.row === plant.row - 1 && z.x > plantX && z.hp > 0)) {
                salvo.push({
                  id: `three_${Date.now()}_top_${Math.random()}`,
                  row: plant.row - 1,
                  x: plantX + 3.5,
                  speed: 4.0,
                  damage: 35,
                  text: '3×'
                });
              }

              // If zombies are in row below (row + 1), shoot into that row as well!
              const maxRowIdx = arenaTheme === 'water' ? 5 : 4;
              if (plant.row < maxRowIdx && zombies.some((z) => z.row === plant.row + 1 && z.x > plantX && z.hp > 0)) {
                salvo.push({
                  id: `three_${Date.now()}_bot_${Math.random()}`,
                  row: plant.row + 1,
                  x: plantX + 3.5,
                  speed: 4.0,
                  damage: 35,
                  text: '3×'
                });
              }

              setProjectiles((prev) => [...prev, ...salvo]);
            }
          }
        }
      });

      // 3. MOVE PROJECTILES & HIT ZOMBIES:
      setProjectiles((prev) => {
        const remaining: ProjectileInstance[] = [];

        prev.forEach((proj) => {
          const nextX = proj.x + proj.speed;

          // Check collision with any zombie in same row
          const hitZombie = zombies.find(
            (z) => z.row === proj.row && z.hp > 0 && Math.abs(z.x - nextX) <= 4
          );

          if (hitZombie) {
            soundManager.playHit();
            hitZombie.hp -= proj.damage;
            hitZombie.isHit = true;
            if (proj.isIce) {
              hitZombie.isFrozen = true;
              hitZombie.frozenTimer = 4000;
            }

            // Remove hit flash
            setTimeout(() => {
              hitZombie.isHit = false;
            }, 200);

            // Floating damage
            addFloatingText(hitZombie.x, hitZombie.row * 18 + 10, `-${proj.damage}`, 'text-emerald-700 font-bold');
          } else if (nextX < 100) {
            // Keep flying
            remaining.push({ ...proj, x: nextX });
          }
        });

        return remaining;
      });

      // 4. MOVE ZOMBIES & EAT PLANTS:
      setZombies((prev) => {
        let reachedHouse = false;
        let triggeredRow: number | null = null;

        const updated = prev
          .map((zombie) => {
            // If dead
            if (zombie.hp <= 0) return null;

            // Check if potato mine stepped on
            const plantOnTile = placedPlants.find((p) => {
              const plantX = p.col * 10 + 5;
              return p.row === zombie.row && Math.abs(plantX - zombie.x) <= 3;
            });

            if (plantOnTile && plantOnTile.type === 'potatomine' && plantOnTile.armedTime && now >= plantOnTile.armedTime) {
              soundManager.playCannon();
              zombie.hp = 0;
              setPlacedPlants((plants) => plants.filter((p) => p.id !== plantOnTile.id));
              addFloatingText(zombie.x, zombie.row * 18 + 10, '💥 SPUDOW! -500 HP', 'text-amber-600 font-black');
              return null;
            }

            // Check if eating a plant
            if (plantOnTile && plantOnTile.hp > 0) {
              zombie.isEating = true;
              // Munch plant
              plantOnTile.hp -= 2;
              if (plantOnTile.hp <= 0) {
                // Plant eaten!
                soundManager.playWrong();
                setPlacedPlants((plants) => plants.filter((p) => p.id !== plantOnTile.id));
                zombie.isEating = false;
              }
              return zombie;
            }

            // Not eating: advance left
            zombie.isEating = false;
            const speedMod = zombie.isFrozen ? 0.4 : 1.0;
            const newX = zombie.x - zombie.speed * 0.12 * speedMod;

            // Check if reached house boundary (x <= 5%)
            if (newX <= 5) {
              triggeredRow = zombie.row;
            }

            return {
              ...zombie,
              x: newX,
              isFrozen: zombie.frozenTimer > 0,
              frozenTimer: Math.max(0, zombie.frozenTimer - 100)
            };
          })
          .filter(Boolean) as ZombieInstance[];

        // Handle LawnMower trigger or Game Over
        if (triggeredRow !== null) {
          const mower = lawnMowers.find((m) => m.row === triggeredRow && m.active);
          if (mower) {
            // LawnMower clears row!
            soundManager.playVictory();
            mower.active = false;
            mower.isTriggered = true;
            const cleanerText =
              arenaTheme === 'roof'
                ? '🧹 PEMBERSIH GENTENG MELUNCUR!'
                : arenaTheme === 'water' && (triggeredRow === 2 || triggeredRow === 3)
                ? '🌊 PEMBERSIH KOLAM AIR MELUNCUR!'
                : '🚜 MESIN PEMOTONG RUMPUT MELUNCUR!';
            addFloatingText(30, triggeredRow * 18 + 10, cleanerText, 'text-rose-600 font-black');

            // Crush all zombies in this row
            return updated.filter((z) => z.row !== triggeredRow);
          } else {
            // House breached! Game Over
            soundManager.playGameOver();
            setShowGameOver(true);
          }
        }

        // 5. DETECT DEFEATED ZOMBIE -> TRIGGER MATH QUESTION!
        // As requested: "Nah setiap membunuh satu zombie maka akan keluar 1 soal."
        // Requirement 2: Level Soal "Lower", "Middle", "Strong" disesuaikan dengan kemampuan siswa kelas 4 SD
        const defeatedZombies = prev.filter((z) => z.hp <= 0);
        if (defeatedZombies.length > 0 && !pendingDefeatQuestion) {
          const pool = getQuestionsByAdventureLevel(adventureLevel);
          const randomQ = getRandomizedQuestion(
            pool[Math.floor(Math.random() * pool.length)]
          );
          setPendingDefeatQuestion({
            question: randomQ,
            zombieName: defeatedZombies[0].name
          });
        }

        return updated;
      });

      // 6. SPAWN NEW ZOMBIES FOR WAVES
      const maxZombiesInWave = 3 + currentWave * 2;
      if (
        zombiesSpawnedInWaveRef.current < maxZombiesInWave &&
        now - lastZombieSpawnRef.current >= Math.max(4000, 9000 - currentWave * 1000)
      ) {
        lastZombieSpawnRef.current = now;
        zombiesSpawnedInWaveRef.current += 1;

        const totalSpawnRows = arenaTheme === 'water' ? 6 : 5;
        const randomRow = Math.floor(Math.random() * totalSpawnRows);
        let type: 'normal' | 'conehead' | 'buckethead' | 'flag' | 'percent_king' = 'normal';
        let hp = 100;
        let speed = 1.0;
        let name = 'Zombie Biasa';

        if (currentWave === activeLevel.totalWaves && zombiesSpawnedInWaveRef.current === maxZombiesInWave) {
          // Boss wave Percent King
          type = 'percent_king';
          hp = 800;
          speed = 0.7;
          name = 'Raja Persen (Percent King)';
        } else if (Math.random() > 0.6) {
          type = 'conehead';
          hp = 200;
          speed = 1.1;
          name = 'Zombie Topi Kerucut';
        } else if (Math.random() > 0.8) {
          type = 'buckethead';
          hp = 350;
          speed = 0.9;
          name = 'Zombie Ember Baja';
        }

        const newZombie: ZombieInstance = {
          id: `zombie_${Date.now()}_${Math.random()}`,
          type,
          name,
          row: randomRow,
          x: 96,
          hp,
          maxHp: hp,
          speed,
          isEating: false,
          isHit: false,
          isFrozen: false,
          frozenTimer: 0
        };

        setZombies((prev) => [...prev, newZombie]);
      }

      // 7. WAVE PROGRESSION & LEVEL VICTORY
      if (
        zombiesSpawnedInWaveRef.current >= maxZombiesInWave &&
        zombies.length === 0 &&
        !showVictory &&
        !showGameOver
      ) {
        if (currentWave >= activeLevel.totalWaves) {
          // Completed all waves!
          soundManager.playVictory();
          setShowVictory(true);

          const currentStats = loadUserStats();
          const nextLevels = Math.min(5, Math.max(currentStats.levelsUnlocked, selectedLevelId + 1));
          const newStats: UserStats = {
            highScore: Math.max(currentStats.highScore, score + 500),
            totalQuestionsAnswered: currentStats.totalQuestionsAnswered + questionsAnswered,
            totalCorrectAnswers: currentStats.totalCorrectAnswers + correctAnswers,
            highestCombo: Math.max(currentStats.highestCombo, highestCombo),
            levelsUnlocked: nextLevels,
            badges: [...currentStats.badges]
          };

          if (!newStats.badges.includes('badge_beginner')) {
            newStats.badges.push('badge_beginner');
            setUnlockedBadgeName('Percent Beginner 🥉');
          }
          if (selectedLevelId >= 3 && !newStats.badges.includes('badge_master')) {
            newStats.badges.push('badge_master');
            setUnlockedBadgeName('Decimal Master 🥇');
          }

          saveUserStats(newStats);
          setUserStats(newStats);
        } else {
          // Next Wave
          setCurrentWave((w) => {
            const nextW = w + 1;
            zombiesSpawnedInWaveRef.current = 0;
            lastZombieSpawnRef.current = now + 3000;
            addFloatingText(50, 40, `🚩 GELOMBANG BESAR KE-${nextW}!`, 'text-rose-600 font-black text-2xl');
            return nextW;
          });
        }
      }

    }, 100);

    return () => clearInterval(gameInterval);
  }, [
    isPaused,
    screen,
    showVictory,
    showGameOver,
    currentWave,
    activeLevel,
    placedPlants,
    zombies,
    lawnMowers,
    selectedLevelId,
    score,
    questionsAnswered,
    correctAnswers,
    highestCombo,
    pendingDefeatQuestion,
    adventureLevel
  ]);

  // Handle Math Question Answered from Zombie Defeat
  const handleAnswerDefeatQuestion = (isCorrect: boolean) => {
    setQuestionsAnswered((prev) => prev + 1);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setHighestCombo((prev) => Math.max(prev, nextCombo));

      // User requirement: reward player with +100 Sun for buying plants!
      setSun((prev) => prev + 100);
      setScore((prev) => prev + 150);

      addFloatingText(50, 20, '🎉 BENAR! +100 ☀️ MATAHARI DITAMBAHKAN!', 'text-amber-500 font-black text-xl');

      if (nextCombo >= 5 && unlockBadge('badge_combo_master')) {
        setUnlockedBadgeName('Combo Master 🔥');
      }
    } else {
      setCombo(0);
      addFloatingText(50, 20, '💡 Tetap Semangat! Pelajari Hubungan Persen & Pecahan!', 'text-amber-800');
    }
  };

  // Requirement 5: "Kemudian di area permainan berikan fitur 'Close' untuk menutup atau mengakhiri permainan."
  const handleCloseGame = () => {
    setIsPaused(false);
    setPendingDefeatQuestion(null);
    setShowVictory(false);
    setShowGameOver(false);
    setScreen('TITLE');
  };

  const handleSelectAdventureLevel = (lvl: AdventureLevel) => {
    setAdventureLevel(lvl);
    saveGamePreferences({ adventureLevel: lvl, arenaTheme });
  };

  const handleSelectArenaTheme = (theme: ArenaTheme) => {
    setArenaTheme(theme);
    saveGamePreferences({ adventureLevel, arenaTheme: theme });
    const totalRows = theme === 'water' ? 6 : 5;
    setLawnMowers(
      Array.from({ length: totalRows }, (_, r) => ({
        row: r,
        active: true,
        isTriggered: false,
        x: 0
      }))
    );
  };

  const handleStartAdventure = () => {
    startLevel(1);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans select-none antialiased text-slate-900">
      
      {/* 0. AUTHENTIC PLANTS VS. ZOMBIES TITLE SCREEN (HALAMAN DEPAN) */}
      {screen === 'TITLE' && (
        <TitleScreen
          currentProfile={currentProfile}
          selectedAdventureLevel={adventureLevel}
          onSelectAdventureLevel={handleSelectAdventureLevel}
          selectedArenaTheme={arenaTheme}
          onSelectArenaTheme={handleSelectArenaTheme}
          onStartAdventure={handleStartAdventure}
          onOpenProfileModal={() => setShowProfileModal(true)}
          onOpenLevelSelect={() => setScreen('LEVEL_SELECT')}
          onOpenHowToPlay={() => setShowHowToPlay(true)}
          onOpenClassroom={() => setScreen('CLASSROOM')}
          onOpenAlmanac={() => setShowAlmanac(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* 1. MAIN MENU WITH PROFILE, ADVENTURE LEVEL & THEME SELECTION */}
      {screen === 'MENU' && (
        <MainMenu
          currentProfile={currentProfile}
          onOpenProfileModal={() => setShowProfileModal(true)}
          selectedAdventureLevel={adventureLevel}
          onSelectAdventureLevel={handleSelectAdventureLevel}
          selectedArenaTheme={arenaTheme}
          onSelectArenaTheme={handleSelectArenaTheme}
          onStartAdventure={handleStartAdventure}
          onOpenLevelSelect={() => setScreen('LEVEL_SELECT')}
          onOpenBadges={() => setShowBadges(true)}
          onOpenHowToPlay={() => setShowHowToPlay(true)}
          onOpenClassroom={() => setScreen('CLASSROOM')}
          onOpenSettings={() => setShowSettings(true)}
          onBackToTitle={() => setScreen('TITLE')}
          highScore={userStats.highScore}
        />
      )}

      {/* 2. LEVEL SELECT */}
      {screen === 'LEVEL_SELECT' && (
        <LevelSelect
          levelsUnlocked={userStats.levelsUnlocked}
          onSelectLevel={(id) => startLevel(id)}
          onBack={() => setScreen('MENU')}
        />
      )}

      {/* 3. CLASSROOM MODE */}
      {screen === 'CLASSROOM' && (
        <ClassroomMode onBack={() => setScreen('MENU')} />
      )}

      {/* 4. ACTIVE PvZ GAMEPLAY SCREEN */}
      {screen === 'PLAYING' && (
        <div className="flex-1 flex flex-col justify-start items-center p-2 sm:p-4 bg-gradient-to-b from-[#1b5e20] via-[#2e7d32] to-[#1e293b]">
          <PvZLawn
            sun={sun}
            placedPlants={placedPlants}
            zombies={zombies}
            projectiles={projectiles}
            sunOrbs={sunOrbs}
            lawnMowers={lawnMowers}
            floatingTexts={floatingTexts}
            selectedPlantCard={selectedPlantCard}
            cardCooldowns={cardCooldowns}
            isShovelSelected={isShovelSelected}
            score={score}
            currentWave={currentWave}
            totalWaves={activeLevel.totalWaves}
            isPaused={isPaused}
            isMuted={isMuted}
            arenaTheme={arenaTheme}
            adventureLevel={adventureLevel}
            playerName={currentProfile.name}
            activeDeck={activeDeck}
            onOpenAlmanac={() => setShowAlmanac(true)}
            onSelectPlantCard={(card) => {
              setIsShovelSelected(false);
              setSelectedPlantCard(card);
            }}
            onSelectShovel={handleSelectShovel}
            onTileClick={handleTileClick}
            onCollectSun={handleCollectSun}
            onTogglePause={() => setIsPaused((p) => !p)}
            onToggleMute={handleToggleMute}
            onChangeArenaTheme={handleSelectArenaTheme}
            onCloseGame={handleCloseGame}
          />
        </div>
      )}

      {/* 5. ZOMBIE DEFEATED MATHEMATICS QUESTION MODAL */}
      {pendingDefeatQuestion && (
        <ZombieDefeatedModal
          question={pendingDefeatQuestion.question}
          zombieName={pendingDefeatQuestion.zombieName}
          onAnswerQuestion={handleAnswerDefeatQuestion}
          onClose={() => setPendingDefeatQuestion(null)}
        />
      )}

      {/* 6. VICTORY MODAL */}
      {showVictory && (
        <VictoryModal
          score={score}
          correctAnswers={correctAnswers}
          totalQuestions={questionsAnswered}
          highestCombo={highestCombo}
          finalEnergy={sun}
          unlockedBadgeName={unlockedBadgeName}
          isBossDefeated={currentWave >= activeLevel.totalWaves}
          onPlayAgain={() => startLevel(selectedLevelId)}
          onLevelSelect={() => {
            setShowVictory(false);
            setScreen('LEVEL_SELECT');
          }}
          onMenu={() => {
            setShowVictory(false);
            setScreen('MENU');
          }}
        />
      )}

      {/* 7. GAME OVER MODAL */}
      {showGameOver && (
        <GameOverModal
          score={score}
          correctAnswers={correctAnswers}
          totalQuestions={questionsAnswered}
          onRetry={() => startLevel(selectedLevelId)}
          onMenu={() => {
            setShowGameOver(false);
            setScreen('MENU');
          }}
        />
      )}

      {/* 8. BADGES & HOW TO PLAY & SETTINGS & STUDENT PROFILE */}
      {showBadges && <BadgesModal onClose={() => setShowBadges(false)} />}
      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
      {showProfileModal && (
        <StudentProfileModal
          currentProfile={currentProfile}
          onSaveProfile={(prof) => setCurrentProfile(prof)}
          onClose={() => setShowProfileModal(false)}
        />
      )}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onResetProgress={() => {
            const emptyStats: UserStats = {
              highScore: 0,
              totalQuestionsAnswered: 0,
              totalCorrectAnswers: 0,
              highestCombo: 0,
              levelsUnlocked: 1,
              badges: []
            };
            saveUserStats(emptyStats);
            setUserStats(emptyStats);
          }}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* 9. SUBURBAN ALMANAC (BUKU ALMANAK TANAMAN DARI p_almanac_big.webp) */}
      <SuburbanAlmanac
        isOpen={showAlmanac}
        onClose={() => setShowAlmanac(false)}
        activeDeck={activeDeck}
        onUpdateActiveDeck={setActiveDeck}
      />

      {/* 10. PVZ BACKGROUND MUSIC PLAYER (YOUTUBE INTEGRATION) */}
      <PvZMusicPlayer
        currentScreen={screen}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

    </div>
  );
}
