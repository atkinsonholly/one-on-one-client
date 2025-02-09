import { useReadContracts } from 'wagmi'
import { Address } from 'viem';
import { abi } from '../components/atoms/nftAbi';

const useContracts = (props: any) => {
    const contractAddress = '0x65725931bf9d37d7e1b1ceb90928271b572829f4'

    const contract = {
      abi,
      address: contractAddress as unknown as Address,
    }
    
    async function contracts() {
        return useReadContracts({
            contracts: [
                {
                    ...contract,
                    functionName: 'idOf',
                    args: [props.userAddress],
                },
                {
                    ...contract,
                    functionName: 'balanceOf',
                    args: [props.userAddress],
                },
                {
                    ...contract,
                    functionName: 'tokenURI',
                    args: [BigInt(props.id || 0)],
                }]
        });
    }

    if (props.userAddress) try {
        contracts().then((result: any) => {
            if (result != undefined || result?.data == undefined) {
                return;
            }
            else if (result?.data != undefined && result?.data?.length) {
                result?.data[0]?.result && Number(result?.data[0]?.result) != 0 && Number(result?.data[0]?.result) != props.id ? props.setId(Number(result?.data[0]?.result)) : null
                result?.data[1]?.result && Number(result?.data[1]?.result) != props.balance ? props.setBalance(Number(result?.data[1]?.result)) : null
                result?.data[2]?.result && Number(result?.data[1]?.result) == 1 && result?.data[2]?.result != props.url ? props.setUrl(result?.data[2]?.result) : null
            }
        })
    } catch(error) {
        console.log(error)
    }
};

export { useContracts }