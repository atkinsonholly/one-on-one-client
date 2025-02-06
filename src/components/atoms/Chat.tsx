import React from "react";
import { Input, Box, Spacer } from "@chakra-ui/react";

const Chat: React.FC = () => (
    <Box>
        <Box width="100%" height="400px" padding="25px" border="dashed">
            <Input placeholder="Talk with your NFT" size="md" />
        </Box>
        <Spacer height="50px"/>
        <Box width="100%" padding="25px" border="dashed" height="500px" overflow="scroll">
            Conversation history
        </Box>
    </Box>
);

export default Chat;