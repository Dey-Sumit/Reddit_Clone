module.exports = {
   purge: ['./src/**/*.tsx'],
   darkMode: false, // or 'media' or 'class'
   theme: {
      fontFamily: {
         body: ['IBM Plex Sans'],
      },

      extend: {
         colors: {
            //TODO add blue
         },
         spacing: {
            70: '17.5rem',
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
}
