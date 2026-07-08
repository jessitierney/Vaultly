/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Vaultly Brand Typography
        montserrat: ['Montserrat', 'sans-serif'],
        bricolage: ['Bricolage Grotesque', 'sans-serif'],
      },
      colors: {
        // Vaultly Brand Colors (FINAL - FROM BRAND BOARD)
        vaultly: {
          navy: '#38506A',          // Soft Slate Navy - primary brand
          sage: '#A4B69A',          // Sage - success, organisation
          terracotta: '#C86B4A',    // Terracotta - projects, maintenance
          mustard: '#E0B14D',       // Mustard - warnings, highlights, achievements
          cream: '#F6F2EA',         // Warm Cream - selected cards, feature panels
          grey: '#E8DDCC',          // Soft Beige - light borders, neutral elements
          'forest-green': '#2F4F3E',// Forest Green - support color
          'soft-beige': '#E8DDCC',  // Soft Beige - support color
          clay: '#B98268',          // Clay - support color
          olive: '#7E8F6B',         // Olive - support color
          sand: '#D8C3A5',          // Sand - support color
        },
      },
      boxShadow: {
        soft: '0 12px 40px rgba(56, 80, 106, 0.08)',
        'soft-lg': '0 20px 60px rgba(56, 80, 106, 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
