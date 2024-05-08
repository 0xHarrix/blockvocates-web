import React from 'react';
import NavBar from './components/NavBar';
import { Box, Heading, Input } from '@chakra-ui/react';

const Home = () => {
  return (
    <div>
      <NavBar />
      <Box padding={'50px'}>
        <Heading as="h1" size="xl" color='#FFF' textAlign="center">
          Pick your <span style={{ color: '#00BAE2' }}>Blockchain</span> Journey,
        </Heading>
        <Heading as="h1" size="xl" color='#FFF' textAlign="center">
          Enter the world of <span style={{ color: '#00BAE2' }}>Web3</span>
        </Heading>
        <Box mt={8} textAlign="center">
          <Input
            variant="outline"
            placeholder="Search..."
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
        </Box>
      </Box>
    </div>
  );
};

export default Home;
