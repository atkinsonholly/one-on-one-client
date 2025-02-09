import React, { useEffect, useState } from "react";
import { Text, Box, VStack, Spacer } from "@chakra-ui/react";
import WagmiConnect from "./WagmiConnect";
// import NFT from "./NFT";
import { abi } from './nftAbi';
import { useAccount, useChainId, useSignMessage, useReadContract, useReadContracts } from 'wagmi'
import { Button } from "@chakra-ui/react";
import {SiweMessage} from "siwe";
import { Address } from 'viem';
import { useContracts } from "../../hooks/useContracts";

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

    const chainId = useChainId()
    useContracts({setId, setBalance, setUrl, id, balance, url})

    useEffect(() => {
      
    }, [isConnected, userAddress, id, balance, url]);

    useEffect(() => {
        if (typeof window !== "undefined") {
          setDomain(window.location.host);
          setOrigin(window.location.origin);
        }
      }, []);

    useEffect(() => {
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

        if (isConnected && !isSignedIn) {
            signIn()
                .catch(console.error);
        }
    }, [isConnected, isSignedIn]); // Try signing in when user is logged in

    async function sendForVerification(message: string, signature: string): Promise<boolean> {
      const res = await fetch(`${BACKEND_ADDR}/verify`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, signature }),
          credentials: 'include',
      });
      return await res.json() as boolean;
  }

  async function createSiweMessage(statement: string) {
      const res = await fetch(`${BACKEND_ADDR}/nonce`, {
          credentials: 'include',
      });
      const SESSION_DURATION = 1000 * 60 * 60;
      const nonce = await res.text();
      const message = new SiweMessage({
          expirationTime: new Date(Date.now() + SESSION_DURATION).toISOString(),
          domain,
          address: userAddress,
          statement,
          uri: origin,
          version: '1',
          chainId,
          nonce
      });
      console.log(message);
      return message.prepareMessage();
  }

  const { signMessageAsync } = useSignMessage()
  const signInWithEthereum = async (): Promise<boolean | undefined> => {
      try {
          const message = await createSiweMessage(
              'Connect with AI Agent',
          );
          console.log(message);
          const signature = await signMessageAsync({
              message,
          })
          console.log(signature);

          return await sendForVerification(message, signature);
      } catch (e) {
          console.error(e);
      }
  };

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
        {/* {isConnected && isLoggedIn && !isSignedIn ? <Button onClick={() => signInWithEthereum() }>Sign in</Button> : null} */}
        {isConnected && isSignedIn ? <Text>Connected to AI Agent</Text> : <Text>Agent disconnected</Text>}
        <Spacer height="50px"/>
      </VStack>
    </Box>
  );
};

export default Hero;
