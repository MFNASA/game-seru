'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { sfx } from '@/lib/soundEffects';
import { WHEEL_PRIZES } from '@/lib/constants';

export default function GameWheelFortune({ onNext }) {
  const canvasRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultText, setResultText] = useState(null);

  const angleRef = useRef(0);
  const animFrameRef = useRef(null);

  const drawWheel = useCallback((angle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = cx - 4;
    const numSlices = WHEEL_PRIZES.length;
    const sliceAngle = (Math.PI * 2) / numSlices;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    WHEEL_PRIZES.forEach((item, i) => {
      const start = angle + i * sliceAngle;
      const end = start + sliceAngle;

      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, start, end);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text slice
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = item.textColor;
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(item.text, radius - 16, 4);
      ctx.restore();
    });

    // Border luar bergaris emas
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
  }, []);

  useEffect(() => {
    drawWheel(angleRef.current);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [drawWheel]);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResultText(null);

    let spinVelocity = 0.35 + Math.random() * 0.25;
    const deceleration = 0.985;
    let lastTickAngle = angleRef.current;

    const animate = () => {
      angleRef.current += spinVelocity;
      spinVelocity *= deceleration;

      if (Math.abs(angleRef.current - lastTickAngle) > Math.PI / 6) {
        sfx.playTick();
        lastTickAngle = angleRef.current;
      }

      drawWheel(angleRef.current);

      if (spinVelocity > 0.002) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        sfx.playFanfare();

        // Hitung slice pemenang di jarum atas (-Math.PI / 2)
        const numSlices = WHEEL_PRIZES.length;
        const sliceAngle = (Math.PI * 2) / numSlices;
        const normalized = ((-Math.PI / 2 - angleRef.current) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const winningIndex = Math.floor(normalized / sliceAngle) % numSlices;
        const winner = WHEEL_PRIZES[winningIndex];

        setResultText(`✨ ${winner.text} ✨`);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  const handleProceed = () => {
    sfx.playPop();
    onNext();
  };

  return (
    <div className="max-w-md w-full text-center cute-card p-6 sm:p-8 rounded-3xl relative z-10">
      <div className="washi-tape"></div>

      <span className="text-xs font-bold px-3 py-1.5 bg-teal-100 text-teal-700 rounded-full border border-teal-200 inline-flex items-center gap-1 mb-2">
        <span>🎮</span> Game 6: Roda Takdir Asmara
      </span>
      <h2 className="text-2xl font-bold font-heading text-zinc-800 mb-1">
        Roda Keberuntungan Mainan! 🎡✨
      </h2>
      <p className="text-zinc-500 text-xs sm:text-sm mb-4">
        Putar roda takdir asmara untuk mengungkap kejutan romantis terbaik hari ini!
      </p>

      {/* Canvas Roda Putar & Jarum */}
      <div className="relative w-[270px] h-[270px] mx-auto mb-4 flex items-center justify-center select-none">
        {/* Jarum Penunjuk Atas */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 wheel-pointer"></div>

        <canvas
          ref={canvasRef}
          width={260}
          height={260}
          className="rounded-full shadow-lg border-4 border-white"
        />

        {/* Pusat Roda */}
        <div className="absolute w-12 h-12 rounded-full bg-white border-2 border-amber-300 shadow flex items-center justify-center text-xl pointer-events-none">
          ⭐
        </div>
      </div>

      {resultText && (
        <div className="bg-gradient-to-r from-teal-50 via-pink-50 to-amber-50 p-4 rounded-2xl border-2 border-teal-300 mb-4 shadow-sm animate-wiggle">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Ramalan Takdir Asmara Kamu:
          </span>
          <h3 className="text-base sm:text-lg font-black text-rose-600 mt-1 font-heading">
            {resultText}
          </h3>
        </div>
      )}

      {!resultText && (
        <button
          type="button"
          disabled={isSpinning}
          onClick={handleSpin}
          className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-2xl text-base shadow-lg shadow-teal-500/25 btn-cute flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <span>{isSpinning ? 'Sedang Berputar... 🎡' : 'Putar Roda Takdir! 🎡✨'}</span>
        </button>
      )}

      {resultText && (
        <button
          type="button"
          onClick={handleProceed}
          className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl text-base shadow-lg shadow-pink-500/25 btn-cute flex items-center justify-center gap-2 mt-2"
        >
          <span>Lanjut Game 7: Mesin Gacha Kapsul! 🎰</span>
        </button>
      )}

      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={handleProceed}
          className="text-teal-600 hover:text-teal-800 underline font-bold text-xs py-1 px-2"
        >
          Lompat ke Game Berikutnya ⏭️
        </button>
      </div>
    </div>
  );
}
