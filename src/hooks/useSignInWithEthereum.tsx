import {SiweMessage} from "siwe";
import {useChainId, useConnections, useSignMessage,} from 'wagmi'
import {useEffect, useMemo, useState} from "react";

const BACKEND_ADDR = process.env.NEXT_PUBLIC_AGENT_URL;

// Just to make TS happy
type UserAddress = `0x${string}` | undefined;

const checkIfSignedIn = async () => {
    const res = await fetch(`${BACKEND_ADDR}/is-signed-in`, {
        credentials: 'include',
    });
    return await res.json() as boolean;
}

async function createSiweMessage(statement: string, userAddress: UserAddress, chainId: number) {
    const res = await fetch(`${BACKEND_ADDR}/nonce`, {
        credentials: 'include',
    });
    const SESSION_DURATION = 1000 * 60 * 60;
    const nonce = await res.text();
    const message = new SiweMessage({
        expirationTime: new Date(Date.now() + SESSION_DURATION).toISOString(),
        domain: window.location.host,
        address: userAddress,
        statement,
        uri: window.location.origin,
        version: '1',
        chainId: chainId,
        nonce
    });
    console.log({ message });
    return message.prepareMessage();
}

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


const useSignInWithEthereum = (isConnected: boolean, userAddress: UserAddress) => {
    const [isSignedIn, setSignedIn] = useState(false);

    const chainId = useChainId()
    const { signMessageAsync } = useSignMessage();
    const connections = useConnections();

    // A hack that avoids random errors when connections are not available
    // TypeError: connection.connector.getChainId is not a function
    //     at getConnectorClient (getConnectorClient.js:37:57)
    //     at signMessage (signMessage.js:18:98)
    //     at Object.mutationFn (signMessage.js:10:88)
    //     at Object.fn (mutation.js:72:29)
    //     at run (retryer.js:91:49)
    //     at Object.start (retryer.js:132:9)
    //     at Mutation.execute (mutation.js:107:40)
    const hasConnections = useMemo(() => connections.length > 0, [connections]);

    useEffect(() => {
        const signIn = async () => {
            let signedInAlready = false;
            try {
                signedInAlready = await checkIfSignedIn();
            } catch (e) {
                // TODO: This is supposed to be set to false only in case 401 error
                //   Other errors should be thrown
                signedInAlready = false;
            }

            if (signedInAlready) {
                return true;
            } else {
                console.log("create siwe message");

                const siweMessage = await createSiweMessage(
                    'Connect with AI Agent',
                    userAddress,
                    chainId
                );
                console.log({ siweMessage });
                const signature = await signMessageAsync({
                    message: siweMessage,
                });
                console.log({ signature });

                let verified = await sendForVerification(siweMessage, signature);
                if (verified) {
                    return await checkIfSignedIn();
                } else {
                    console.error("Failed to verify signature");
                }

            }
        }

        if (
            // Can't sign in if not connected
            isConnected &&
            // Can't sign siwe message if there are no connections (apparently it's different from isConnected),
            // will get connection.connector.getChainId is not a function error
            hasConnections &&
            // Can't create siwe message if chainId is not available
            chainId &&
            // Can't create siwe message if user address is not availble
            userAddress
        ) {
            signIn()
                .then((success) => {
                    if (success) {
                        setSignedIn(true);
                    } else {
                        console.error("Failed to sign in");
                    }
                })
                .catch(console.error);
        }


    }, [isConnected, hasConnections, chainId, userAddress, signMessageAsync]);

    return isSignedIn;
};

export { useSignInWithEthereum }
