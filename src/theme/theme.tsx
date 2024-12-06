import { extendTheme, ChakraTheme } from '@chakra-ui/react';

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '69em',
  xl: '96em',
  '2xl': '134em',
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  cssVarPrefix: 'love-di',
};

export const theme: Partial<ChakraTheme> = extendTheme({
  config,
  fonts: {
    body: `"Sole Sans", Inter, Segoe UI, Oxygen, Ubuntu, Roboto, Fira Sans, Helvetica Neue, system-ui, sans-serif`,
    heading: `"Pixeboy", Inter, Cantarell, Oxygen, Ubuntu, system-ui, sans-serif`,
    menu: `"Sole Sans", Inter, Cantarell, Oxygen, Ubuntu, system-ui, monospace`,
    mono: 'Sole Sans, system-ui, monospace',
  },
  colors: {
    background: '#ffffff',
    dark: 'gray.900',
    black: '#16161D',
    grey: '#959595',
    text: '#222222',
    whiteAlpha: {
      // 400: 'rgba(255, 255, 255, 0.24)'
      300: 'rgba(255, 255, 255, 0.54)',
      // 400: 'red'
    },
    /* I hacked this out of lazinees :( so that the hover and focus */
    /* of input fields that inherit from the blue color scheme can default to black */
    blue: {
      200: '#000',
      300: '#000',
      400: '#000',
      500: '#000',
      600: '#000',
      700: '#000',
    },

    bg: {
      svg: '#123749',
      dark: 'gray.900',
      white: '#FFFFFF',
      banner: '#E5F5EE',
      cream: '#FFFAEF',
      paleGreen: '#CDF5E8',
      palePurple: '#E5E0FF',
      lightBlue: '#DEF7FF',
      lightGreen: '#F5FFF9',
      lightOrange: '#FFE6DE',
      lightPink: '#F9ECF1',
      prefooter: '#123749',
      yellow: '#FFDC85',
      pink: '#FFF5FB',
      darkPink: '#FAD2E1',
      zendesk: '#f9e9b1',
      lightYellow: '#FFFCF6',
      lightTeal: '#F3FCF8',
      teal: '#EDF8F3',
    },
    brand: {
      boxShadow: '4px 5px 2px 000000',
      gray: 'rgba(77, 77, 77, 0.089)',
      background: '#FFFCFE',
    },
    gray: {
      20: '#f9f9f9',
      30: '#f2f2f2',
      200: '#eeeeeee',
      700: '#222222',
      800: '#111111',
    },
    brandBlue: {
      500: '#3444F1',
      600: '#3444F1',
    },
    primary: {
      500: '#00B268',
      600: 'rgb(47, 133, 90)',
    },
  },
  breakpoints,
  fontSizes: {
    xs: '0.75rem',
    sm: '0.925rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.3rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
  borders: {
    default: '1px solid #0e1b7a',
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
    soft: '0px 8px 16px 5px rgba(0, 42, 63, 0.12)',
  },
  components: {
    Button: {
      baseStyle: {
        boxShadow: '4px 5px 0px 000000',
        letterSpacing: '.5px',
      },
      defaultProps: {
        size: 'lg',
        variant: 'outline',
        colorScheme: 'yellow',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '600',
      },
      sizes: {
        small: {
          fontSize: '20px',
        },
        medium: { fontSize: '25px' },
        large: { fontSize: '30px' },
      },
    },
  },
  styles: {
    global: {
      'html, #__next': {
        height: '100%',
        fontFamily: 'Pixeboy',
        letterSpacing: '.3px',
      },
      p: {
        fontFamily: 'Sole Sans',
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
      },
      '.body': {
        overflowY: 'scroll', // Always show scrollbar to avoid flickering
      },
      html: {
        scrollBehavior: 'smooth',
      },
    },
  },
});
