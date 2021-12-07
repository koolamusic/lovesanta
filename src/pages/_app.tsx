import { AppProps } from 'next/app';
import * as React from 'react';
import Router from 'next/router';
import progress from 'nprogress';
import { GlobalStyle } from '@/components/GlobalStyle';
import { ThemeProvider } from '@/theme/ThemeProvider';

/* Configure N-progress Routing Feedback */
progress.configure({ showSpinner: false });

/* ------Apply NextJs Custom Routing------ */
Router.events.on('routeChangeStart', () => progress.start());
Router.events.on('routeChangeComplete', (_url) => {
  progress.done();
});
Router.events.on('routeChangeError', () => progress.done());

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider cookies={pageProps.cookies}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
export { getServerSideProps } from '@/theme/ThemeProvider';
