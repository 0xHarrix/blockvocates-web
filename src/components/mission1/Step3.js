import React from 'react';
import { Box, Heading, Text, Link, Button } from "@chakra-ui/react";

const Step3 = ({ nextStep, prevStep }) => {
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
          <Heading as="h2" size="md">Generate a PFP (Profile Picture)</Heading>
          <Text mt="4">
            You can use tools like <Link href="https://www.canva.com/" isExternal>Canva AI</Link> or <Link href="https://www.capcut.com/" isExternal>Capcut’s free AI Generator</Link> to generate an image.
          </Text>
          <Button colorScheme="blue" mt="4" onClick={prevStep} mr="5">Previous</Button>
          <Button colorScheme="blue" mt="4" onClick={nextStep}>Next</Button>
        </Box>
      </div>
    </div>
  );
};

export default Step3;
