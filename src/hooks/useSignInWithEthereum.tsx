import {SiweMessage} from "siwe";
import { useSignMessage,  } from 'wagmi'

const useSignInWithEthereum = (props: any) => {

    const { signMessageAsync } = useSignMessage()
    const BACKEND_ADDR = process.env.NEXT_PUBLIC_AGENT_URL;

    async function sendForVerification(message: string, signature: string): Promise<boolean> {
        const res = await fetch(`${BACKEND_ADDR}/verify`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature }),
            credentials: 'include',
        });
        return await res.json() as boolean;
    }
  
    async function createSiweMessage(statement: string) {
        const res = await fetch(`${BACKEND_ADDR}/nonce`, {
            credentials: 'include',
        });
        const SESSION_DURATION = 1000 * 60 * 60;
        const nonce = await res.text();
        const message = new SiweMessage({
            expirationTime: new Date(Date.now() + SESSION_DURATION).toISOString(),
            domain: props.domain,
            address: props.userAddress,
            statement,
            uri: origin,
            version: '1',
            chainId: props.chainId,
            nonce
        });
        console.log(message);
        return message.prepareMessage();
    }
    
    async function signIn() {
        const message = await createSiweMessage(
            'Connect with AI Agent',
        );
        console.log(message);
        const signature = await signMessageAsync({
            message,
        });
        console.log(signature);

        return await sendForVerification(message, signature);
    }

    return signIn;
      
};

export { useSignInWithEthereum }