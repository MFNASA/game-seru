'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { sfx } from '@/lib/soundEffects';
import { BANK_SOAL_GOMBAL } from '@/lib/constants';

const TOTAL_SOAL = 7;

const RUNAWAY_MESSAGES = [
  'KABURRR!! 🏃‍♀️💨',
  'BYE BYE FIKTIF!! 🙅‍♀️💨',
  'GAK MAU NGAKU!! 😤',
  'TUDUHANMU PALSU!! 🏃',
  'NGEJARRR KALOOOO!! 💨💨',
  'SALTING AKUTUH!! 🫣💨',
  'MAAF MAAF KABUR DULU!! 🙈',
  'TANGKEP KALO BISA!! 😜',
];

const QUESTION_EMOJIS = ['🌸', '💕', '🌷', '✨', '🎀', '💫', '🍓'];
const BG_COLORS = [
  { card: 'from-pink-100 to-rose-100', border: 'border-pink-300', badge: 'bg-pink-500' },
  { card: 'from-purple-100 to-pink-100', border: 'border-purple-300', badge: 'bg-purple-500' },
  { card: 'from-rose-100 to-orange-100', border: 'border-rose-300', badge: 'bg-rose-500' },
  { card: 'from-fuchsia-100 to-pink-100', border: 'border-fuchsia-300', badge: 'bg-fuchsia-500' },
  { card: 'from-pink-100 to-violet-100', border: 'border-pink-400', badge: 'bg-pink-600' },
  { card: 'from-red-100 to-pink-100', border: 'border-red-300', badge: 'bg-red-500' },
  { card: 'from-violet-100 to-purple-100', border: 'border-violet-300', badge: 'bg-violet-500' },
];

