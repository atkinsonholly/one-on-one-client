import React, {useEffect, useState, useMemo } from "react";
import { Text, Box, VStack, Spacer, HStack, Image } from "@chakra-ui/react";
import WagmiConnect from "./WagmiConnect";
import NFT from "./NFT";
import { useAccount, useReadContracts } from 'wagmi';
import { nftAbi } from './nftAbi';

const Hero: React.FC = () => {
    const { isConnected, address } = useAccount()
    const [id, setId] = useState<string>("0")
    const [balance, setBalance] = useState<string>("1")
    
    
    const contract = {
        address: '',
        abi: nftAbi,
      }
    
    let contractReadData: any
    let isContractReadsLoading: any
    
    if (address && address != undefined) {
      const { data, isLoading } = useReadContracts({
        contracts: [
          
        ]
      })
      contractReadData = data
      isContractReadsLoading = isLoading
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
        <Spacer height="50px"/>
      </VStack>
    </Box>
  );
};

export default Hero;