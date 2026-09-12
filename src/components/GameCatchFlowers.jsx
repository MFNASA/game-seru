'use client';

import { useState, useRef, useEffect } from 'react';
import { sfx } from '@/lib/soundEffects';

const FLOWER_EMOJIS = ['🌸', '🌷', '🌼', '🌹', '💖', '💐'];
const TARGET_SCORE = 10;

export default function GameCatchFlowers({ onNext }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [score, setScore] = useState(0);
  const [statusText, setStatusText] = useState('Ayo tangkap 10 bunga! 🌸');
  const [isWon, setIsWon] = useState(false);

  // Mutable game state in ref to avoid re-binding loop
  const gameState = useRef({
    running: true,
    score: 0,
    basketX: 180,
    basketWidth: 64,
    items: [],
    lastSpawn: 0,
    animFrameId: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Resize canvas to container
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width || 400;
    canvas.height = rect.height || 260;
    gameState.current.basketX = canvas.width / 2;
    gameState.current.running = true;
    gameState.current.score = 0;
    gameState.current.items = [];

    const spawnItem = () => {
      const emoji = FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)];
      const x = 30 + Math.random() * (canvas.width - 60);
      const speed = 1.8 + Math.random() * 1.5;
      const size = 26 + Math.random() * 8;

      gameState.current.items.push({
        x,
        y: -30,
        speed,
        size,
        emoji,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.05,
      });
    };

    const loop = () => {
      if (!gameState.current.running) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Spawn falling flowers
      if (Date.now() - gameState.current.lastSpawn > 600) {
        spawnItem();
        gameState.current.lastSpawn = Date.now();
      }

      const basketY = h - 34;

      for (let i = gameState.current.items.length - 1; i >= 0; i--) {
        const item = gameState.current.items[i];
        item.y += item.speed;
        item.rot += item.rotSpeed;

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rot);
        ctx.font = `${item.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.emoji, 0, 0);
        ctx.restore();

        // Hit detection with basket
        if (item.y >= basketY - 20 && item.y <= basketY + 15) {
          if (Math.abs(item.x - gameState.current.basketX) < gameState.current.basketWidth / 2 + 10) {
            sfx.playDing();
            gameState.current.score++;
            const currentScore = gameState.current.score;
            setScore(currentScore);
            gameState.current.items.splice(i, 1);

            setStatusText(`Hebat! ${TARGET_SCORE - currentScore} bunga lagi! ✨`);

            if (currentScore >= TARGET_SCORE) {
              gameState.current.running = false;
              cancelAnimationFrame(gameState.current.animFrameId);
              sfx.playFanfare();
              setIsWon(true);
              setStatusText('Buket bunga sempurna! 💐');
              return;
            }
            continue;
          }
        }

        if (item.y > h + 30) {
          gameState.current.items.splice(i, 1);
        }
      }

      // Draw basket
      ctx.font = '40px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🧺', gameState.current.basketX, basketY);

      gameState.current.animFrameId = requestAnimationFrame(loop);
    };

    gameState.current.animFrameId = requestAnimationFrame(loop);

    return () => {
      gameState.current.running = false;
      if (gameState.current.animFrameId) {
        cancelAnimationFrame(gameState.current.animFrameId);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!gameState.current.running || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    gameState.current.basketX = Math.max(35, Math.min(canvasRef.current.width - 35, x));
  };

  const handleTouchMove = (e) => {
    if (!gameState.current.running || !canvasRef.current || e.touches.length === 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    gameState.current.basketX = Math.max(35, Math.min(canvasRef.current.width - 35, x));
  };

  const handleMoveLeft = () => {
    if (!canvasRef.current) return;
    gameState.current.basketX = Math.max(35, gameState.current.basketX - 45);
  };

  const handleMoveRight = () => {
    if (!canvasRef.current) return;
    gameState.current.basketX = Math.min(canvasRef.current.width - 35, gameState.current.basketX + 45);
  };

  const handleProceed = () => {
    sfx.playPop();
    gameState.current.running = false;
    if (gameState.current.animFrameId) {
      cancelAnimationFrame(gameState.current.animFrameId);
    }
    onNext();
  };

  return (
    <div className="max-w-xl w-full text-center cute-card p-6 sm:p-8 rounded-3xl relative z-10">
      <div className="washi-tape"></div>

      <span className="text-xs font-bold px-3 py-1.5 bg-rose-100 text-rose-600 rounded-full border border-rose-200 inline-flex items-center gap-1 mb-2">
        <span>🎮</span> Game 2: Rangkai Buket Bunga
      </span>
      <h2 className="text-2xl font-bold font-heading text-zinc-800 mb-1">
        Tangkap Bunga Mekar! 🌸🧺
      </h2>
      <p className="text-zinc-500 text-xs sm:text-sm mb-4">
        Gerakkan keranjang <span className="font-bold text-pink-500">[ 🧺 ]</span> ke kiri & kanan untuk menangkap 10 bunga mekar & hati!
      </p>

      {/* Bar Skor & Status */}
      <div className="flex justify-between items-center bg-pink-50/80 px-4 py-2.5 rounded-2xl border border-pink-200 mb-3 text-xs sm:text-sm font-bold font-heading">
        <span className="text-pink-600">
          Bunga Terkumpul: <span className="text-lg text-rose-500 font-black">{score}</span> / {TARGET_SCORE} 💐
        </span>
        <span className="text-purple-600 animate-pulse">{statusText}</span>
      </div>

      {/* Canvas Mini Game */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[260px] bg-gradient-to-b from-pink-50/70 via-white to-rose-50/70 rounded-2xl border-2 border-dashed border-pink-300 overflow-hidden shadow-inner select-none cursor-ew-resize"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {isWon && (
          <div className="absolute inset-0 bg-pink-500/85 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4">
            <span className="text-5xl mb-2 animate-bounce">💐✨</span>
            <h3 className="text-2xl font-bold font-heading mb-1">Buket Bunga Sempurna! 🎉</h3>
            <p className="text-xs sm:text-sm text-pink-100 mb-4 font-medium">
              Kamu berhasil merangkai 10 bunga cinta tercantik!
            </p>
            <button
              type="button"
              onClick={handleProceed}
              className="py-3 px-6 bg-white hover:bg-pink-50 text-pink-600 font-bold rounded-2xl text-sm shadow-lg btn-cute"
            >
              Lanjut Game 3: Pukul Keraguan! 🔨
            </button>
          </div>
        )}
      </div>

      {/* Kontrol Tombol Mobile Touch */}
      <div className="grid grid-cols-2 gap-3 mt-3 sm:hidden">
        <button
          type="button"
          onClick={handleMoveLeft}
          className="py-2.5 bg-white text-pink-600 font-bold rounded-xl border border-pink-200 btn-cute text-sm"
        >
          ⬅️ Geser Kiri
        </button>
        <button
          type="button"
          onClick={handleMoveRight}
          className="py-2.5 bg-white text-pink-600 font-bold rounded-xl border border-pink-200 btn-cute text-sm"
        >
          Geser Kanan ➡️
        </button>
      </div>

      <div className="flex justify-between items-center mt-3 text-xs">
        <span className="text-zinc-400 hidden sm:inline">
          💡 Geser mouse atau sentuh layar ke kiri & kanan
        </span>
        <button
          type="button"
          onClick={handleProceed}
          className="text-pink-500 hover:text-pink-700 underline font-bold ml-auto py-1 px-2"
        >
          Lompat ke Game Berikutnya ⏭️
        </button>
      </div>
    </div>
  );
}
