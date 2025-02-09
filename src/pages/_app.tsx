import "@/styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Head from "next/head";
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { createConfig, WagmiProvider, http } from 'wagmi';
import { base } from 'wagmi/chains';

import customTheme from "@/styles/theme";
import Layout from "@/components/layout";

import Loading from "@/components/atoms/Loading";

import type { AppProps } from "next/app";

const config = getDefaultConfig({
  appName: 'OneOnOne',
  projectId: `${process.env.NEXT_PUBLIC_REOWN_ID}`,
  chains: [base],
  transports: {
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_ID}`),
  },
})

// const config = createConfig({
//   chains: [base, baseSepolia],
//   transports: {
//     [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_ID}`),
//     [baseSepolia.id]: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_ID}`),
//   },
// });

const queryClient = new QueryClient();

const ClientApp = ({ Component, pageProps }: AppProps) => {

  const router = useRouter();
  const [routerIsLoading, setRouterIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.pathname) setRouterIsLoading(true);
      else setRouterIsLoading(false);
    };
    const handleComplete = (_url: string) => setRouterIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
            <ChakraProvider theme={customTheme}>
              <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <link
                  href="./OneOnOne_square.webp"
                  rel="shortcut icon"
                  type="image/x-icon"
                />
                <link
                  href="./OneOnOne_square.webp"
                  rel="apple-touch-icon"
                />
              </Head>
              <Layout>
                {routerIsLoading && <Loading />}
                {!routerIsLoading && <Component {...pageProps} />}
              </Layout>
            </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default ClientApp
