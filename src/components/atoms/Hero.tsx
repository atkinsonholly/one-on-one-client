import React, { useEffect, useState } from "react";
import { Text, Box, VStack, Spacer } from "@chakra-ui/react";
import WagmiConnect from "./WagmiConnect";
// import NFT from "./NFT";
import { useAccount, useChainId  } from 'wagmi'
import { useContracts } from "../../hooks/useContracts";
import { useMetadata } from "../../hooks/useMetadata";
import { useSignInWithEthereum } from "../../hooks/useSignInWithEthereum";

import dynamic from 'next/dynamic'

// See https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr
// const SignIn = dynamic(() => import("@/components/atoms/SignIn"));
const NFT = dynamic(() => import("@/components/atoms/NFT"));

const BACKEND_ADDR = process.env.NEXT_PUBLIC_AGENT_URL;

const Hero: React.FC = () => {
    const { isConnected, address: userAddress } = useAccount()
    const [isSignedIn, setSignedIn] = useState(false);
    const [domain, setDomain] = useState("");
    const [origin, setOrigin] = useState("");
    const [id, setId] = useState<number>(0)
    const [balance, setBalance] = useState<number>(0)
    const [url, setUrl] = useState<string>("")
    const [metadata, setMetadata] = useState<string>("")

    const chainId = useChainId()
    if (isConnected && userAddress != undefined) {
      useContracts({setId, setBalance, setUrl, id, balance, url, userAddress})
      useMetadata({setMetadata, id, userAddress})
    }

    useEffect(() => {
      
    }, [[isConnected, userAddress]]);

    useEffect(() => {
      
    }, [[id, balance, url, metadata]]);

    useEffect(() => {
        if (typeof window !== "undefined") {
          setDomain(window.location.host);
          setOrigin(window.location.origin);
        }
      }, []);

    

    useEffect(() => {
      if (domain != "" && origin != "" && chainId != undefined && userAddress != undefined) {
        const signIn = async () => {
            try {
                const res = await fetch(`${BACKEND_ADDR}/is-signed-in`, {
                    credentials: 'include',
                });

                const alreadySignedIn = await res.json();

                if (alreadySignedIn) {
                    setSignedIn(true);
                } else {
                    let success = await signInWithEthereum();
                    if (success) {
                        const res = await fetch(`${BACKEND_ADDR}/is-signed-in`, {
                            credentials: 'include',
                        });
                        console.log("signed", res)
                        setSignedIn(true);
                    } else {
                        console.error("Failed to sign in");
                    }
                }

            } catch (e) {
                console.error(e);
            }
        }

        if (isConnected && !isSignedIn && userAddress != undefined) {
            signIn()
                .catch(console.error);
        }
      }
    }, [isSignedIn]); // Try signing in when user is logged in

    const signInWithEthereum = useSignInWithEthereum({domain, origin, chainId, userAddress});
  
  

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
