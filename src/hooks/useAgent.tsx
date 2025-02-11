import {useEffect, useState} from "react";

const useAgent = (id: any, userAddress: any) => {

    const [agent, setAgent] = useState<string>("")

    useEffect(() => {
        // fetch agent_id
        const getAgentId = async () => {
            try {
                const response = await fetch(`https://bafybeigulu7dxyhub5fqfphj22abatnaovo7oq5kvlsuig7m7m7la6ftpa.ipfs.w3s.link/${id}.json`);
                return response;
                
            } catch (error) {
                console.log(error)
            }
        }

        if (typeof id != 'undefined' && userAddress) {
            getAgentId()
            .then(async (result) => {
                if (result) {
                    const jsonMetadata = await result.json();
                    setAgent(jsonMetadata.agent_id)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [id, userAddress]);

    return agent;
};

export { useAgent}