import React from 'react';
import { Box, Heading, Text, Button, useBreakpointValue } from "@chakra-ui/react";
import "../../styles/Dashboard.css";

const Step3 = ({ nextStep }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
      <div className="container2">
       <Box
          margin="50px"
          marginTop="200px" 
          marginLeft="235px"
          padding={isMobile ? "10px" : "20px"}
          borderRadius="20px"
          border="1px solid rgba(255, 255, 255, 0.2)"
          boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
          backdropFilter="blur(10px) saturate(180%)"
          WebkitBackdropFilter="blur(10px) saturate(180%)"
          background="rgba(255, 255, 255, 0.05)"
          width={isMobile ? "90%" : "900px"}
          height={isMobile ? "auto" : "auto"}
          transition="all 0.3s ease"
          _hover={{
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          }}
          textAlign="center"
          color="white"
        >
          <Heading as="h3" size={isMobile ? "lg" : "xl"} mb="3">
           Speech on Blockchain Journey
          </Heading>
          <Text fontSize={isMobile ? "md" : "lg"} mb="8">
            The Speech should be 4-6 Minutes
          </Text>
          <Text fontSize={isMobile ? "md" : "lg"} mb="6">
            Introduction: What is the identity you chose and why? What is your motivation behind joining Blockvocates?
          </Text>
          <Text fontSize={isMobile ? "md" : "lg"} mb="6">
            Body: What were your biggest takeaways and aha moments after reading the book? How has it influenced your blockchain journey? Do you know the focus area of your identity on Blockchain and Web3 now?
          </Text>
          <Text fontSize={isMobile ? "md" : "lg"} mb="6">
            Conclusion: Summarize your speech, end with a powerful call to action or insight for the audience.
          </Text>
        </Box>
        <Button
          colorScheme="teal"
          size={isMobile ? "md" : "lg"}
          onClick={nextStep}
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.3s ease-in-out"
          position="absolute" // Position the button absolutely
          bottom={isMobile ? "10px" : "20px"} // Adjust the bottom spacing as needed
          right={isMobile ? "10px" : "20px"} // Adjust the right spacing as needed
        >
          Next
        </Button>
      </div>
  );
};

export default Step3;