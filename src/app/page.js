'use client';

import { useState } from 'react';
import FloatingDoodles from '@/components/FloatingDoodles';
import StepName from '@/components/StepName';
import StepPhoto from '@/components/StepPhoto';
import GameQuiz from '@/components/GameQuiz';
import GameCatchFlowers from '@/components/GameCatchFlowers';
import GameWhackDoubt from '@/components/GameWhackDoubt';
import GameMemoryCards from '@/components/GameMemoryCards';
import GameRocketPump from '@/components/GameRocketPump';
import GameWheelFortune from '@/components/GameWheelFortune';
import GameGachaTitle from '@/components/GameGachaTitle';
import StepEssay from '@/components/StepEssay';
import StepHeartfeltLetter from '@/components/StepHeartfeltLetter';
import StepFinalPhotobox from '@/components/StepFinalPhotobox';

export default function ArcadePhotoboxPage() {
  const [step, setStep] = useState('nama');
  const [state, setState] = useState({
    namaUser: '',
    daftarFoto: [],
    jawabanEsai: '',
    gelarUser: '🚀 Space Ranger Terbaik Se-Galaksi Cinta',
  });

  const goToStep = (nextStep) => {
    setStep(nextStep);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNamaSubmit = (nama) => {
    setState((prev) => ({ ...prev, namaUser: nama }));
    goToStep('foto');
  };

  const handleFotoSubmit = (photos) => {
    setState((prev) => ({ ...prev, daftarFoto: photos }));
    goToStep('kuis');
  };

  const handleQuizDone = () => {
    goToStep('minigame');
  };

  const handleMinigameDone = () => {
    goToStep('whack');
  };

  const handleWhackDone = () => {
    goToStep('memory');
  };

  const handleMemoryDone = () => {
    goToStep('heartbeat');
  };

  const handleHeartbeatDone = () => {
    goToStep('wheel');
  };

  const handleWheelDone = () => {
    goToStep('gacha');
  };

  const handleGachaDone = (gelar) => {
    setState((prev) => ({ ...prev, gelarUser: gelar }));
    goToStep('esai');
  };

  const handleEssaySubmit = (essay) => {
    setState((prev) => ({ ...prev, jawabanEsai: essay }));
    goToStep('pangeran');
  };

  const handlePangeranDone = () => {
    goToStep('hasil');
  };

  const handleRestart = () => {
    setState({
      namaUser: '',
      daftarFoto: [],
      jawabanEsai: '',
      gelarUser: '🚀 Space Ranger Terbaik Se-Galaksi Cinta',
    });
    goToStep('nama');
  };

  return (
    <main className="w-full flex items-center justify-center relative min-h-[calc(100vh-2rem)]">
      <FloatingDoodles />

      {step === 'nama' && <StepName onNext={handleNamaSubmit} />}

      {step === 'foto' && (
        <StepPhoto namaUser={state.namaUser} onNext={handleFotoSubmit} />
      )}

      {step === 'kuis' && (
        <GameQuiz namaUser={state.namaUser} onNext={handleQuizDone} />
      )}

      {step === 'minigame' && (
        <GameCatchFlowers onNext={handleMinigameDone} />
      )}

      {step === 'whack' && (
        <GameWhackDoubt onNext={handleWhackDone} />
      )}

      {step === 'memory' && (
        <GameMemoryCards onNext={handleMemoryDone} />
      )}

      {step === 'heartbeat' && (
        <GameRocketPump onNext={handleHeartbeatDone} />
      )}

      {step === 'wheel' && (
        <GameWheelFortune onNext={handleWheelDone} />
      )}

      {step === 'gacha' && (
        <GameGachaTitle onNext={handleGachaDone} />
      )}

      {step === 'esai' && (
        <StepEssay namaUser={state.namaUser} onNext={handleEssaySubmit} />
      )}

      {step === 'pangeran' && (
        <StepHeartfeltLetter
          namaUser={state.namaUser}
          jawabanEsai={state.jawabanEsai}
          onNext={handlePangeranDone}
        />
      )}

      {step === 'hasil' && (
        <StepFinalPhotobox
          namaUser={state.namaUser}
          photos={state.daftarFoto}
          gelarUser={state.gelarUser}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}
