import type { AppProps } from 'next/app'
import Script from 'next/script';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Script src="https://sdk.scdn.co/spotify-player.js"/>
      <Component {...pageProps} />
    </SessionProvider>
    )
}

export default MyApp
