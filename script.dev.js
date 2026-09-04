// script.dev.js - Floral Korean Photobox & Multi Mini-Games Arcade 🌸🧺🔨🎰

// --- AUDIO SYNTHESIZER (Web Audio API - Ringan & Tanpa File Eksternal) ---
class SoundEffects {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playPop() {
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(450, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(850, this.ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) {}
    }

    playBoing() {
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(220, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(580, this.ctx.currentTime + 0.15);
            osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.25);
            gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.25);
        } catch (e) {}
    }

    playDing() {
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + i * 0.06);
                gain.gain.setValueAtTime(0.18, now + i * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.35);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + i * 0.06);
                osc.stop(now + i * 0.06 + 0.35);
            });
        } catch (e) {}
    }

    playFanfare() {
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const notes = [440, 554.37, 659.25, 880, 1108.73];
            notes.forEach((f, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, now + idx * 0.09);
                gain.gain.setValueAtTime(0.22, now + idx * 0.09);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.45);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + idx * 0.09);
                osc.stop(now + idx * 0.09 + 0.45);
            });
        } catch (e) {}
    }

    playSnap() {
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {}
    }

    playFlip() {
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.08);
        } catch (e) {}
    }

    playTick() {
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1150, now);
            osc.frequency.exponentialRampToValueAtTime(550, now + 0.03);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.03);
        } catch (e) {}
    }

    playHeartbeat() {
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(135, now);
            osc.frequency.exponentialRampToValueAtTime(45, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.1);
        } catch (e) {}
    }
}

const sfx = new SoundEffects();

// --- STATE APLIKASI ---
let state = {
    namaUser: '',
    metodeFoto: null, 
    daftarFoto: [], 
    streamKamera: null,
    jawabanEsai: '',
    temaFrame: 'andys_room', // Default tema Toy Story Kamar Andy
    gelarUser: '🚀 Space Ranger Terbaik Se-Galaksi Cinta',
    daftarSoalAktif: []
};

// Fungsi Ganti Layar (Aman dari crash elemen null)
function gantiLayar(elKeluar, elMasuk) {
    if (elKeluar && elKeluar.classList) {
        elKeluar.classList.add('hidden');
    }
    if (elMasuk && elMasuk.classList) {
        elMasuk.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- TAHAP 1: INPUT NAMA ---
const inputNama = document.getElementById('input-nama');
const btnNextNama = document.getElementById('btn-next-nama');
const stepNamaDiv = document.getElementById('step-nama');
const stepFotoDiv = document.getElementById('step-foto');

if (btnNextNama && inputNama) {
    btnNextNama.addEventListener('click', () => {
        const nama = inputNama.value.trim();
        if (!nama) {
            sfx.playBoing();
            alert("Eits! Isi dulu nama panggilanmu yang manis yaa! 💕🌸");
            inputNama.focus();
            return;
        }
        sfx.playDing();
        state.namaUser = nama;
        gantiLayar(stepNamaDiv, stepFotoDiv);
        const displayEl = document.getElementById('display-nama-foto');
        if (displayEl) displayEl.textContent = state.namaUser;
    });

    inputNama.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btnNextNama.click();
    });
}

// --- TAHAP 2: FOTO ---
const btnModeSelfie = document.getElementById('btn-mode-selfie');
const btnModeUpload = document.getElementById('btn-mode-upload');
const modeSelfieArea = document.getElementById('mode-selfie-area');
const modeUploadArea = document.getElementById('mode-upload-area');
const gridPreviewFoto = document.getElementById('grid-preview-foto');
const btnSubmitFoto = document.getElementById('btn-submit-foto');
const countFotoTerkumpul = document.getElementById('count-foto-terkumpul');

if (btnModeSelfie) {
    btnModeSelfie.addEventListener('click', () => {
        sfx.playPop();
        setModeFoto('selfie');
    });
}

if (btnModeUpload) {
    btnModeUpload.addEventListener('click', () => {
        sfx.playPop();
        setModeFoto('upload');
    });
}

function setModeFoto(mode) {
    state.metodeFoto = mode;
    resetFotoArray();
    if (mode === 'selfie') {
        if (modeSelfieArea) modeSelfieArea.classList.remove('hidden');
        if (modeUploadArea) modeUploadArea.classList.add('hidden');
        if (btnModeSelfie) btnModeSelfie.classList.add('bg-pink-100', 'border-pink-500', 'text-pink-700');
        if (btnModeUpload) btnModeUpload.classList.remove('bg-pink-100', 'border-pink-500', 'text-pink-700');
        startCamera();
    } else {
        if (modeSelfieArea) modeSelfieArea.classList.add('hidden');
        if (modeUploadArea) modeUploadArea.classList.remove('hidden');
        if (btnModeUpload) btnModeUpload.classList.add('bg-pink-100', 'border-pink-500', 'text-pink-700');
        if (btnModeSelfie) btnModeSelfie.classList.remove('bg-pink-100', 'border-pink-500', 'text-pink-700');
        stopCamera();
    }
}

const videoFeed = document.getElementById('video-feed');
const btnCaptureSelfie = document.getElementById('btn-capture-selfie');
const canvasHiddenSelfie = document.getElementById('canvas-hidden-selfie');

async function startCamera() {
    try {
        const constraints = { 
            video: { 
                facingMode: "user", 
                width: { ideal: 1080 }, 
                height: { ideal: 1080 } 
            } 
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        state.streamKamera = stream;
        if (videoFeed) {
            videoFeed.srcObject = stream;
            videoFeed.play();
            videoFeed.style.transform = 'scaleX(-1)';
        }
        if (btnCaptureSelfie) btnCaptureSelfie.disabled = false;
    } catch (err) {
        alert("Kamera tidak dapat diakses atau diblokir. Yuk gunakan mode Upload Galeri saja! 🌸");
        if (btnModeUpload) btnModeUpload.click();
    }
}

function stopCamera() {
    if (state.streamKamera) {
        state.streamKamera.getTracks().forEach(track => track.stop());
        state.streamKamera = null;
        if (videoFeed) videoFeed.srcObject = null;
    }
}

if (btnCaptureSelfie) {
    btnCaptureSelfie.addEventListener('click', () => {
        if (state.daftarFoto.length >= 4) return;
        sfx.playSnap();
        
        if (videoFeed) {
            videoFeed.classList.add('brightness-150');
            setTimeout(() => videoFeed.classList.remove('brightness-150'), 120);
        }

        if (canvasHiddenSelfie && videoFeed) {
            const context = canvasHiddenSelfie.getContext('2d');
            canvasHiddenSelfie.width = videoFeed.videoWidth || 720;
            canvasHiddenSelfie.height = videoFeed.videoHeight || 720;
            
            context.save();
            context.translate(canvasHiddenSelfie.width, 0);
            context.scale(-1, 1);
            context.drawImage(videoFeed, 0, 0, canvasHiddenSelfie.width, canvasHiddenSelfie.height);
            context.restore();

            addFotoToArray(canvasHiddenSelfie.toDataURL('image/jpeg', 0.92));
        }
    });
}

const fileInputUpload = document.getElementById('file-input-upload');
if (fileInputUpload) {
    fileInputUpload.addEventListener('change', (e) => {
        const files = e.target.files;
        resetFotoArray();
        if (!files || files.length === 0) return;
        sfx.playDing();
        Array.from(files).slice(0, 4).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => addFotoToArray(event.target.result);
                reader.readAsDataURL(file);
            }
        });
    });
}

function resetFotoArray() {
    state.daftarFoto = [];
    updateGridPreview();
    if (btnSubmitFoto) {
        btnSubmitFoto.disabled = true;
        btnSubmitFoto.innerHTML = `<span>Kunci 4 Pose Manis Ini 🌸✨</span>`;
    }
    if (countFotoTerkumpul) countFotoTerkumpul.textContent = '0';
}

