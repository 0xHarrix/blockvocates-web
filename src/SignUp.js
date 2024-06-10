import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig';
import { Box, Text, Input, Stack, Button, Image, Link } from '@chakra-ui/react';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom'; 
import { collection, addDoc, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from './firebaseConfig';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      const usersRef = collection(db, 'users');
      const newUserRef = await addDoc(usersRef, {
        name: name,
        email: email,
        clubMembership: 0,
        completedMissions: [],
        pathId: 0,
      });
  
      console.log('New user added to Firestore with ID:', newUserRef.id);
  
      navigate('/Dashboard');
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error.message);
    }
  };  

  const navigateToSignUp = () => {
    navigate('/Dashboard');
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed in with Google:', user);
      
      const name = user.displayName;
      const email = user.email;
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        const newUserRef = await addDoc(usersRef, {
          name: name,
          email: email,
          clubMembership: 0,
          completedMissions: [],
          pathId: 0,
        });
        console.log('New user added to Firestore with ID:', newUserRef.id);
      } else {
        console.log('User already exists in Firestore');
      }

      navigate('/Dashboard');
    } catch (error) {
      setError(error.message);
      console.error('Google sign-in error:', error.message);
    }
  };

  return (
    <div className='screen'>
      <Box display="flex" height='100vh'>
        <Box display={{ base: 'none', md: 'block' }}>
          <Image src='orbs.png' height='100vh' className='orb' />
        </Box>
        <Box
          className="glassmorphism-container1"
          position="absolute"
          top={{ base: '10%', md: '5%' }}
          right={{ base: '5%', md: '5%' }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          height={{ base: 'auto', md: '590px' }}
          width={{ base: '90%', md: '470px' }}
          p={5}
          borderRadius="32px"
          bg="linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2))"
          boxShadow="0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)"
        >
          <Text className='Logintext'>Sign Up</Text>
          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <label className="tags">Username</label>
              <Input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                variant="filled"
                color="white"
                width="100%"
                _focus={{ borderColor: '#00BAE2' }}
                bg="rgba(0, 0, 0, 0.9)"
                _hover={{ bgGradient: 'linear(to-r, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))' }}
                borderRadius="15px"
              />
              <label className="tags">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                variant="filled"
                color="white"
                width="100%"
                _focus={{ borderColor: '#00BAE2' }}
                bg="rgba(0, 0, 0, 0.9)"
                _hover={{ bgGradient: 'linear(to-r, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))' }}
                borderRadius="15px"
              />
              <label className="tags">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                variant="filled"
                color="white"
                width="100%"
                _focus={{ borderColor: '#00BAE2' }}
                bg="rgba(0, 0, 0, 0.9)"
                _hover={{ bgGradient: 'linear(to-r, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))' }}
                borderRadius="15px"
                mb={5}
              />
              <Button
                type="submit"
                colorScheme="blue"
                size="md"
                borderRadius="10px"
                bgGradient="linear(to-r, rgba(8, 110, 221, 0.6), #010C0F)"
                fontFamily="'Black Han Sans', sans-serif"
                className="loginbutton"
                _hover={{ filter: 'brightness(200%)' }}
                transition="filter 0.3s ease-in-out"
              >
                Sign Up
              </Button>
              <Image src='or.png' width='350px' height='22px' margin='auto' mt='20px'></Image>
              <Button
                variant="solid"
                bg="rgba(217, 217, 217, 0.1)"
                color="white"
                leftIcon={<img src="Google.png" alt="Google Icon" />}
                onClick={handleGoogleSignIn}
                borderRadius='15px'
                _hover={{
                  bgGradient: 'linear(to-r, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))',
                  filter: 'brightness(85%)',
                  opacity: 0.9,
                  transition: 'filter 0.4s ease, opacity 0.4s ease',
                }}
              >
                Sign Up with Google
              </Button>
            </Stack>
          </form>
          {error && <Text color="red.500" mt={2}>{error}</Text>}
          <Link onClick={navigateToSignUp} color="white" fontWeight="bold" mt={10}>
            Already have an account? <span className='signuptext'>Login</span>
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
