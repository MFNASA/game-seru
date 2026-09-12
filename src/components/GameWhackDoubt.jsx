'use client';

import { useState, useEffect, useRef } from 'react';
import { sfx } from '@/lib/soundEffects';

const TARGET_WHACK = 6;
const MONSTER_ICONS = ['👾', '🤡', '👻', '💔', '🙈'];

export default function GameWhackDoubt({ onNext }) {
  const [score, setScore] = useState(0);
  const [statusText, setStatusText] = useState('Awas dia nongol! 👀');
  const [isWon, setIsWon] = useState(false);
  const [activeHole, setActiveHole] = useState(null);
  const [hitHole, setHitHole] = useState(null);

  const timerRef = useRef(null);
  const runningRef = useRef(true);

  useEffect(() => {
    runningRef.current = true;

    const popupMole = () => {
      if (!runningRef.current) return;
      const randomHoleIndex = Math.floor(Math.random() * 6);
      const randomIcon = MONSTER_ICONS[Math.floor(Math.random() * MONSTER_ICONS.length)];

      setActiveHole({ index: randomHoleIndex, icon: randomIcon });
      setHitHole(null);

      timerRef.current = setTimeout(popupMole, 850);
    };

    popupMole();

    return () => {
      runningRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleWhack = (index) => {
    if (!runningRef.current || isWon) return;
    if (activeHole && activeHole.index === index && hitHole !== index) {
      sfx.playBoing();
      setHitHole(index);

      const nextScore = score + 1;
      setScore(nextScore);

      if (nextScore >= TARGET_WHACK) {
        runningRef.current = false;
        if (timerRef.current) clearTimeout(timerRef.current);
        sfx.playFanfare();
        setIsWon(true);
        setStatusText('Semua keraguan hancur! 🎉');
      } else {
        setStatusText(`Bagus! ${TARGET_WHACK - nextScore} lagi! 🔨`);
      }
    }
  };

  const handleProceed = () => {
    sfx.playPop();
    runningRef.current = false;
    if (timerRef.current) clearTimeout(timerRef.current);
    onNext();
  };

  return (
    <div className="max-w-xl w-full text-center cute-card p-6 sm:p-8 rounded-3xl relative z-10">
      <div className="washi-tape"></div>

      <span className="text-xs font-bold px-3 py-1.5 bg-purple-100 text-purple-600 rounded-full border border-purple-200 inline-flex items-center gap-1 mb-2">
        <span>🎮</span> Game 3: Hancurkan Keraguan!
      </span>
      <h2 className="text-2xl font-bold font-heading text-zinc-800 mb-1">
        Pukul Monster Ragu! 🔨👾
      </h2>
      <p className="text-zinc-500 text-xs sm:text-sm mb-4">
        Ketuk/klik monster keraguan <span className="font-bold text-purple-500">[ 👾 / 🤡 ]</span> yang muncul dari lubang! Pukul 6 kali agar hatimu yakin!
      </p>

      {/* Bar Skor Whack */}
      <div className="flex justify-between items-center bg-purple-50/80 px-4 py-2.5 rounded-2xl border border-purple-200 mb-4 text-xs sm:text-sm font-bold font-heading">
        <span className="text-purple-600">
          Keraguan Dihancurkan:{' '}
          <span className="text-lg text-purple-600 font-black">{score}</span> / {TARGET_WHACK} 🔨
        </span>
        <span className="text-pink-600 animate-pulse">{statusText}</span>
      </div>

      {/* 6 Lubang Whack-a-Mole Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 bg-gradient-to-b from-purple-50/60 to-pink-50/60 rounded-2xl border-2 border-dashed border-purple-200 mb-3 select-none">
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const isTargetVisible = activeHole && activeHole.index === index;
          const isHit = hitHole === index;

          return (
            <div
              key={index}
              onClick={() => handleWhack(index)}
              className="relative aspect-square bg-white rounded-2xl border-2 border-purple-200 overflow-hidden flex items-center justify-center cursor-pointer shadow-inner hover:scale-105 transition"
            >
              {isTargetVisible && (
                <span className="text-4xl transition-all animate-bounce">
                  {isHit ? '💥' : activeHole.icon}
                </span>
              )}
              <span className="text-2xl absolute bottom-1 opacity-30 pointer-events-none">🕳️</span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleProceed}
          className="text-purple-500 hover:text-purple-700 underline font-bold text-xs py-1 px-2"
        >
          Lompat ke Game Berikutnya ⏭️
        </button>
      </div>

      {isWon && (
        <div className="p-4 bg-purple-500 text-white rounded-2xl shadow-lg mt-3 flex flex-col items-center">
          <span className="text-4xl mb-1 animate-bounce">✨🎉</span>
          <h3 className="font-bold font-heading text-lg">Semua Keraguan Hancur! 💖</h3>
          <p className="text-xs text-purple-100 mb-3">Hatimu kini 100% yakin dan siap membuka cinta!</p>
          <button
            type="button"
            onClick={handleProceed}
            className="py-2.5 px-6 bg-white hover:bg-purple-50 text-purple-600 font-bold rounded-xl text-sm shadow btn-cute"
          >
            Lanjut Game 4: Tebak Kartu Mainan! 🃏
          </button>
        </div>
      )}
    </div>
  );
}
