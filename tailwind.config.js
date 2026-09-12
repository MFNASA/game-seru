/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: '#fff0f5',
        bubblegum: '#ff70a6',
        lilacSoft: '#ede9fe',
        butterSoft: '#fef9c3',
        mintSoft: '#d1fae5',
      },
      fontFamily: {
        heading: ['var(--font-fredoka)', 'Fredoka', 'cursive', 'sans-serif'],
        sans: ['var(--font-quicksand)', 'Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
