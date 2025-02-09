const { Network, Alchemy } = require("alchemy-sdk");

const useMetadata = (props: any) => {

    const settings = {
        apiKey: process.env.NEXT_PUBLIC_BASE_ID,
        network: Network.BASE
      };
    
    const contractAddress = '0x65725931bf9d37d7e1b1ceb90928271b572829f4'

    const alchemy = new Alchemy(settings);
    
    if (props.userAddress && props.id != 0) {
        const getMetadata = async () => {
            try {
                const res = await alchemy.nft.getNftMetadata(
                    contractAddress,
                    props.tokenId
                );
                return res;
            } catch (error) {
                console.log(error);
                throw error;
            }
        };

        getMetadata().then(result => {
            if (result != undefined || result.data == undefined) {
                return;
            }
            else 
            if (result.data != undefined && result.data.length) {
                // props.setMetadata(result.json())
                console.log(result.json(), 'parsed')
            }
        }).catch(error => {
            console.log(error);
        });
    }
};

export { useMetadata }