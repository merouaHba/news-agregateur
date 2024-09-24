/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          text: '#000', // Text color for light mode
          background: '#e6eaef', // Main background for light mode
          secondary: '#FFF', // Secondary background for light mode
        },
        dark: {
          text: '#fff', // Text color for dark mode
          background: '#252a32', // Main background for dark mode
          secondary: '#202124', // Secondary background for dark mode
        }

      },
    },
  },
  plugins: [],
}