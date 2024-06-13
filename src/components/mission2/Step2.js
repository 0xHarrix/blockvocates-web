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
            Buy a copy of Read, Write, Own by Chris Dixon.
          </Heading>
          <Text fontSize={isMobile ? "md" : "lg"} mb="6">
            You can purchase the book here
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
          <Text fontSize={isMobile ? "md" : "lg"} mb="6">
            Alternatively you can also get the book for free with an Audible Membership
          </Text>
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