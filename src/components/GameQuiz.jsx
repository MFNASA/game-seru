'use client';

import { useState, useMemo } from 'react';
import { sfx } from '@/lib/soundEffects';
import { BANK_SOAL_GOMBAL } from '@/lib/constants';

const TOTAL_SOAL = 5;

const RUNAWAY_MESSAGES = [
  'Mau nolak ya? Gak bisa! 😜',
  'Dilarang nolak cinta! 💖',
  'Harus pilih yang gombal! 🙈',
  'Eits kabur! Wleee 🏃💨',
  'Gak bisa lolos dari aku! 💘',
  'Klik yang satunya dong! 🥺👉👈',
];

export default function GameQuiz({ namaUser, onNext }) {
  // Pilih 5 soal acak saat komponen pertama kali di-mount
  const activeQuestions = useMemo(() => {
    return [...BANK_SOAL_GOMBAL].sort(() => 0.5 - Math.random()).slice(0, TOTAL_SOAL);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [runawayOffset, setRunawayOffset] = useState({ x: 0, y: 0 });
  const [runawayText, setRunawayText] = useState(null);

  const currentQuestion = activeQuestions[currentIndex];

  // Acak urutan pilihan jawaban untuk setiap nomor soal
  const choices = useMemo(() => {
    if (!currentQuestion) return [];
    return [...currentQuestion.pilihan].sort(() => 0.5 - Math.random());
  }, [currentQuestion]);

  const handleRunawayHover = () => {
    sfx.playBoing();
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 100;
    setRunawayOffset({ x: randomX, y: randomY });
    const randomMsg = RUNAWAY_MESSAGES[Math.floor(Math.random() * RUNAWAY_MESSAGES.length)];
    setRunawayText(randomMsg);
  };

  const handleCorrectChoice = () => {
    sfx.playDing();
    setRunawayOffset({ x: 0, y: 0 });
    setRunawayText(null);

    if (currentIndex + 1 < TOTAL_SOAL) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onNext();
    }
  };

  if (!currentQuestion) return null;

  const progressPercent = ((currentIndex + 1) / TOTAL_SOAL) * 100;
  const questionText = currentQuestion.pertanyaan.replace(/{nama}/g, namaUser);

  return (
    <div className="max-w-xl w-full text-center cute-card p-6 sm:p-8 rounded-3xl relative z-10">
      <div className="washi-tape"></div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold px-3 py-1.5 bg-rose-100 text-rose-600 rounded-full border border-rose-200 flex items-center gap-1">
          <span>🎮</span> Game 1: Kuis Gombal Salting
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-pink-500 bg-pink-100 px-3 py-1.5 rounded-full border border-pink-200 font-heading">
            Soal {currentIndex + 1} / {TOTAL_SOAL} 🌸
          </span>
        </div>
      </div>

      {/* Progress Bar Gemas */}
      <div className="w-full bg-pink-100 h-2.5 rounded-full mb-6 overflow-hidden p-0.5 border border-pink-200">
        <div
          className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Speech Bubble Pertanyaan */}
      <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 p-5 rounded-3xl border-2 border-pink-200 mb-6 shadow-sm">
        <span className="text-2xl absolute -top-4 -left-2">💌</span>
        <h2 className="text-lg sm:text-xl font-bold text-zinc-800 min-h-[55px] flex items-center justify-center leading-relaxed font-heading">
          {questionText}
        </h2>
      </div>

      {/* 2 Pilihan Jawaban: 1 Benar (Bisa Diklik), 1 Kabur */}
      <div className="grid grid-cols-1 gap-4 relative min-h-[190px]">
        {choices.map((pilihan, idx) => {
          if (pilihan.kabur) {
            return (
              <button
                key={idx}
                type="button"
                onMouseEnter={handleRunawayHover}
                onTouchStart={handleRunawayHover}
                style={{
                  transform: `translate(${runawayOffset.x}px, ${runawayOffset.y}px) scale(0.95)`,
                  transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  position: 'relative',
                }}
                className="w-full py-4 px-5 bg-rose-50/80 hover:bg-rose-100 text-rose-700 font-bold rounded-2xl border-2 border-rose-300 text-left shadow-sm flex items-center justify-between text-sm sm:text-base select-none"
              >
                <span>{runawayText || pilihan.teks}</span>
              </button>
            );
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={handleCorrectChoice}
              className="w-full py-4 px-5 bg-white hover:bg-pink-50 text-zinc-800 font-bold rounded-2xl border-2 border-pink-300 hover:border-pink-500 transition-all text-left shadow-md btn-cute flex items-center justify-between text-sm sm:text-base"
            >
              <span>{pilihan.teks}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
