import React from 'react';
import { Box, Heading, Text, Link, Button } from "@chakra-ui/react";
import ConnectModal from '../../ConnectModal';

const Step4 = ({ nextStep, prevStep }) => {
  return (
    <div className="bg">
      <div className="container">
        <Box
          padding="20px"
          borderRadius="20px"
          border="1px solid rgba(255, 255, 255, 0.2)"
          boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
          backdropFilter="blur(10px) saturate(180%)"
          WebkitBackdropFilter="blur(10px) saturate(180%)"
          background="rgba(255, 255, 255, 0.05)"
          width="900px"
          height="600px"
          transition="all 0.3s ease"
          _hover={{
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          }}
          textAlign="center"
          color="white"
          bg="#090909"
          p="20px"
          mb="20px"
        >
          <Heading as="h2" size="md">Create an Account</Heading>
          <Text mt="4">On Twitter/X: Go to <Link href="https://x.com/" isExternal>https://x.com/</Link> and create an account.</Text>
          <Text>For creating Web3 Social Media accounts, you will need a Blockchain Wallet. <Link href="https://rainbow.me/" isExternal>Rainbow</Link> is a recommended wallet.</Text>
          <Text>On Farcaster: Click on <Link href="https://www.farcaster.xyz/" isExternal>this link</Link> and follow the instructions.</Text>
          <Text>On Lens: Claim a handle on <Link href="https://www.lens.xyz/" isExternal>https://www.lens.xyz/</Link></Text>
          <Text>Create an account at Yup and connect with social platforms <Link href="https://app.yup.io">Click here</Link></Text>
          <ConnectModal />
          <Button colorScheme="blue" mt="4" onClick={prevStep}mr="5">Previous</Button>
          <Button colorScheme="blue" mt="4" onClick={nextStep}>Next</Button>
        </Box>
      </div>
    </div>
  );
};

export default Step4;
