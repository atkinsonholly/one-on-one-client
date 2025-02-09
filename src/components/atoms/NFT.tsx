import { Button, HStack, VStack, Image, Box, Text } from '@chakra-ui/react';
import { useAccount, useWriteContract, useConfig, useChainId } from 'wagmi';
import { parseEther } from 'viem'
import { abi } from './nftAbi';
import Chat from "./Chat";

interface Metadata {
    name: string;
    image: { cachedUrl: ""};
}

interface NFTProps {
    balance: BigInt | undefined;
    id: BigInt | undefined;
    metadata: Metadata;
    agent: string;
}

const NFT: React.FC<NFTProps> = (props) => {

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
    console.log(props.metadata)
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
  }


  return (
    <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack minHeight="600px" justify="flex-start">
            {props.balance == BigInt(0) &&
            <form onSubmit={submit}>
            <Button
            color="blue" bg="green" fontSize="18px" fontFamily="alt" width='260px'
            disabled={isPending}
            type="submit"
            >
            {isPending ? 'Confirming...' : 'Mint NFT'}
            </Button></form>} 
            {props.balance == BigInt(1) && props.id && <HStack><Box display="flex" flexFlow="column" alignContent="flex-start"><VStack  ><Text fontSize="md" fontFamily="alt" color="black" textAlign="center">{props.metadata.name}</Text><Image src={props.metadata.image.cachedUrl} width="600px"  /></VStack></Box><Chat id={Number(props.id)} agent={props.agent}/></HStack>}
        </VStack>
    </HStack>
  );
};

export default NFT;
