import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderColor: {
        checked: "#4F4F4F",
      },
      colors: {
        theme: {
          primary: "#2F80ED",
          secondary: "#4F4F4F",
          accent: "#828282",
          foreground: "#E0E0E0",
        },
        indicator: {
          primary: "#F8B76B",
          secondary: "#8785FF",
          accent: "#EB5757",
          foreground: "#F2C94C",
        },
        chats: {
          "primary-background": "#FCEED3",
          "primary-foreground": "#E5A443",
          "secondary-background": "#EEDCFF",
          "secondary-foreground": "#9B51E0",
          "accent-background": "#D2F2EA",
          "accent-foreground": "#43B78D",
        },
        stickers: {
          gray: "#E9F3FF",
          orange: "#FDCFA4",
          yellow: "#F9E9C3",
          teal: "#AFEBDB",
          green: "#CBF1C2",
          purple: "#CFCEF9",
        },
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
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addVariant }: any) {
      addVariant("checked", "&:checked");
    },
  ],
} satisfies Config;

export default config;
