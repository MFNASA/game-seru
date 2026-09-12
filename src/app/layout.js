import './globals.css';
import { Fredoka, Quicksand } from 'next/font/google';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata = {
  title: 'Photobox Gemas & Arcade Kuis Gombal 📸✨',
  description: 'Abadikan 4 pose tercantikmu, mainkan aneka mini-game seru, dan cetak strip photobox kartun Toy Story spesial!',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${fredoka.variable} ${quicksand.variable}`}>
      <body className="text-zinc-800 font-sans min-h-screen p-3 sm:p-4 flex items-center justify-center relative overflow-x-hidden selection:bg-pink-300 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}
