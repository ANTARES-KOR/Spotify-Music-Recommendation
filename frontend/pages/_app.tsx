import type { AppProps } from "next/app";
import Script from "next/script";
import { useState } from "react";
import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { global } from "../styles/global";
import { TokenProvider } from "../context/TokenContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <TokenProvider>
      <QueryClientProvider client={queryClient}>
        <Global styles={global} />
        <Script src="https://sdk.scdn.co/spotify-player.js" />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </TokenProvider>
  );
}

export default MyApp;
