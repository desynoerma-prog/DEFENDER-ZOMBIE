import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, Lightbulb, RefreshCw, Sparkles, Volume2, VolumeX, Eye, Compass, BarChart3 } from 'lucide-react';
import { Question, MathElement } from '../types';
import { QUESTION_BANK, getRandomizedQuestion } from '../data/questions';
import { PlantGraphic, ZombieGraphic } from './Characters';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ClassroomModeProps {
  onBack: () => void;
}

const ELEMENT_TABS: { id: MathElement | 'ALL'; label: string; icon: string }[] = [
  { id: 'ALL', label: 'Semua Elemen STEAM', icon: '🌟' },
  { id: 'Bilangan', label: '1. Bilangan', icon: '🔢' },
  { id: 'Aljabar', label: '2. Aljabar', icon: '🧩' },
  { id: 'Pengukuran', label: '3. Pengukuran', icon: '📏' },
  { id: 'Geometri', label: '4. Geometri', icon: '🔷' },
  { id: 'Data', label: '5. Data', icon: '📊' }
];

export const ClassroomMode: React.FC<ClassroomModeProps> = ({ onBack }) => {
  const [selectedElement, setSelectedElement] = useState<MathElement | 'ALL'>('ALL');
  const [totalQuestions, setTotalQuestions] = useState<number>(10);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintStep, setHintStep] = useState<number>(1);
  const [classScore, setClassScore] = useState<number>(0);
  const [monsterHp, setMonsterHp] = useState<number>(100);
  const [isAttacking, setIsAttacking] = useState<boolean>(false);
  const [monsterIsHit, setMonsterIsHit] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.isMuted);

  // Initialize randomized questions for classroom session
  const startSession = (count: number) => {
    soundManager.playClick();
    setTotalQuestions(count);

    let pool = [...QUESTION_BANK];
    if (selectedElement !== 'ALL') {
      pool = pool.filter((q) => q.element === selectedElement);
      if (pool.length === 0) pool = [...QUESTION_BANK];
    }

    // Shuffle question bank
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count).map((q) => getRandomizedQuestion(q));
    setSessionQuestions(selected);
    setCurrentIndex(0);
    setClassScore(0);
    setMonsterHp(100);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setShowExplanation(false);
    setShowHint(false);
    setHintStep(1);
    setIsStarted(true);
  };

  const currentQ = sessionQuestions[currentIndex];

  const handleSelectAnswer = (index: number) => {
    if (isSubmitted) return;
    soundManager.playClick();
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isSubmitted) return;
    setIsSubmitted(true);
    setShowExplanation(true);

    const isCorrect = selectedAnswer === currentQ.correctAnswerIndex;
    if (isCorrect) {
      soundManager.playCorrect();
      setIsAttacking(true);
      setClassScore((prev) => prev + 100);

      // Trigger plant attack and monster hit
      setTimeout(() => {
        soundManager.playShoot();
      }, 200);

      setTimeout(() => {
        soundManager.playHit();
        setMonsterIsHit(true);
        setMonsterHp((prev) => Math.max(0, prev - Math.ceil(100 / totalQuestions)));
      }, 500);

      setTimeout(() => {
        setIsAttacking(false);
        setMonsterIsHit(false);
      }, 1000);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      soundManager.playWrong();
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentIndex + 1 < sessionQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setShowExplanation(false);
      setShowHint(false);
      setHintStep(1);
    } else {
      // Completed all
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  return (
    <div id="classroom-mode" className="w-full h-full min-h-screen bg-slate-100 flex flex-col items-center justify-between p-3 sm:p-6 overflow-y-auto">
      
      {/* Top Bar Navigation */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-2">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="clay-btn clay-btn-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-black text-slate-700 flex items-center gap-1.5 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-black text-indigo-900 font-heading bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-xl">
            🏛️ Mode Diskusi Kelas (STEAM SD Kelas 4)
          </span>
        </div>

        <button
          onClick={() => {
            setIsMuted(soundManager.toggleMute());
          }}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-300 shadow-sm cursor-pointer"
          title="Toggle Suara"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
        </button>
      </div>

      {/* Mode Selection Screen (Before Start) */}
      {!isStarted && (
        <div className="my-auto max-w-2xl w-full clay-card p-5 sm:p-8 bg-white text-center">
          <span className="text-5xl">🌱</span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading mt-2">
            Belajar Bersama di Depan Kelas!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed">
            Guru dapat memandu siswa untuk berdiskusi materi 5 Elemen Matematika SD Kelas 4 bersama di layar sentuh / proyektor.
          </p>

          {/* Element Selection */}
          <div className="mt-5 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-2 block">
              1. Pilih Elemen Pembelajaran:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ELEMENT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedElement(tab.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border-2 transition-all cursor-pointer ${
                    selectedElement === tab.id
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span className="truncate">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count Selection */}
          <div className="mt-5 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-2 block">
              2. Pilih Jumlah Soal Diskusi:
            </span>
            <div className="grid grid-cols-4 gap-2.5">
              {[5, 10, 15, 20].map((num) => (
                <button
                  key={num}
                  onClick={() => startSession(num)}
                  className="clay-btn clay-btn-blue py-3 sm:py-4 text-base sm:text-lg font-black rounded-2xl flex flex-col items-center justify-center cursor-pointer"
                >
                  <span>{num}</span>
                  <span className="text-[10px] font-bold opacity-80">Soal</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Classroom Game View */}
      {isStarted && currentQ && (
        <div className="w-full max-w-5xl flex-1 flex flex-col justify-between">
          
          {/* Status Bar */}
          <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-sm border border-slate-200 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-indigo-100 text-indigo-800 font-black px-3 py-1 rounded-xl text-xs sm:text-sm font-heading">
                Soal {currentIndex + 1} dari {sessionQuestions.length}
              </span>
              {currentQ.element && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  {currentQ.element}
                </span>
              )}
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                Topik: {currentQ.subtopic || currentQ.topic}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl font-heading">
                ⭐ Skor Kelas: {classScore}
              </span>
            </div>
          </div>

          {/* Classroom Arena Mini-Stage */}
          <div className="w-full h-28 sm:h-36 bg-gradient-to-r from-emerald-100 via-sky-100 to-indigo-100 rounded-3xl border-2 border-white shadow-inner flex items-center justify-between px-6 sm:px-12 relative overflow-hidden mb-3">
            {/* Zombie Left */}
            <div className="flex flex-col items-center">
              <ZombieGraphic
                type="conehead"
                isHit={monsterIsHit}
                className={`w-14 h-20 sm:w-16 sm:h-24 transition-transform duration-200 ${monsterIsHit ? 'animate-bounce scale-110' : ''}`}
              />
              <div className="w-20 bg-slate-300 h-2 rounded-full overflow-hidden mt-1 border border-slate-400">
                <div
                  className="bg-rose-500 h-full transition-all duration-300"
                  style={{ width: `${monsterHp}%` }}
                />
              </div>
            </div>

            {/* Attack projectile flying */}
            {isAttacking && (
              <div className="absolute left-1/2 -translate-x-1/2 text-3xl animate-ping">
                🟢💨
              </div>
            )}

            {/* Plant Right */}
            <div className="flex flex-col items-center">
              <PlantGraphic
                type="peashooter"
                isShooting={isAttacking}
                className={`w-14 h-16 sm:w-16 sm:h-20 transition-transform ${isAttacking ? 'scale-125 rotate-6' : ''}`}
              />
              <span className="text-[10px] font-black text-emerald-800 mt-1 font-heading">
                Peashooter Penjaga
              </span>
            </div>
          </div>

          {/* Main Question Board */}
          <div className="clay-card p-4 sm:p-6 bg-white border-4 border-indigo-200 shadow-xl rounded-3xl">
            <div className="text-center mb-4">
              <p className="text-base sm:text-xl font-black text-slate-800 font-heading leading-snug">
                {currentQ.questionText}
              </p>

              {/* Visual Box */}
              {currentQ.visual && (
                <div className="mt-3 p-3 rounded-xl bg-slate-50 border-2 border-indigo-200 inline-block max-w-full text-left font-mono text-xs sm:text-sm font-bold text-slate-800 whitespace-pre-wrap shadow-inner">
                  {currentQ.visual}
                </div>
              )}

              {currentQ.highlightText && (
                <div className="mt-2 inline-block px-5 py-1.5 rounded-2xl bg-indigo-50 border-2 border-indigo-400 text-indigo-950 font-black text-xl sm:text-2xl font-heading shadow-xs">
                  {currentQ.highlightText}
                </div>
              )}
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {currentQ.choices.map((choice, index) => {
                let btnStyle = 'clay-btn-white';
                if (selectedAnswer === index) {
                  btnStyle = 'clay-btn-blue ring-4 ring-indigo-400';
                }
                if (isSubmitted) {
                  if (index === currentQ.correctAnswerIndex) {
                    btnStyle = 'clay-btn-green ring-4 ring-emerald-500 scale-[1.02]';
                  } else if (index === selectedAnswer) {
                    btnStyle = 'clay-btn-coral ring-4 ring-rose-400';
                  } else {
                    btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={isSubmitted}
                    className={`clay-btn ${btnStyle} p-3.5 sm:p-4 text-left flex items-center justify-between text-sm sm:text-base font-bold rounded-2xl transition-all cursor-pointer`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-black/10 flex items-center justify-center font-black text-sm">
                        {['A', 'B', 'C', 'D'][index]}
                      </span>
                      <span className="font-heading text-slate-900">{choice}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint Accordion */}
            {!isSubmitted && currentQ.hints && currentQ.hints.length > 0 && (
              <div className="mb-3">
                {!showHint ? (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setShowHint(true);
                    }}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1.5 py-1 px-3 rounded-xl bg-amber-50 border border-amber-300 cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    <span>💡 Butuh Bantuan? Buka Petunjuk Diskusi</span>
                  </button>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-950">
                    <div className="flex items-center justify-between mb-1 border-b border-amber-200 pb-1">
                      <span className="font-bold flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                        Petunjuk Langkah {hintStep} dari {currentQ.hints.length}:
                      </span>
                    </div>
                    <p className="font-medium leading-relaxed">{currentQ.hints[hintStep - 1]}</p>
                    {hintStep < currentQ.hints.length && (
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setHintStep((p) => p + 1);
                        }}
                        className="text-[11px] font-bold text-emerald-800 underline mt-1.5 block cursor-pointer"
                      >
                        Petunjuk selanjutnya ➡️
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Explanation card after submit */}
            {isSubmitted && (
              <div className="p-3.5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-xs sm:text-sm text-emerald-950 mb-3 animate-fade-in">
                <span className="font-black block font-heading text-emerald-900 mb-1">
                  💡 Pembahasan Konsep Guru & Siswa:
                </span>
                <p className="leading-relaxed font-medium">{currentQ.explanation}</p>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-xs text-slate-500 font-medium">
                Pilih jawaban lalu tekan &quot;Kunci Jawaban&quot;
              </span>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={`clay-btn px-6 py-2.5 text-sm font-black rounded-xl transition-all ${
                    selectedAnswer !== null ? 'clay-btn-green cursor-pointer' : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                  }`}
                >
                  Kunci Jawaban 🎯
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="clay-btn clay-btn-blue px-6 py-2.5 text-sm font-black rounded-xl flex items-center gap-2 cursor-pointer animate-pulse"
                >
                  <span>{currentIndex + 1 < sessionQuestions.length ? 'Soal Berikutnya' : 'Selesai Diskusi'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>
      )}

      {/* Completed All Questions in Classroom View */}
      {isStarted && !currentQ && (
        <div className="my-auto max-w-md w-full clay-card p-6 bg-white text-center">
          <span className="text-5xl">🎉</span>
          <h3 className="text-2xl font-black text-emerald-950 font-heading mt-2">
            Sesi Kelas Selesai!
          </h3>
          <p className="text-sm text-slate-600 font-bold mt-1">
            Total Skor Kelas Terkumpul:
          </p>
          <div className="my-3 text-4xl font-black text-emerald-700 font-heading">
            {classScore} <span className="text-lg text-slate-500 font-bold">Poin</span>
          </div>

          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={() => setIsStarted(false)}
              className="clay-btn clay-btn-green px-5 py-2.5 text-sm font-bold rounded-xl cursor-pointer"
            >
              Ulangi Sesi Baru 🔄
            </button>
            <button
              onClick={onBack}
              className="clay-btn clay-btn-white px-5 py-2.5 text-sm font-bold rounded-xl text-slate-700 cursor-pointer"
            >
              Menu Utama 🏠
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
