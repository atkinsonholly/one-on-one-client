import { Button, HStack, VStack, Image, Box } from '@chakra-ui/react';
import { useAccount, useWriteContract } from 'wagmi';
import { abi } from './nftAbi';

interface NFTProps {
    balance: string;
    id: string;
  }

const NFT: React.FC<NFTProps> = ({ balance, id }) => {

  const { address: userAddress } = useAccount();
  const { data: hash, isPending, writeContract } = useWriteContract()

  const mint = async () => {
    if (!userAddress) {
      console.error('User address is not defined');
      return;
    }
    console.log(userAddress);

    writeContract({ 
        abi,
        address: '0x65725931BF9d37d7e1b1CEb90928271B572829F4',
        functionName: 'mintWithETH',
        args: [
          userAddress
        ],
     })
  }
  

  return (
    <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack minHeight="600px" justify="flex-start">
            {balance == "0" ? 
            <Button
            color="blue" bg="green" fontSize="18px" fontFamily="alt" width='260px'
            disabled={isPending}
            onClick={() => mint()}
            >
            {isPending ? 'Confirming...' : 'Mint NFT'}
            </Button> : <Box><Image src='OneOnOne_square.webp' width="400px" /></Box>} 
            {/* Update to fetch user's NFT image */}
        </VStack>
    </HStack>
  );
};

export default NFT;