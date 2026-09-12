'use client';

import { useState, useMemo } from 'react';
import { sfx } from '@/lib/soundEffects';
import { TOY_CARDS_DATA } from '@/lib/constants';

export default function GameMemoryCards({ onNext }) {
  // Generate shuffled 8 cards (4 pairs)
  const deck = useMemo(() => {
    return [...TOY_CARDS_DATA, ...TOY_CARDS_DATA]
      .map((card, idx) => ({ ...card, uniqueId: idx }))
      .sort(() => Math.random() - 0.5);
  }, []);

  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [statusText, setStatusText] = useState('Pilih kartumu! ✨');
  const [isBusy, setIsBusy] = useState(false);
  const [isWon, setIsWon] = useState(false);

  const handleCardClick = (index) => {
    if (isBusy || isWon) return;
    if (flippedIndices.includes(index)) return;
    if (matchedIds.includes(deck[index].id)) return;

    sfx.playFlip();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsBusy(true);
      const [firstIdx, secondIdx] = newFlipped;
      const card1 = deck[firstIdx];
      const card2 = deck[secondIdx];

      if (card1.id === card2.id) {
        // Matched!
        setTimeout(() => {
          sfx.playDing();
          const newMatched = [...matchedIds, card1.id];
          setMatchedIds(newMatched);
          setFlippedIndices([]);
          setIsBusy(false);
          setStatusText(`Hebat! Cocok! (${newMatched.length}/4) 💖`);

          if (newMatched.length === 4) {
            setTimeout(() => {
              sfx.playFanfare();
              setIsWon(true);
              setStatusText('Semua sahabat bersatu! 🎉');
            }, 300);
          }
        }, 400);
      } else {
        // Mismatch, flip back
        setTimeout(() => {
          sfx.playBoing();
          setFlippedIndices([]);
          setIsBusy(false);
          setStatusText('Coba ingat-ingat lagi posisinya! 👀');
        }, 850);
      }
    }
  };

  const handleProceed = () => {
    sfx.playPop();
    onNext();
  };

  return (
    <div className="max-w-xl w-full text-center cute-card p-6 sm:p-8 rounded-3xl relative z-10">
      <div className="washi-tape"></div>

      <span className="text-xs font-bold px-3 py-1.5 bg-yellow-100 text-amber-700 rounded-full border border-yellow-200 inline-flex items-center gap-1 mb-2">
        <span>🎮</span> Game 4: Kartu Pasangan Mainan
      </span>
      <h2 className="text-2xl font-bold font-heading text-zinc-800 mb-1">
        Cocokkan Sahabat Mainan! 🃏🤠
      </h2>
      <p className="text-zinc-500 text-xs sm:text-sm mb-4">
        Buka 2 kartu dan temukan pasangan karakter Toy Story yang sama (Woody, Buzz, Alien, Lotso)!
      </p>

      {/* Status Kartu Memory */}
      <div className="flex justify-between items-center bg-amber-50/80 px-4 py-2.5 rounded-2xl border border-amber-200 mb-4 text-xs sm:text-sm font-bold font-heading">
        <span className="text-amber-700">
          Pasangan Cocok: <span className="text-lg text-amber-600 font-black">{matchedIds.length}</span> / 4 🧸
        </span>
        <span className="text-pink-600 animate-pulse">{statusText}</span>
      </div>

      {/* 8 Kartu Flip Memory Grid (4 Pasang) */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 p-3 bg-gradient-to-b from-yellow-50/70 to-pink-50/70 rounded-2xl border-2 border-dashed border-amber-200 mb-3 select-none memory-grid">
        {deck.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedIds.includes(card.id);
          const isMatched = matchedIds.includes(card.id);

          return (
            <div key={card.uniqueId} className="memory-card-wrap aspect-[3/4]">
              <div
                onClick={() => handleCardClick(idx)}
                className={`memory-card-inner ${isFlipped ? 'is-flipped' : ''} ${
                  isMatched ? 'is-matched' : ''
                }`}
              >
                {/* Depan (Tutup) */}
                <div className="memory-card-front flex flex-col items-center justify-center p-1">
                  <span className="text-2xl sm:text-3xl">❓</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-amber-800 mt-1 font-heading">
                    TOY
                  </span>
                </div>
                {/* Belakang (Buka) */}
                <div className="memory-card-back flex flex-col items-center justify-center p-1">
                  <span className="text-3xl sm:text-4xl animate-bounce">{card.emoji}</span>
                  <span className="text-[10px] sm:text-xs font-black text-rose-500 mt-1 font-heading">
                    {card.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleProceed}
          className="text-amber-600 hover:text-amber-800 underline font-bold text-xs py-1 px-2"
        >
          Lompat ke Game Berikutnya ⏭️
        </button>
      </div>

      {isWon && (
        <div className="p-4 bg-gradient-to-r from-amber-400 to-rose-400 text-white rounded-2xl shadow-lg mt-3 flex flex-col items-center">
          <span className="text-4xl mb-1 animate-bounce">🎉🤠✨</span>
          <h3 className="font-bold font-heading text-lg">Semua Sahabat Bersatu! 💖</h3>
          <p className="text-xs text-amber-50 mb-3">Ingatanmu tajam banget kayak koboi sejati!</p>
          <button
            type="button"
            onClick={handleProceed}
            className="py-2.5 px-6 bg-white hover:bg-amber-50 text-amber-600 font-bold rounded-xl text-sm shadow btn-cute"
          >
            Lanjut Game 5: Pompa Roket Cinta! 🚀
          </button>
        </div>
      )}
    </div>
  );
}
