import React from 'react';
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const Step5 = ({ prevStep }) => {
  return (
    <Box bg="#090909" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
      <Heading as="h2" size="md">Make Your First Post!</Heading>
      <Text mt="4">Insert Profile Picture</Text>
      <Text mt="4">
        ☀️GM World! I just created my identity for Mission 1 of my @blockvocates journey and claimed a 10,000 $VOCATE tokens reward ☺️
        Learning Blockchain is fun and rewarding with Blockvocates.org 📢
      </Text>
      <Button colorScheme="blue" mt="4" onClick={prevStep}>Previous</Button>
    </Box>
  );
};

export default Step5;
