import React from "react";
import { Input, Box, Spacer } from "@chakra-ui/react";

interface ChatProps {
    balance: string;
    id: string;
  }

const Chat: React.FC<ChatProps> = ({ balance, id }) => (
    balance == "1" ? <Box>
        <Box width="100%" height="400px" padding="25px" border="dashed">
            <Input placeholder="Talk with your NFT" size="md" />
        </Box>
        <Spacer height="50px"/>
        <Box width="100%" padding="25px" border="dashed" height="500px" overflow="scroll">
            Conversation history
        </Box>
    </Box> : null
);

export default Chat;
