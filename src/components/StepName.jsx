'use client';

import { useState } from 'react';
import { sfx } from '@/lib/soundEffects';

export default function StepName({ onNext }) {
  const [nama, setNama] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    const cleanNama = nama.trim();
    if (!cleanNama) {
      sfx.playBoing();
      alert("Eits! Isi dulu nama panggilanmu yang manis yaa! 💕🌸");
      return;
    }
    sfx.playDing();
    onNext(cleanNama);
  };

  return (
    <div className="max-w-md w-full text-center cute-card p-8 rounded-3xl relative z-10">
      <div className="washi-tape"></div>

      <div className="w-20 h-20 bg-pink-100 text-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-pink-200 shadow-inner text-4xl animate-wiggle">
        🌸
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-pink-200">
        <span>✨</span> Korean Photobox & Arcade Gemas <span>✨</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 font-heading">
        PHOTOBOX & ARCADE GOMBAL
      </h1>
      <p className="text-zinc-500 mb-6 text-sm font-medium">
        Abadikan 4 pose tercantikmu, mainkan aneka mini-game seru, dan siap-siap salting brutal! 🌸💖
      </p>

      <form onSubmit={handleSubmit}>
        <div className="relative mb-5">
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Tulis nama panggilanmu di sini... 💕"
            autoFocus
            className="w-full py-4 px-5 text-base font-semibold rounded-2xl bg-pink-50/60 border-2 border-pink-200 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-200/50 transition-all outline-none text-center text-zinc-800 placeholder:text-pink-300 shadow-inner"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-2xl text-base shadow-lg shadow-pink-500/30 btn-cute flex items-center justify-center gap-2"
        >
          <span>Mulai Petualangan Gemas</span> <span>🌸💖</span>
        </button>
      </form>
    </div>
  );
}
