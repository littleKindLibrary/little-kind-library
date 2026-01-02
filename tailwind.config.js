const fs = require("fs");
const path = require("path");

// 1. Loading Theme Tokens based on documentation
const themePath = path.join(__dirname, "data/theme.json");
const themeRead = fs.readFileSync(themePath, "utf8");
const theme = JSON.parse(themeRead);

// Helper to strip px
function stripPx(value) {
  return Number(value.replace("px", ""));
}

let font_base = stripPx(theme.fonts.font_size.base);
let font_scale = Number(theme.fonts.font_size.scale);

// Calculating Headings based on Modular Scale
let h6 = font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;

// Font Family Logic
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
if (theme.fonts.font_family.primary) {
  fontPrimary = theme.fonts.font_family.primary.split(":")[0];
  fontPrimaryType = theme.fonts.font_family.primary_type;
}
if (theme.fonts.font_family.secondary) {
  fontSecondary = theme.fonts.font_family.secondary.split(":")[0];
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./hugo_stats.json",
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./themes/**/layouts/**/*.html",
  ],
  safelist: [{ pattern: /^swiper-/ }],
  darkMode: "class",
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        text: theme.colors.default.text_color.text,
        light: theme.colors.default.text_color.text_light,
        dark: theme.colors.default.text_color.text_dark,
        primary: theme.colors.default.theme_color.primary,
        secondary: theme.colors.default.theme_color.secondary,
        body: theme.colors.default.theme_color.body,
        border: theme.colors.default.theme_color.border,
        "theme-light": theme.colors.default.theme_color.light,
        "theme-dark": theme.colors.default.theme_color.dark,
      },
      fontSize: {
        base: font_base + "px",
        h1: h1 + "px",
        h2: h2 + "px",
        h3: h3 + "px",
        h4: h4 + "px",
        h5: h5 + "px",
        h6: h6 + "px",
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
      },
    }),
    // The Critical RTL Plugin
    require("tailwindcss-rtl"),
  ],
};