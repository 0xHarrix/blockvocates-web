import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig';
import { Box, Text, Input, Stack, Button, Image, Link } from '@chakra-ui/react';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom'; 
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle the login process
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
        clubMembership: 0, // Set clubMembership to empty number
        completedMissions: [], // Set completedMissions to empty array
        pathId: 0, // Set pathId to empty number
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

  // Function to handle Google sign-in
 // Function to handle Google sign-in
// Function to handle Google sign-in
const handleGoogleSignIn = async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance
  try {
    const result = await signInWithPopup(auth, provider); // Open Google sign-in popup
    const user = result.user;
    console.log('User signed in with Google:', user);
    
    // Extract user's name and email from the profile
    const name = user.displayName;
    const email = user.email;
    
    // Add the user to Firestore database
    const usersRef = collection(db, 'users');
    const newUserRef = await addDoc(usersRef, {
      name: name,
      email: email,
      clubMembership: 0, // Set clubMembership to empty number
      completedMissions: [], // Set completedMissions to empty array
      pathId: 0, // Set pathId to empty number
    });

    console.log('New user added to Firestore with ID:', newUserRef.id);

    navigate('/Dashboard');
  } catch (error) {
    setError(error.message);
    console.error('Google sign-in error:', error.message);
  }
};



  // Return the JSX for rendering
  return (
    <div className='screen'>
      <Box display="flex" height='100vh'>
        <Box>
          <Image src='orbs.png' height='100vh' className='orb'></Image>
        </Box>
        <Image src='orb.png' position='absolute' left='90.8%' top='-3%' className='orb1'></Image>
        <Box
          className="glassmorphism-container1"
          position="absolute"
          top="8%"
          left="50%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="600px"
        >
          <Text className='Logintext'>Sign Up</Text>
          <form onSubmit={handleLogin}>
            <Stack>
              <label className="tags">Username</label>
              <Input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                variant="filled"
                color="white"
                width={'380px'}
                _focus={{
                  borderColor: '#00BAE2',
                }}
                bg="rgba(0, 0, 0, 0.9)" // Set the background color to black with 90% opacity
                _hover={{
                  bgGradient: 'linear(to-r, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))',
                }}
                borderRadius='15px'
              />
              <label className="tags">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                variant="filled"
                color="white"
                width={'380px'}
                _focus={{
                  borderColor: '#00BAE2',
                }}
                bg="rgba(0, 0, 0, 0.9)" // Set the background color to black with 90% opacity
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
                bg="rgba(0, 0, 0, 0.9)" // Set the background color to black with 90% opacity
                _hover={{
                  bgGradient: 'linear(to-r, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))',
                }}
                borderRadius='15px'
                mb={5}
              />

              <Button
                type="submit"
                colorScheme="custom"
                size="md"
                borderRadius="10px"
                bgGradient="linear(to-r, rgba(8, 110, 221, 0.6), #010C0F)"
                fontFamily="'Black Han Sans', sans-serif"
                className="loginbutton"
                _hover={{
                  filter: 'brightness(200%)', // Dimming effect on hover
                  transition: 'filter 0.3s ease-in-out', // Smooth transition over 0.3 seconds
                }}
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
                  filter: 'brightness(85%)', // Dimming effect on hover
                  opacity: 0.9, // Reduce opacity on hover
                  transition: 'filter 0.4s ease, opacity 0.4s ease',
                }}
              >
                Sign Up with Google
              </Button>
            </Stack>
          </form>
          {error && <Text color="red.500" mt={2}>{error}</Text>}
          <Link onClick={navigateToSignUp} color="white" fontWeight="bold" mt={10}>Already have an account? <span className='signuptext'>Login</span></Link>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
