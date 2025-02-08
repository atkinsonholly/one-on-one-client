import { Button, HStack, VStack, Image, Box } from '@chakra-ui/react';
import { useAccount, useWriteContract } from 'wagmi';
import { nftAbi } from './nftAbi';

interface NFTProps {
    balance: string;
    id: string;
  }

const NFT: React.FC<NFTProps> = ({ balance, id }) => {

  const { address: userAddress } = useAccount();
  const { writeContract } = useWriteContract()

  return (
    <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack minHeight="600px" justify="flex-start">
            {balance == "0" ? 
            <Button
            color="blue" bg="green" fontSize="18px" fontFamily="alt" width='260px'
            onClick={() => {
                if (userAddress) {
                  writeContract({ 
                      abi: nftAbi,
                      address: '0x65725931BF9d37d7e1b1CEb90928271B572829F4', // base_sepolia
                      functionName: 'mintWithETH',
                      args: [
                        userAddress
                      ],
                   })
                } else {
                  console.error('User address is undefined');
                }
            }}
            >
            Mint NFT
            </Button> : <Box><Image src='OneOnOne_square.webp' width="400px" /></Box>} 
            {/* Update to fetch user's NFT image */}
        </VStack>
    </HStack>
  );
};

export default NFT;