function addFotoToArray(dataUrl) {
    if (state.daftarFoto.length < 4) {
        state.daftarFoto.push(dataUrl);
        updateGridPreview();
        if (countFotoTerkumpul) countFotoTerkumpul.textContent = state.daftarFoto.length;
        if (state.daftarFoto.length === 4) {
            sfx.playDing();
            if (btnSubmitFoto) {
                btnSubmitFoto.disabled = false;
                btnSubmitFoto.innerHTML = `<span>Lanjut Main Game Arcade Gemas 🎮✨</span>`;
            }
            if (btnCaptureSelfie) btnCaptureSelfie.disabled = true;
        }
    }
}

const flowerSlotIcons = ['🌸', '🌷', '🌼', '🌹'];
function updateGridPreview() {
    if (!gridPreviewFoto) return;
    const slots = gridPreviewFoto.children;
    for (let i = 0; i < slots.length; i++) {
        slots[i].innerHTML = '';
        if (state.daftarFoto[i]) {
            slots[i].className = "foto-preview-box";
            const img = document.createElement('img');
            img.src = state.daftarFoto[i];
            slots[i].appendChild(img);
        } else {
            slots[i].className = "aspect-[3/4] bg-white border-2 border-dashed border-pink-200 rounded-2xl flex flex-col items-center justify-center font-heading text-pink-300 text-sm shadow-sm";
            slots[i].innerHTML = `<span>${flowerSlotIcons[i]}</span><span class="text-xs mt-1">Pose ${i + 1}</span>`;
        }
    }
}

