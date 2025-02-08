import React, {useEffect, useState, useMemo } from "react";
import { Text, Box, VStack, Spacer, HStack, Image } from "@chakra-ui/react";
import WagmiConnect from "./WagmiConnect";
// import NFT from "./NFT";
import { nftAbi } from './nftAbi';
import { useAccount, useChainId, useSignMessage, useReadContracts } from 'wagmi'
import { Button } from "@chakra-ui/react";
import {SiweMessage} from "siwe";

import dynamic from 'next/dynamic'

// See https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr 
// const SignIn = dynamic(() => import("@/components/atoms/SignIn"));
const NFT = dynamic(() => import("@/components/atoms/NFT"));

const Hero: React.FC = () => {
    const { isConnected, address } = useAccount()
    const [id, setId] = useState<string>("0")
    const [balance, setBalance] = useState<string>("0")
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isSignedIn, setSignedIn] = useState(false);

    const contract = {
        address: '',
        abi: nftAbi,
      }

    let contractReadData: any
    let isContractReadsLoading: any

    // if (address && address != undefined) {
    //   const { data, isLoading } = useReadContracts({
    //     contracts: [
    //
    //     ]
    //   })
    //   contractReadData = data
    //   isContractReadsLoading = isLoading
    // }

    // TODO: move to config
    const BACKEND_ADDR = "http://localhost:3000";
    
    async function sendForVerification(message: string, signature: string) {
        const res = await fetch(`${BACKEND_ADDR}/verify`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature }),
        });
        return await res.json();
    }
    
    async function createSiweMessage(statement: string) {
        const { address } = useAccount()
        const chainId = useChainId()
        const domain = window.location.host;
        const origin = window.location.origin;
        const res = await fetch(`${BACKEND_ADDR}/nonce`, {
            credentials: 'include',
        });
        const message = new SiweMessage({
            expirationTime: new Date(Date.now() + 1000 * 60 * 1).toISOString(),
            domain,
            address,
            statement,
            uri: origin,
            version: '1',
            chainId,
            nonce: await res.text()
        });
        console.log(message);
        return message.prepareMessage();
    }

    useEffect(() => {
      if (contractReadData != undefined) {
          if(contractReadData[0]) setId(contractReadData[0].toString())
      }
    }, [contractReadData]);

    const isLoading = useMemo(
      () =>
        isContractReadsLoading,
      [isContractReadsLoading],
    );

    useEffect(() => {
      useReadContracts
    }, [isConnected, address, isLoading]);

    useEffect(() => {
            const checkLoggedIn = async () => {
              try {
                const res = await fetch(`${BACKEND_ADDR}/is-logged-in`, {
                    credentials: 'include',
                });
                console.log(await res.json());
              } catch (e) {
                  console.error(e);
              }
            }
            checkLoggedIn()
              .catch(console.error);
        }, []);
    
        const { signMessageAsync } = useSignMessage()

        useEffect(() => {
            const signInWithEthereum = async () => {
                try {
                    const message = await createSiweMessage(
                        'Connect with AI Agent'
                    );
                    console.log(message);
                    const signature = await signMessageAsync({
                        message,
                    })
                    console.log(signature);
        
                    const success = await sendForVerification(message, signature);
                    setSignedIn(success) // TODO: check if success is true
                } catch (e) {
                    console.error(e);
                }
            }
            signInWithEthereum()
              .catch(console.error);
        }, [isLoggedIn]); // Try signing in when user is logged in

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
        {isConnected ? <NFT balance={balance} id={id}/> : null}
        {isSignedIn ? <Text>Connected to AI Agent</Text> : <Text>Agent disconnected</Text>}
        <Spacer height="50px"/>
      </VStack>
    </Box>
  );
};

export default Hero;
