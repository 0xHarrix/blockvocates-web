import React from 'react';
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const Step1 = ({ nextStep }) => {
  return (
    <Box bg="#090909" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
      <Heading as="h1" size="lg">Mission 1: Create Your Identity!</Heading>
      <Text mt="4">
        Watch this introductory video to understand why you need to create an identity, the different types of identities, details about an exercise to discover your identity:
      </Text>
      <Box mt="4" style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <Box as="iframe"
          src="https://www.youtube.com/embed/o7bq7oEuSgU"
          frameBorder="0"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </Box>
      <Button colorScheme="blue" mt="4" onClick={nextStep}>Next</Button>
    </Box>
  );
};

export default Step1;
