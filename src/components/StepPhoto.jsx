'use client';

import { useState, useRef, useEffect } from 'react';
import { sfx } from '@/lib/soundEffects';

const FLOWER_ICONS = ['🌸', '🌷', '🌼', '🌹'];

export default function StepPhoto({ namaUser, onNext }) {
  const [mode, setMode] = useState(null); // 'selfie' | 'upload'
  const [photos, setPhotos] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  // Bersihkan camera stream ketika unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    try {
      setCameraError(false);
      const constraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 1080 },
          height: { ideal: 1080 },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        videoRef.current.style.transform = 'scaleX(-1)';
      }
      setIsCameraActive(true);
    } catch (err) {
      setCameraError(true);
      alert('Kamera tidak dapat diakses atau diblokir. Yuk gunakan mode Upload Galeri saja! 🌸');
      setMode('upload');
    }
  };

  const handleSelectMode = (selectedMode) => {
    sfx.playPop();
    setPhotos([]);
    setMode(selectedMode);
    if (selectedMode === 'selfie') {
      startCamera();
    } else {
      stopCamera();
    }
  };

  const handleCapture = () => {
    if (photos.length >= 4 || !videoRef.current) return;
    sfx.playSnap();

    // Efek flash
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 120);

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 720;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const newPhotos = [...photos, dataUrl];
    setPhotos(newPhotos);

    if (newPhotos.length === 4) {
      sfx.playDing();
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    sfx.playDing();

    const selectedFiles = Array.from(files).slice(0, 4);
    const loadedUrls = [];

    selectedFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          loadedUrls.push(event.target.result);
          if (loadedUrls.length === selectedFiles.length) {
            setPhotos(loadedUrls.slice(0, 4));
            if (loadedUrls.length >= 4) {
              sfx.playDing();
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleSubmit = () => {
    if (photos.length < 4) {
      alert('Fotonya wajib pas 4 pose yaa! 🌸');
      return;
    }
    stopCamera();
    sfx.playDing();
    onNext(photos);
  };

  return (
    <div className="max-w-xl w-full text-center cute-card p-6 sm:p-8 rounded-3xl relative z-10">
      <div className="washi-tape washi-tape-pink"></div>

      <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-bold mb-2">
        <span>📷</span> Studio Foto Pose Manis
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-1 font-heading text-zinc-800">
        Halo, <span className="text-pink-500 underline decoration-wavy decoration-pink-300">{namaUser}</span>! 🌸
      </h2>
      <p className="text-zinc-500 mb-5 text-xs sm:text-sm">
        Tunjukkan 4 pose terbaikmu (pose senyum manis, gaya bunga mekar, atau tatapan baper) ✌️🌷
      </p>

      {/* Pilihan Mode Foto */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          type="button"
          onClick={() => handleSelectMode('selfie')}
          className={`py-3 px-4 font-bold rounded-2xl border-2 flex items-center justify-center gap-2 transition btn-cute text-sm ${
            mode === 'selfie'
              ? 'bg-pink-100 border-pink-500 text-pink-700'
              : 'bg-white text-zinc-700 border-pink-200 hover:border-pink-400 hover:bg-pink-50'
          }`}
        >
          <span>📸</span> Kamera Selfie
        </button>
        <button
          type="button"
          onClick={() => handleSelectMode('upload')}
          className={`py-3 px-4 font-bold rounded-2xl border-2 flex items-center justify-center gap-2 transition btn-cute text-sm ${
            mode === 'upload'
              ? 'bg-pink-100 border-pink-500 text-pink-700'
              : 'bg-white text-zinc-700 border-pink-200 hover:border-pink-400 hover:bg-pink-50'
          }`}
        >
          <span>📂</span> Upload Galeri
        </button>
      </div>

      {/* Area Kamera Selfie */}
      {mode === 'selfie' && (
        <div className="space-y-3 p-4 bg-pink-50/60 rounded-2xl mb-5 border-2 border-dashed border-pink-200">
          <div className="relative overflow-hidden rounded-2xl shadow-md border-2 border-white bg-black">
            <video
              ref={videoRef}
              width="100%"
              height="auto"
              className={`max-h-[260px] object-cover mx-auto transition-all ${
                isFlashing ? 'brightness-150' : 'brightness-100'
              }`}
              autoPlay
              playsInline
              muted
            />
          </div>
          <button
            type="button"
            disabled={!isCameraActive || photos.length >= 4}
            onClick={handleCapture}
            className="w-full py-3.5 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 hover:from-rose-500 hover:to-purple-600 text-white font-bold rounded-2xl text-base shadow-md btn-cute transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>📸 Jepret Pose Manismu!</span> ({photos.length}/4)
          </button>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {/* Area Upload Galeri */}
      {mode === 'upload' && (
        <div className="p-5 bg-pink-50/60 rounded-2xl mb-5 border-2 border-dashed border-pink-200">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="block w-full text-sm text-zinc-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-pink-500 file:text-white hover:file:bg-pink-600 cursor-pointer"
          />
          <p className="text-pink-600 text-xs mt-2 font-medium">
            💡 Tip: Pilih sekaligus 4 foto terbaikmu dari galeri!
          </p>
        </div>
      )}

      {/* 4 Grid Slot Preview Foto */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-6">
        {[0, 1, 2, 3].map((idx) => {
          const photoSrc = photos[idx];
          if (photoSrc) {
            return (
              <div key={idx} className="foto-preview-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoSrc} alt={`Pose ${idx + 1}`} />
              </div>
            );
          }
          return (
            <div
              key={idx}
              className="aspect-[3/4] bg-white border-2 border-dashed border-pink-200 rounded-2xl flex flex-col items-center justify-center font-heading text-pink-300 text-sm shadow-sm"
            >
              <span>{FLOWER_ICONS[idx]}</span>
              <span className="text-xs mt-1">Pose {idx + 1}</span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        disabled={photos.length < 4}
        onClick={handleSubmit}
        className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 text-white font-bold rounded-2xl text-base shadow-lg shadow-pink-500/25 disabled:bg-zinc-200 disabled:from-zinc-200 disabled:to-zinc-300 disabled:text-zinc-400 disabled:cursor-not-allowed btn-cute flex items-center justify-center gap-2"
      >
        <span>
          {photos.length === 4
            ? 'Lanjut Main Game Arcade Gemas 🎮✨'
            : 'Kunci 4 Pose Manis Ini 🌸✨'}
        </span>
      </button>
    </div>
  );
}
