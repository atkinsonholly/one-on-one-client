import React, {useEffect, useState, useMemo } from "react";
import { Button, Box, HStack } from "@chakra-ui/react";
import {Address} from "viem";
import {SiweMessage} from "siwe";
import {BrowserProvider} from "ethers";
import Chat from "@/components/atoms/Chat";


// TODO: move to config
const BACKEND_ADDR = "http://localhost:3000";

async function sendForVerification(message: string, signature: string) {
    const res = await fetch(`${BACKEND_ADDR}/verify`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
    });
    return await res.json();
}

async function createSiweMessage(address: Address, statement: string) {
    const domain = window.location.host;
    const origin = window.location.origin;
    const res = await fetch(`${BACKEND_ADDR}/nonce`, {
        credentials: 'include',
    });
    const message = new SiweMessage({
        expirationTime: new Date(Date.now() + 1000 * 60 * 1).toISOString(),
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId: 8453,
        nonce: await res.text()
    });
    return message.prepareMessage();
}

const SignIn: React.FC = () => {
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const res = await fetch(`${BACKEND_ADDR}/is-logged-in`, {
                credentials: 'include',
            });
            console.log(await res.json());
        }
        checkLoggedIn()
            .catch(console.error);
    }, []);

    async function signInWithEthereum() {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const message = await createSiweMessage(
            // @ts-ignore
            await signer.address,
            'Sign in with Ethereum to the app.'
        );
        console.log(message);
        const signature = await signer.signMessage(message);
        console.log(signature);

        const success = await sendForVerification(message, signature);
        setSignedIn(success)
    }

    return <Box>
        {
            signedIn ? <Chat/> : <Button onClick={signInWithEthereum}>Sign In</Button>
        }
    </Box>
};

export default SignIn;