export default function GameQuiz({ namaUser, onNext }) {
  const activeQuestions = useMemo(() => {
    return [...BANK_SOAL_GOMBAL].sort(() => 0.5 - Math.random()).slice(0, TOTAL_SOAL);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [runawayPos, setRunawayPos] = useState({ x: 0, y: 0 });
  const [runawayText, setRunawayText] = useState(null);
  const [runawayScale, setRunawayScale] = useState(1);
  const [runawayRotate, setRunawayRotate] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [correctFlash, setCorrectFlash] = useState(false);
  const kaburBtnRef = useRef(null);
  const containerRef = useRef(null);

  const currentQuestion = activeQuestions[currentIndex];

  const choices = useMemo(() => {
    if (!currentQuestion) return [];
    return [...currentQuestion.pilihan].sort(() => 0.5 - Math.random());
  }, [currentQuestion]);

  // Reset posisi tombol kabur tiap ganti soal
  useEffect(() => {
    setRunawayPos({ x: 0, y: 0 });
    setRunawayText(null);
    setRunawayScale(1);
    setRunawayRotate(0);
    setShowCorrect(false);
    setCorrectFlash(false);
  }, [currentIndex]);

  const handleRunawayHover = () => {
    sfx.playBoing();
    // Kabur yang brutal: jarak jauh + random rotate + random scale mengecil
    const maxX = 280;
    const maxY = 160;
    const randomX = (Math.random() - 0.5) * maxX * 2;
    const randomY = (Math.random() - 0.5) * maxY * 2;
    const randomRotate = (Math.random() - 0.5) * 30;
    const randomScale = 0.6 + Math.random() * 0.3; // makin kecil saat kabur
    setRunawayPos({ x: randomX, y: randomY });
    setRunawayRotate(randomRotate);
    setRunawayScale(randomScale);
    const msg = RUNAWAY_MESSAGES[Math.floor(Math.random() * RUNAWAY_MESSAGES.length)];
    setRunawayText(msg);
  };

  const handleCorrectChoice = () => {
    sfx.playDing();
    setCorrectFlash(true);
    setShowCorrect(true);
    setTimeout(() => {
      setCorrectFlash(false);
      if (currentIndex + 1 < TOTAL_SOAL) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onNext();
      }
    }, 900);
  };

  if (!currentQuestion) return null;

  const progressPercent = ((currentIndex + 1) / TOTAL_SOAL) * 100;
  const questionText = currentQuestion.pertanyaan.replace(/{nama}/g, namaUser);
  const deco = QUESTION_EMOJIS[currentIndex % QUESTION_EMOJIS.length];
  const theme = BG_COLORS[currentIndex % BG_COLORS.length];

  return (
    <div
      ref={containerRef}
      className="max-w-xl w-full text-center cute-card p-6 sm:p-8 rounded-3xl relative z-10 overflow-hidden"
    >
      {/* Washi tape atas */}
      <div className="washi-tape"></div>

      {/* Confetti flash overlay saat jawab benar */}
      {correctFlash && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-green-400/20 animate-ping rounded-3xl" />
          <span className="text-5xl animate-bounce z-10">✅</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold px-3 py-1.5 bg-rose-100 text-rose-600 rounded-full border border-rose-200 flex items-center gap-1">
          <span>🎮</span> Game 1: Kuis Gombal
        </span>
        <span className={`text-xs font-bold text-white px-3 py-1.5 rounded-full font-heading ${theme.badge}`}>
          {deco} Soal {currentIndex + 1} / {TOTAL_SOAL}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-pink-100 h-3 rounded-full mb-5 overflow-hidden border border-pink-200 p-0.5">
        <div
          className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500 h-full rounded-full transition-all duration-500 relative"
          style={{ width: `${progressPercent}%` }}
        >
          {/* Kilau gerak */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-white/40 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Kartu Pertanyaan */}
      <div
        className={`relative bg-gradient-to-br ${theme.card} p-5 rounded-3xl border-2 ${theme.border} mb-6 shadow-inner`}
      >
        {/* Stiker pojok */}
        <span className="text-3xl absolute -top-5 -left-2 drop-shadow">{deco}</span>
        <span className="text-2xl absolute -top-4 -right-2 drop-shadow animate-wiggle">💌</span>
        <h2 className="text-lg sm:text-xl font-bold text-zinc-800 min-h-[60px] flex items-center justify-center leading-relaxed font-heading px-4">
          "{questionText}"
        </h2>
      </div>

      {/* Pilihan Jawaban */}
      <div className="relative min-h-[170px] flex flex-col gap-3">
        {choices.map((pilihan, idx) => {
          if (pilihan.kabur) {
            return (
              <button
                key={idx}
                ref={kaburBtnRef}
                type="button"
                onMouseEnter={handleRunawayHover}
                onTouchStart={handleRunawayHover}
                style={{
                  transform: `translate(${runawayPos.x}px, ${runawayPos.y}px) scale(${runawayScale}) rotate(${runawayRotate}deg)`,
                  transition: 'transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  position: 'relative',
                  zIndex: 10,
                  willChange: 'transform',
                }}
                className="w-full py-4 px-5 bg-rose-50 text-rose-600 font-bold rounded-2xl border-2 border-dashed border-rose-400 text-left shadow select-none flex items-center gap-3 text-sm sm:text-base"
              >
                <span className="text-xl shrink-0">🏃‍♀️</span>
                <span className="leading-tight">{runawayText || pilihan.teks}</span>
                <span className="ml-auto text-lg">💨</span>
              </button>
            );
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={handleCorrectChoice}
              className="w-full py-4 px-5 bg-white hover:bg-pink-50 text-zinc-800 font-bold rounded-2xl border-2 border-pink-300 hover:border-pink-500 text-left shadow-md btn-cute flex items-center gap-3 text-sm sm:text-base group"
            >
              <span className="text-xl shrink-0 group-hover:animate-bounce">🥰</span>
              <span>{pilihan.teks}</span>
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-pink-400">✓</span>
            </button>
          );
        })}
      </div>

      {/* Hint lucu */}
      <p className="mt-4 text-xs text-pink-400 font-heading animate-pulse">
        💡 hint: tombol yang lari itu jawaban yang salah wkwk~
      </p>
    </div>
  );
}
