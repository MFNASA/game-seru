'use client';

import { useState } from 'react';
import { sfx } from '@/lib/soundEffects';

export default function StepEssay({ namaUser, onNext }) {
  const [essay, setEssay] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    const clean = essay.trim();
    if (!clean) {
      sfx.playBoing();
      alert('Tulis dulu isi hatimu yang manis yaa! Jangan kosong dong 💕');
      return;
    }
    sfx.playDing();
    onNext(clean);
  };

  return (
    <div className="max-w-xl w-full text-center cute-card p-6 sm:p-8 rounded-3xl relative z-10">
      <div className="washi-tape washi-tape-pink"></div>

      <span className="text-xs font-bold px-3 py-1 bg-pink-100 text-pink-600 rounded-full border border-pink-200 inline-flex items-center gap-1 mb-3">
        <span>💌</span> Curahan Hati Tulus
      </span>
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-zinc-800 font-heading leading-relaxed">
        Wahai {namaUser}, bisikin dong 1 hal paling manis atau harapan terindah yang selalu kamu syukuri di dunia ini: 💌🌸
      </h2>

      <form onSubmit={handleSubmit}>
        <textarea
          rows={3}
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Tulis hal yang paling bikin kamu bahagia atau alasan manismu di sini... 💕"
          className="w-full p-4 text-sm font-medium rounded-2xl bg-pink-50/60 border-2 border-pink-200 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-200/50 transition outline-none mb-5 text-zinc-800 placeholder:text-pink-300 resize-none shadow-inner"
        />

        <button
          type="submit"
          className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-2xl text-base shadow-lg shadow-pink-500/25 btn-cute flex items-center justify-center gap-2"
        >
          <span>Kirim Surat Hati</span> <span>💌🌸</span>
        </button>
      </form>
    </div>
  );
}
