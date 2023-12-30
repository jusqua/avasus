/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        "neutral": "#707070",
        "neutral-content": "#FFFFFF",
        "base-content": "#2F2E41",
        "primary": "#D2202C",
      }
    }]
  }
}

