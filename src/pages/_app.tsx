import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import "../i18n";
import type { Session } from "next-auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // used for Tailwind
});

interface CustomPageProps {
  session: Session | null;
  [key: string]: unknown;
}

interface MyAppProps extends AppProps {
  pageProps: CustomPageProps;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  return (
    <html lang="en" className={inter.variable}>
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <title>PGAGI Analytics Dashboard</title>
      </Head>
      <body>
        <SessionProvider session={session}>
          <ReduxProvider store={store}>
            <AnimatedBackground />
            <Component {...pageProps} />
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
