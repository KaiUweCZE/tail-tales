import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-fredoka)"],
      },
    },
  },
  plugins: [],
  safelist: [
    {
      // bacground
      pattern:
        /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]+/,
      variants: ["hover"],
    },
    {
      // text-color
      pattern:
        /text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]+/,
      variants: ["hover"],
    },
    {
      // Width a height
      pattern: /[wh]-([0-9]+|full|screen|min|max|fit)/,
    },
    {
      // Margin a padding
      pattern: /[mp][tlrxy]?-[0-9]+/,
    },
    {
      // Flex a Grid
      pattern: /(flex|grid)-(row|col|wrap|nowrap|1|auto|initial|none)/,
    },
    {
      // Border radius
      pattern: /rounded(-[tlrb][lr])?-([0-9]+|full|none)/,
    },
    {
      // Border width
      pattern: /border(-[tlrb])?-[0-9]+/,
    },
    {
      // Font size
      pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/,
    },
    {
      // Font weight
      pattern:
        /font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/,
    },
    {
      // Gap
      pattern: /gap-[0-9]+/,
    },
    {
      // Opacity
      pattern: /opacity-[0-9]+/,
    },
    //  transition
    {
      pattern: /transition(-all|-colors|-opacity|-shadow|-transform)?/,
    },

    //transform
    {
      pattern: /(scale|rotate|translate)-[0-9]+/,
    },

    // overflow
    {
      pattern: /overflow-(auto|hidden|visible|scroll)/,
    },

    {
      // Positon
      pattern: /(static|fixed|absolute|relative|sticky)/,
    },
    {
      // Top, Right, Bottom, Left
      pattern: /[trbl]-(0|auto|full)/,
    },

    {
      // Z-index
      pattern: /z-[0-9]+/,
    },
    {
      // List styles
      pattern:
        /list-(none|disc|decimal|square|inside|outside)|list-image-[a-zA-Z0-9]+/,
    },
    {
      // Shadow
      pattern: /shadow(-sm|-md|-lg|-xl|-2xl|-inner|-none)?/,
    },
    {
      // Cursor
      pattern: /cursor-(pointer|default|wait|text|move|not-allowed|help|none)/,
    },
  ],
};
export default config;
