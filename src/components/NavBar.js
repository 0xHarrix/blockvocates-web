import React from 'react';
import { Box, Flex, Spacer, Button, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import "./NavBar.css"

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    navigate('/Login');
  };

  return (
    <Box className="sticky-nav">
      <Flex align="center" margin={7} paddingBottom={30}>
        <Link mt={2} className="logo" _hover={{ textDecoration :' none'}} fontSize="xl" fontWeight="bold" color="white" onClick={() => navigate('/Home')}>
          BLOCKVOCATES
        </Link>
        <Spacer />
        <Box mt={4}>
          <Link color="white" fontWeight="bold" mr={20} onClick={() => navigate('/Home')} _hover={{ color: '#00BAE2' }}>
            HOME
          </Link>
          <Link color="white" fontWeight="bold" mr={20} onClick={() => navigate('/CoursePage')} _hover={{ color: '#00BAE2' }}>
            ABOUT
          </Link>
          <Link color="white" fontWeight="bold" mr={20} onClick={() => navigate('/ClubSearch')} _hover={{ color: '#00BAE2' }}>
            FIND A CLUB
          </Link>
          <Link color="white" fontWeight="bold" onClick={() => navigate('/CourseSearch')} _hover={{ color: '#00BAE2' }}>
            START A CLUB
          </Link>
        </Box>
        <Spacer />
        <Button onClick={handleLogout} color={'black'} >
          Login
        </Button>
      </Flex>
    </Box>
  );
};

export default NavBar;
