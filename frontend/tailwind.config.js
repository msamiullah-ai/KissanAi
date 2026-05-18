import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#0B3D24',
        mint: '#A8F0C6',
        olive: '#6B8E23',
        meadow: '#1E5D3E',
        pine: '#0A2A18',
      },
      boxShadow: {
        glow: '0 20px 70px rgba(10, 73, 39, 0.25)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(168,240,198,0.25), transparent 35%), linear-gradient(180deg, rgba(16,38,18,0.95), rgba(5,15,8,0.95))',
      },
    },
  },
  plugins: [],
} satisfies Config;
