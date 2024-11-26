/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        backgroundMain: "linear-gradient(180deg, rgba(0,35,149,1) 0%, rgba(12,74,110,1) 35%, rgba(12,74,110,1) 100%)", 
      },
      colors: {
        "dark-french-blue": "#002395",
        red: "#FF0000",
      },
      screens: {
        tablet: '600px',
        laptop: '1280px',
        largeScreen: '1400px',
      },
    },
    textTransform: {
      uppercase: "uppercase",
    },
  },
  plugins: [],
  
  variants: {

    extend: {

      backgroundColor: ["dark-french-blue"],
      bg: ["dark-french-blue"],
    },

  },
};
