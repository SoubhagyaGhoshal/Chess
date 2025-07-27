export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      flexbox: 'no-2009',
      grid: 'autoplace',
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead'
      ]
    },
  },
}
