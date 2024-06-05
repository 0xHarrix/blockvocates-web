import React, { useState } from 'react';
import { Box, Heading, Text, Input, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Step2 = ({ nextStep, prevStep }) => {
  const [hobby, setHobby] = useState("");
  const [character, setCharacter] = useState("");
  const [identity, setIdentity] = useState("");

  const generateIdentity = () => {
    setIdentity(`${hobby} ${character}`);
  };

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
          <Heading as="h2" size="md">Exercise</Heading>
          <Box as="form" mt="4">
            <Text>Fill in a Hobby that you like:</Text>
            <Input value={hobby} onChange={(e) => setHobby(e.target.value)} mb="4"/>
            <Text>Mention your Favourite animal/character:</Text>
            <Input value={character} onChange={(e) => setCharacter(e.target.value)} mb="4"/>
            <Text>Your identity can also be influenced by the Web3 sector you want to target: <Link color='blue'>https://x.com/communitybuidl/status/1779007223009870258?s=46</Link> </Text>
            <Button colorScheme="blue" onClick={generateIdentity}>Generate Identity</Button>
          </Box>
          {identity && <Text mt="4">Your identity: {identity}</Text>}
          <Button colorScheme="blue" mt="4" onClick={prevStep} mr="5">Previous</Button>
          <Button colorScheme="blue" mt="4" onClick={nextStep}>Next</Button>
        </Box>
      </div>
    </div>
  );
};

export default Step2;
