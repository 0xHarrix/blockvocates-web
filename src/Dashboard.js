import React from 'react';
import NavBar from './components/NavBar';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <Box padding={'30px'}>
        <Heading as="h1" size="xl" color='#FFF' paddingLeft={"20px"}>
          Welcome <span style={{ color: '#00BAE2' }}>YourName</span> 
        </Heading>
        <Heading as="h1" size="xl" color='#FFF' textAlign="center">
                You're a member of 
            </Heading>
        <Flex justifyContent="center" alignItems="center" mt={8}>
          <Box
            className="glassbox"
            padding="6"
            borderRadius="16px"
            border="1px solid rgba(255, 255, 255, 0.125)"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
            position="relative"
            backdropFilter="blur(16px) saturate(180%)"
            WebkitBackdropFilter="blur(16px) saturate(180%)"
            background="linear-gradient(-30deg, #090909 -20%, #2A2A2A 100%)"
            width="350px" // Adjust the width
            height="200px" // Adjust the height
            textAlign="center" // Center the text horizontally
          >
            <Text fontSize="xl" color="white" paddingTop={"48px"}>Club Name</Text>
            <Text fontSize="md" color="white" mt={2}>Club Number: XXXX</Text>
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default Dashboard;
