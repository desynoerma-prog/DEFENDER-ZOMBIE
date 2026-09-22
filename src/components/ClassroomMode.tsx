import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, Lightbulb, RefreshCw, Sparkles, Volume2, VolumeX, Eye } from 'lucide-react';
import { Question } from '../types';
import { QUESTION_BANK, getRandomizedQuestion } from '../data/questions';
import { PlantGraphic, ZombieGraphic } from './Characters';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ClassroomModeProps {
  onBack: () => void;
}

export const ClassroomMode: React.FC<ClassroomModeProps> = ({ onBack }) => {
  const [totalQuestions, setTotalQuestions] = useState<number>(10);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [classScore, setClassScore] = useState<number>(0);
  const [monsterHp, setMonsterHp] = useState<number>(100);
  const [isAttacking, setIsAttacking] = useState<boolean>(false);
  const [monsterIsHit, setMonsterIsHit] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.isMuted);

  // Initialize randomized questions for classroom session
  const startSession = (count: number) => {
    soundManager.playClick();
    setTotalQuestions(count);
    // Shuffle question bank
    const shuffled = [...QUESTION_BANK].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count).map((q) => getRandomizedQuestion(q));
    setSessionQuestions(selected);
    setCurrentIndex(0);
    setClassScore(0);
    setMonsterHp(100);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setShowExplanation(false);
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
    } else {
      // Completed all
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  const isFinished = isStarted && currentIndex >= sessionQuestions.length - 1 && isSubmitted;

  return (
    <div id="classroom-mode-screen" className="min-h-screen w-full bg-gradient-to-b from-indigo-50 via-sky-50 to-emerald-50 p-4 sm:p-6 flex flex-col items-center">
      {/* Top Bar for Classroom */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-3 border-b pb-3 border-indigo-200">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="clay-btn clay-btn-white px-3 py-2 text-xs sm:text-sm rounded-xl flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4 text-slate-700" />
          <span>Kembali ke Menu</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xl">👩‍🏫</span>
          <h2 className="text-lg sm:text-2xl font-black text-indigo-950 font-heading">
            Mode Kelas (IFP / Smartboard)
          </h2>
        </div>

        <button
          onClick={() => {
            setIsMuted(soundManager.toggleMute());
          }}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-300 shadow-sm"
          title="Toggle Suara"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
        </button>
      </div>

      {/* Mode Selection Screen (Before Start) */}
      {!isStarted && (
        <div className="my-auto max-w-xl w-full clay-card p-6 sm:p-8 bg-white text-center">
          <span className="text-5xl">🌱</span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading mt-2">
            Belajar Bersama di Depan Kelas!
          </h3>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-2 leading-relaxed">
            Guru dapat memandu siswa untuk berdiskusi dan menjawab pertanyaan bersama di layar sentuh / proyektor.
          </p>

          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2 block">
              Pilih Jumlah Soal Latihan:
            </span>
            <div className="grid grid-cols-3 gap-3">
              {[10, 20, 30].map((num) => (
                <button
                  key={num}
                  onClick={() => startSession(num)}
                  className="clay-btn clay-btn-blue py-3 sm:py-4 text-base sm:text-lg font-black rounded-2xl flex flex-col items-center justify-center"
                >
                  <span>{num}</span>
                  <span className="text-[11px] font-bold opacity-80">Soal</span>
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
            <div className="flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-800 font-black px-3 py-1 rounded-xl text-sm font-heading">
                Soal {currentIndex + 1} dari {sessionQuestions.length}
              </span>
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                Topik: {currentQ.topic}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl font-heading">
                ⭐ Skor Kelas: {classScore}
              </span>
            </div>
          </div>

          {/* Classroom Arena Mini-Stage */}
          <div className="w-full h-32 sm:h-40 bg-gradient-to-r from-emerald-100 via-sky-100 to-indigo-100 rounded-3xl border-2 border-white shadow-inner flex items-center justify-between px-6 sm:px-12 relative overflow-hidden mb-3">
            {/* Zombie Left */}
            <div className="flex flex-col items-center">
              <ZombieGraphic
                type="conehead"
                isHit={monsterIsHit}
                className="w-16 h-20 sm:w-20 sm:h-24"
              />
              <div className="w-20 bg-slate-800/80 rounded-full p-0.5 mt-1">
                <div
                  className="h-2 bg-rose-500 rounded-full transition-all duration-300"
                  style={{ width: `${monsterHp}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-600 mt-0.5">Zombie Matematika</span>
            </div>

            {/* Center prompt */}
            <div className="text-center hidden sm:block">
              <span className="text-xs font-bold text-slate-500 bg-white/80 px-3 py-1 rounded-full border border-slate-200">
                🌱 Diskusikan & pilih jawaban bersama!
              </span>
            </div>

            {/* Plant Right */}
            <div className="flex flex-col items-center">
              <PlantGraphic
                type="peashooter"
                isShooting={isAttacking}
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
              <span className="text-[10px] font-bold text-emerald-800 mt-1">Penembak Pecahan</span>
            </div>
          </div>

          {/* Question Display (Big Font for Classroom IFP) */}
          <div className="clay-card p-5 sm:p-7 bg-white text-center shadow-md">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-heading leading-snug">
              {currentQ.questionText}
            </h3>
            {currentQ.highlightText && (
              <div className="inline-block mt-3 px-6 py-1.5 rounded-2xl bg-indigo-50 border-2 border-indigo-300 text-indigo-900 font-black text-2xl sm:text-3xl font-heading shadow-xs">
                {currentQ.highlightText}
              </div>
            )}

            {/* 4 Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5 text-left">
              {currentQ.choices.map((choice, idx) => {
                let btnStyle = 'clay-btn-white';
                if (isSubmitted) {
                  if (idx === currentQ.correctAnswerIndex) {
                    btnStyle = 'clay-btn-green ring-2 ring-emerald-500';
                  } else if (idx === selectedAnswer) {
                    btnStyle = 'clay-btn-coral ring-2 ring-rose-400';
                  }
                } else if (selectedAnswer === idx) {
                  btnStyle = 'clay-btn-blue text-white ring-2 ring-blue-500';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    disabled={isSubmitted}
                    className={`clay-btn ${btnStyle} p-3.5 sm:p-4 text-base sm:text-xl font-bold rounded-2xl flex items-center gap-3 transition-all`}
                  >
                    <span className="w-8 h-8 rounded-xl bg-black/10 flex items-center justify-center font-black text-sm">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="font-heading">{choice}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation & Teacher Controls */}
            {showExplanation && (
              <div className="mt-4 p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-left animate-in fade-in">
                <div className="flex items-center gap-2 text-indigo-900 font-extrabold font-heading text-base">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <span>Pembahasan Guru:</span>
                </div>
                <p className="text-sm sm:text-base text-slate-700 font-semibold mt-1 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100 flex-wrap">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={`clay-btn px-6 py-3 text-base sm:text-lg rounded-2xl font-bold ml-auto ${
                    selectedAnswer !== null ? 'clay-btn-green' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Kunci Jawaban & Serang! ⚔️
                </button>
              ) : !isFinished ? (
                <button
                  onClick={handleNextQuestion}
                  className="clay-btn clay-btn-blue px-6 py-3 text-base sm:text-lg rounded-2xl font-bold ml-auto flex items-center gap-2"
                >
                  <span>Soal Berikutnya</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="w-full flex items-center justify-between">
                  <span className="text-base sm:text-lg font-black text-emerald-800 font-heading">
                    🎉 Latihan Kelas Selesai! Skor Akhir: {classScore}
                  </span>
                  <button
                    onClick={() => startSession(totalQuestions)}
                    className="clay-btn clay-btn-green px-5 py-2.5 text-sm sm:text-base rounded-2xl font-bold flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Ulangi Latihan</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
