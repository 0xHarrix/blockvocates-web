import React from 'react';
import { Box, Heading, Text, Link, Button } from "@chakra-ui/react";
import ConnectModal from '../../ConnectModal';

const Step4 = ({ nextStep, prevStep }) => {
  return (
    <Box bg="#090909" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
      <Heading as="h2" size="md">Create an Account</Heading>
      <Text mt="4">On Twitter/X: Go to <Link href="https://x.com/" isExternal>https://x.com/</Link> and create an account.</Text>
      <Text>For creating Web3 Social Media accounts, you will need a Blockchain Wallet. <Link href="https://rainbow.me/" isExternal>Rainbow</Link> is a recommended wallet.</Text>
      <Text>On Farcaster: Click on <Link href="https://www.farcaster.xyz/" isExternal>this link</Link> and follow the instructions.</Text>
      <Text>On Lens: Claim a handle on <Link href="https://www.lens.xyz/" isExternal>https://www.lens.xyz/</Link></Text>
      <ConnectModal />
      <Button colorScheme="blue" mt="4" onClick={prevStep}>Previous</Button>
      <Button colorScheme="blue" mt="4" onClick={nextStep}>Next</Button>
    </Box>
  );
};

export default Step4;
