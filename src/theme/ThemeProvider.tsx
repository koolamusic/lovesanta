// a) import `ChakraProvider` component as well as the storageManagers
import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';
import { NextPageContext } from 'next';
import { theme } from './theme';

export function ThemeProvider({ cookies, children }: any) {
  // b) Pass `colorModeManager` prop
  const colorModeManager = typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  );
}

// also export a reusable function getServerSideProps
export function getServerSideProps({ req }: NextPageContext) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req?.headers.cookie ?? '',
    },
  };
}
