import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '../store';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import Head from 'next/head';
import '../i18n';
import type { Session } from 'next-auth';

interface CustomPageProps {
  session: Session | null;
  [key: string]: unknown;
}

interface MyAppProps extends AppProps {
  pageProps: CustomPageProps;
}
<Head>
  <link rel="icon" href="/favicon.ico" />
  <meta name="theme-color" content="#ffffff" />
</Head>

export default function App({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <AnimatedBackground />
        <Component {...pageProps} />
      </ReduxProvider>
    </SessionProvider>
  );
}
