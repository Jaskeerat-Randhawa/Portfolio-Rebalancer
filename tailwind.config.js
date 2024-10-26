/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "green-1": "#1E201E",
        "green-2": "#3C3D37",
        "green-3": "#697565",
        "beige": "#ECDFCC",
        "grey": "#F3F3F3"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: []
};
