/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#6d28d9",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar": {
          "&-none": {
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
          "&-show": {
            "&::-webkit-scrollbar": {
              display: "block",
              height: "13px",
              "background-color": "#cbd5e1",
              "border-radius": "10px",
              cursor: "pointer",
            },
            "&::-webkit-scrollbar-thumb": {
              "background-color": "#8b5cf6",
              "border-radius": "10px",
              cursor: "pointer",
            },
          },
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
