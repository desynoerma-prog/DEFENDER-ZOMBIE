import React, { useState } from 'react';
import { Question } from '../types';
import { Lightbulb, CheckCircle2, AlertCircle, Sun, Pause, FastForward, Play } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ZombieDefeatedModalProps {
  question: Question;
  zombieName: string;
  onAnswerQuestion: (isCorrect: boolean) => void;
  onClose: () => void;
}

export const ZombieDefeatedModal: React.FC<ZombieDefeatedModalProps> = ({
  question,
  zombieName,
  onAnswerQuestion,
  onClose
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintStep, setHintStep] = useState<number>(1);

  const handleSelectChoice = (index: number) => {
    if (isSubmitted) return;
    soundManager.playClick();
    setSelectedIdx(index);
    setIsSubmitted(true);

    const isCorrect = index === question.correctAnswerIndex;
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }

    onAnswerQuestion(isCorrect);
  };

  const isCorrectAnswer = selectedIdx !== null && selectedIdx === question.correctAnswerIndex;

  return (
    <div id="zombie-defeated-modal" className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="clay-card max-w-xl w-full p-4 sm:p-6 bg-white shadow-2xl animate-in zoom-in-95 duration-150 border-4 border-emerald-400">
        
        {/* Top Game Paused Notification Banner */}
        <div className="mb-3 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/80 flex items-center justify-between text-amber-950 text-xs font-black font-heading animate-pulse">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
              <Pause className="w-3 h-3 fill-white" />
            </span>
            <span>PERMAINAN DIJEDA • WAKTU BERPIKIR SISWA</span>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="text-[11px] font-extrabold text-amber-800 hover:text-amber-950 flex items-center gap-1 underline"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Lewati Soal</span>
          </button>
        </div>

        {/* Header alert */}
        <div className="flex items-center justify-between border-b pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce">🧟‍♂️</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                  Zombie Terkalahkan!
                </span>
                <span className="text-xs font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-500 fill-amber-500" />
                  +100 Matahari
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading mt-0.5">
                Tantangan Matematika: {question.topic}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
            title="Lewati Soal dan Lanjut Bermain"
          >
            ✕
          </button>
        </div>

        {/* Question Text */}
        <div className="text-center my-3 bg-emerald-50/70 p-3 sm:p-4 rounded-2xl border border-emerald-200">
          <p className="text-base sm:text-lg font-black text-slate-800 font-heading leading-snug">
            {question.questionText}
          </p>
          {question.highlightText && (
            <div className="inline-block mt-2 px-5 py-1 rounded-2xl bg-white border-2 border-emerald-400 text-emerald-950 font-black text-xl sm:text-2xl font-heading shadow-xs">
              {question.highlightText}
            </div>
          )}
        </div>

        {/* 4 Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
          {question.choices.map((choice, index) => {
            let btnClass = 'clay-btn-white';
            let icon = null;

            if (isSubmitted) {
              if (index === question.correctAnswerIndex) {
                btnClass = 'clay-btn-green ring-2 ring-emerald-500 scale-[1.02]';
                icon = <CheckCircle2 className="w-5 h-5 text-white ml-auto" />;
              } else if (index === selectedIdx) {
                btnClass = 'clay-btn-coral ring-2 ring-rose-400';
                icon = <AlertCircle className="w-5 h-5 text-white ml-auto" />;
              } else {
                btnClass = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={index}
                id={`modal-answer-choice-${index}`}
                onClick={() => handleSelectChoice(index)}
                disabled={isSubmitted}
                className={`clay-btn ${btnClass} p-3 text-left flex items-center justify-between text-sm sm:text-base font-bold rounded-2xl transition-all`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-black/10 flex items-center justify-center font-black text-xs">
                    {['A', 'B', 'C', 'D'][index]}
                  </span>
                  <span className="font-heading text-slate-900">{choice}</span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Feedback Banner */}
        {isSubmitted && (
          <div className={`p-3 rounded-2xl border-2 my-2 transition-all ${
            isCorrectAnswer
              ? 'bg-emerald-100/90 border-emerald-400 text-emerald-950'
              : 'bg-amber-100/90 border-amber-400 text-amber-950'
          }`}>
            <div className="flex items-start gap-2">
              <span className="text-2xl">{isCorrectAnswer ? '🎉' : '💡'}</span>
              <div className="flex-1">
                <h4 className="font-black text-sm font-heading">
                  {isCorrectAnswer
                    ? 'HEBAT! Jawaban Benar (+100 Energi Matahari)!'
                    : 'HAMPIR TEPAT! Pelajari pembahasannya:'}
                </h4>
                <p className="text-xs font-semibold mt-0.5 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hints accordion */}
        {!isSubmitted && (
          <div className="mt-2">
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 py-1"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>💡 Butuh Bantuan? Buka Petunjuk</span>
              </button>
            ) : (
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950">
                <span className="font-bold block mb-1">Petunjuk Langkah {hintStep}:</span>
                <p>{question.hints[hintStep - 1]}</p>
                {hintStep < question.hints.length && (
                  <button
                    onClick={() => setHintStep((prev) => prev + 1)}
                    className="text-[11px] font-bold text-emerald-700 underline mt-1 block"
                  >
                    Lihat langkah petunjuk berikutnya ➡️
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer Action */}
        <div className="mt-3 pt-2 border-t flex items-center justify-between">
          {!isSubmitted ? (
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="clay-btn clay-btn-white px-4 py-2 text-xs sm:text-sm font-bold rounded-xl text-slate-700 flex items-center gap-1.5"
            >
              <FastForward className="w-4 h-4 text-amber-600" />
              <span>Lewati Soal Ini (Lanjut Main)</span>
            </button>
          ) : (
            <div className="text-xs font-bold text-emerald-800">
              Permainan siap dilanjutkan kembali!
            </div>
          )}

          {isSubmitted ? (
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="clay-btn clay-btn-green px-5 py-2.5 text-sm font-black rounded-xl flex items-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Lanjutkan Pertahanan Kebun! 🌻</span>
            </button>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400">
              Pilih A, B, C, atau D
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

