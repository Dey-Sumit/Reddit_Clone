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
            160: '40rem',
         },
         container: false,
      },
   },
   variants: {
      extend: {},
   },
   plugins: [
      function ({ addComponents }) {
         addComponents({
            '.container': {
               width: '100%',
               marginLeft: 'auto',
               marginRight: 'auto',
               '@screen sm': {
                  maxWidth: '640px',
               },
               '@screen md': {
                  maxWidth: '768px',
               },
               '@screen lg': {
                  maxWidth: '975px',
               },
            },
         })
      },
   ],
}
