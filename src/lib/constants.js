// src/lib/constants.js - Konfigurasi data & konten game arcade

export const BANK_SOAL_GOMBAL = [
  {
    pertanyaan: "siapa yang di sini suka ngambek ga jelas?",
    pilihan: [
      { teks: "iya aku deh maapin ya 🥺", benar: true, kabur: false },
      { teks: "kamu lah", benar: false, kabur: true }
    ]

  },
  {
    pertanyaan: "siapa yang paling suka jajan ",
    pilihan: [
      { teks: "aku banget parah", benar: true, kabur: false },
      { teks: "kamu lah ya kali aku", benar: false, kabur: true }
    ]
  },
  {
    pertanyaan: "siapa yang kalo makan mintanya di suapin mulu",
    pilihan: [
      { teks: "aku, cepet suapin dong", benar: true, kabur: false },
      { teks: "kamu lah enak aja", benar: false, kabur: true }
    ]
  },
  {
    pertanyaan: "siapa yang paling kangenan kalau sehari ga ketemu?",
    pilihan: [
      { teks: "aku kangen terus sama kamu", benar: true, kabur: false },
      { teks: "kamu, aku biasa aja tuh", benar: false, kabur: true }
    ]


  },
  {
    pertanyaan: "siapa yang paling cemburuan?",
    pilihan: [
      { teks: "oh jelas aku lah", benar: true, kabur: false },
      { teks: "kamu benget banget banget sih", benar: false, kabur: true }
    ]
  },
  {
    pertanyaan: "siapa yang kalo di ajak makan susah",
    pilihan: [
      { teks: "kali ini aku deh", benar: true, kabur: false },
      { teks: "kamu lah susah banget", benar: false, kabur: true }
    ]
  },
  {
    pertanyaan: "siapa yang paling beruntung dapet pasangan sebaik ini?",
    pilihan: [
      { teks: "aku lah siapa lagi", benar: true, kabur: false },
      { teks: "kamu lah beruntung dapet aku", benar: false, kabur: true }
    ]
  }
];

export const TOY_CARDS_DATA = [
  { id: 'woody', emoji: '🤠', name: 'Woody' },
  { id: 'buzz', emoji: '🚀', name: 'Buzz' },
  { id: 'alien', emoji: '🛸', name: 'Alien' },
  { id: 'lotso', emoji: '🍓', name: 'Lotso' }
];

export const WHEEL_PRIZES = [
  { text: "Teman Setia Seumur Hidup 🤠", color: "#fef08a", textColor: "#854d0e" },
  { text: "Cinta Tak Terhingga (To Infinity!) 🚀", color: "#e0e7ff", textColor: "#3730a3" },
  { text: "Terpilih Kesayangan The Claw 🛸", color: "#dcfce7", textColor: "#166534" },
  { text: "Dipeluk Erat Aroma Stroberi 🍓", color: "#ffe4e6", textColor: "#9f1239" },
  { text: "Diratukan & Dijaga Selalu 👑", color: "#fef3c7", textColor: "#92400e" },
  { text: "Jodoh Terindah Selamanya 💖", color: "#fae8ff", textColor: "#86198f" }
];

export const DAFTAR_GELAR_GACHA = [
  "🚀 Space Ranger Terbaik Se-Galaksi Cinta",
  "🤠 Sheriff Paling Setia Penjaga Hatiku",
  "🛸 Alien Tergemas yang Terpilih oleh The Claw",
  "🍓 Beruang Manis Aroma Stroberi Paling Hangat",
  "👑 Mainan Kesayangan Nomor 1 di Seluruh Semesta",
  "🧸 Boneka Paling Peluk-able Sedunia",
  "⭐ Bintang Terang Penakluk Hati",
  "🦖 Dinosaurus Paling Imut & Menggemaskan"
];

