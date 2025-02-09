import {useEffect, useState} from "react";

const { Network, Alchemy } = require("alchemy-sdk");

const settings = {
    apiKey: process.env.NEXT_PUBLIC_BASE_ID,
    network: Network.BASE
};
const contractAddress = '0x65725931bf9d37d7e1b1ceb90928271b572829f4'

const alchemy = new Alchemy(settings);

const useMetadata = (id: any, userAddress: any) => {
    const [metadata, setMetadata] = useState<string>("")

    useEffect(() => {
        const getMetadata = async (tokenId: any) => {
            try {
                const res = await alchemy.nft.getNftMetadata(
                    contractAddress,
                    tokenId
                );
                return res;
            } catch (error) {
                console.log(error);
                throw error;
            }
        };

        if (typeof id != 'undefined' && userAddress) {
            getMetadata(id)
                .then((result) => {
                    if (result.data != undefined && result.data.length) {
                        setMetadata(result.json())
                        console.log(result.json(), 'parsed')
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id, userAddress]);

    return metadata;
};

export { useMetadata }
