import React, { useState } from 'react';
import { Box, Heading, Text, Input, Button } from "@chakra-ui/react";

const Step2 = ({ nextStep, prevStep }) => {
  const [hobby, setHobby] = useState("");
  const [character, setCharacter] = useState("");
  const [identity, setIdentity] = useState("");

  const generateIdentity = () => {
    setIdentity(`${hobby} ${character}`);
  };

  return (
    <Box bg="#090909" p="20px" mb="20px" borderRadius="8px" boxShadow="md">
      <Heading as="h2" size="md">Exercise</Heading>
      <Box as="form" mt="4">
        <Text>Fill in a Hobby that you like:</Text>
        <Input value={hobby} onChange={(e) => setHobby(e.target.value)} mb="4"/>
        <Text>Mention your Favourite animal/character:</Text>
        <Input value={character} onChange={(e) => setCharacter(e.target.value)} mb="4"/>
        <Button colorScheme="blue" onClick={generateIdentity}>Generate Identity</Button>
      </Box>
      {identity && <Text mt="4">Your identity: {identity}</Text>}
      <Button colorScheme="blue" mt="4" onClick={prevStep}>Previous</Button>
      <Button colorScheme="blue" mt="4" onClick={nextStep}>Next</Button>
    </Box>
  );
};

export default Step2;
