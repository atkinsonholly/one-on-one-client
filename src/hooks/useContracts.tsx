import { useState } from "react";
import { useAccount, useReadContracts } from 'wagmi'
import { Address } from 'viem';
import { abi } from '../components/atoms/nftAbi';

const useContracts = () => {
    const { address: userAddress } = useAccount()

    const [id, setId] = useState<number>(0)
    const [balance, setBalance] = useState<number>(0)
    const [url, setUrl] = useState<string>("")
    
    const contractAddress = '0x65725931bf9d37d7e1b1ceb90928271b572829f4'

    const contract = {
      abi,
      address: contractAddress as unknown as Address,
    }
    
    if (userAddress) try {
        const contracts = async() => useReadContracts({
            contracts: [
                {
                ...contract,
                functionName: 'idOf',
                args: [userAddress],
                },
                {
                ...contract,
                functionName: 'balanceOf',
                args: [userAddress],
                },
                {
                ...contract,
                functionName: 'tokenURI',
                args: [BigInt(id || 0)],
                }]
        })
    
        contracts().then(result => {
            if (result.data && result.data.length) {
                result.data[0].result ? setId(Number(result.data[0].result)) : null
                result.data[1].result ? setBalance(Number(result.data[1].result)) : null
                result.data[2].result ? setUrl(result.data[2].result) : null
            }
        })
    } catch(error) {
        console.log(error)
    }
    console.log(id, balance, url)
    
    return {
        id: id,
        balance: balance,
        url: url
    }
};

export { useContracts }