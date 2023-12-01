import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Header from '../components/layouts/header/Header';
import theme from '../theme/theme';
import { ThemeProvider } from '@mui/material';
import 'tailwindcss/tailwind.css';
import { wrapper } from '../stores/store';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);
  return (
    // 「JSX expressions must have one parent element.」対策に<>を導入
    <>
      <ThemeProvider theme={theme}>
        {/* TODO 「画面高さ - ヘッダーの高さ」の指定 */}
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
