import {useEffect, useState} from "react";

const { Network, Alchemy } = require("alchemy-sdk");

const settings = {
    apiKey: process.env.NEXT_PUBLIC_BASE_ID,
    network: Network.BASE_MAINNET
};
const contractAddress = '0x65725931BF9d37d7e1b1CEb90928271B572829F4'

const alchemy = new Alchemy(settings);

const useMetadata = (id: any, userAddress: any) => {

    interface Metadata {
        name: string;
        image: { cachedUrl: string }
    }

    const [metadata, setMetadata] = useState<Metadata>({name: "", image: { cachedUrl: ""}})

    useEffect(() => {
        // use Alchemy for regular cached metadata
        const getMetadata = async () => {
            try {
                const res = await alchemy.nft.getNftMetadata(
                    contractAddress,
                    id
                );
                return res;

            } catch (error) {
                console.log(error);
                throw error;
            }
        };
       
        if (typeof id != 'undefined' && userAddress) {
            getMetadata()
                .then((result) => {
                    setMetadata({name: result.name, image: {cachedUrl: result.image.cachedUrl}})
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id, userAddress]);

    return metadata;
};

export { useMetadata }
