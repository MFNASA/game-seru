'use client';

import { sfx } from '@/lib/soundEffects';

export default function StepHeartfeltLetter({ namaUser, jawabanEsai, onNext }) {
  const handleProceed = () => {
    sfx.playFanfare();
    onNext();
  };

  return (
    <div className="max-w-md w-full text-center cute-card p-8 rounded-3xl relative z-10">
      <div className="washi-tape"></div>

      <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-rose-200 shadow-inner text-4xl animate-wiggle">
        💐
      </div>
      <div className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-bold mb-2">
        <span>🌸</span> Surat Khusus dari Lubuk Hati
      </div>
      <h2 className="text-xl font-bold text-zinc-800 mb-2 font-heading">
        Untuk <span className="text-rose-500">{namaUser}</span> yang Berharga ✨
      </h2>

      <div className="relative bg-gradient-to-br from-rose-50/90 to-pink-50/90 p-5 rounded-2xl border-2 border-rose-200/80 mb-6 shadow-sm">
        <p className="text-zinc-700 text-sm leading-relaxed text-left font-medium">
          <span className="text-rose-500 font-bold block mb-2 text-base">
            🌸 Teruntuk {namaUser} yang amat berharga...
          </span>
          &ldquo;Di antara miliaran manusia di muka bumi ini, terima kasih banyak sudah hadir dan membawa warna seindah ini di hidupku. Membaca katamu (<em className="text-pink-600 font-semibold">&lsquo;{jawabanEsai}&rsquo;</em>), hatiku rasanya menghangat dan tersenyum tulus.
          <br /><br />
          Jangan pernah lupa kalau kamu itu luar biasa indah, senyumanmu selalu punya keajaiban untuk menerangi hari yang redup, dan kamu sangat pantas mendapatkan limpahan kasih sayang serta kebahagiaan di semesta ini.
          <br /><br />
          Tetaplah mekar dengan cantik seperti bunga di musim semi ya. You are deeply loved, appreciated, and cherished. Selalu bahagia ya, bidadari manisku... ✨🥺💐💖&rdquo;
        </p>
      </div>

      <button
        type="button"
        onClick={handleProceed}
        className="w-full py-4 px-6 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 hover:from-rose-500 hover:to-purple-600 text-white font-bold rounded-2xl text-base shadow-lg shadow-pink-500/30 btn-cute flex items-center justify-center gap-2"
      >
        <span>Cetak Strip Photobox Toy Story</span> <span>🧸📸</span>
      </button>
    </div>
  );
}
