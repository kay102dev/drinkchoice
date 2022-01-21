module.exports = {
  content: ["./src/*.{html,js, tsx}", "./src/**/*.{html,js,jsx,ts,tsx}", "./src/index.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
