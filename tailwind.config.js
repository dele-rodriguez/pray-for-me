/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['Josefin Sans', 'sans'],
        frank: ['Frank Ruhl Libre', 'serif'],
      },
      colors: {
        'green': '#08C16F',
        'yellow': '#EDB103',
        'red': '#DB3131',
      },
    },
  },
  plugins: [],
}

