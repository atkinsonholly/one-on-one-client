'use client'
import React, { useState } from "react";
import { Text, Box, VStack, Spacer, Button } from "@chakra-ui/react";
import WagmiConnect from "./WagmiConnect";
// import NFT from "./NFT";
import { useAccount  } from 'wagmi'
import { useContracts } from "../../hooks/useContracts";
import { useMetadata } from "../../hooks/useMetadata";
import { useSignInWithEthereum } from "../../hooks/useSignInWithEthereum";

import dynamic from 'next/dynamic'

// See https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr
// const SignIn = dynamic(() => import("@/components/atoms/SignIn"));
const NFT = dynamic(() => import("@/components/atoms/NFT"));

const Hero: React.FC = () => {
    const { isConnected, address: userAddress } = useAccount()
    const [id, setId] = useState<number>(0)
    const [balance, setBalance] = useState<number>(0)
    const [url, setUrl] = useState<string>("")
    const [metadata, setMetadata] = useState<string>("")

    // if (isConnected && userAddress != undefined) {
    //   useContracts({setId, setBalance, setUrl, id, balance, url, userAddress})
    //   useMetadata({setMetadata, id, userAddress})
    // }

    const isSignedIn = useSignInWithEthereum(isConnected, userAddress);

  return (
    <Box bg="grey" width="100%" bgPosition="center" bgRepeat="no-repeat" backgroundSize="cover" display='flex' flexDirection="column" alignItems="center" margin="auto">
      <VStack justifyContent="center" spacing="50px">
        <Box padding="25px" alignItems="center">
          <Box padding="25px">
            <Text fontSize="5xl" fontFamily="alt" color="blue" textAlign="center">
              Welcome to OneOnOne
            </Text>
          </Box>
          <Box display="flex" justifyContent="center">
            <WagmiConnect/>
          </Box>
        </Box>
        {isConnected ? <NFT balance={balance?.toString()} id={id?.toString()}/> : null}
        {isConnected && isSignedIn ? <Text>Connected to AI Agent</Text> : <Text>Agent disconnected</Text>}
        <Spacer height="50px"/>
      </VStack>
    </Box>
  );
};

export default Hero;
