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
      <Flex align="center" margin={7} position={"sticky"}>
        <Link mt={2} className="logo" _hover={{ textDecoration :' none'}} fontSize="xl" fontWeight="bold" color="white" onClick={() => navigate('/Home')}>
          BLOCKVOCATES
        </Link>
        <Spacer />
        <Box mt={4}>
          <Link color="white" fontWeight="bold" mr={20} onClick={() => navigate('/Home')} _hover={{ color: '#00BAE2' }}>
            HOME
          </Link>
          <Link color="white" fontWeight="bold" mr={20} onClick={() => navigate('/CoursePage')} _hover={{ color: '#00BAE2' }}>
            MEMBERSHIP
          </Link>
          <Link color="white" fontWeight="bold" mr={20} onClick={() => navigate('/CourseSearch')} _hover={{ color: '#00BAE2' }}>
            LEARN
          </Link>
          <Link color="white" fontWeight="bold" onClick={() => navigate('/CourseSearch')} _hover={{ color: '#00BAE2' }}>
            CLUBS
          </Link>
        </Box>
        <Spacer />
        <Button onClick={handleLogout} color={'white'} colorScheme="custom"  fontFamily="'Black Han Sans', sans-serif">
          Profile
        </Button>
      </Flex>

  );
};

export default NavBar;