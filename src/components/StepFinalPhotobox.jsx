'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { sfx } from '@/lib/soundEffects';
import { TEMA_CONFIG } from '@/lib/constants';

// ─── PHOTO FILTERS ────────────────────────────────────────────────────────────
const PHOTO_FILTERS = [
  { id: 'none',       label: 'Normal',    css: 'none' },
  { id: 'warm',       label: '🌅 Warm',   css: 'sepia(0.35) saturate(1.4) brightness(1.05)' },
  { id: 'cool',       label: '❄️ Cool',   css: 'hue-rotate(20deg) saturate(1.2) brightness(1.05)' },
  { id: 'vintage',    label: '📷 Vintage', css: 'sepia(0.55) contrast(0.85) brightness(0.92)' },
  { id: 'vivid',      label: '🌈 Vivid',  css: 'saturate(1.8) contrast(1.15)' },
  { id: 'bw',         label: '🖤 B&W',    css: 'grayscale(1) contrast(1.1)' },
  { id: 'fade',       label: '🌫️ Fade',   css: 'saturate(0.7) brightness(1.1) contrast(0.85)' },
  { id: 'rose',       label: '🌹 Rose',   css: 'sepia(0.3) saturate(1.5) hue-rotate(-20deg)' },
];

// ─── CSS FILTER STRING → Canvas ImageData manipulation approximation ──────────
// We pre-render filter in a temp canvas using CSS then draw to main canvas
function applyFilterToCanvas(srcImg, filterCss) {
  const tmp = document.createElement('canvas');
  tmp.width = srcImg.width || srcImg.naturalWidth || 800;
  tmp.height = srcImg.height || srcImg.naturalHeight || 800;
  const tmpCtx = tmp.getContext('2d');
  tmpCtx.filter = filterCss === 'none' ? 'none' : filterCss;
  tmpCtx.drawImage(srcImg, 0, 0, tmp.width, tmp.height);
  tmpCtx.filter = 'none';
  return tmp;
}

