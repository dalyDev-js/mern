/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
module.exports = {
  content: [
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
<<<<<<< HEAD
  plugins: [require("flowbite/plugin")],
=======
  plugins: [require("flowbite/plugin"), daisyui],
>>>>>>> adc2119ca6e787470a7169eb263d2166e8317f7b
};
