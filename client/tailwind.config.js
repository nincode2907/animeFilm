/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          400: "#E14D2A",
        },
        slate: {
          50: "#EEE3CB",
        },
      },
      boxShadow: {
        full: "0 0 5px 5px rgba(0,0,0,0.5)",
        infull: "inset 0 0 3px 3px rgba(0,0,0,0.5)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
