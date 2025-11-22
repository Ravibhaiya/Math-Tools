/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka_600SemiBold'],
        nunito: ['Nunito_600SemiBold'],
        inter: ['Inter_400Regular'],
        'space-grotesk': ['SpaceGrotesk_700Bold'],
        'source-code': ['SourceCodePro_400Regular'],
      },
      colors: {
        border: 'hsl(0, 0%, 0%)',
        input: 'hsl(0, 0%, 0%)',
        ring: 'hsl(262, 83%, 58%)',
        background: 'hsl(260, 100%, 99%)',
        foreground: 'hsl(0, 0%, 0%)',
        primary: {
          DEFAULT: 'hsl(262, 83%, 58%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(190, 90%, 50%)',
          foreground: 'hsl(0, 0%, 0%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 80%, 60%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        muted: {
          DEFAULT: 'hsl(260, 20%, 96%)',
          foreground: 'hsl(260, 10%, 40%)',
        },
        accent: {
          DEFAULT: 'hsl(50, 100%, 50%)',
          foreground: 'hsl(0, 0%, 0%)',
        },
        popover: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(0, 0%, 0%)',
        },
        card: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(0, 0%, 0%)',
        },
      },
      borderRadius: {
        lg: '1rem',
        md: 'calc(1rem - 2px)',
        sm: 'calc(1rem - 4px)',
      },
    },
  },
  plugins: [],
}
