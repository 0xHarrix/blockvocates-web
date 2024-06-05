import React, { useState, useEffect } from 'react';
import { Box, Flex, Spacer, Button, Link, Image, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Assuming you have a firebase.js file for authentication
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Box className="sticky-nav">
      <Flex align="center" paddingBottom={30}>
        <Link
          mt={10}
          _hover={{ textDecoration: 'none' }}
          onClick={() => navigate('/')}
        >
          <Image src='Text_Logo-removebg-preview.png' aspectRatio={'auto'} width={60}/>
        </Link>
        <Spacer />
        <Box mt={4}>
          <Link color="white" fontWeight="bold" mr={20} onClick={() => navigate('/')} _hover={{ color: '#00BAE2' }}>
            HOME
          </Link>
          <Link
            color="white"
            fontWeight="bold"
            mr={20}
            onClick={() => navigate('/Dashboard')}
            _hover={{ color: '#00BAE2' }}
          >
            MY ACCOUNT
          </Link>
          {/* <Link
            color="white"
            fontWeight="bold"
            mr={20}
            onClick={() => navigate('/ClubSearch')}
            _hover={{ color: '#00BAE2' }}
          >
            FIND A CLUB
          </Link>
          <Link color="white" fontWeight="bold" onClick={() => navigate('/CreateClub')} _hover={{ color: '#00BAE2' }}>
            START A CLUB
          </Link> */}
        </Box>
        <Spacer />
        {user ? (
          <Button onClick={handleLogout} color="black">
            Logout
          </Button>
        ) : (
          <Button onClick={() => navigate('/Login')} color="black">
            Login
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default NavBar;
