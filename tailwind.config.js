/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans-stack)', 'ui-sans-serif', 'system-ui'],
        heading: ['var(--font-heading-stack)', 'var(--font-sans-stack)'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
