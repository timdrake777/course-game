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
        "button-ok": '0 0 6px rgba(52, 211, 153, 0.8)'
      }
    },
  },
  plugins: [],
};
