// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // Set the initial color mode to 'dark'
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#090909', // Set the background color for the entire app
      },
    },
    fonts: {
      body: '"Black Han Sans", sans-serif',
      heading: '"Black Han Sans", sans-serif',
    },
    
  },
});

export default theme;