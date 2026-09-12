'use client';

import { useState } from 'react';
import { sfx } from '@/lib/soundEffects';
import { DAFTAR_GELAR_GACHA } from '@/lib/constants';

export default function GameGachaTitle({ onNext }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [awardedTitle, setAwardedTitle] = useState(null);

  const handleSpinGacha = () => {
    if (isSpinning) return;
    sfx.playBoing();
    setIsSpinning(true);
    setAwardedTitle(null);

    setTimeout(() => {
      sfx.playFanfare();
      const randomTitle = DAFTAR_GELAR_GACHA[Math.floor(Math.random() * DAFTAR_GELAR_GACHA.length)];
      setAwardedTitle(randomTitle);
      setIsSpinning(false);
    }, 1100);
  };

  const handleProceed = () => {
    sfx.playPop();
    onNext(awardedTitle || '🚀 Space Ranger Terbaik Se-Galaksi Cinta');
  };

  return (
    <div className="max-w-md w-full text-center cute-card p-6 sm:p-8 rounded-3xl relative z-10">
      <div className="washi-tape washi-tape-pink"></div>

      <span className="text-xs font-bold px-3 py-1.5 bg-amber-100 text-amber-600 rounded-full border border-amber-200 inline-flex items-center gap-1 mb-2">
        <span>🎰</span> Game 7: Kapsul Keberuntungan
      </span>
      <h2 className="text-2xl font-bold font-heading text-zinc-800 mb-1">
        Gacha Gelar Resmi Toy Story! 🎁🧸
      </h2>
      <p className="text-zinc-500 text-xs sm:text-sm mb-4">
        Putar mesin gacha untuk mendapatkan gelar kehormatan Toy Story yang akan dicetak resmi di strip photobox kamu!
      </p>

      {/* Mesin Gacha Animasi */}
      <div className="relative w-40 h-40 mx-auto mb-4 bg-gradient-to-b from-amber-50 to-pink-50 rounded-full border-4 border-amber-300 flex items-center justify-center shadow-lg overflow-hidden">
        <div
          onClick={handleSpinGacha}
          className={`text-6xl cursor-pointer select-none transition-transform ${
            isSpinning ? 'animate-spin' : 'animate-bounce'
          }`}
        >
          {awardedTitle ? '🎁' : '🔮'}
        </div>
      </div>

      {awardedTitle && (
        <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-amber-100 p-4 rounded-2xl border-2 border-pink-300 mb-4 shadow-sm animate-wiggle">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
            Gelar Resmi yang Diraih:
          </span>
          <h3 className="text-lg sm:text-xl font-black text-rose-600 mt-1 font-heading">
            {awardedTitle}
          </h3>
        </div>
      )}

      {!awardedTitle && (
        <button
          type="button"
          disabled={isSpinning}
          onClick={handleSpinGacha}
          className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-white font-bold rounded-2xl text-base shadow-lg shadow-pink-500/30 btn-cute flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <span>{isSpinning ? 'Mengocok Kapsul... 🔮' : 'Putar Kapsul Gacha! 🎰✨'}</span>
        </button>
      )}

      {awardedTitle && (
        <button
          type="button"
          onClick={handleProceed}
          className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl text-base shadow-lg shadow-pink-500/25 btn-cute flex items-center justify-center gap-2 mt-2"
        >
          <span>Lanjut Tulis Curahan Hati 💌</span>
        </button>
      )}
    </div>
  );
}
