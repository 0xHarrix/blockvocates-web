import React from 'react';
import { Box, Heading, Text, Link, Button } from "@chakra-ui/react";

const Step3 = ({ nextStep, prevStep }) => {
  return (
    <Box bg="#090909" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
      <Heading as="h2" size="md">Generate a PFP (Profile Picture)</Heading>
      <Text mt="4">
        You can use tools like <Link href="https://www.canva.com/" isExternal>Canva AI</Link> or <Link href="https://www.capcut.com/" isExternal>Capcut’s free AI Generator</Link> to generate an image.
      </Text>
      <Button colorScheme="blue" mt="4" onClick={prevStep}>Previous</Button>
      <Button colorScheme="blue" mt="4" onClick={nextStep}>Next</Button>
    </Box>
  );
};

export default Step3;
