'use client';

import { useState, useEffect, useRef } from 'react';
import { sfx } from '@/lib/soundEffects';

const TARGET_PERCENT = 100;

export default function GameRocketPump({ onNext }) {
  const [percent, setPercent] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const percentRef = useRef(0);
  const isWonRef = useRef(false);

  useEffect(() => {
    // Auto-decay pelan agar terasa seru dan menantang
    const interval = setInterval(() => {
      if (isWonRef.current) return;
      if (percentRef.current > 0 && percentRef.current < 100) {
        percentRef.current = Math.max(0, percentRef.current - 1.2);
        setPercent(Math.round(percentRef.current));
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const spawnLoveParticle = (clientX, clientY) => {
    if (typeof document === 'undefined') return;
    const emojis = ['🚀', '💖', '✨', '⭐', '💓', '🔥'];
    const p = document.createElement('div');
    p.className = 'particle-love';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = `${clientX}px`;
    p.style.top = `${clientY}px`;
    p.style.setProperty('--dx', `${(Math.random() - 0.5) * 80}px`);
    p.style.setProperty('--rot', `${(Math.random() - 0.5) * 60}deg`);
    document.body.appendChild(p);

    setTimeout(() => {
      if (p.parentElement) p.parentElement.removeChild(p);
    }, 1000);
  };

  const handlePump = (e) => {
    if (isWon) return;
    sfx.playHeartbeat();

    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX || rect.left + rect.width / 2;
    const clientY = e.clientY || rect.top + rect.height / 2;
    spawnLoveParticle(clientX, clientY);

    const nextVal = Math.min(100, percentRef.current + 6.5);
    percentRef.current = nextVal;
    const rounded = Math.round(nextVal);
    setPercent(rounded);

    if (nextVal >= TARGET_PERCENT) {
      isWonRef.current = true;
      setIsWon(true);
      sfx.playFanfare();
    }
  };

  const getCommentary = () => {
    if (percent === 0) return 'Ayo ketuk tombol roket secepat mungkin! 🚀⚡';
    if (percent < 30) return 'Bahan bakar cinta mulai terisi... 💓';
    if (percent < 60) return 'Mesin roket menderu kencang! Salting brutal! 😍✨';
    if (percent < 90) return 'Hampir mencapai kecepatan cahaya cinta! 🔥🚀';
    if (percent < 100) return 'DIKIT LAGI! SIAP-SIAP MELEDAK GEMAS! 💥💖';
    return 'DAYA MAKSIMAL 100%! TO INFINITY & BEYOND! 🚀🎉';
  };

  const handleProceed = () => {
    sfx.playPop();
    onNext();
  };

  return (
    <div className="max-w-md w-full text-center cute-card p-6 sm:p-8 rounded-3xl relative z-10">
      <div className="washi-tape washi-tape-pink"></div>

      <span className="text-xs font-bold px-3 py-1.5 bg-rose-100 text-rose-600 rounded-full border border-rose-200 inline-flex items-center gap-1 mb-2">
        <span>🎮</span> Game 5: Uji Kecepatan Sentuhan
      </span>
      <h2 className="text-2xl font-bold font-heading text-zinc-800 mb-1">
        Pompa Roket Cinta! 🚀💓
      </h2>
      <p className="text-zinc-500 text-xs sm:text-sm mb-4">
        Ketuk/klik roket cinta di bawah secepat mungkin untuk mengisi daya bahan bakar cinta Buzz ke 100%!
      </p>

      {/* Meteran Daya 100% */}
      <div className="mb-3">
        <div className="flex justify-between text-xs font-bold font-heading mb-1.5 px-1">
          <span className="text-zinc-600">Daya Roket Cinta:</span>
          <span className="text-rose-500 text-base font-black">{percent}%</span>
        </div>
        <div className="w-full bg-pink-100 h-5 rounded-full overflow-hidden p-1 border-2 border-pink-300">
          <div
            className="bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 h-full rounded-full transition-all duration-100"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <p className="text-xs font-bold text-pink-500 min-h-[22px] mb-4">
        {getCommentary()}
      </p>

      {/* Tombol Roket Raksasa Tap-Tap */}
      <div className="relative flex justify-center items-center py-2 mb-3">
        <button
          type="button"
          disabled={isWon}
          onClick={handlePump}
          className="w-32 h-32 rounded-full bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 text-white shadow-xl hover:shadow-2xl border-4 border-white flex flex-col items-center justify-center select-none active:scale-90 transition-transform btn-cute animate-heart-pump disabled:animate-none disabled:opacity-80"
        >
          <span className="text-5xl pointer-events-none">🚀</span>
          <span className="text-[11px] font-black uppercase tracking-wider mt-1 pointer-events-none text-pink-100">
            {isWon ? '100% FULL!' : 'KETUK AKU!'}
          </span>
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleProceed}
          className="text-rose-500 hover:text-rose-700 underline font-bold text-xs py-1 px-2"
        >
          Lompat ke Game Berikutnya ⏭️
        </button>
      </div>

      {isWon && (
        <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl shadow-lg mt-3 flex flex-col items-center">
          <span className="text-4xl mb-1 animate-bounce">🚀💥✨</span>
          <h3 className="font-bold font-heading text-lg">Daya Cinta 100% Maksimal! 🎉</h3>
          <p className="text-xs text-pink-100 mb-3">Roket cinta meluncur melintasi galaksi tanpa batas!</p>
          <button
            type="button"
            onClick={handleProceed}
            className="py-2.5 px-6 bg-white hover:bg-pink-50 text-pink-600 font-bold rounded-xl text-sm shadow btn-cute"
          >
            Lanjut Game 6: Roda Keberuntungan! 🎡
          </button>
        </div>
      )}
    </div>
  );
}
