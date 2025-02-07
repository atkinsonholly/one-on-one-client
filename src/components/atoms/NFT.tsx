import { Button, HStack, VStack, Image, Box } from '@chakra-ui/react';
import { useAccount, useWriteContract } from 'wagmi';
import { nftAbi } from './nftAbi';
import Chat from "./Chat";

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
            <VStack>
                {balance == "0" ? 
                <Button
                color="blue" bg="green" fontSize="18px" fontFamily="alt" width='260px'
                // onClick={() => {
                //     writeContract({ 
                //         nftAbi,
                //         address: '0x',
                //         functionName: 'mint',
                //         args: [
                //           userAddress
                //         ],
                //      })
                // }}
                >
                Mint NFT
                </Button> : <Image src='OneOnOne_square.webp' width="400px" />} 
                {/* Update to fetch user's NFT image */}
            </VStack>
        </VStack>

        { balance == "1" && <Box width="600px">
            { 
            // TODO pass chat to chat component
            }
            <Chat/>
        </Box> }
    </HStack>

   
  );
};

export default NFT;