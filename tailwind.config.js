/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        // Catppuccin Mocha
        'base': '#1e1e2e',
        'mantle': '#181825',
        'crust': '#11111b',
        'surface': {
          '0': '#313244',
          '1': '#45475a',
          '2': '#585b70',
        },
        'overlay': {
          '0': '#6c7086',
          '1': '#7f849c',
          '2': '#9399b2',
        },
        'subtext': {
          '0': '#a6adc8',
          '1': '#bac2de',
        },
        'text': '#cdd6f4',
        'lavender': '#b4befe',
        'blue': '#89b4fa',
        'sapphire': '#74c7ec',
        'sky': '#89dceb',
        'teal': '#94e2d5',
        'green': '#a6e3a1',
        'yellow': '#f9e2af',
        'peach': '#fab387',
        'maroon': '#eba0ac',
        'red': '#f38ba8',
        'mauve': '#cba6f7',
        'pink': '#f5c2e7',
        'flamingo': '#f2cdcd',
        'rosewater': '#f5e0dc',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s infinite',
        'typing': 'typing 2s steps(14, end)',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        }
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.text'),
            '--tw-prose-headings': theme('colors.text'),
            '--tw-prose-links': theme('colors.blue'),
            '--tw-prose-bold': theme('colors.text'),
            '--tw-prose-code': theme('colors.peach'),
            '--tw-prose-pre-bg': theme('colors.surface.0'),
            '--tw-prose-pre-code': theme('colors.text'),
            '--tw-prose-quotes': theme('colors.overlay.1'),
            '--tw-prose-quote-borders': theme('colors.blue'),
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
