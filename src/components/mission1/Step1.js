import React from 'react';
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import "../../styles/Dashboard.css";

const Step1 = ({ nextStep }) => {
  return (
      <div className="container1">
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
        >
          <Heading as="h3" size="xl" mb="3">
            Mission 1: Create Your Identity!
          </Heading>
          <Text fontSize="lg" mb="6">
            Watch this introductory video to understand why you need to create an identity, the different types of identities, and details about an exercise to discover your identity:
          </Text>
          <Box
            mt="4"
            style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
            borderRadius="8px"
            overflow="hidden"
          >
            <Box as="iframe"
              src="https://www.youtube.com/embed/o7bq7oEuSgU"
              frameBorder="0"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '90%' }}
            />
          </Box>
          
        </Box>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={nextStep}
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.3s ease-in-out"
          position="absolute" // Position the button absolutely
          bottom="20px" // Adjust the bottom spacing as needed
          right="20px" // Adjust the right spacing as needed
        >
            Next
          </Button>
      </div>
  );
};

export default Step1;
