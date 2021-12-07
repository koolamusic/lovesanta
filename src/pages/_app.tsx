import { AppProps } from 'next/app';
import * as React from 'react';
import Router from 'next/router';
import progress from 'nprogress';
import { GlobalStyle } from '@/components/GlobalStyle';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { ScaleFade } from '@chakra-ui/react';

/* Configure N-progress Routing Feedback */
progress.configure({ showSpinner: false });

/* ------Apply NextJs Custom Routing------ */
Router.events.on('routeChangeStart', () => progress.start());
Router.events.on('routeChangeComplete', (_url) => {
  progress.done();
});
Router.events.on('routeChangeError', () => progress.done());

function App({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <ThemeProvider cookies={pageProps.cookies}>
      <GlobalStyle />
      <ScaleFade key={router.route} initialScale={0.9} in={true}>
        <Component {...pageProps} />
      </ScaleFade>
    </ThemeProvider>
  );
}

export default App;
export { getServerSideProps } from '@/theme/ThemeProvider';
