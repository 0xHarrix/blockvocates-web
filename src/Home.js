import React from 'react';
import NavBar from './components/NavBar';
import { Box, Heading, Input, Text, Flex} from '@chakra-ui/react';
import './styles/Home.css'

const Home = () => {
  return (
    <div className='body'>
      <NavBar />
      <Box padding={'30px'}>
        <Heading as="h1" size="xl" color='#FFF' textAlign="center">
          Pick your <span style={{ color: '#00BAE2' }}>Blockchain</span> Journey,
        </Heading>
        <Heading as="h1" size="xl" color='#FFF' textAlign="center">
          Enter the world of <span style={{ color: '#00BAE2' }}>Web3</span>
        </Heading>
        <Box mt={8} textAlign="center">
          <Input
            variant="outline"
            placeholder="Find a club"
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            color="#FFF"
            _placeholder={{ color: '#FFF' }}
            _hover={{ borderColor: '#00BAE2' }}
            _focus={{ borderColor: '#00BAE2', boxShadow: '0 0 0 1px #00BAE2' }}
            borderRadius="full"
            py={3}
            px={4}
            width="300px"
          />
          <Heading as="h1" mt="30px" size="xl" color='#FFF' textAlign="center">
            Why Join <span style={{ color: '#00BAE2' }}>Blockvocates?</span>
          </Heading>
          <Flex justifyContent="center" mt={8}>
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
                width="200px"
                margin="0 10px">
              <Text fontSize="xl" color={"white"}>Community</Text>
              <Text mt={4} color={"white"}>Join a vibrant community of blockchain enthusiasts.</Text>
            </Box>
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
              width="200px"
              margin="0 10px">
              <Text fontSize="xl" color={"white"}>Education</Text>
              <Text mt={4} color={"white"}>Access educational resources to enhance your blockchain knowledge.</Text>
            </Box>
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
              width="200px"
              margin="0 10px">
              <Text fontSize="xl" color={"white"}>Opportunities</Text>
              <Text mt={4} color={"white"}>Discover opportunities for networking and collaboration.</Text>
            </Box>
          </Flex>
        </Box>

      </Box>
    </div>
  );
};

export default Home;
