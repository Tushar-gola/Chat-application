/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx}", "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-debug-screens")],
  theme: {
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      sen: ["Sen", "sans-serif"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
      },
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      transitionTimingFunction: {
        "ease-custom-in-out": "cubic-bezier(0.53, -0.01, 0, 0.97)",
      },
      variants: {
        backgroundColor: ["responsive", "hover", "focus", "checked"],
      },
    },
  },
};
