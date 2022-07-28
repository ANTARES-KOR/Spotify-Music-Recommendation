import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { global } from "../styles/global";
import { TokenProvider, useToken } from "../context/TokenContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const token = useToken();
  console.log("_app.tsx", token);
  useEffect(() => {
    console.log("useEffect of _app.tsx", token);
  });
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
