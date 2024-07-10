/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/ui/forms/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto", "system-ui", "sans-serif"],
      display: ["Solway", "system-ui", "sans-serif"],
    },
    screens: {
      sm: { max: "320px" },
      lg: { min: "480px" },
    },
    extend: {
      colors: {
        primary: "#7343D9",
        brd: "rgba(255, 255, 255, 0.1)",
        "backdrop-secondary": "rgb(34,33,36)",
        "btn-red": "rgba(234, 74, 74, 0.2)",
        "btn-green": "#16AD53",
        "btn-yellow": "#faab06",
        "btn-purple": "#7343D9",
        "btn-gray": "rgba(255, 255, 255, 0.15)",
        "btn-disabled": "rgba(14, 14, 14, 0.4)",
      },
      fontSize: {
        "2xs": ["0.5rem", "0.75rem"],
        "3xs": ["0.45rem", "0.45rem"],
        h1: ["38px", { lineHeight: "38px", letterSpacing: "-0.025em" }],
        h2: ["26px", { lineHeight: "34px", letterSpacing: "-0.01em" }],
        h3: ["22px", { lineHeight: "28px" }],
        h4: ["16px", { lineHeight: "24px" }],
        h5: ["13px", { lineHeight: "14px" }],
        t0: ["20px", { lineHeight: "24px" }],
        t2: ["14px", { lineHeight: "18px" }],
        t3: ["12px", { lineHeight: "14px" }],
        t4: ["10px", { lineHeight: "12px" }],
        t5: ["8px", { lineHeight: "12px" }],
      },
      backgroundImage: {
        tonchemy: 'url("/images/bg_tonchemy.jpg")',
        tonchemy2: 'url("/images/bg_tonchemy2.jpg")',
        "sunburst-success": 'url("/images/bg_sunburst_success.jpg")',
        "sunburst-fail": 'url("/images/bg_sunburst_fail.jpg")',
        "sunburst-reward": 'url("/images/bg_sunburst_reward.jpg")',
        "sunburst-purple": 'url("/images/bg_sunburst_purple.jpg")',
        sunburst: "url('/images/light.svg')",
        // "btn-purple": "linear-gradient(180deg, #7343D9 0%, #8735F0 100%)",
        "tab-active":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60.37%)",
        "radial-purple":
          "radial-gradient(26.15% 21.43% at 50% 43.97%, #D04AFF 0%, rgba(47, 93, 255, 0) 100%)",
        "radial-green":
          "radial-gradient(21.92% 20.4% at 50% 43.66%, #1FE91B 0%, rgba(107, 255, 166, 0) 100%)",
        "radial-blue":
          "radial-gradient(26.15% 21.43% at 50% 43.97%, #4AB3FF 0%, rgba(67, 108, 255, 0) 100%)",
        "radial-red":
          "radial-gradient(26.15% 21.43% at 50% 43.97%, #FF4004 0%, rgba(255, 27, 27, 0) 100%)",
      },
      borderRadius: {
        DEFAULT: "12px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        "btn-default": "0px -4px 0px 0px rgba(0, 0, 0, 0.25) inset", //, 0px 0px 2px 0px rgba(255, 255, 255, 1) inset
        "btn-active": "0px 4px 0px 0px rgba(0, 0, 0, 0.25) inset",
        "button-disabled": "0px 0px 0px 1px rgba(255, 255, 255, 0.15) inset",
        "border-top": "0px 1px 0px 0px rgba(255, 255, 255, 0.2) inset",
        "border-bottom": "0px 0px 1px 0px rgba(255, 255, 255, 0.2) inset",
        "border-10": "0px 0px 0px 1px rgba(255, 255, 255, 0.1) inset",
        "border-20": "0px 0px 0px 1px rgba(255, 255, 255, 0.2) inset",
        "border-25": "0px 0px 0px 1px rgba(255, 255, 255, 0.25) inset",
        "border-25-2": "0px 0px 0px 2px rgba(255, 255, 255, 0.25) inset",
        "border-element-card": "rgba(255, 255, 255, 0.35)",
        "border-40": "0px 0px 0px 1px rgba(255, 255, 255, 0.4) inset",
        "border-40-2": "0px 0px 0px 2px rgba(255, 255, 255, 0.4) inset",
        "border-selected": "0px 0px 0px 1.5px rgba(57, 222, 103, 0.65) inset",
        "border-error": "0px 0px 0px 1px #BA1C12 inset",
        "craft-chance":
          "0px 0px 0px 1px rgba(255, 255, 255, 0.25) inset, 0px 2px 4px 0px #00000040",
        "gift-regular": "0px 0px 0px 1px rgba(255, 255, 255, 0.1)",
        "gift-gold": "0px 0px 0px 2px #F1BD18",
        // tooltip: "0px 6px 20px 0px #000000A6, 0px 0px 1px 0px #FFFFFFA6 inset",
      },
      dropShadow: {
        "button-label": "0px 1px 1px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [
    function ({ addVariant, e }) {
      addVariant("activeAfter", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`activeAfter${separator}${className}`)}:active::after`;
        });
      });
    },
  ],
};
