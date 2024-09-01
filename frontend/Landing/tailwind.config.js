/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "rgb(103, 103, 103)",
      },
    },
    fontFamily: {
      main: ["Inter", "system-ui"],
    },
  },
  plugins: [daisyui],
};
