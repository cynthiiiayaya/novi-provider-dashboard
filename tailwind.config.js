module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brandbrandyellow-01": "var(--brandbrandyellow-01)",
        "neutralsneutrals-101": "var(--neutralsneutrals-101)",
        "neutralsneutrals-501": "var(--neutralsneutrals-501)",
        "primaryimpacthigh-01": "var(--primaryimpacthigh-01)",
        "primaryimpacthigh-03": "var(--primaryimpacthigh-03)",
        "primaryimpactlow-03": "var(--primaryimpactlow-03)",
        "primaryimpactmoderate-01": "var(--primaryimpactmoderate-01)",
        "primaryimpactmoderate-03": "var(--primaryimpactmoderate-03)",
        "surfacesurfaceelevation-0": "var(--surfacesurfaceelevation-0)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "body-caption2": "var(--body-caption2-font-family)",
        "body-paragraph1": "var(--body-paragraph1-font-family)",
        "body-paragraph2": "var(--body-paragraph2-font-family)",
        "paragraph-body-2": "var(--paragraph-body-2-font-family)",
        "paragraph-caption-1": "var(--paragraph-caption-1-font-family)",
        "paragraph-caption-1-strong":
          "var(--paragraph-caption-1-strong-font-family)",
        "paragraph-caption-2": "var(--paragraph-caption-2-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
