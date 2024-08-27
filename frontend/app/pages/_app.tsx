import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Header from '../components/layouts/header/Header';
import theme from '../theme/theme';
import { ThemeProvider } from '@mui/material';
import 'tailwindcss/tailwind.css';
import { wrapper } from '../stores/store';
import {Provider} from 'react-redux';

function MyApp({ Component, ...rest }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* TODO 「画面高さ - ヘッダーの高さ」の指定 */}
        <Header />
        <Component {...props} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
