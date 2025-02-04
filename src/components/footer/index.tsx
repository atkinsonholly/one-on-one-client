import React from "react";
import {FaTwitter} from "react-icons/fa";
import { HStack, Box, Button, ButtonGroup, Center } from "@chakra-ui/react";

const Footer: React.FC = () => (
  <HStack bg="white" justify="space-between" px="4" height="60px">
    <Center >
    <ButtonGroup >
     <Button colorScheme='twitter' leftIcon={<FaTwitter />} fontSize="12px" fontFamily="alt" width='120px'>
     <a target="_blank" href="https://github.com/atkinsonholly/one-on-one">Github</a>
      </Button>
      </ButtonGroup>
      </Center>
    <Box fontSize="18px" fontFamily="alt" color="green">
      <a>OneOnOne 2025</a>
    </Box>
  </HStack>
);

export default Footer;
