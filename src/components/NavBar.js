import React, { useState, useEffect } from 'react';
import { Box, Flex, Button, Link, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { collection, query, where, getDocs } from 'firebase/firestore';

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [balance, setBalance] = useState(0); // Initialize balance state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch user data including balance
        const userId = currentUser.email;
        const userQuery = query(collection(db, 'users'), where('email', '==', userId));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setBalance(userData.balance || 0); // Set balance from user data
        }
      } else {
        setUser(null);
        setBalance(0); // Reset balance if no user is logged in
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

  // Function to format balance to k format
  const formatBalance = (balance) => {
    if (balance >= 1000) {
      return `${Math.floor(balance / 1000)}K`; // Display in k format without decimals
    } else {
      return balance.toString(); // Display as is if less than 1000
    }
  };
  return (
    <Box className="sticky-nav">
      <Flex align="center" justifyContent="space-between" paddingY={4}>
        <Link
          ml={4}
          _hover={{ textDecoration: 'none' }}
          onClick={() => navigate('/')}
        >
          <Image src='Text_Logo-removebg-preview.png' aspectRatio={'auto'} width={60} />
        </Link>
        <Button
          onClick={() => setShowMenu(!showMenu)}
          color="black"
          display={['flex', 'flex', 'none', 'none']}
          marginRight={4}
          ml="auto"
        >
          {showMenu ? <CloseIcon /> : <HamburgerIcon />}
        </Button>
        <Flex
          align="center"
          justifyContent="center"
          flexGrow={1}
          display={['none', 'none', 'flex', 'flex']}
        >
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
          <Text color="white" fontWeight="bold">
            BALANCE: {formatBalance(balance)} {/* Display formatted balance */}
          </Text>
        </Flex>
        {user ? (
          <Button onClick={handleLogout} color="black" marginRight={4}>
            Logout
          </Button>
        ) : (
          <Button onClick={() => navigate('/Login')} color="black" marginRight={4}>
            Login
          </Button>
        )}
      </Flex>
      {showMenu && (
        <Flex
          direction="column"
          alignItems="center"
          position="absolute"
          top="calc(10%+5px)"
          right={0}
          backgroundColor="rgba(255, 255, 255, 0.04)" // Glassmorphic background color
          padding={8}
          borderRadius={12} // Curved edges
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
          zIndex={1000}
          minWidth={120}
          backdropFilter="blur(4px)" // Glassmorphic blur effect
        >
          <Link
            color="white" // Text color
            fontWeight="bold"
            mt={4}
            onClick={() => {
              navigate('/');
              setShowMenu(false);
            }}
            _hover={{ color: '#00BAE2' }}
          >
            HOME
          </Link>
          <Link
            color="white" // Text color
            fontWeight="bold"
            mt={4}
            onClick={() => {
              navigate('/Dashboard');
              setShowMenu(false);
            }}
            _hover={{ color: '#00BAE2' }}
          >
            MY ACCOUNT
          </Link>
          <Text color="white" fontWeight="bold" mt={4}>
            BALANCE: {formatBalance(balance)} {/* Display formatted balance */}
          </Text>
          {user ? (
            <Button onClick={handleLogout} color="" mt={4}>
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate('/Login')} color="black" mt={4}>
              Login
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default NavBar;