export const TEMA_CONFIG = {
  andys_room: {
    id: "andys_room",
    name: "Kamar Andy",
    icon: "☁️",
    bgStart: "#38bdf8",
    bgEnd: "#bae6fd",
    borderOuter: "#0284c7",
    borderInner: "#e0f2fe",
    tagBg: "#fef08a",
    tagText: "#b45309",
    textColor: "#0369a1",
    title: "✦ ANDY'S ROOM PHOTOBOX ✦",
    subtitle: "TOY STORY SPECIAL EDITION • CLOUD WALLPAPER",
    washiColor: "rgba(254, 240, 138, 0.95)",
    themeType: "andys_room",
    quote: '"You\'ve got a friend in me, to infinity and beyond!" ☁️💛',
    badgeIcons: ['☁️', '🎈', '⭐', '🧸'],
    primaryAccent: '#0284c7'
  },
  woody: {
    id: "woody",
    name: "Sheriff Woody",
    icon: "🤠",
    bgStart: "#fef08a",
    bgEnd: "#fed7aa",
    borderOuter: "#b45309",
    borderInner: "#fde68a",
    tagBg: "#fef3c7",
    tagText: "#78350f",
    textColor: "#92400e",
    title: "✦ SHERIFF WOODY ✦",
    subtitle: "ROUNDUP GANG • PULL-STRING HERO",
    washiColor: "rgba(239, 68, 68, 0.88)",
    themeType: "woody",
    quote: '"Reach for the sky! Kamu sahabat terbaikku selamanya!" 🤠⭐',
    badgeIcons: ['🤠', '⭐', '🐎', '🌵'],
    primaryAccent: '#b45309'
  },
  buzz: {
    id: "buzz",
    name: "Buzz Ranger",
    icon: "🚀",
    bgStart: "#f0fdf4",
    bgEnd: "#f5f3ff",
    borderOuter: "#22c55e",
    borderInner: "#d8b4fe",
    tagBg: "#dcfce7",
    tagText: "#15803d",
    textColor: "#166534",
    title: "✦ BUZZ LIGHTYEAR ✦",
    subtitle: "SPACE RANGER • STAR COMMAND",
    washiColor: "rgba(168, 85, 247, 0.88)",
    themeType: "buzz",
    quote: '"Menuju tak terbatas dan melampauinya! To Infinity & Beyond!" 🚀✨',
    badgeIcons: ['🚀', '🪐', '✨', '⚡'],
    primaryAccent: '#22c55e'
  },
  alien: {
    id: "alien",
    name: "Pizza Alien",
    icon: "🛸",
    bgStart: "#0f172a",
    bgEnd: "#1e1b4b",
    borderOuter: "#4ade80",
    borderInner: "#38bdf8",
    tagBg: "#dcfce7",
    tagText: "#166534",
    textColor: "#4ade80",
    title: "✦ PIZZA PLANET ALIEN ✦",
    subtitle: "THE CLAW HAS CHOSEN • SQUEEZE TOY",
    washiColor: "rgba(74, 222, 128, 0.88)",
    themeType: "alien",
    quote: '"The Claw is our master, and you are our favourite! Oooohhh!" 🛸',
    badgeIcons: ['🛸', '🍕', '👾', '✨'],
    primaryAccent: '#4ade80'
  },
  lotso: {
    id: "lotso",
    name: "Beruang Lotso",
    icon: "🍓",
    bgStart: "#fff1f2",
    bgEnd: "#fce7f3",
    borderOuter: "#f43f5e",
    borderInner: "#fbcfe8",
    tagBg: "#ffe4e6",
    tagText: "#be123c",
    textColor: "#9f1239",
    title: "✦ LOTSO HUGGIN' BEAR ✦",
    subtitle: "STRAWBERRY SCENTED • SWEET HUGS",
    washiColor: "rgba(251, 113, 133, 0.88)",
    themeType: "lotso",
    quote: '"Aroma stroberi manis dan pelukan paling hangat di dunia!" 🍓🧸',
    badgeIcons: ['🍓', '🧸', '💖', '✨'],
    primaryAccent: '#f43f5e'
  }
};
