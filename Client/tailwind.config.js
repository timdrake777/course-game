/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        main: "1030px",
      },
      minWidth: {
        main: "1030px",
      },

      dropShadow: {
        "button-ok": "0 0 6px rgba(52, 211, 153, 0.8)",
        "button-alert": "0 0 6px rgba(220, 38, 38, 0.9)",
      },

      keyframes: {
        "newMessage": {
          "0%": { opacity: "0", top: 12 },
          "20%": { opacity: "1", top: -27 },
          "100%": { opacity: "0"},
        },
      },

      animation: {
        "btn": "newMessage 2s ease-in-out",
      },

      
    },
  },
  plugins: [],
};
