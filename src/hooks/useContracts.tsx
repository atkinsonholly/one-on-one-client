import { useReadContract } from 'wagmi'
import { Address } from 'viem';
import { abi } from '../components/atoms/nftAbi';

const contractAddress = '0x65725931bf9d37d7e1b1ceb90928271b572829f4'

const contract = {
    abi,
    address: contractAddress as unknown as Address,
}

const useIdOf = (address: any) => {
    const { data: id } = useReadContract({
        ...contract,
        functionName: 'idOf',
        args: [address],
        query: {
            enabled: !!address
        }
    });

    return id;
}

const useBalanceOf = (address: any) => {
    const { data: balance } = useReadContract({
        ...contract,
        functionName: 'balanceOf',
        args: [address],
        query: {
            enabled: !!address
        }
    });

    return balance;
}

const useTokenUri = (id: any) => {
    const { data: uri } = useReadContract({
        ...contract,
        functionName: 'tokenURI',
        args: [id],
        query: {
            enabled: !!id
        }
    });

    return uri;
}

export { useIdOf, useBalanceOf, useTokenUri }
