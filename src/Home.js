import React from 'react';
import NavBar from './components/NavBar';
import { Box, Heading } from '@chakra-ui/react';

const Home = () => {
  return (
    <div>
      <NavBar />
      <Box padding={'50px'}>
        <Heading as="h1" size="xl" color= '#FFF' textAlign="center">
          Pick your <span style={{ color: '#00BAE2' }}>Blockchain</span> Journey,
        </Heading>
        <Heading as="h1" color= '#FFF' size="xl" textAlign="center">
          Enter the world of <span style={{ color: '#00BAE2' }}>Web3</span>
        </Heading>
      </Box>      
    </div>
  );
};

export default Home;
