const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    flowbite.content(),
  ],
  plugins: [
    // ...
    flowbite.plugin(),
  ],
  // theme: {
  //   colors: {
  //     "color1": "#78B3CE",
  //     "color2": "#C9E6F0",
  //     "color3": "#FBF8EF",
  //     "color4":"#F96E2A",
  //   }
  // }
};
