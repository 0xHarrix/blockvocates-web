import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from './firebaseConfig';
import { Box, Text, Input, Stack, Button, Image, Link } from '@chakra-ui/react';
import './styles/Login.css';
import { collection, addDoc, getDocs, query, orderBy, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle the login process
  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error.message);
    }
  };

  const navigateToSignUp = () => {
    navigate('/SignUp');
  };

  // Function to handle Google sign-in
  const handleGoogleLogin = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance
    try {
      const result = await signInWithPopup(auth, provider); // Open Google sign-in popup
      const user = result.user;
      console.log('User signed in with Google:', user);
  
      // Extract user's name and email from the profile
      const name = user.displayName;
      const email = user.email;
  
      // Check if user already exists in Firestore database
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        // Add the user to Firestore database if they don't exist
        const newUserRef = await addDoc(usersRef, {
          name: name,
          email: email,
          clubMembership: 0, // Set clubMembership to empty number
          completedMissions: [], // Set completedMissions to empty array
          pathId: 0, // Set pathId to empty number
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
  

  // Return the JSX for rendering
  return (
    <div className='screen'>
      <Box display={{ base: "block", md: "flex" }} height='100vh'>
        <Box>
          <Image src='orbs.png' height='100vh' className='orb' display={{ base: "none", md: "block" }} />
        </Box>
        
        <Box
          className="glassmorphism-container1"
          position="absolute"
          top={{ base: "10%", md: "12%" }}
          left={{ base: "5%", md: "60%" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Text className='Logintext'>Login</Text>
          <form onSubmit={handleLogin}>
            <Stack spacing={4}>
              <label className="tags">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                variant="filled"
                color="white"
                _focus={{
                  borderColor: '#00BAE2',
                }}
                bg="rgba(0, 0, 0, 0.9)"
                _hover={{
                  bgGradient: 'linear(to-r, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))',
                }}
                borderRadius='15px'
              />
              <label className="tags">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                variant="filled"
                color="white"
                _focus={{
                  borderColor: '#00BAE2',
                }}
                bg="rgba(0, 0, 0, 0.9)"
                _hover={{
                  bgGradient: 'linear(to-r, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))',
                }}
                borderRadius='15px'
              />
              <Link ml={{ base: 'auto', md: '275px' }} color='#007AFF'>Forgot Password?</Link>
              <Button
                type="submit"
                colorScheme="custom"
                size="md"
                borderRadius="10px"
                bgGradient="linear(to-r, rgba(8, 110, 221, 0.6), #010C0F)"
                fontFamily="'Black Han Sans', sans-serif"
                className="loginbutton"
                _hover={{
                  filter: 'brightness(200%)',
                  transition: 'filter 0.3s ease-in-out',
                }}
              >
                Login
              </Button>
              <Image src='or.png' width='350px' height='22px' margin='auto' mt='20px' display={{ base: "none", md: "block" }} />
              <Button
                variant="solid"
                bg="rgba(217, 217, 217, 0.1)"
                color="white"
                leftIcon={<img src="Google.png" alt="Google Icon" />}
                onClick={handleGoogleLogin}
                borderRadius='15px'
                _hover={{
                  bgGradient: 'linear(to-r, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))',
                  filter: 'brightness(85%)',
                  opacity: 0.9,
                  transition: 'filter 0.4s ease, opacity 0.4s ease',
                }}
              >
                Sign in with Google
              </Button>
            </Stack>
          </form>
          {error && <Text color="red.500" mt={2}>{error}</Text>}
          <Link onClick={navigateToSignUp} color="white" fontWeight="bold" mt={10}>Don't have an account? <span className='signuptext'>Sign Up</span></Link>
        </Box>
      </Box>
    </div>
  );
};

export default Login;