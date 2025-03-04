'use client'
import React from "react";
import { Text, Box, VStack, Spacer } from "@chakra-ui/react";
import WagmiConnect from "./WagmiConnect";
import { useAccount  } from 'wagmi'
import {useBalanceOf, useIdOf, useTokenUri} from "../../hooks/useContracts";
import { useMetadata } from "../../hooks/useMetadata";
import { useAgent } from "../../hooks/useAgent";
import { useSignInWithEthereum } from "../../hooks/useSignInWithEthereum";

import dynamic from 'next/dynamic'

// See https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr
// const SignIn = dynamic(() => import("@/components/atoms/SignIn"));
const NFT = dynamic(() => import("@/components/atoms/NFT"));

const Hero: React.FC = () => {
    const { isConnected, address: userAddress } = useAccount()
    const id = useIdOf(userAddress);
    const balance = useBalanceOf(userAddress);
    const tokenUri = useTokenUri(id);
    const metadata = useMetadata(id, userAddress);
    const agent = useAgent(id, userAddress)

    const isSignedIn = useSignInWithEthereum(isConnected, userAddress);

  return (
    <Box bg="grey" width="100%" bgPosition="center" bgRepeat="no-repeat" bgImage="brett-jordan-bZtxfALS2DA-unsplash.jpg" minHeight="900px" backgroundSize="cover" display='flex' flexDirection="column" alignItems="center" margin="auto">
      <VStack justifyContent="center">
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
        {isConnected && isSignedIn ? <Text fontSize="lg" fontFamily="alt" color="blue" textAlign="center">Connected to AI Agent</Text> : <Text fontSize="lg" fontFamily="alt" color="blue" textAlign="center">Agent disconnected</Text>}
        {isConnected && balance == BigInt(1) ? <NFT balance={balance} id={id} metadata={metadata} agent={agent}/> : null}
        <Spacer height="50px"/>
      </VStack>
    </Box>
  );
};

export default Hero;