export default function StepFinalPhotobox({
  namaUser,
  photos,
  gelarUser,
  defaultTheme = 'andys_room',
  onRestart,
}) {
  const [activeThemeId, setActiveThemeId] = useState(defaultTheme);
  const [activeFilter, setActiveFilter] = useState('none');
  const [customText, setCustomText] = useState('');
  const [customDate, setCustomDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [showCustomPanel, setShowCustomPanel] = useState(false);

  // Per-photo adjustments: zoom (scale) and position offsets (%)
  const [photoAdj, setPhotoAdj] = useState([
    { zoom: 1, x: 0, y: 0 },
    { zoom: 1, x: 0, y: 0 },
    { zoom: 1, x: 0, y: 0 },
    { zoom: 1, x: 0, y: 0 },
  ]);
  const [selectedPhoto, setSelectedPhoto] = useState(0); // which photo is being adjusted

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

  // ─── DRAWING HELPERS ────────────────────────────────────────────────────────
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
    const barPattern = [3,1,2,4,1,3,2,1,4,2,1,3,1,2,4,1,2,3,4,1,2,3,1,4,2,1,3,2,4,1,3,1,2,4,2,1,3,1,2,4];
    let currentX = x;
    const totalUnits = barPattern.reduce((a, b) => a + b, 0);
    const unitWidth = w / totalUnits;
    barPattern.forEach((barWidth, index) => {
      if (index % 2 === 0) ctx.fillRect(currentX, y, barWidth * unitWidth, h);
      currentX += barWidth * unitWidth;
    });
  };

  // ─── MAIN RENDER ─────────────────────────────────────────────────────────────
  const renderCanvas = useCallback(
    (themeKey, imgs, adj, filterCss, txtOverride, dateOverride) => {
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

      // 2. Background Pattern
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
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += 28) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
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
          ctx.beginPath(); ctx.arc(px, py, 2.5 + (i % 3), 0, Math.PI * 2); ctx.fill();
        }
      } else if (theme.themeType === 'alien') {
        for (let i = 0; i < 50; i++) {
          const px = (i * 83) % width;
          const py = (i * 127) % height;
          ctx.fillStyle = i % 3 === 0 ? '#4ade80' : '#ffffff';
          ctx.globalAlpha = 0.4 + (i % 4) * 0.15;
          ctx.beginPath(); ctx.arc(px, py, 1.8 + (i % 2), 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      } else if (theme.themeType === 'lotso') {
        for (let i = 0; i < 28; i++) {
          const px = 40 + (i * 103) % (width - 80);
          const py = 60 + (i * 149) % (height - 120);
          drawCartoonStrawberry(ctx, px, py, 16);
        }
      }

      // 3. Border
      ctx.strokeStyle = theme.borderOuter;
      ctx.lineWidth = 10;
      drawRoundedRect(ctx, 16, 16, width - 32, height - 32, 28);
      ctx.stroke();
      ctx.strokeStyle = theme.borderInner;
      ctx.lineWidth = 3.5;
      drawRoundedRect(ctx, 25, 25, width - 50, height - 50, 22);
      ctx.stroke();

      // 4. Corner ornaments
      drawToyStoryCornerDecor(ctx, 45, 45, theme);
      drawToyStoryCornerDecor(ctx, width - 45, 45, theme);
      drawToyStoryCornerDecor(ctx, 45, height - 45, theme);
      drawToyStoryCornerDecor(ctx, width - 45, height - 45, theme);

      // 5. Washi tape
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

      // 6. Header badge
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

      ctx.fillStyle = theme.textColor;
      ctx.font = 'bold 27px sans-serif';
      ctx.fillText(theme.title, width / 2, 108);
      ctx.font = 'bold 13.5px sans-serif';
      ctx.fillStyle = theme.primaryAccent;
      ctx.fillText(`✦ ${gelarUser || 'SPACE RANGER TERBAIK SE-GALAKSI'} ✦`, width / 2, 134);

      // 7. Photos with per-photo zoom & position
      const slotWidth = width - 96;
      const slotHeight = 310;
      const startY = 160;
      const gap = 34;

      imgs.forEach((img, idx) => {
        const a = adj[idx] || { zoom: 1, x: 0, y: 0 };
        const y = startY + idx * (slotHeight + gap);
        const x = 48;

        // Polaroid card shadow
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 5;
        drawRoundedRect(ctx, x, y, slotWidth, slotHeight, 18);
        ctx.fill();
        ctx.restore();

        // Clip & draw photo with filter + custom offset/zoom
        ctx.save();
        drawRoundedRect(ctx, x + 6, y + 6, slotWidth - 12, slotHeight - 12, 14);
        ctx.clip();

        const filteredSrc = applyFilterToCanvas(img, filterCss);
        const imgAspect = img.width / img.height;
        const slotAspect = (slotWidth - 12) / (slotHeight - 12);
        let baseW, baseH;
        if (imgAspect > slotAspect) {
          baseH = slotHeight - 12;
          baseW = baseH * imgAspect;
        } else {
          baseW = slotWidth - 12;
          baseH = baseW / imgAspect;
        }
        // Apply zoom
        const rW = baseW * a.zoom;
        const rH = baseH * a.zoom;
        // Center + offset (a.x, a.y are % of base size)
        const rX = x + 6 + (slotWidth - 12 - rW) / 2 + (a.x / 100) * baseW;
        const rY = y + 6 + (slotHeight - 12 - rH) / 2 + (a.y / 100) * baseH;

        ctx.drawImage(filteredSrc, rX, rY, rW, rH);
        ctx.restore();

        // Polaroid border
        ctx.strokeStyle = theme.borderInner;
        ctx.lineWidth = 3;
        drawRoundedRect(ctx, x + 6, y + 6, slotWidth - 12, slotHeight - 12, 14);
        ctx.stroke();

        // Badge number
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

        // Corner decor on each photo
        if (theme.themeType === 'andys_room') drawToyStoryCloud(ctx, x + slotWidth - 30, y + 20, 36);
        else if (theme.themeType === 'woody') drawSheriffStar(ctx, x + slotWidth - 26, y + 22, 14);
        else if (theme.themeType === 'buzz') drawLuxoBall(ctx, x + slotWidth - 26, y + 22, 14);
        else if (theme.themeType === 'alien') drawToyAlien(ctx, x + slotWidth - 26, y + 26, 16);
        else if (theme.themeType === 'lotso') drawCartoonStrawberry(ctx, x + slotWidth - 26, y + 24, 20);
      });

      // 8. Footer
      const footerY = startY + 4 * (slotHeight + gap) + 10;
      drawAndySignature(ctx, width / 2, footerY + 16, theme.textColor);

      const displayDate = dateOverride ? dateOverride.replace(/-/g, '.') : new Date().toISOString().slice(0, 10).replace(/-/g, '.');
      const timeStr = new Date().toTimeString().slice(0, 5);

      ctx.textAlign = 'center';
      ctx.fillStyle = theme.textColor;
      ctx.font = 'bold 15px monospace';
      ctx.fillText(`${displayDate} • ${timeStr} WIB ✦ TOY STORY ARCHIVE`, width / 2, footerY + 46);

      // Custom text overlay
      if (txtOverride && txtOverride.trim()) {
        ctx.font = 'italic bold 16px sans-serif';
        ctx.fillStyle = theme.primaryAccent;
        ctx.fillText(`💬 "${txtOverride.trim()}"`, width / 2, footerY + 68);
        ctx.font = 'italic bold 13.5px sans-serif';
        ctx.fillStyle = theme.primaryAccent;
        ctx.fillText(theme.quote, width / 2, footerY + 90);
        drawAestheticBarcode(ctx, width / 2 - 120, footerY + 106, 240, 34, theme.textColor);
        ctx.font = '11px monospace';
        ctx.fillStyle = theme.primaryAccent;
        ctx.fillText(
          `NO. TOY-${Math.floor(100000 + Math.random() * 900000)} • OFFICIAL SPECIAL EDITION`,
          width / 2, footerY + 154
        );
        ctx.font = '22px sans-serif';
        ctx.fillText('🤠  🚀  ☁️  🛸  🍓  🧸  ⭐', width / 2, footerY + 184);
      } else {
        ctx.font = 'italic bold 13.5px sans-serif';
        ctx.fillStyle = theme.primaryAccent;
        ctx.fillText(theme.quote, width / 2, footerY + 70);
        drawAestheticBarcode(ctx, width / 2 - 120, footerY + 86, 240, 34, theme.textColor);
        ctx.font = '11px monospace';
        ctx.fillStyle = theme.primaryAccent;
        ctx.fillText(
          `NO. TOY-${Math.floor(100000 + Math.random() * 900000)} • OFFICIAL SPECIAL EDITION`,
          width / 2, footerY + 134
        );
        ctx.font = '22px sans-serif';
        ctx.fillText('🤠  🚀  ☁️  🛸  🍓  🧸  ⭐', width / 2, footerY + 164);
      }
    },
    [gelarUser]
  );

  // Load photos
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
          const filter = PHOTO_FILTERS.find((f) => f.id === activeFilter)?.css || 'none';
          renderCanvas(activeThemeId, imgObjects, photoAdj, filter, customText, customDate);
        }
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  // Re-render whenever settings change
  useEffect(() => {
    if (!loadedImgsRef.current) return;
    const filter = PHOTO_FILTERS.find((f) => f.id === activeFilter)?.css || 'none';
    renderCanvas(activeThemeId, loadedImgsRef.current, photoAdj, filter, customText, customDate);
  }, [activeThemeId, activeFilter, photoAdj, customText, customDate, renderCanvas]);

  const handleSelectTheme = (themeId) => {
    sfx.playPop();
    setActiveThemeId(themeId);
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

  const updateAdj = (idx, key, val) => {
    setPhotoAdj((prev) => {
      const next = prev.map((a, i) => (i === idx ? { ...a, [key]: val } : a));
      return next;
    });
  };

  const resetAdj = (idx) => {
    setPhotoAdj((prev) => prev.map((a, i) => (i === idx ? { zoom: 1, x: 0, y: 0 } : a)));
  };

  const curAdj = photoAdj[selectedPhoto] || { zoom: 1, x: 0, y: 0 };

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
        Pilih tema, filter &amp; atur foto sesuai keinginan kamu!
      </p>

      {/* PILIH TEMA */}
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

      {/* FILTER FOTO */}
      <div className="mb-4 text-left">
        <label className="block text-xs font-bold text-zinc-600 mb-2 flex items-center gap-1">
          <span>🎨</span> Filter Foto:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PHOTO_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => { sfx.playPop(); setActiveFilter(f.id); }}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold border-2 transition ${
                activeFilter === f.id
                  ? 'border-purple-500 bg-purple-100 text-purple-800 ring-1 ring-purple-300'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-purple-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* PANEL KUSTOMISASI */}
      <div className="mb-4 text-left">
        <button
          type="button"
          onClick={() => setShowCustomPanel((v) => !v)}
          className="w-full py-2 px-4 rounded-xl border-2 border-dashed border-pink-300 text-pink-600 font-bold text-xs hover:bg-pink-50 transition flex items-center justify-between"
        >
          <span>✏️ Kustomisasi Foto &amp; Teks</span>
          <span>{showCustomPanel ? '▲ Tutup' : '▼ Buka'}</span>
        </button>

        {showCustomPanel && (
          <div className="mt-3 p-4 bg-pink-50/70 rounded-2xl border-2 border-pink-200 space-y-4">

            {/* Custom Text */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-500 mb-1">💬 Teks Kustom (ditampilkan di footer):</label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Contoh: Senyummu bikin hari ku cerah ✨"
                maxLength={60}
                className="w-full text-xs border-2 border-pink-200 rounded-xl px-3 py-2 focus:outline-none focus:border-pink-400 bg-white text-zinc-800"
              />
            </div>

            {/* Custom Date */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-500 mb-1">📅 Tanggal Cetak:</label>
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full text-xs border-2 border-pink-200 rounded-xl px-3 py-2 focus:outline-none focus:border-pink-400 bg-white text-zinc-800"
              />
            </div>

            {/* Per-photo zoom & offset */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-500 mb-2">📸 Atur Posisi &amp; Zoom Foto:</label>

              {/* Selector for which photo to adjust */}
              <div className="flex gap-1.5 mb-3">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedPhoto(i)}
                    className={`flex-1 py-1 rounded-lg text-[11px] font-bold border-2 transition ${
                      selectedPhoto === i
                        ? 'border-sky-500 bg-sky-100 text-sky-800'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-sky-300'
                    }`}
                  >
                    Pose {i + 1}
                  </button>
                ))}
              </div>

              {/* Zoom slider */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-zinc-500 w-16">🔍 Zoom</span>
                  <input
                    type="range"
                    min="0.7"
                    max="2.5"
                    step="0.05"
                    value={curAdj.zoom}
                    onChange={(e) => updateAdj(selectedPhoto, 'zoom', parseFloat(e.target.value))}
                    className="flex-1 accent-pink-500"
                  />
                  <span className="text-[11px] font-mono text-pink-600 w-10">{curAdj.zoom.toFixed(2)}×</span>
                </div>

                {/* X offset */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-zinc-500 w-16">↔️ Geser X</span>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="1"
                    value={curAdj.x}
                    onChange={(e) => updateAdj(selectedPhoto, 'x', parseFloat(e.target.value))}
                    className="flex-1 accent-sky-500"
                  />
                  <span className="text-[11px] font-mono text-sky-600 w-10">{curAdj.x > 0 ? '+' : ''}{curAdj.x}%</span>
                </div>

                {/* Y offset */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-zinc-500 w-16">↕️ Geser Y</span>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="1"
                    value={curAdj.y}
                    onChange={(e) => updateAdj(selectedPhoto, 'y', parseFloat(e.target.value))}
                    className="flex-1 accent-purple-500"
                  />
                  <span className="text-[11px] font-mono text-purple-600 w-10">{curAdj.y > 0 ? '+' : ''}{curAdj.y}%</span>
                </div>

                <button
                  type="button"
                  onClick={() => resetAdj(selectedPhoto)}
                  className="w-full py-1.5 rounded-xl text-[11px] font-bold border-2 border-zinc-200 text-zinc-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition"
                >
                  🔄 Reset Pose {selectedPhoto + 1}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Canvas Preview */}
      <div className="bg-sky-50/70 p-4 rounded-2xl border-2 border-dashed border-sky-200 mb-5 flex justify-center items-center shadow-inner overflow-hidden">
        <canvas
          ref={canvasRef}
          className="max-w-[210px] sm:max-w-[240px] h-auto rounded-xl shadow-xl transition-all duration-300"
        />
      </div>

      {/* Action Buttons */}
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
