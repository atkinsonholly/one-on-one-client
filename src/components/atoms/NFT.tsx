import { Button, HStack, VStack, Image, Box } from '@chakra-ui/react';
import { useAccount, useWriteContract, useConfig, useChainId } from 'wagmi';
import { parseEther } from 'viem'
import { abi } from './nftAbi';

interface NFTProps {
    balance: string;
    id: string;
  }

const NFT: React.FC<NFTProps> = ({ balance, id }) => {

  const { address: userAddress } = useAccount();
  const { data: hash, isPending, writeContract } = useWriteContract()
  //  const config = useConfig();
  const chainId = useChainId();

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    if (!userAddress) {
        console.error('User address is not defined');
        return;
      }
    console.log(userAddress);
    console.log(chainId)
    e.preventDefault() 
    console.log(abi)
    // const formData = new FormData(e.target as HTMLFormElement) 
    writeContract({
        abi,
        address: '0x65725931bf9d37d7e1b1ceb90928271b572829f4',
        functionName: 'mintWithETH',
        args: [
            userAddress
        ],
        value: parseEther('0.001'),
        chainId,
    })
    console.log('hi')
  } 
  

  return (
    <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack minHeight="600px" justify="flex-start">
            {balance == "0" ? 
            <form onSubmit={submit}>
            <Button
            color="blue" bg="green" fontSize="18px" fontFamily="alt" width='260px'
            disabled={isPending}
            type="submit"
            >
            {isPending ? 'Confirming...' : 'Mint NFT'}
            </Button></form> : <Box><Image src='OneOnOne_square.webp' width="400px" /></Box>} 
            {/* Update to fetch user's NFT image */}
        </VStack>
    </HStack>
  );
};

export default NFT;