import type { AppProps } from "next/app";
import Script from "next/script";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Script src="https://sdk.scdn.co/spotify-player.js" />
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
