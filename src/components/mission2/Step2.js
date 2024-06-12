import React from 'react';
import { Box, Heading, Text, Button, useBreakpointValue } from "@chakra-ui/react";
import "../../styles/Dashboard.css";

const Step2 = ({ nextStep }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
      <div className="container2">
        <Box
          margin="50px"
          marginLeft="235px"
          padding={isMobile ? "10px" : "20px"}
          borderRadius="20px"
          border="1px solid rgba(255, 255, 255, 0.2)"
          boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
          backdropFilter="blur(10px) saturate(180%)"
          WebkitBackdropFilter="blur(10px) saturate(180%)"
          background="rgba(255, 255, 255, 0.05)"
          width={isMobile ? "90%" : "900px"}
          height={isMobile ? "auto" : "600px"}
          transition="all 0.3s ease"
          _hover={{
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          }}
          textAlign="center"
          color="white"
        >
          <Heading as="h3" size={isMobile ? "lg" : "xl"} mb="3">
            Read, Write, Own: A Manifesto for a Better Internet
          </Heading>
          <Text fontSize={isMobile ? "md" : "lg"} mb="6">
            Chris Dixon's book, "Read, Write, Own," offers a compelling vision of where the internet should go and how to get there. The book explores the history of the internet and how it has evolved into the current state, where a few large corporations control the majority of the online space.
          </Text>
          <Text fontSize={isMobile ? "md" : "lg"} mb="6">
            Dixon argues that the dream of a creative, entrepreneurial internet doesn't have to die and can be saved with blockchain networks. He separates this movement from cryptocurrency speculation, calling it "the computer vs the casino."
          </Text>
          <Text fontSize={isMobile ? "md" : "lg"} mb="6">
            The book provides a vision for a better internet and a playbook to navigate and build the future. It is a must-read for anyone who wants to understand where we've been and where we're going.
          </Text>
          <Button
            colorScheme="teal"
            size={isMobile ? "md" : "lg"}
            onClick={() => {
              window.open('https://amzn.to/3RhJR9D', '_blank');
            }}
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.3s ease-in-out"
            marginBottom="10px"
          >
            Purchase the Book
          </Button>
          <Button
            colorScheme="teal"
            size={isMobile ? "md" : "lg"}
            onClick={() => {
              window.open('https://www.amazon.in/dp/B077S5CVBQ/?ref=assoc_tag_sept19&actioncode=AINOTH066082819002X&tag=arunsbooks-21', '_blank');
            }}
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.3s ease-in-out"
            marginBottom="20px"
          >
            Get Free with Audible Membership
          </Button>
        
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

export default Step2;