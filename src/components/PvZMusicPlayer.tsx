import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { GameScreen } from '../types';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface PvZMusicPlayerProps {
  currentScreen: GameScreen;
  isMuted: boolean;
  onToggleMute: () => void;
}

// Exact YouTube Video IDs specified by the user:
// 1. Menu: https://www.youtube.com/watch?v=RWR8aWJOKKg
// 2. In-game (Taman, Air, Genteng): https://www.youtube.com/watch?v=HD3qtfKCWsE
const MENU_TRACK = {
  id: 'RWR8aWJOKKg',
  title: 'Menu / Crazy Dave Theme',
  subtitle: 'Plants vs. Zombies OST (Laura Shigihara)',
  url: 'https://www.youtube.com/watch?v=RWR8aWJOKKg&list=PL8C3D47E6FA9CDDC4&index=3'
};

const GAME_TRACK = {
  id: 'HD3qtfKCWsE',
  title: 'Grasswalk (Taman, Air & Genteng)',
  subtitle: 'Plants vs. Zombies OST (Laura Shigihara)',
  url: 'https://www.youtube.com/watch?v=HD3qtfKCWsE&list=PL8C3D47E6FA9CDDC4&index=2'
};

export const PvZMusicPlayer: React.FC<PvZMusicPlayerProps> = ({
  currentScreen,
  isMuted,
  onToggleMute
}) => {
  const isGame = currentScreen === 'PLAYING';
  const activeTrack = isGame ? GAME_TRACK : MENU_TRACK;

  const playerRef = useRef<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(65);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUserGesture, setHasUserGesture] = useState(false);

  // 1. Load YouTube Iframe API Script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.YT) {
      const existingScript = document.getElementById('pvz-yt-api-script');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'pvz-yt-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
    }

    const initInterval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(initInterval);
        setupPlayer();
      }
    }, 250);

    return () => clearInterval(initInterval);
  }, []);

  // 2. Setup YouTube Player instance
  const setupPlayer = () => {
    if (playerRef.current) return;
    const targetId = isGame ? GAME_TRACK.id : MENU_TRACK.id;

    try {
      playerRef.current = new window.YT.Player('pvz-hidden-youtube-player', {
        height: '240',
        width: '320',
        videoId: targetId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: targetId,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event: any) => {
            setIsPlayerReady(true);
            event.target.setVolume(volume);
            if (isMuted) {
              event.target.mute();
            } else {
              event.target.unMute();
              event.target.playVideo();
            }
          },
          onStateChange: (event: any) => {
            // 0 = ended -> loop track
            if (event.data === 0) {
              event.target.playVideo();
            } else if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            }
          },
          onError: () => {
            // In case of playback restrictions, keep safe state
          }
        }
      });
    } catch {
      // Ignored
    }
  };

  // 3. Switch Tracks when screen transitions between Menu and Game
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      const targetId = isGame ? GAME_TRACK.id : MENU_TRACK.id;
      playerRef.current.loadVideoById({
        videoId: targetId,
        suggestedQuality: 'small'
      });
      if (!isMuted && isPlaying) {
        playerRef.current.playVideo();
      }
    }
  }, [isGame]);

  // 4. Synchronize Mute with App state
  useEffect(() => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.mute?.();
      } else {
        playerRef.current.unMute?.();
        playerRef.current.setVolume?.(volume);
        if (isPlaying) {
          playerRef.current.playVideo?.();
        }
      }
    }
  }, [isMuted]);

  // 5. Volume change handler
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(newVol);
      if (newVol > 0 && isMuted) {
        onToggleMute();
      }
    }
  };

  // 6. Manual Play / Pause toggle
  const handleTogglePlay = () => {
    soundManager.playClick();
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo?.();
      setIsPlaying(false);
    } else {
      if (isMuted) {
        onToggleMute();
      }
      playerRef.current.unMute?.();
      playerRef.current.playVideo?.();
      setIsPlaying(true);
    }
  };

  // 7. Auto-start on first user gesture anywhere on the page (bypasses browser autoplay policy)
  useEffect(() => {
    const handleGesture = () => {
      setHasUserGesture(true);
      if (playerRef.current && !isMuted) {
        try {
          const state = playerRef.current.getPlayerState?.();
          if (state !== 1 && state !== 3) {
            playerRef.current.unMute?.();
            playerRef.current.playVideo?.();
            setIsPlaying(true);
          }
        } catch {
          // Ignored
        }
      }
    };

    window.addEventListener('pointerdown', handleGesture, { once: false });
    return () => {
      window.removeEventListener('pointerdown', handleGesture);
    };
  }, [isMuted]);

  return (
    <>
      {/* Off-screen active YouTube Player Frame (kept offscreen with dimensions so browser never pauses it) */}
      <div
        className="fixed -left-[9999px] -top-[9999px] w-80 h-60 pointer-events-none opacity-0 overflow-hidden z-[-1]"
        aria-hidden="true"
      >
        <div id="pvz-hidden-youtube-player" />
      </div>

      {/* Retro PvZ Style Floating BGM Controller (Bottom Left Corner) */}
      <div className="fixed bottom-3 left-3 z-40 select-none animate-fade-in">
        <div className="relative bg-[#3e2008]/95 border-3 border-[#783e10] rounded-2xl shadow-2xl backdrop-blur-md text-amber-100 p-2 sm:p-2.5 flex flex-col gap-2 transition-all">
          
          {/* Top Row: Track Summary & Quick Controls */}
          <div className="flex items-center gap-2">
            {/* Pulsing Music Icon Disc */}
            <div
              onClick={handleTogglePlay}
              className={`w-8 h-8 rounded-full border-2 border-amber-400 flex items-center justify-center cursor-pointer shadow-md transition-transform active:scale-95 ${
                isPlaying && !isMuted
                  ? 'bg-gradient-to-tr from-emerald-600 to-green-500 animate-spin-slow'
                  : 'bg-stone-700 opacity-70'
              }`}
              title={isPlaying && !isMuted ? 'Sedang Memutar Musik' : 'Musik Dijeda'}
            >
              <Music className="w-4 h-4 text-white" />
            </div>

            {/* Track Info */}
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="cursor-pointer max-w-[140px] sm:max-w-[200px]"
            >
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
                  {isGame ? 'Latar Permainan' : 'Menu Utama'}
                </span>
                {isPlaying && !isMuted && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                )}
              </div>
              <p className="text-xs font-black font-heading truncate text-amber-100 leading-tight">
                {activeTrack.title}
              </p>
            </div>

            {/* Play/Pause Button */}
            <button
              id="bgm-play-pause-btn"
              type="button"
              onClick={handleTogglePlay}
              className="w-7 h-7 rounded-lg bg-amber-600 hover:bg-amber-500 border border-amber-300 text-white flex items-center justify-center shadow transition-all cursor-pointer"
              title={isPlaying && !isMuted ? 'Jeda Musik' : 'Putar Musik'}
            >
              {isPlaying && !isMuted ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            {/* Mute Button */}
            <button
              id="bgm-mute-btn"
              type="button"
              onClick={() => {
                soundManager.playClick();
                onToggleMute();
              }}
              className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 border border-amber-500/50 text-amber-200 flex items-center justify-center shadow transition-all cursor-pointer"
              title={isMuted ? 'Bunyikan Musik' : 'Bisukan Musik'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>

            {/* Expand / Collapse Details Chevron */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-6 h-6 rounded-md hover:bg-black/30 text-amber-300 flex items-center justify-center transition-colors cursor-pointer"
              title={isExpanded ? 'Tutup Pengaturan' : 'Buka Pengaturan Musik'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {/* Expanded Drawer: Volume Slider & YouTube Links */}
          {isExpanded && (
            <div className="pt-2 border-t border-[#783e10] flex flex-col gap-2 animate-fade-in text-[11px]">
              
              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-300 w-12 shrink-0">Volume:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <span className="text-[10px] font-black text-amber-200 w-7 text-right">
                  {isMuted ? '0%' : `${volume}%`}
                </span>
              </div>

              {/* YouTube Track Information and direct links requested by user */}
              <div className="bg-[#261304] p-2 rounded-xl border border-[#783e10]/60 space-y-1.5">
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <span className="text-[9px] font-bold text-emerald-400 block uppercase">
                      1. Musik Menu Utama:
                    </span>
                    <span className="text-[10px] font-semibold text-amber-200">
                      Crazy Dave / Main Menu OST
                    </span>
                  </div>
                  <a
                    href={MENU_TRACK.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] text-amber-400 hover:text-amber-200 flex items-center gap-0.5 underline shrink-0"
                    title="Buka Video YouTube Musik Menu"
                  >
                    <span>Link</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <div className="flex items-start justify-between gap-1 pt-1 border-t border-[#783e10]/40">
                  <div>
                    <span className="text-[9px] font-bold text-emerald-400 block uppercase">
                      2. Musik Latar (Taman/Air/Genteng):
                    </span>
                    <span className="text-[10px] font-semibold text-amber-200">
                      Grasswalk OST
                    </span>
                  </div>
                  <a
                    href={GAME_TRACK.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] text-amber-400 hover:text-amber-200 flex items-center gap-0.5 underline shrink-0"
                    title="Buka Video YouTube Musik Gameplay"
                  >
                    <span>Link</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* Autoplay Helper Hint */}
              {!hasUserGesture && (
                <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-[10px] text-amber-200 text-center font-bold">
                  💡 Klik di mana saja pada layar untuk mengaktifkan musik otomatis!
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
};
