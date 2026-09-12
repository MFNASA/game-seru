'use client';

export default function FloatingDoodles() {
  return (
    <>
      <div className="fixed top-8 left-10 text-4xl animate-float pointer-events-none opacity-70 select-none z-0">🎀</div>
      <div className="fixed top-20 right-14 text-3xl animate-float-delayed pointer-events-none opacity-60 select-none z-0">✨</div>
      <div className="fixed bottom-12 left-16 text-4xl animate-float-delayed pointer-events-none opacity-60 select-none z-0">🧸</div>
      <div className="fixed bottom-16 right-12 text-4xl animate-float pointer-events-none opacity-70 select-none z-0">🌸</div>
      <div className="fixed top-1/2 left-4 text-3xl animate-float pointer-events-none opacity-50 select-none z-0">🍓</div>
      <div className="fixed top-1/3 right-6 text-3xl animate-float-delayed pointer-events-none opacity-50 select-none z-0">⭐</div>
    </>
  );
}