// --- TAHAP 3: GAME 1 - KUIS GOMBAL (2 PILIHAN: 1 BISA DIKLIK, 1 KABUR LARI-LARI) ---
const bankSoalGombal = [
    {
        pertanyaan: "Minyak apa yang paling bikin mabuk dan linglung seharian kalau dipandang?",
        pilihan: [
            { teks: "Minyaksikan senyum manismu setiap detik 😳💘", benar: true, kabur: false },
            { teks: "Enggak mau ah, gamau baper 🙈", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Kipas apa yang paling bikin gelisah dan selalu ditunggu-tunggu {nama}?",
        pilihan: [
            { teks: "Kipastian status hubungan kita berdua 🥺👉👈", benar: true, kabur: false },
            { teks: "Pura-pura budeg gak denger! 🏃💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Awan, awan apa yang paling bikin bahagia dan berbunga-bunga di dunia?",
        pilihan: [
            { teks: "Awanna be with you forever and ever! ☁️💖", benar: true, kabur: false },
            { teks: "Jangan tatap aku nanti salting! 🙈", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Kamu tahu gak bedanya {nama} sama modem WiFi di rumah?",
        pilihan: [
            { teks: "Modem nyambung ke internet, kamu nyambung terus ke hatiku 💖", benar: true, kabur: false },
            { teks: "Mau nolak gombalan ini wlee 😜", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Kera apa yang wajib dimusnahkan sekarang juga tanpa ampun?",
        pilihan: [
            { teks: "Keraguanmu untuk membuka hati dan jadi pasanganku! 🙈💘", benar: true, kabur: false },
            { teks: "Lariii kabur dari kenyataan! 🏃💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Jalan apa yang paling mentok dan ga pernah ada ujung keluarnya?",
        pilihan: [
            { teks: "Jalan pikiranku yang isinya cuma mikirin kamu terus 🛣️💓", benar: true, kabur: false },
            { teks: "Belok arah ah gak mau baper! 🏃‍♀️💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Kucing apa yang paling romantis dan manis di muka bumi?",
        pilihan: [
            { teks: "Kucing-ta padamu tulus dari lubuk hatiku 🐱❤️", benar: true, kabur: false },
            { teks: "Kucingnya ngibrit kabur! 🏃💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Rumah sakit apa yang paling bikin betah dan ga bakal mau pulang?",
        pilihan: [
            { teks: "Rumah tangga bahagia kita berdua di masa depan 🏡💍", benar: true, kabur: false },
            { teks: "Takut disuntik mau kabur! 🙈", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Tarzan apa yang bikin deg-degan setengah mati pas ketemu?",
        pilihan: [
            { teks: "Tarzan-jung liat paras manis dan senyummu hari ini 🍃😍", benar: true, kabur: false },
            { teks: "Gantungan di pohon lariii! 🏃💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Mandi apa yang sama sekali gak bikin badan basah kuyup?",
        pilihan: [
            { teks: "Mandirikan rumah tangga harmonis bersamamu 🥰", benar: true, kabur: false },
            { teks: "Dingin woy mau lari! 🏃💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Kopi apa yang paling manis di dunia ngalahin sepabrik gula?",
        pilihan: [
            { teks: "Kopi-kiran kamu tiap detik tiap menit tanpa henti ☕💓", benar: true, kabur: false },
            { teks: "Kopinya tumpah kabur ah! 🏃💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Nasi apa yang paling berkah dan bikin bahagia dunia akhirat?",
        pilihan: [
            { teks: "Nasi uduk berdua di pelaminan sama kamu 🍚👰", benar: true, kabur: false },
            { teks: "Kenyang makan gombalan wleee 😜", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Kotak apa yang paling menyakitkan kalau sampai hilang dari hidup?",
        pilihan: [
            { teks: "Kotak-kan pernah bisa hidup bahagia tanpa senyumanmu 📦💔", benar: true, kabur: false },
            { teks: "Kotaknya dicuri kabur! 🏃💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Cecak apa yang bikin jantung {nama} berdebar kencang tak beraturan?",
        pilihan: [
            { teks: "Cecak-ep kamu pas lagi senyum manis gini! 🦎✨", benar: true, kabur: false },
            { teks: "Hiii geli mau kabur! 🙈", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Bolu apa yang paling istimewa dan langka di semesta raya?",
        pilihan: [
            { teks: "Bolu-kan hatiku sudah kau curi seutuhnya 🍰💞", benar: true, kabur: false },
            { teks: "Kuenya habis gak bisa diklik! 🏃💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Bis apa yang bikin baper dan salting brutal tiap detik?",
        pilihan: [
            { teks: "Bisa-bisanya kamu secantik dan semanis ini tiap detik? 🚌😳", benar: true, kabur: false },
            { teks: "Ketinggalan bis mau kabur! 🏃💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Setan apa yang paling bikin berbunga-bunga dan ga ada serem-seremnya?",
        pilihan: [
            { teks: "Setangkai bunga mawar dan seluruh hatiku untukmu 🌹💖", benar: true, kabur: false },
            { teks: "Takut setan kaburr! 👻🏃", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Cuka apa yang paling manis sedunia ngalahin madu?",
        pilihan: [
            { teks: "Cuka (suka) banget sama kamu dari dulu sampai selamanya! 🍯💕", benar: true, kabur: false },
            { teks: "Kecut banget mau lari! 🏃💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Semen apa yang paling kuat merekatkan dua insan?",
        pilihan: [
            { teks: "Semen-jak aku mengenalmu, duniaku jadi penuh warna indah 🏰💞", benar: true, kabur: false },
            { teks: "Keras kayak batu kabur! 🏃💨", benar: false, kabur: true }
        ]
    },
    {
        pertanyaan: "Rel apa yang paling bikin bahagia kalau dilewati berdua?",
        pilihan: [
            { teks: "Rela menemanimu berdua sampai kakek nenek nanti 🚂👵👴", benar: true, kabur: false },
            { teks: "Keretanya lewat mau lari! 🏃💨", benar: false, kabur: true }
        ]
    }
];

let indexSoalAktif = 0;
const TOTAL_SOAL_PER_GAME = 5;
const stepKuisDiv = document.getElementById('step-kuis');
const teksPertanyaan = document.getElementById('teks-pertanyaan');
const containerPilihan = document.getElementById('container-pilihan');
const nomorSoal = document.getElementById('nomor-soal');
const totalSoalSpan = document.getElementById('total-soal');
const quizProgressBar = document.getElementById('quiz-progress-bar');

if (btnSubmitFoto) {
    btnSubmitFoto.addEventListener('click', () => {
        if (state.daftarFoto.length < 4) {
            alert("Fotonya wajib pas 4 pose yaa! 🌸");
            return;
        }
        stopCamera();
        sfx.playDing();
        
        const shuffled = [...bankSoalGombal].sort(() => 0.5 - Math.random());
        state.daftarSoalAktif = shuffled.slice(0, TOTAL_SOAL_PER_GAME);
        indexSoalAktif = 0;
        if (totalSoalSpan) totalSoalSpan.textContent = TOTAL_SOAL_PER_GAME;
        
        gantiLayar(stepFotoDiv, stepKuisDiv);
        muatSoal(indexSoalAktif);
    });
}

function muatSoal(index) {
    if (!state.daftarSoalAktif || !state.daftarSoalAktif[index]) return;
    const soal = state.daftarSoalAktif[index];
    if (nomorSoal) nomorSoal.textContent = index + 1;
    
    if (quizProgressBar) {
        const progressPercent = ((index + 1) / TOTAL_SOAL_PER_GAME) * 100;
        quizProgressBar.style.width = `${progressPercent}%`;
    }

    if (teksPertanyaan) {
        teksPertanyaan.textContent = soal.pertanyaan.replace(/{nama}/g, state.namaUser);
    }
    if (!containerPilihan) return;
    containerPilihan.innerHTML = '';

    const pilihanDiacak = [...soal.pilihan].sort(() => 0.5 - Math.random());

    pilihanDiacak.forEach((pilihan) => {
        const btn = document.createElement('button');
        btn.textContent = pilihan.teks;

        if (pilihan.kabur) {
            btn.className = "w-full py-4 px-5 bg-rose-50/80 hover:bg-rose-100 text-rose-700 font-bold rounded-2xl border-2 border-rose-300 transition-all text-left shadow-sm flex items-center justify-between text-sm sm:text-base select-none btn-runaway";
            btn.style.position = 'relative';

            const kaburHandler = (e) => {
                sfx.playBoing();
                const randomX = (Math.random() - 0.5) * 220;
                const randomY = (Math.random() - 0.5) * 100;
                btn.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
                btn.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.95)`;
                
                const ejekanSalting = [
                    "Mau nolak ya? Gak bisa! 😜",
                    "Dilarang nolak cinta! 💖",
                    "Harus pilih yang gombal! 🙈",
                    "Eits kabur! Wleee 🏃💨",
                    "Gak bisa lolos dari aku! 💘",
                    "Klik yang satunya dong! 🥺👉👈"
                ];
                btn.textContent = ejekanSalting[Math.floor(Math.random() * ejekanSalting.length)];
            };

            btn.addEventListener('mouseenter', kaburHandler);
            btn.addEventListener('touchstart', kaburHandler, { passive: true });
        } else {
            btn.className = "w-full py-4 px-5 bg-white hover:bg-pink-50 text-zinc-800 font-bold rounded-2xl border-2 border-pink-300 hover:border-pink-500 transition-all text-left shadow-md btn-cute flex items-center justify-between text-sm sm:text-base";
            
            btn.addEventListener('click', () => {
                sfx.playDing();
                indexSoalAktif++;
                if (indexSoalAktif < state.daftarSoalAktif.length) {
                    muatSoal(indexSoalAktif);
                } else {
                    const minigameEl = document.getElementById('step-minigame');
                    const whackEl = document.getElementById('step-whack');
                    const esaiEl = document.getElementById('step-esai');
                    if (minigameEl) {
                        gantiLayar(stepKuisDiv, minigameEl);
                        mulaiMiniGame();
                    } else if (whackEl) {
                        gantiLayar(stepKuisDiv, whackEl);
                        mulaiWhackGame();
                    } else if (esaiEl) {
                        gantiLayar(stepKuisDiv, esaiEl);
                        muatEsai();
                    }
                }
            });
        }

        containerPilihan.appendChild(btn);
    });
}

// --- TAHAP 4: GAME 2 - MINI GAME TANGKAP BUNGA CINTA 🌸🧺 ---
const stepMinigameDiv = document.getElementById('step-minigame');
const canvasMinigame = document.getElementById('canvas-minigame');
const minigameScoreSpan = document.getElementById('minigame-score');
const minigameStatusSpan = document.getElementById('minigame-status');
const minigameWinOverlay = document.getElementById('minigame-win-overlay');
const btnLanjutMinigame = document.getElementById('btn-lanjut-minigame');
const btnMoveLeft = document.getElementById('btn-move-left');
const btnMoveRight = document.getElementById('btn-move-right');

let minigameState = {
    running: false,
    score: 0,
    target: 10,
    basketX: 150,
    basketWidth: 64,
    items: [],
    animFrameId: null,
    lastSpawn: 0
};

function mulaiMiniGame() {
    const canvas = document.getElementById('canvas-minigame');
    if (!canvas) {
        gantiLayar(document.getElementById('step-minigame'), document.getElementById('step-whack'));
        mulaiWhackGame();
        return;
    }

    minigameState.running = true;
    minigameState.score = 0;
    minigameState.items = [];
    if (minigameScoreSpan) minigameScoreSpan.textContent = '0';
    if (minigameStatusSpan) minigameStatusSpan.textContent = 'Ayo tangkap 10 bunga! 🌸';
    if (minigameWinOverlay) minigameWinOverlay.classList.add('hidden');

    const rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : { width: 400, height: 260 };
    canvas.width = rect.width || 400;
    canvas.height = rect.height || 260;
    minigameState.basketX = canvas.width / 2;

    loopMiniGame();
}

function spawnFallingItem() {
    if (!canvasMinigame) return;
    const flowerEmojis = ['🌸', '🌷', '🌼', '🌹', '💖', '💐'];
    const emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    const x = 30 + Math.random() * (canvasMinigame.width - 60);
    const speed = 1.8 + Math.random() * 1.5;
    const size = 26 + Math.random() * 8;

    minigameState.items.push({
        x: x,
        y: -30,
        speed: speed,
        size: size,
        emoji: emoji,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.05
    });
}

function loopMiniGame() {
    if (!minigameState.running || !canvasMinigame) return;

    const ctx = canvasMinigame.getContext('2d');
    const w = canvasMinigame.width;
    const h = canvasMinigame.height;

    ctx.clearRect(0, 0, w, h);

    if (Date.now() - minigameState.lastSpawn > 600) {
        spawnFallingItem();
        minigameState.lastSpawn = Date.now();
    }

    const basketY = h - 34;

    for (let i = minigameState.items.length - 1; i >= 0; i--) {
        const item = minigameState.items[i];
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

        if (item.y >= basketY - 20 && item.y <= basketY + 15) {
            if (Math.abs(item.x - minigameState.basketX) < (minigameState.basketWidth / 2 + 10)) {
                sfx.playDing();
                minigameState.score++;
                if (minigameScoreSpan) minigameScoreSpan.textContent = minigameState.score;
                minigameState.items.splice(i, 1);

                if (minigameStatusSpan) {
                    minigameStatusSpan.textContent = `Hebat! ${10 - minigameState.score} bunga lagi! ✨`;
                }

                if (minigameState.score >= minigameState.target) {
                    menangMiniGame();
                    return;
                }
                continue;
            }
        }

        if (item.y > h + 30) {
            minigameState.items.splice(i, 1);
        }
    }

    ctx.font = '40px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🧺', minigameState.basketX, basketY);

    minigameState.animFrameId = requestAnimationFrame(loopMiniGame);
}

function menangMiniGame() {
    minigameState.running = false;
    cancelAnimationFrame(minigameState.animFrameId);
    sfx.playFanfare();
    if (minigameWinOverlay) minigameWinOverlay.classList.remove('hidden');
    if (minigameStatusSpan) minigameStatusSpan.textContent = "Buket bunga sempurna! 💐";
}

function gerakkanKeranjang(clientX) {
    if (!canvasMinigame) return;
    const rect = canvasMinigame.getBoundingClientRect();
    const x = clientX - rect.left;
    minigameState.basketX = Math.max(35, Math.min(canvasMinigame.width - 35, x));
}

if (canvasMinigame && canvasMinigame.parentElement) {
    canvasMinigame.parentElement.addEventListener('mousemove', (e) => {
        if (minigameState.running) gerakkanKeranjang(e.clientX);
    });

    canvasMinigame.parentElement.addEventListener('touchmove', (e) => {
        if (minigameState.running && e.touches.length > 0) {
            gerakkanKeranjang(e.touches[0].clientX);
        }
    }, { passive: true });
}

if (btnMoveLeft) {
    btnMoveLeft.addEventListener('click', () => {
        minigameState.basketX = Math.max(35, minigameState.basketX - 45);
    });
}

if (btnMoveRight) {
    btnMoveRight.addEventListener('click', () => {
        if (canvasMinigame) {
            minigameState.basketX = Math.min(canvasMinigame.width - 35, minigameState.basketX + 45);
        }
    });
}

// Setelah selesai Game 2 Tangkap Bunga -> Lanjut Game 3 Pukul Monster Ragu!
const btnSkipMinigame = document.getElementById('btn-skip-minigame');
if (btnLanjutMinigame) {
    btnLanjutMinigame.addEventListener('click', () => {
        sfx.playPop();
        const minigameEl = document.getElementById('step-minigame');
        const whackEl = document.getElementById('step-whack');
        if (whackEl) {
            gantiLayar(minigameEl, whackEl);
            mulaiWhackGame();
        }
    });
}
if (btnSkipMinigame) {
    btnSkipMinigame.addEventListener('click', () => {
        sfx.playPop();
        minigameState.running = false;
        cancelAnimationFrame(minigameState.animFrameId);
        const minigameEl = document.getElementById('step-minigame');
        const whackEl = document.getElementById('step-whack');
        if (whackEl) {
            gantiLayar(minigameEl, whackEl);
            mulaiWhackGame();
        }
    });
}

// --- TAHAP 5: GAME 3 - PUKUL MONSTER RAGU (WHACK-A-DOUBT) 🔨👾 ---
const stepWhackDiv = document.getElementById('step-whack');
const whackScoreSpan = document.getElementById('whack-score');
const whackStatusSpan = document.getElementById('whack-status');
const whackWinOverlay = document.getElementById('whack-win-overlay');
const btnLanjutWhack = document.getElementById('btn-lanjut-whack');
const btnSkipWhack = document.getElementById('btn-skip-whack');
const whackHoles = document.querySelectorAll('.whack-hole');

let whackState = {
    score: 0,
    target: 6,
    timerId: null,
    running: false
};

function mulaiWhackGame() {
    whackState.score = 0;
    whackState.running = true;
    if (whackScoreSpan) whackScoreSpan.textContent = '0';
    if (whackStatusSpan) whackStatusSpan.textContent = 'Awas dia nongol! 👀';
    if (whackWinOverlay) whackWinOverlay.classList.add('hidden');
    loopWhackMole();
}

function loopWhackMole() {
    if (!whackState.running) return;

    whackHoles.forEach(h => {
        const target = h.querySelector('.whack-target');
        if (target) target.classList.add('hidden');
    });

    if (whackHoles.length > 0) {
        const randomHole = whackHoles[Math.floor(Math.random() * whackHoles.length)];
        const target = randomHole.querySelector('.whack-target');
        if (target) {
            const icons = ['👾', '🤡', '👻', '💔', '🙈'];
            target.textContent = icons[Math.floor(Math.random() * icons.length)];
            target.classList.remove('hidden');
        }
    }

    whackState.timerId = setTimeout(loopWhackMole, 850);
}

whackHoles.forEach(hole => {
    hole.addEventListener('click', () => {
        if (!whackState.running) return;
        const target = hole.querySelector('.whack-target');
        if (target && !target.classList.contains('hidden')) {
            sfx.playBoing();
            target.textContent = '💥';
            setTimeout(() => target.classList.add('hidden'), 160);

            whackState.score++;
            if (whackScoreSpan) whackScoreSpan.textContent = whackState.score;
            if (whackStatusSpan) whackStatusSpan.textContent = `Bagus! ${whackState.target - whackState.score} lagi! 🔨`;

            if (whackState.score >= whackState.target) {
                whackState.running = false;
                clearTimeout(whackState.timerId);
                sfx.playFanfare();
                if (whackWinOverlay) whackWinOverlay.classList.remove('hidden');
                if (whackStatusSpan) whackStatusSpan.textContent = "Semua keraguan hancur! 🎉";
            }
        }
    });
});

function transisiKeMemoryGame() {
    whackState.running = false;
    clearTimeout(whackState.timerId);
    const whackEl = document.getElementById('step-whack');
    const memoryEl = document.getElementById('step-memory');
    if (memoryEl) {
        gantiLayar(whackEl, memoryEl);
        mulaiMemoryGame();
    }
}

if (btnLanjutWhack) {
    btnLanjutWhack.addEventListener('click', () => {
        sfx.playPop();
        transisiKeMemoryGame();
    });
}
if (btnSkipWhack) {
    btnSkipWhack.addEventListener('click', () => {
        sfx.playPop();
        transisiKeMemoryGame();
    });
}

// --- TAHAP 6: GAME 4 - TEBAK PASANGAN KARTU MAINAN TOY STORY 🃏🧸 ---
const stepMemoryDiv = document.getElementById('step-memory');
const memoryCardsGrid = document.getElementById('memory-cards-grid');
const memoryScoreSpan = document.getElementById('memory-score');
const memoryStatusSpan = document.getElementById('memory-status');
const memoryWinOverlay = document.getElementById('memory-win-overlay');
const btnLanjutMemory = document.getElementById('btn-lanjut-memory');
const btnSkipMemory = document.getElementById('btn-skip-memory');

const TOY_CARDS_DATA = [
    { id: 'woody', emoji: '🤠', name: 'Woody' },
    { id: 'buzz', emoji: '🚀', name: 'Buzz' },
    { id: 'alien', emoji: '🛸', name: 'Alien' },
    { id: 'lotso', emoji: '🍓', name: 'Lotso' }
];

let memoryState = {
    flippedCards: [],
    matchedPairs: 0,
    isBusy: false
};

function mulaiMemoryGame() {
    if (!memoryCardsGrid) return;
    memoryState.flippedCards = [];
    memoryState.matchedPairs = 0;
    memoryState.isBusy = false;
    if (memoryScoreSpan) memoryScoreSpan.textContent = '0';
    if (memoryStatusSpan) memoryStatusSpan.textContent = 'Pilih 2 kartu yang cocok! ✨';
    if (memoryWinOverlay) memoryWinOverlay.classList.add('hidden');

    // 4 pasang = 8 kartu, diacak
    const deck = [...TOY_CARDS_DATA, ...TOY_CARDS_DATA]
        .sort(() => Math.random() - 0.5);

    memoryCardsGrid.innerHTML = '';
    deck.forEach((cardData, idx) => {
        const cardWrap = document.createElement('div');
        cardWrap.className = 'memory-card-wrap aspect-[3/4] select-none';

        const cardInner = document.createElement('div');
        cardInner.className = 'memory-card-inner relative w-full h-full';
        cardInner.dataset.id = cardData.id;
        cardInner.dataset.index = idx;

        const front = document.createElement('div');
        front.className = 'memory-card-front flex flex-col items-center justify-center p-1';
        front.innerHTML = `<span class="text-2xl sm:text-3xl">❓</span><span class="text-[9px] sm:text-[10px] font-bold text-amber-800 mt-1 font-heading">TOY</span>`;

        const back = document.createElement('div');
        back.className = 'memory-card-back flex flex-col items-center justify-center p-1';
        back.innerHTML = `<span class="text-3xl sm:text-4xl animate-bounce">${cardData.emoji}</span><span class="text-[10px] sm:text-xs font-black text-rose-500 mt-1 font-heading">${cardData.name}</span>`;

        cardInner.appendChild(front);
        cardInner.appendChild(back);
        cardWrap.appendChild(cardInner);

        cardInner.addEventListener('click', () => handleMemoryCardClick(cardInner));
        memoryCardsGrid.appendChild(cardWrap);
    });
}

function handleMemoryCardClick(cardInner) {
    if (memoryState.isBusy) return;
    if (cardInner.classList.contains('is-flipped') || cardInner.classList.contains('is-matched')) return;

    sfx.playFlip();
    cardInner.classList.add('is-flipped');
    memoryState.flippedCards.push(cardInner);

    if (memoryState.flippedCards.length === 2) {
        memoryState.isBusy = true;
        const [card1, card2] = memoryState.flippedCards;

        if (card1.dataset.id === card2.dataset.id) {
            // Cocok!
            setTimeout(() => {
                sfx.playDing();
                card1.classList.add('is-matched');
                card2.classList.add('is-matched');
                memoryState.matchedPairs++;
                if (memoryScoreSpan) memoryScoreSpan.textContent = memoryState.matchedPairs;
                if (memoryStatusSpan) memoryStatusSpan.textContent = `Hebat! Cocok! (${memoryState.matchedPairs}/4) 💖`;

                memoryState.flippedCards = [];
                memoryState.isBusy = false;

                if (memoryState.matchedPairs === 4) {
                    setTimeout(() => {
                        sfx.playFanfare();
                        if (memoryWinOverlay) memoryWinOverlay.classList.remove('hidden');
                        if (memoryStatusSpan) memoryStatusSpan.textContent = "Semua sahabat berkumpul! 🎉";
                    }, 400);
                }
            }, 350);
        } else {
            // Belum cocok, tutup kembali
            setTimeout(() => {
                sfx.playBoing();
                card1.classList.remove('is-flipped');
                card2.classList.remove('is-flipped');
                memoryState.flippedCards = [];
                memoryState.isBusy = false;
                if (memoryStatusSpan) memoryStatusSpan.textContent = "Coba ingat-ingat lagi posisinya! 👀";
            }, 850);
        }
    }
}

function transisiKeHeartbeatGame() {
    const memoryEl = document.getElementById('step-memory');
    const heartbeatEl = document.getElementById('step-heartbeat');
    if (heartbeatEl) {
        gantiLayar(memoryEl, heartbeatEl);
        mulaiHeartbeatGame();
    }
}

if (btnLanjutMemory) {
    btnLanjutMemory.addEventListener('click', () => {
        sfx.playPop();
        transisiKeHeartbeatGame();
    });
}
if (btnSkipMemory) {
    btnSkipMemory.addEventListener('click', () => {
        sfx.playPop();
        transisiKeHeartbeatGame();
    });
}

// --- TAHAP 7: GAME 5 - POMPA ROKET CINTA 100% (RAPID RUSH) 💓🚀 ---
const stepHeartbeatDiv = document.getElementById('step-heartbeat');
const heartbeatPercent = document.getElementById('heartbeat-percent');
const heartbeatBar = document.getElementById('heartbeat-bar');
const heartbeatCommentary = document.getElementById('heartbeat-commentary');
const btnPumpRocket = document.getElementById('btn-pump-rocket');
const heartbeatWinOverlay = document.getElementById('heartbeat-win-overlay');
const btnLanjutHeartbeat = document.getElementById('btn-lanjut-heartbeat');
const btnSkipHeartbeat = document.getElementById('btn-skip-heartbeat');

let heartbeatState = {
    percent: 0,
    target: 100,
    running: false,
    decayInterval: null
};

function mulaiHeartbeatGame() {
    heartbeatState.percent = 0;
    heartbeatState.running = true;
    updateHeartbeatUI();
    if (heartbeatWinOverlay) heartbeatWinOverlay.classList.add('hidden');
    if (btnPumpRocket) btnPumpRocket.disabled = false;

    // Auto-decay lambat agar terasa menantang
    if (heartbeatState.decayInterval) clearInterval(heartbeatState.decayInterval);
    heartbeatState.decayInterval = setInterval(() => {
        if (!heartbeatState.running) return;
        if (heartbeatState.percent > 0 && heartbeatState.percent < 100) {
            heartbeatState.percent = Math.max(0, heartbeatState.percent - 1.2);
            updateHeartbeatUI();
        }
    }, 450);
}

function updateHeartbeatUI() {
    const p = Math.min(100, Math.round(heartbeatState.percent));
    if (heartbeatPercent) heartbeatPercent.textContent = `${p}%`;
    if (heartbeatBar) heartbeatBar.style.width = `${p}%`;

    if (heartbeatCommentary) {
        if (p === 0) heartbeatCommentary.textContent = "Ayo ketuk tombol roket secepat mungkin! 🚀⚡";
        else if (p < 30) heartbeatCommentary.textContent = "Bahan bakar cinta mulai terisi... 💓";
        else if (p < 60) heartbeatCommentary.textContent = "Mesin roket menderu kencang! Salting brutal! 😍✨";
        else if (p < 90) heartbeatCommentary.textContent = "Hampir mencapai kecepatan cahaya cinta! 🔥🚀";
        else if (p < 100) heartbeatCommentary.textContent = "DIKIT LAGI! SIAP-SIAP MELEDAK GEMAS! 💥💖";
        else heartbeatCommentary.textContent = "DAYA MAKSIMAL 100%! TO INFINITY & BEYOND! 🚀🎉";
    }
}

function spawnLoveParticle(x, y) {
    const emojis = ['🚀', '💖', '✨', '⭐', '💓', '🔥'];
    const p = document.createElement('div');
    p.className = 'particle-love';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.setProperty('--dx', `${(Math.random() - 0.5) * 80}px`);
    p.style.setProperty('--rot', `${(Math.random() - 0.5) * 60}deg`);
    document.body.appendChild(p);

    setTimeout(() => {
        if (p.parentElement) p.parentElement.removeChild(p);
    }, 1000);
}

if (btnPumpRocket) {
    const handlePump = (e) => {
        if (!heartbeatState.running) return;
        sfx.playHeartbeat();

        const rect = btnPumpRocket.getBoundingClientRect();
        const clientX = e.clientX || (rect.left + rect.width / 2);
        const clientY = e.clientY || (rect.top + rect.height / 2);
        spawnLoveParticle(clientX, clientY);

        heartbeatState.percent += 6.5;
        if (heartbeatState.percent >= heartbeatState.target) {
            heartbeatState.percent = 100;
            heartbeatState.running = false;
            if (heartbeatState.decayInterval) clearInterval(heartbeatState.decayInterval);
            updateHeartbeatUI();
            btnPumpRocket.disabled = true;
            sfx.playFanfare();
            if (heartbeatWinOverlay) heartbeatWinOverlay.classList.remove('hidden');
        } else {
            updateHeartbeatUI();
        }
    };

    btnPumpRocket.addEventListener('click', handlePump);
}

function transisiKeWheelGame() {
    heartbeatState.running = false;
    if (heartbeatState.decayInterval) clearInterval(heartbeatState.decayInterval);
    const heartbeatEl = document.getElementById('step-heartbeat');
    const wheelEl = document.getElementById('step-wheel');
    if (wheelEl) {
        gantiLayar(heartbeatEl, wheelEl);
        mulaiWheelGame();
    }
}

if (btnLanjutHeartbeat) {
    btnLanjutHeartbeat.addEventListener('click', () => {
        sfx.playPop();
        transisiKeWheelGame();
    });
}
if (btnSkipHeartbeat) {
    btnSkipHeartbeat.addEventListener('click', () => {
        sfx.playPop();
        transisiKeWheelGame();
    });
}

// --- TAHAP 8: GAME 6 - RODA KEBERUNTUNGAN TOY STORY 🎡✨ ---
const stepWheelDiv = document.getElementById('step-wheel');
const canvasWheel = document.getElementById('canvas-wheel');
const btnSpinWheel = document.getElementById('btn-spin-wheel');
const btnLanjutWheel = document.getElementById('btn-lanjut-wheel');
const btnSkipWheel = document.getElementById('btn-skip-wheel');
const wheelResultArea = document.getElementById('wheel-result-area');
const wheelResultText = document.getElementById('wheel-result-text');

const WHEEL_PRIZES = [
    { text: "Teman Setia Seumur Hidup 🤠", color: "#fef08a", textColor: "#854d0e" },
    { text: "Cinta Tak Terhingga (To Infinity!) 🚀", color: "#e0e7ff", textColor: "#3730a3" },
    { text: "Terpilih Kesayangan The Claw 🛸", color: "#dcfce7", textColor: "#166534" },
    { text: "Dipeluk Erat Aroma Stroberi 🍓", color: "#ffe4e6", textColor: "#9f1239" },
    { text: "Diratukan & Dijaga Selalu 👑", color: "#fef3c7", textColor: "#92400e" },
    { text: "Jodoh Terindah Selamanya 💖", color: "#fae8ff", textColor: "#86198f" }
];

let wheelAngle = 0;
let wheelSpinning = false;

function drawWheel() {
    if (!canvasWheel) return;
    const ctx = canvasWheel.getContext('2d');
    const cx = canvasWheel.width / 2;
    const cy = canvasWheel.height / 2;
    const radius = cx - 4;
    const numSlices = WHEEL_PRIZES.length;
    const sliceAngle = (Math.PI * 2) / numSlices;

    ctx.clearRect(0, 0, canvasWheel.width, canvasWheel.height);

    WHEEL_PRIZES.forEach((item, i) => {
        const start = wheelAngle + i * sliceAngle;
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

        // Teks & Ikon
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = item.textColor;
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(item.text, radius - 16, 4);
        ctx.restore();
    });

    // Lingkaran luar bergaris
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
}

function mulaiWheelGame() {
    wheelSpinning = false;
    if (wheelResultArea) wheelResultArea.classList.add('hidden');
    if (btnSpinWheel) {
        btnSpinWheel.classList.remove('hidden');
        btnSpinWheel.disabled = false;
    }
    if (btnLanjutWheel) btnLanjutWheel.classList.add('hidden');
    drawWheel();
}

if (btnSpinWheel) {
    btnSpinWheel.addEventListener('click', () => {
        if (wheelSpinning) return;
        wheelSpinning = true;
        btnSpinWheel.disabled = true;

        let spinVelocity = 0.35 + Math.random() * 0.25;
        const deceleration = 0.985;
        let lastTickAngle = wheelAngle;

        function animateSpin() {
            wheelAngle += spinVelocity;
            spinVelocity *= deceleration;

            // Suara klik setiap melewati irisan
            if (Math.abs(wheelAngle - lastTickAngle) > (Math.PI / 6)) {
                sfx.playTick();
                lastTickAngle = wheelAngle;
            }

            drawWheel();

            if (spinVelocity > 0.002) {
                requestAnimationFrame(animateSpin);
            } else {
                wheelSpinning = false;
                sfx.playFanfare();

                // Hitung irisan pemenang di posisi atas (3 * Math.PI / 2 atau -Math.PI / 2)
                const numSlices = WHEEL_PRIZES.length;
                const sliceAngle = (Math.PI * 2) / numSlices;
                const normalized = ((-Math.PI / 2 - wheelAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
                const winningIndex = Math.floor(normalized / sliceAngle) % numSlices;
                const winner = WHEEL_PRIZES[winningIndex];

                if (wheelResultText) wheelResultText.textContent = `✨ ${winner.text} ✨`;
                if (wheelResultArea) wheelResultArea.classList.remove('hidden');
                if (btnSpinWheel) btnSpinWheel.classList.add('hidden');
                if (btnLanjutWheel) btnLanjutWheel.classList.remove('hidden');
            }
        }

        animateSpin();
    });
}

function transisiKeGachaGame() {
    const wheelEl = document.getElementById('step-wheel');
    const gachaEl = document.getElementById('step-gacha');
    if (gachaEl) {
        gantiLayar(wheelEl, gachaEl);
        initGachaGame();
    }
}

if (btnLanjutWheel) {
    btnLanjutWheel.addEventListener('click', () => {
        sfx.playPop();
        transisiKeGachaGame();
    });
}
if (btnSkipWheel) {
    btnSkipWheel.addEventListener('click', () => {
        sfx.playPop();
        transisiKeGachaGame();
    });
}

// --- TAHAP 9: GAME 7 - MESIN GACHA GELAR TOY STORY 🎰🧸 ---
const stepGachaDiv = document.getElementById('step-gacha');
const btnSpinGacha = document.getElementById('btn-spin-gacha');
const btnLanjutGacha = document.getElementById('btn-lanjut-gacha');
const gachaCapsule = document.getElementById('gacha-capsule');
const gachaResultArea = document.getElementById('gacha-result-area');
const gachaTitleText = document.getElementById('gacha-title-text');

const daftarGelarGacha = [
    "🚀 Space Ranger Terbaik Se-Galaksi Cinta",
    "🤠 Sheriff Paling Setia Penjaga Hatiku",
    "🛸 Alien Tergemas yang Terpilih oleh The Claw",
    "🍓 Beruang Manis Aroma Stroberi Paling Hangat",
    "👑 Mainan Kesayangan Nomor 1 di Seluruh Semesta",
    "🧸 Boneka Paling Peluk-able Sedunia",
    "⭐ Bintang Terang Penakluk Hati",
    "🦖 Dinosaurus Paling Imut & Menggemaskan"
];

function initGachaGame() {
    if (gachaResultArea) gachaResultArea.classList.add('hidden');
    if (btnSpinGacha) {
        btnSpinGacha.classList.remove('hidden');
        btnSpinGacha.disabled = false;
    }
    if (btnLanjutGacha) btnLanjutGacha.classList.add('hidden');
    if (gachaCapsule) gachaCapsule.textContent = '🔮';
}

if (btnSpinGacha) {
    btnSpinGacha.addEventListener('click', () => {
        sfx.playBoing();
        if (gachaCapsule) {
            gachaCapsule.classList.add('animate-spin');
        }
        btnSpinGacha.disabled = true;

        setTimeout(() => {
            if (gachaCapsule) {
                gachaCapsule.classList.remove('animate-spin');
                gachaCapsule.textContent = '🎁';
            }
            sfx.playFanfare();
            const gelarDipilih = daftarGelarGacha[Math.floor(Math.random() * daftarGelarGacha.length)];
            state.gelarUser = gelarDipilih;

            if (gachaTitleText) gachaTitleText.textContent = gelarDipilih;
            if (gachaResultArea) gachaResultArea.classList.remove('hidden');
            if (btnSpinGacha) btnSpinGacha.classList.add('hidden');
            if (btnLanjutGacha) btnLanjutGacha.classList.remove('hidden');
        }, 1100);
    });
}

if (btnLanjutGacha) {
    btnLanjutGacha.addEventListener('click', () => {
        sfx.playPop();
        const gachaEl = document.getElementById('step-gacha');
        const esaiEl = document.getElementById('step-esai');
        gantiLayar(gachaEl, esaiEl);
        muatEsai();
    });
}

// --- TAHAP 7: CURAHAN HATI MANIS ---
const stepEsaiDiv = document.getElementById('step-esai');
const teksEsai = document.getElementById('teks-esai');
const inputEsai = document.getElementById('input-esai');
const btnSubmitEsai = document.getElementById('btn-submit-esai');

function muatEsai() {
    if (teksEsai) {
        teksEsai.textContent = `Wahai ${state.namaUser}, bisikin dong 1 hal paling manis atau harapan terindah yang selalu kamu syukuri di dunia ini: 💌🌸`;
    }
}

if (btnSubmitEsai) {
    btnSubmitEsai.addEventListener('click', () => {
        const val = inputEsai ? inputEsai.value.trim() : '';
        if (!val) {
            sfx.playBoing();
            alert("Tulis dulu isi hatimu yang manis yaa! Jangan kosong dong 💕");
            if (inputEsai) inputEsai.focus();
            return;
        }
        sfx.playDing();
        state.jawabanEsai = val;
        gantiLayar(stepEsaiDiv, stepPangeranDiv);
        muatPangeran();
    });
}

// --- TAHAP 8: PESAN MENYENTUH HATI (SANGAT HANGAT & MENGHARUKAN) ---
const stepPangeranDiv = document.getElementById('step-pangeran');
const pangeranNamaUser = document.getElementById('pangeran-nama-user');
const teksSabdaPangeran = document.getElementById('teks-sabda-pangeran');
const btnMenujuHasil = document.getElementById('btn-menuju-hasil');

function muatPangeran() {
    if (pangeranNamaUser) pangeranNamaUser.textContent = state.namaUser;
    if (teksSabdaPangeran) {
        teksSabdaPangeran.innerHTML = `
            <span class="text-rose-500 font-bold block mb-2 text-base">🌸 Teruntuk ${state.namaUser} yang amat berharga...</span>
            "Di antara miliaran manusia di muka bumi ini, terima kasih banyak sudah hadir dan membawa warna seindah ini di hidupku. Membaca katamu (<em class="text-pink-600 font-semibold">'${state.jawabanEsai}'</em>), hatiku rasanya menghangat dan tersenyum tulus.<br><br>
            Jangan pernah lupa kalau kamu itu luar biasa indah, senyumanmu selalu punya keajaiban untuk menerangi hari yang redup, dan kamu sangat pantas mendapatkan limpahan kasih sayang serta kebahagiaan di semesta ini.<br><br>
            Tetaplah mekar dengan cantik seperti bunga di musim semi ya. You are deeply loved, appreciated, and cherished. Selalu bahagia ya, bidadari manisku... ✨🥺💐💖"
        `;
    }
}

if (btnMenujuHasil) {
    btnMenujuHasil.addEventListener('click', () => {
        sfx.playFanfare();
        gantiLayar(stepPangeranDiv, stepHasilDiv);
        generateCanvasPhotoboxFinal();
    });
}

// --- TAHAP 9: THEME SELECTOR & CANVAS FINAL PHOTOBOX ---
const stepHasilDiv = document.getElementById('step-hasil');
const canvasHasil = document.getElementById('canvas-hasil-photobox');
const btnDownloadHasil = document.getElementById('btn-download-hasil');
const btnUlangi = document.getElementById('btn-ulangi');
const themeButtons = document.querySelectorAll('.theme-btn');

const TEMA_CONFIG = {
    andys_room: {
        name: "Kamar Andy",
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
        name: "Sheriff Woody",
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
        name: "Buzz Ranger",
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
        name: "Pizza Alien",
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
        name: "Beruang Lotso",
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

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedTheme = btn.getAttribute('data-theme');
        state.temaFrame = selectedTheme;
        sfx.playPop();

        themeButtons.forEach(b => {
            b.classList.remove('border-sky-500', 'ring-2', 'ring-sky-300', 'border-pink-500', 'ring-pink-300');
        });
        btn.classList.add('border-sky-500', 'ring-2', 'ring-sky-300');

        generateCanvasPhotoboxFinal();
    });
});

let cachedImgObjects = null;

function generateCanvasPhotoboxFinal() {
    if (!canvasHasil) return;
    const ctx = canvasHasil.getContext('2d');
    const width = 640;
    const height = 1840;
    canvasHasil.width = width;
    canvasHasil.height = height;

    if (cachedImgObjects && cachedImgObjects.length === 4) {
        drawToyStoryPhotobox(ctx, cachedImgObjects, width, height);
    } else {
        let loadedCount = 0;
        let imgObjects = [];

        state.daftarFoto.forEach((src, idx) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = src;
            img.onload = () => {
                imgObjects[idx] = img;
                loadedCount++;
                if (loadedCount === 4) {
                    cachedImgObjects = imgObjects;
                    drawToyStoryPhotobox(ctx, imgObjects, width, height);
                }
            };
        });
    }
}

function drawRoundedRect(ctx, x, y, w, h, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
}

// --- VECTOR DRAWING TOY STORY HELPERS ---

// Awan Khas Kamar Andy ☁️
function drawToyStoryCloud(ctx, cx, cy, size) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    // Lingkaran utama awan Andy
    ctx.arc(cx, cy, size * 0.42, 0, Math.PI * 2);
    ctx.arc(cx - size * 0.38, cy + size * 0.05, size * 0.28, 0, Math.PI * 2);
    ctx.arc(cx + size * 0.38, cy + size * 0.05, size * 0.28, 0, Math.PI * 2);
    ctx.arc(cx - size * 0.18, cy + size * 0.15, size * 0.25, 0, Math.PI * 2);
    ctx.arc(cx + size * 0.18, cy + size * 0.15, size * 0.25, 0, Math.PI * 2);
    ctx.fill();

    // Bayangan lembut kartun
    ctx.fillStyle = 'rgba(2, 132, 199, 0.12)';
    ctx.beginPath();
    ctx.arc(cx, cy + size * 0.12, size * 0.35, 0.2, Math.PI - 0.2);
    ctx.fill();
    ctx.restore();
}

// Bintang Lencana Sheriff Woody ⭐
function drawSheriffStar(ctx, cx, cy, r) {
    ctx.save();
    ctx.fillStyle = '#f59e0b';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2.5;

    const points = 5;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
        const radius = (i % 2 === 0) ? r : r * 0.45;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Lingkaran kecil khas di tiap ujung bintang koboi
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

    // Pusat lencana
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

// Corak Bintik Sapi Rompi Woody 🐄
function drawCowhideSpot(ctx, cx, cy, rx, ry, rot) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.ellipse(rx * 0.4, ry * 0.4, rx * 0.5, ry * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

// Alien Hijau Mata Tiga Pizza Planet 🛸👾
function drawToyAlien(ctx, cx, cy, size) {
    ctx.save();
    // Antena
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

    // Kepala Alien
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.ellipse(cx, cy - size * 0.2, size * 0.7, size * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Telinga
    ctx.beginPath();
    ctx.ellipse(cx - size * 0.7, cy - size * 0.2, size * 0.25, size * 0.12, -Math.PI / 6, 0, Math.PI * 2);
    ctx.ellipse(cx + size * 0.7, cy - size * 0.2, size * 0.25, size * 0.12, Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    // 3 Mata Lucu
    const eyePositions = [-size * 0.32, 0, size * 0.32];
    eyePositions.forEach(ox => {
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

    // Senyum Ramah
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy - size * 0.05, size * 0.22, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.restore();
}

// Stroberi Kartun Manis untuk Lotso 🍓
function drawCartoonStrawberry(ctx, cx, cy, size) {
    ctx.save();
    // Buah stroberi
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.moveTo(cx, cy - size * 0.35);
    ctx.bezierCurveTo(cx - size * 0.55, cy - size * 0.35, cx - size * 0.6, cy + size * 0.2, cx, cy + size * 0.6);
    ctx.bezierCurveTo(cx + size * 0.6, cy + size * 0.2, cx + size * 0.55, cy - size * 0.35, cx, cy - size * 0.35);
    ctx.fill();

    // Bintik biji stroberi
    ctx.fillStyle = '#fef08a';
    for (let row = -1; row <= 1; row++) {
        for (let col = -1; col <= 1; col++) {
            ctx.beginPath();
            ctx.arc(cx + col * size * 0.22, cy + row * size * 0.22 + 4, size * 0.04, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Daun mahkota hijau
    ctx.fillStyle = '#4ade80';
    for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.ellipse(cx + i * size * 0.15, cy - size * 0.38, size * 0.15, size * 0.08, (i * Math.PI) / 8, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

// Bola Pixar Luxo (Yellow Ball with Blue Band & Red Star) 🟡🔴⭐️
function drawLuxoBall(ctx, cx, cy, r) {
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

    // Garis pita tengah biru
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(cx - r, cy - r * 0.32, r * 2, r * 0.64);

    // Bintang Merah di tengah
    ctx.fillStyle = '#dc2626';
    const starPoints = 5;
    ctx.beginPath();
    for (let i = 0; i < starPoints * 2; i++) {
        const radius = (i % 2 === 0) ? r * 0.45 : r * 0.2;
        const angle = (i * Math.PI) / starPoints - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// Tulisan Tanda Tangan Khas "ANDY" ✍️
function drawAndySignature(ctx, cx, cy, color) {
    ctx.save();
    ctx.fillStyle = color || '#1e293b';
    ctx.font = 'bold 30px "Fredoka", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '6px';
    ctx.fillText("И D Y", cx, cy);
    ctx.restore();
}

// Ornamen sudut sesuai tema Toy Story
function drawToyStoryCornerDecor(ctx, cx, cy, theme) {
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
}

// --- FUNGSI UTAMA RENDER CANVAS PHOTOBOX TOY STORY ---
function drawToyStoryPhotobox(ctx, imgs, width, height) {
    const theme = TEMA_CONFIG[state.temaFrame] || TEMA_CONFIG.andys_room;

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, theme.bgStart);
    bgGrad.addColorStop(0.5, '#ffffff');
    bgGrad.addColorStop(1, theme.bgEnd);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Background Pattern Spesifik Tiap Tema
    if (theme.themeType === 'andys_room') {
        // Taburan Awan Wallpaper Andy di Latar Belakang
        for (let row = 0; row < 14; row++) {
            const y = 80 + row * 135;
            const offset = (row % 2 === 0) ? 60 : 160;
            for (let col = -1; col < 5; col++) {
                const x = offset + col * 200;
                drawToyStoryCloud(ctx, x, y, 64);
            }
        }
    } else if (theme.themeType === 'woody') {
        // Pola Kotak-Kotak Kemeja Kuning Woody + Corak Sapi
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

        // Bercak Sapi di Pinggiran
        drawCowhideSpot(ctx, 30, 200, 24, 18, 0.4);
        drawCowhideSpot(ctx, width - 28, 480, 28, 20, -0.3);
        drawCowhideSpot(ctx, 32, 900, 26, 19, 0.6);
        drawCowhideSpot(ctx, width - 30, 1300, 30, 22, -0.5);
    } else if (theme.themeType === 'buzz') {
        // Bintang Luar Angkasa & Kilauan Futuristik
        for (let i = 0; i < 45; i++) {
            const px = (i * 97) % width;
            const py = (i * 131) % height;
            ctx.fillStyle = (i % 2 === 0) ? 'rgba(34, 197, 94, 0.25)' : 'rgba(168, 85, 247, 0.22)';
            ctx.beginPath();
            ctx.arc(px, py, 2.5 + (i % 3), 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (theme.themeType === 'alien') {
        // Luar Angkasa Pizza Planet
        for (let i = 0; i < 50; i++) {
            const px = (i * 83) % width;
            const py = (i * 127) % height;
            ctx.fillStyle = (i % 3 === 0) ? '#4ade80' : '#ffffff';
            ctx.globalAlpha = 0.4 + (i % 4) * 0.15;
            ctx.beginPath();
            ctx.arc(px, py, 1.8 + (i % 2), 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    } else if (theme.themeType === 'lotso') {
        // Stroberi Mini di Latar Belakang
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

    // Ikon di atas pita
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("⭐  🚀  🧸  🤠  ⭐", width / 2, 25);

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
    ctx.fillText("🧸 TOY STORY PHOTOBOX ARCADE 🧸", width / 2, 67);

    // Judul Utama Tema
    ctx.fillStyle = theme.textColor;
    ctx.font = 'bold 27px sans-serif';
    ctx.fillText(theme.title, width / 2, 108);

    // Cetak Gelar Resmi dari Mesin Gacha Toy Story
    ctx.font = 'bold 13.5px sans-serif';
    ctx.fillStyle = theme.primaryAccent;
    ctx.fillText(`✦ ${state.gelarUser || 'SPACE RANGER TERBAIK SE-GALAKSI'} ✦`, width / 2, 134);

    // 7. Render 4 Foto Polaroid Strip
    const slotWidth = width - 96;
    const slotHeight = 310;
    const startY = 160;
    const gap = 34;

    imgs.forEach((img, idx) => {
        const y = startY + (idx * (slotHeight + gap));
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
            renderX = (x + 6) + ((slotWidth - 12) - renderW) / 2;
            renderY = y + 6;
        } else {
            renderW = slotWidth - 12;
            renderH = renderW / imgAspect;
            renderX = x + 6;
            renderY = (y + 6) + ((slotHeight - 12) - renderH) / 2;
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
    const footerY = startY + (4 * (slotHeight + gap)) + 10;

    // Tulisan Tangan Khas "ANDY" di telapak sepatu
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
    ctx.fillText(`NO. TOY-${Math.floor(100000 + Math.random() * 900000)} • OFFICIAL SPECIAL EDITION`, width / 2, footerY + 134);

    ctx.font = '22px sans-serif';
    ctx.fillText("🤠  🚀  ☁️  🛸  🍓  🧸  ⭐", width / 2, footerY + 164);
}

function drawAestheticBarcode(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    const barPattern = [
        3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 4, 1, 
        2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 3, 1, 2, 4, 2, 1, 3, 1, 2, 4
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
}

if (btnDownloadHasil) {
    btnDownloadHasil.addEventListener('click', () => {
        sfx.playFanfare();
        const link = document.createElement('a');
        const safeNama = (state.namaUser || 'player').toLowerCase().replace(/[^a-z0-9]/g, '_');
        link.download = `photobox-toystory-${state.temaFrame}-${safeNama}.png`;
        link.href = canvasHasil.toDataURL('image/png');
        link.click();
    });
}

if (btnUlangi) {
    btnUlangi.addEventListener('click', () => {
        sfx.playPop();
        location.reload();
    });
}