import React from "react";
import { Input, Box, Spacer, VStack } from "@chakra-ui/react";

interface ChatProps {
    id: number;
  }

const Chat: React.FC<ChatProps> = ({ id }) => (
    <VStack width="400px" height="100%" display="flex" justify="space-between">
        <Box width="100%" minHeight="290px" padding="25px" border="dashed">
            <Input placeholder="Talk with your NFT" size="md" />
        </Box>
        <Spacer height="50px"/>
        <Box width="100%" padding="25px" border="dashed" minHeight="290px" overflow="scroll">
            Conversation history
        </Box>
    </VStack> 
);

export default Chat;
