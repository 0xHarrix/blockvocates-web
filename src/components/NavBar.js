import React from 'react';
import { Box, Flex, Spacer, Button, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    navigate('/Login');
  };

  return (
      <Flex align="center" margin={7}>
        <Link mt={2} fontSize="xl" fontWeight="bold" color="white" onClick={() => navigate('/Home')}>
          BLOCKVOCATES
        </Link>
        <Spacer />
        <Box mt={4}>
          <Link color="white" fontWeight="bold" mr={20} onClick={() => navigate('/Home')} _hover={{ color: '#00ffff' }}>
            HOME
          </Link>
          <Link color="white" fontWeight="bold" mr={20} onClick={() => navigate('/CoursePage')} _hover={{ color: '#00ffff' }}>
            MEMBERSHIP
          </Link>
          <Link color="white" fontWeight="bold" mr={20} onClick={() => navigate('/CourseSearch')} _hover={{ color: '#00ffff' }}>
            LEARN
          </Link>
          <Link color="white" fontWeight="bold" onClick={() => navigate('/CourseSearch')} _hover={{ color: '#00ffff' }}>
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