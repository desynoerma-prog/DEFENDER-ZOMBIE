import React, { useState } from 'react';
import { Question } from '../types';
import { Lightbulb, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface QuestionCardProps {
  question: Question;
  selectedAnswerIndex: number | null;
  isAnswerSubmitted: boolean;
  isCorrect: boolean | null;
  onSelectAnswer: (index: number) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswerIndex,
  isAnswerSubmitted,
  isCorrect,
  onSelectAnswer,
  disabled = false
}) => {
  const [hintStep, setHintStep] = useState<number>(0);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleOpenHint = () => {
    soundManager.playClick();
    setShowHintModal(true);
    if (hintStep === 0) {
      setHintStep(1);
    }
  };

  const handleNextHint = () => {
    soundManager.playClick();
    setHintStep((prev) => Math.min(question.hints.length, prev + 1));
  };

  return (
    <div id="question-panel" className="w-full max-w-4xl mx-auto mt-2 sm:mt-3 px-2">
      <div className="clay-card p-4 sm:p-6 bg-white/95 relative shadow-md">
        
        {/* Header: Topic & Hint Button */}
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {question.topic}
            </span>
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              Tingkat: {question.difficulty === 'easy' ? 'Mudah' : question.difficulty === 'medium' ? 'Sedang' : 'Tantangan'}
            </span>
          </div>

          {/* Clickable Hint Trigger */}
          <button
            id="hint-toggle-btn"
            onClick={handleOpenHint}
            className="clay-btn clay-btn-amber px-3 py-1.5 text-xs sm:text-sm rounded-xl flex items-center gap-1.5"
            title="Buka petunjuk belajar"
          >
            <Lightbulb className="w-4 h-4 text-amber-900 animate-pulse" />
            <span>💡 Petunjuk {hintStep > 0 ? `(${hintStep}/${question.hints.length})` : ''}</span>
          </button>
        </div>

        {/* Question Text */}
        <div className="text-center my-2 sm:my-3">
          <p className="text-base sm:text-lg md:text-xl font-bold text-slate-800 font-heading leading-snug">
            {question.questionText}
          </p>
          {question.highlightText && (
            <div className="inline-block mt-2 px-4 py-1 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 font-black text-lg sm:text-2xl font-heading shadow-xs">
              {question.highlightText}
            </div>
          )}
        </div>

        {/* 4 Answer Choices (Large 44px+ touch targets for kids) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mt-3 sm:mt-4">
          {question.choices.map((choice, index) => {
            let btnClass = 'clay-btn-white';
            let icon = null;

            if (isAnswerSubmitted) {
              if (index === question.correctAnswerIndex) {
                // Correct answer glows green
                btnClass = 'clay-btn-green ring-2 ring-emerald-500 scale-[1.02]';
                icon = <CheckCircle2 className="w-5 h-5 text-white ml-auto" />;
              } else if (index === selectedAnswerIndex && !isCorrect) {
                // Wrong chosen answer shows coral
                btnClass = 'clay-btn-coral ring-2 ring-rose-400 opacity-90';
                icon = <AlertCircle className="w-5 h-5 text-white ml-auto" />;
              } else {
                btnClass = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
              }
            } else if (selectedAnswerIndex === index) {
              btnClass = 'clay-btn-blue text-white ring-2 ring-blue-400';
            }

            return (
              <button
                key={index}
                id={`answer-choice-${index}`}
                onClick={() => {
                  if (!disabled && !isAnswerSubmitted) {
                    onSelectAnswer(index);
                  }
                }}
                disabled={disabled || isAnswerSubmitted}
                className={`clay-btn ${btnClass} w-full min-h-[50px] sm:min-h-[58px] px-4 py-2.5 text-left flex items-center justify-between text-base sm:text-lg font-bold rounded-2xl transition-all duration-150`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${
                    isAnswerSubmitted && index === question.correctAnswerIndex
                      ? 'bg-white/30 text-white'
                      : selectedAnswerIndex === index
                      ? 'bg-white/30 text-white'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {optionLetters[index]}
                  </span>
                  <span className="font-heading tracking-wide text-slate-800">
                    {choice}
                  </span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Immediate Educational Feedback Banner */}
        {isAnswerSubmitted && (
          <div className={`mt-4 p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-300 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}>
            <div className="flex items-start gap-2.5">
              <span className="text-2xl">{isCorrect ? '🎉' : '💡'}</span>
              <div className="flex-1">
                <h4 className="font-extrabold text-sm sm:text-base font-heading">
                  {isCorrect ? 'BENAR! Jawabanmu Tepat Sekali!' : 'HAMPIR BENAR! Jangan Menyerah!'}
                </h4>
                <p className="text-xs sm:text-sm font-semibold mt-1 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Progressive Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="clay-card max-w-md w-full p-5 sm:p-6 bg-white animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <h3 className="font-black text-lg text-slate-800 font-heading">Petunjuk Matematika</h3>
              </div>
              <button
                onClick={() => setShowHintModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
                aria-label="Tutup petunjuk"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 my-4">
              {question.hints.slice(0, hintStep).map((hint, i) => (
                <div key={i} className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-950 font-medium flex items-start gap-2">
                  <span className="font-bold text-amber-700 bg-amber-200 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{hint}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 mt-4 pt-2 border-t">
              {hintStep < question.hints.length ? (
                <button
                  onClick={handleNextHint}
                  className="clay-btn clay-btn-amber px-4 py-2 text-xs sm:text-sm rounded-xl"
                >
                  Lihat Langkah Berikutnya ➡️
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-700">Semua petunjuk sudah terbuka!</span>
              )}
              <button
                onClick={() => setShowHintModal(false)}
                className="clay-btn clay-btn-blue px-4 py-2 text-xs sm:text-sm rounded-xl ml-auto"
              >
                Paham, Siap Jawab!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
