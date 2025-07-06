// tailwind.config.js
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
// tailwind.config.js
module.exports = {
  darkMode: 'class', // enables dark mode via 'class'
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // adjust path if needed
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        primary: 'hsl(var(--primary))',
        accent: 'hsl(var(--accent))',
      },
    },
  },
  plugins: [],
}
