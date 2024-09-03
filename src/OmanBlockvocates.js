import React from 'react';
import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react';
import Journeys from './Journeys';
import Checkout from './CheckoutOman';

const OmanBlockvocates = () => {
  return (
    <div className="container">
      <Box padding="30px">
        <Heading
          as="h1"
          size={{ base: "lg", md: "xl" }}
          color="#FFF"
          textAlign="center"
          fontFamily={"Montserrat"}
        >
          Welcome to Oman <span style={{ color: "#00BAE2" }}>Blockvocates</span>
        </Heading>
        <Box mt={8} textAlign="center">
        <Box padding={"30px"}>
          <Flex
            direction="column"
            align="center"
            padding="20px"
            borderRadius="20px"
            border="1px solid rgba(255, 255, 255, 0.2)"
            boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
            backdropFilter="blur(10px) saturate(180%)"
            WebkitBackdropFilter="blur(10px) saturate(180%)"
            background="rgba(255, 255, 255, 0.05)"
            width={{ base: "80%", md: "600px" }}
            height={{ base: "auto", md: "340px" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
            }}
            margin="0 auto"
          >
            <Box py={6} px={8} textAlign="center">
              <Text color="white" fontSize="3xl" fontWeight="bold" mb={4}>
                Affordable Membership
              </Text>
              <Text
                color="white"
                fontSize={{ base: "md", md: "2xl" }}
                fontWeight="semibold"
                mb={4}
              >
                60$ for 6 months (10$/Month) - for Selected Scholars
                <Text as="span" fontSize="sm" mt={4} fontStyle="italic" display="block">
                  (Original Price 25,000$ for 6 months or 4,200$/Month)
                </Text>
              </Text>
              <Text color="#00BAE2" fontSize={{ base: "md", md: "2xl" }} fontWeight="semibold" >
                6000 $VOCATE tokens in Rewards
              </Text>
              <Checkout/>
            </Box>
          </Flex>
        </Box>
        <Heading
          as="h1"
          size={{ base: "lg", md: "xl" }}
          color="#FFF"
          textAlign="center"
          fontFamily={"Montserrat"}
        >
          You can choose your <span style={{ color: "#00BAE2" }}>Journey</span>
        </Heading>
          <Journeys />
        </Box>
        
      </Box>
    </div>
  );
};

export default OmanBlockvocates;
