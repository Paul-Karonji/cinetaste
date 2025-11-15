import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E50914",
        secondary: "#221F1F",
        accent: "#F5F5F5",
        highlight: "#B81D24",
        background: "#121212",
      },
    },
  },
  plugins: [],
};
export default config;
