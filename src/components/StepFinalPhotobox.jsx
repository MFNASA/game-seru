'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { sfx } from '@/lib/soundEffects';
import { TEMA_CONFIG } from '@/lib/constants';

export default function StepFinalPhotobox({
  namaUser,
  photos,
  gelarUser,
  defaultTheme = 'andys_room',
  onRestart,
}) {
  const [activeThemeId, setActiveThemeId] = useState(defaultTheme);
  const canvasRef = useRef(null);
  const loadedImgsRef = useRef(null);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff70a6', '#38bdf8', '#facc15', '#4ade80', '#c084fc'],
      });
    } catch (e) {}
  }, []);

  // --- DRAWING HELPERS ---
  const drawRoundedRect = (ctx, x, y, w, h, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  };

  const drawToyStoryCloud = (ctx, cx, cy, size) => {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.42, 0, Math.PI * 2);
    ctx.arc(cx - size * 0.38, cy + size * 0.05, size * 0.28, 0, Math.PI * 2);
    ctx.arc(cx + size * 0.38, cy + size * 0.05, size * 0.28, 0, Math.PI * 2);
    ctx.arc(cx - size * 0.18, cy + size * 0.15, size * 0.25, 0, Math.PI * 2);
    ctx.arc(cx + size * 0.18, cy + size * 0.15, size * 0.25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(2, 132, 199, 0.12)';
    ctx.beginPath();
    ctx.arc(cx, cy + size * 0.12, size * 0.35, 0.2, Math.PI - 0.2);
    ctx.fill();
    ctx.restore();
  };

  const drawSheriffStar = (ctx, cx, cy, r) => {
    ctx.save();
    ctx.fillStyle = '#f59e0b';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2.5;

    const points = 5;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? r : r * 0.45;
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    for (let i = 0; i < points; i++) {
      const angle = (i * 2 * Math.PI) / points - Math.PI / 2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      ctx.beginPath();
      ctx.arc(x, y, r * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawCowhideSpot = (ctx, cx, cy, rx, ry, rot) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.ellipse(rx * 0.4, ry * 0.4, rx * 0.5, ry * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawToyAlien = (ctx, cx, cy, size) => {
    ctx.save();
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy - size * 0.45);
    ctx.lineTo(cx, cy - size * 0.9);
    ctx.stroke();

    ctx.fillStyle = '#86efac';
    ctx.beginPath();
    ctx.arc(cx, cy - size * 0.9, size * 0.16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.ellipse(cx, cy - size * 0.2, size * 0.7, size * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx - size * 0.7, cy - size * 0.2, size * 0.25, size * 0.12, -Math.PI / 6, 0, Math.PI * 2);
    ctx.ellipse(cx + size * 0.7, cy - size * 0.2, size * 0.25, size * 0.12, Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    const eyePositions = [-size * 0.32, 0, size * 0.32];
    eyePositions.forEach((ox) => {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx + ox, cy - size * 0.28, size * 0.16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#166534';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      ctx.arc(cx + ox, cy - size * 0.28, size * 0.08, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy - size * 0.05, size * 0.22, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.restore();
  };

  const drawCartoonStrawberry = (ctx, cx, cy, size) => {
    ctx.save();
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.moveTo(cx, cy - size * 0.35);
    ctx.bezierCurveTo(cx - size * 0.55, cy - size * 0.35, cx - size * 0.6, cy + size * 0.2, cx, cy + size * 0.6);
    ctx.bezierCurveTo(cx + size * 0.6, cy + size * 0.2, cx + size * 0.55, cy - size * 0.35, cx, cy - size * 0.35);
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        ctx.beginPath();
        ctx.arc(cx + col * size * 0.22, cy + row * size * 0.22 + 4, size * 0.04, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.fillStyle = '#4ade80';
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.ellipse(cx + i * size * 0.15, cy - size * 0.38, size * 0.15, size * 0.08, (i * Math.PI) / 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const drawLuxoBall = (ctx, cx, cy, r) => {
    ctx.save();
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.arc(cx, cy, r, -0.4, 0.4);
    ctx.arc(cx, cy, r, Math.PI - 0.4, Math.PI + 0.4);
    ctx.fill();

    ctx.fillStyle = '#2563eb';
    ctx.fillRect(cx - r, cy - r * 0.32, r * 2, r * 0.64);

    ctx.fillStyle = '#dc2626';
    const starPoints = 5;
    ctx.beginPath();
    for (let i = 0; i < starPoints * 2; i++) {
      const radius = i % 2 === 0 ? r * 0.45 : r * 0.2;
      const angle = (i * Math.PI) / starPoints - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const drawAndySignature = (ctx, cx, cy, color) => {
    ctx.save();
    ctx.fillStyle = color || '#1e293b';
    ctx.font = 'bold 30px "Fredoka", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('И D Y', cx, cy);
    ctx.restore();
  };

  const drawToyStoryCornerDecor = (ctx, cx, cy, theme) => {
    if (theme.themeType === 'andys_room') {
      drawToyStoryCloud(ctx, cx, cy, 54);
      drawLuxoBall(ctx, cx, cy + 8, 16);
    } else if (theme.themeType === 'woody') {
      drawSheriffStar(ctx, cx, cy, 22);
    } else if (theme.themeType === 'buzz') {
      drawLuxoBall(ctx, cx, cy, 18);
    } else if (theme.themeType === 'alien') {
      drawToyAlien(ctx, cx, cy, 26);
    } else if (theme.themeType === 'lotso') {
      drawCartoonStrawberry(ctx, cx, cy, 32);
    }
  };

  const drawAestheticBarcode = (ctx, x, y, w, h, color) => {
    ctx.fillStyle = color;
    const barPattern = [
      3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 4, 1,
      2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 3, 1, 2, 4, 2, 1, 3, 1, 2, 4,
    ];
    let currentX = x;
    const totalUnits = barPattern.reduce((a, b) => a + b, 0);
    const unitWidth = w / totalUnits;

    barPattern.forEach((barWidth, index) => {
      if (index % 2 === 0) {
        ctx.fillRect(currentX, y, barWidth * unitWidth, h);
      }
      currentX += barWidth * unitWidth;
    });
  };

  const renderCanvas = useCallback(
    (themeKey, imgs) => {
      const canvas = canvasRef.current;
      if (!canvas || !imgs || imgs.length < 4) return;

      const theme = TEMA_CONFIG[themeKey] || TEMA_CONFIG.andys_room;
      const ctx = canvas.getContext('2d');
      const width = 640;
      const height = 1840;
      canvas.width = width;
      canvas.height = height;

      // 1. Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, theme.bgStart);
      bgGrad.addColorStop(0.5, '#ffffff');
      bgGrad.addColorStop(1, theme.bgEnd);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Background Pattern Spesifik Tiap Tema
      if (theme.themeType === 'andys_room') {
        for (let row = 0; row < 14; row++) {
          const y = 80 + row * 135;
          const offset = row % 2 === 0 ? 60 : 160;
          for (let col = -1; col < 5; col++) {
            const x = offset + col * 200;
            drawToyStoryCloud(ctx, x, y, 64);
          }
        }
      } else if (theme.themeType === 'woody') {
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.18)';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < width; x += 28) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 28) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        drawCowhideSpot(ctx, 30, 200, 24, 18, 0.4);
        drawCowhideSpot(ctx, width - 28, 480, 28, 20, -0.3);
        drawCowhideSpot(ctx, 32, 900, 26, 19, 0.6);
        drawCowhideSpot(ctx, width - 30, 1300, 30, 22, -0.5);
      } else if (theme.themeType === 'buzz') {
        for (let i = 0; i < 45; i++) {
          const px = (i * 97) % width;
          const py = (i * 131) % height;
          ctx.fillStyle = i % 2 === 0 ? 'rgba(34, 197, 94, 0.25)' : 'rgba(168, 85, 247, 0.22)';
          ctx.beginPath();
          ctx.arc(px, py, 2.5 + (i % 3), 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (theme.themeType === 'alien') {
        for (let i = 0; i < 50; i++) {
          const px = (i * 83) % width;
          const py = (i * 127) % height;
          ctx.fillStyle = i % 3 === 0 ? '#4ade80' : '#ffffff';
          ctx.globalAlpha = 0.4 + (i % 4) * 0.15;
          ctx.beginPath();
          ctx.arc(px, py, 1.8 + (i % 2), 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      } else if (theme.themeType === 'lotso') {
        for (let i = 0; i < 28; i++) {
          const px = 40 + (i * 103) % (width - 80);
          const py = 60 + (i * 149) % (height - 120);
          drawCartoonStrawberry(ctx, px, py, 16);
        }
      }

      // 3. Border Luar & Dalam Kartun Gemas
      ctx.strokeStyle = theme.borderOuter;
      ctx.lineWidth = 10;
      drawRoundedRect(ctx, 16, 16, width - 32, height - 32, 28);
      ctx.stroke();

      ctx.strokeStyle = theme.borderInner;
      ctx.lineWidth = 3.5;
      drawRoundedRect(ctx, 25, 25, width - 50, height - 50, 22);
      ctx.stroke();

      // 4. Ornamen 4 Sudut
      drawToyStoryCornerDecor(ctx, 45, 45, theme);
      drawToyStoryCornerDecor(ctx, width - 45, 45, theme);
      drawToyStoryCornerDecor(ctx, 45, height - 45, theme);
      drawToyStoryCornerDecor(ctx, width - 45, height - 45, theme);

      // 5. Washi Tape Selotip Lucu di Atas
      ctx.fillStyle = theme.washiColor;
      ctx.fillRect(width / 2 - 80, 8, 160, 24);
      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(width / 2 - 80, 8, 160, 24);
      ctx.setLineDash([]);

      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⭐  🚀  🧸  🤠  ⭐', width / 2, 25);

      // 6. Badge Header Kartun Toy Story
      ctx.fillStyle = theme.tagBg;
      drawRoundedRect(ctx, width / 2 - 135, 46, 270, 32, 16);
      ctx.fill();
      ctx.strokeStyle = theme.borderOuter;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = theme.tagText;
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🧸 TOY STORY PHOTOBOX ARCADE 🧸', width / 2, 67);

      // Judul Utama Tema
      ctx.fillStyle = theme.textColor;
      ctx.font = 'bold 27px sans-serif';
      ctx.fillText(theme.title, width / 2, 108);

      // Cetak Gelar Resmi dari Mesin Gacha Toy Story
      ctx.font = 'bold 13.5px sans-serif';
      ctx.fillStyle = theme.primaryAccent;
      ctx.fillText(`✦ ${gelarUser || 'SPACE RANGER TERBAIK SE-GALAKSI'} ✦`, width / 2, 134);

      // 7. Render 4 Foto Polaroid Strip
      const slotWidth = width - 96;
      const slotHeight = 310;
      const startY = 160;
      const gap = 34;

      imgs.forEach((img, idx) => {
        const y = startY + idx * (slotHeight + gap);
        const x = 48;

        // Kartu Putih Polaroid
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 5;
        drawRoundedRect(ctx, x, y, slotWidth, slotHeight, 18);
        ctx.fill();
        ctx.restore();

        // Gambar Foto di dalam Frame
        ctx.save();
        drawRoundedRect(ctx, x + 6, y + 6, slotWidth - 12, slotHeight - 12, 14);
        ctx.clip();

        const imgAspect = img.width / img.height;
        const slotAspect = (slotWidth - 12) / (slotHeight - 12);
        let renderW, renderH, renderX, renderY;

        if (imgAspect > slotAspect) {
          renderH = slotHeight - 12;
          renderW = renderH * imgAspect;
          renderX = x + 6 + (slotWidth - 12 - renderW) / 2;
          renderY = y + 6;
        } else {
          renderW = slotWidth - 12;
          renderH = renderW / imgAspect;
          renderX = x + 6;
          renderY = y + 6 + (slotHeight - 12 - renderH) / 2;
        }

        ctx.drawImage(img, renderX, renderY, renderW, renderH);
        ctx.restore();

        // Border Polaroid
        ctx.strokeStyle = theme.borderInner;
        ctx.lineWidth = 3;
        drawRoundedRect(ctx, x + 6, y + 6, slotWidth - 12, slotHeight - 12, 14);
        ctx.stroke();

        // Badge Nomor & Ikon Pose Toy Story
        const badgeX = x + 18;
        const badgeY = y + 18;
        ctx.fillStyle = theme.tagBg;
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 6;
        drawRoundedRect(ctx, badgeX, badgeY, 78, 28, 14);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = theme.borderOuter;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = theme.tagText;
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`0${idx + 1} ${theme.badgeIcons[idx] || '🧸'}`, badgeX + 39, badgeY + 19);

        // Hiasan Ornamen Kartun di Sudut Foto
        if (theme.themeType === 'andys_room') {
          drawToyStoryCloud(ctx, x + slotWidth - 30, y + 20, 36);
        } else if (theme.themeType === 'woody') {
          drawSheriffStar(ctx, x + slotWidth - 26, y + 22, 14);
        } else if (theme.themeType === 'buzz') {
          drawLuxoBall(ctx, x + slotWidth - 26, y + 22, 14);
        } else if (theme.themeType === 'alien') {
          drawToyAlien(ctx, x + slotWidth - 26, y + 26, 16);
        } else if (theme.themeType === 'lotso') {
          drawCartoonStrawberry(ctx, x + slotWidth - 26, y + 24, 20);
        }
      });

      // 8. Footer Strip Photobox
      const footerY = startY + 4 * (slotHeight + gap) + 10;

      drawAndySignature(ctx, width / 2, footerY + 16, theme.textColor);

      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '.');
      const timeStr = today.toTimeString().slice(0, 5);

      ctx.textAlign = 'center';
      ctx.fillStyle = theme.textColor;
      ctx.font = 'bold 15px monospace';
      ctx.fillText(`${dateStr} • ${timeStr} WIB ✦ TOY STORY ARCHIVE`, width / 2, footerY + 46);

      ctx.font = 'italic bold 13.5px sans-serif';
      ctx.fillStyle = theme.primaryAccent;
      ctx.fillText(theme.quote, width / 2, footerY + 70);

      drawAestheticBarcode(ctx, width / 2 - 120, footerY + 86, 240, 34, theme.textColor);

      ctx.font = '11px monospace';
      ctx.fillStyle = theme.primaryAccent;
      ctx.fillText(
        `NO. TOY-${Math.floor(100000 + Math.random() * 900000)} • OFFICIAL SPECIAL EDITION`,
        width / 2,
        footerY + 134
      );

      ctx.font = '22px sans-serif';
      ctx.fillText('🤠  🚀  ☁️  🛸  🍓  🧸  ⭐', width / 2, footerY + 164);
    },
    [gelarUser]
  );

  // Load photos into HTML Image objects
  useEffect(() => {
    if (!photos || photos.length < 4) return;

    let loadedCount = 0;
    const imgObjects = [];

    photos.forEach((src, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => {
        imgObjects[idx] = img;
        loadedCount++;
        if (loadedCount === 4) {
          loadedImgsRef.current = imgObjects;
          renderCanvas(activeThemeId, imgObjects);
        }
      };
    });
  }, [photos, activeThemeId, renderCanvas]);

  const handleSelectTheme = (themeId) => {
    sfx.playPop();
    setActiveThemeId(themeId);
    if (loadedImgsRef.current) {
      renderCanvas(themeId, loadedImgsRef.current);
    }
  };

  const handleDownload = () => {
    sfx.playFanfare();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    const safeNama = (namaUser || 'player').toLowerCase().replace(/[^a-z0-9]/g, '_');
    link.download = `photobox-toystory-${activeThemeId}-${safeNama}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="max-w-lg w-full text-center cute-card p-6 sm:p-8 rounded-3xl relative z-10">
      <div className="washi-tape washi-tape-pink"></div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-amber-700 rounded-full text-xs font-bold mb-2">
        <span>🎉</span> Hasil Resmi Photobox Kartun
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-amber-500 to-rose-500 mb-1 font-heading">
        TOY STORY PHOTO STRIP 🧸✨
      </h2>
      <p className="text-zinc-500 text-xs sm:text-sm mb-4">
        Pilih tema kartun Toy Story kesukaanmu di bawah ini & simpan hasilnya!
      </p>

      {/* PILIH TEMA FRAME PHOTOBOX TOY STORY */}
      <div className="mb-4 text-left">
        <label className="block text-xs font-bold text-zinc-600 mb-2 flex items-center gap-1">
          <span>🧸</span> Pilih Desain Kartun Toy Story:
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
          {Object.values(TEMA_CONFIG).map((theme) => {
            const isActive = activeThemeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelectTheme(theme.id)}
                className={`py-2 px-1.5 rounded-xl text-xs font-bold border-2 transition flex flex-col items-center gap-0.5 ${
                  isActive
                    ? 'border-sky-500 ring-2 ring-sky-300 bg-sky-100 text-sky-800 shadow-sm'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-sky-300 hover:bg-sky-50'
                }`}
              >
                <span className="text-base">{theme.icon}</span>
                <span className="text-[10px]">{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Canvas Pratinjau Photobox */}
      <div className="bg-sky-50/70 p-4 rounded-2xl border-2 border-dashed border-sky-200 mb-5 flex justify-center items-center shadow-inner overflow-hidden">
        <canvas
          ref={canvasRef}
          className="max-w-[210px] sm:max-w-[240px] h-auto rounded-xl shadow-xl transition-all duration-300"
        />
      </div>

      {/* Tombol Aksi */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={handleDownload}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-2xl text-sm sm:text-base shadow-lg shadow-emerald-600/25 btn-cute flex items-center justify-center gap-2"
        >
          <span>📥 Unduh Strip Photobox HD</span>
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="w-full py-3 px-6 bg-white hover:bg-pink-50 text-pink-600 font-bold rounded-2xl text-xs sm:text-sm border-2 border-pink-200 hover:border-pink-300 transition-all btn-cute flex items-center justify-center gap-1.5"
        >
          <span>🔄 Main Ulang / Coba Pose Baru</span>
        </button>
      </div>
    </div>
  );
}
