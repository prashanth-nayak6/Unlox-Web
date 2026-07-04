/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- Outpro.India brand tokens (placeholder brand kit) ----
        ink: {
          DEFAULT: "#0B1220",   // near-black navy — primary dark surface
          50: "#F4F6F9",
          100: "#E3E8EF",
          400: "#5B6B85",
          700: "#1B2740",
          900: "#0B1220",
        },
        paper: "#F6F5F1",        // warm off-white surface (not pure white)
        signal: {
          DEFAULT: "#E8A33D",   // amber "operational signal" accent
          dim: "#B87F26",
          light: "#FBDFA8",
        },
        ledger: {
          DEFAULT: "#1F6F5C",   // deep teal — used for KPI/positive-metric accents
          light: "#DCEEE9",
        },
        line: "#D9D4C7",         // hairline border on paper surfaces
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        rise: {
          "0%": { opacity: 0, transform: "translateY(14px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        rise: "rise 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
