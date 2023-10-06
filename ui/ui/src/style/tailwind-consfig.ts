export const tailwindConfig = {
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
    hres: "1800px",
  },
  extend: {
    transitionTimingFunction: {
      "ease-custom-in-out": "cubic-bezier(1, -0.01, 0.35, 0.99)",
    },
  },
};
