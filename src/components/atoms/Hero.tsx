import React, {useEffect, useState, useMemo } from "react";
import { Text, Box, HStack } from "@chakra-ui/react";
import WagmiConnect from "./WagmiConnect";
import { useAccount, useReadContracts } from 'wagmi';
import { nftAbi } from './nftAbi';

const Hero: React.FC = () => {
    const { isConnected, address } = useAccount()
    const [id, setId] = useState<String>("0")
    
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
    <>
        <Box bg="yellow" height="900px" width="100%" bgImage="url('./OneOnOne_wide.webp')" bgPosition="center" bgRepeat="no-repeat" backgroundSize="cover" display='flex' flexDirection="column" alignItems="center" justifyContent="space-between" margin="auto">
          <Box padding="25px">
            <Box>
              <WagmiConnect />
            </Box>
          </Box>
        </Box>
    </>
  );
};

export default Hero;