import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  extend: {
    fontFamily: {
      poppins: "var(--font-poppins)",
    },
    colors: {
      primary: "#43b771",
      primarySoft: "rgba(67,183,113,0.17)",
    },
  },
},
  plugins: [],
}

export default config
