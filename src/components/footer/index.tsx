import React from "react";
import {FaTwitter, FaGithub} from "react-icons/fa";
import { HStack, Box, Button, ButtonGroup, Center } from "@chakra-ui/react";

const Footer: React.FC = () => (
  <HStack bg="grey" justify="space-between" px="4" height="60px">
    <Center >
    <ButtonGroup >
     <Button leftIcon={<FaGithub />} fontSize="12px" fontFamily="alt" width='120px'>
     <a target="_blank" href="https://github.com/atkinsonholly/one-on-one-contracts">Contract</a>
      </Button>
      <Button leftIcon={<FaGithub />} fontSize="12px" fontFamily="alt" width='120px'>
     <a target="_blank" href="https://github.com/atkinsonholly/one-on-one-client">Frontend</a>
      </Button>
      <Button leftIcon={<FaGithub />} fontSize="12px" fontFamily="alt" width='120px'>
     <a target="_blank" href="https://github.com/markin-io/eliza">Agent</a>
      </Button>
      </ButtonGroup>
      </Center>
    <Box fontSize="18px" fontFamily="alt" color="blue">
      <a>OneOnOne 2025</a>
    </Box>
  </HStack>
);

export default Footer;
