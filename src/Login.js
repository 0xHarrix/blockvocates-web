import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig';
import { Box, Text, Input, Stack, Button, Image, Link } from '@chakra-ui/react';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';  

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate= useNavigate();



  // Function to handle the login process
  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      navigate('/Home');

    } catch (error) {
      setError(error.message);
      console.error('Login error:', error.message);
    }
  };

  const navigateToSignUp = () => {
    navigate('/SignUp');
  };

  // Return the JSX for rendering
  return (
    <div>
      <Box
        className="glassmorphism-container"
        position="absolute"
        top="20%"
        left="50%"
        transform="translate(-50%, 50%)"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Image
          src="./avatar.png"
          alt="Your Alt Text"
          borderRadius="8px"
          mb="4"
          width="20%"
          height="auto"
        />
        <form onSubmit={handleLogin}>
          <Stack>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              variant="filled"
              color="white"
              _focus={{
                borderColor: '#00ffff',
              }}
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              variant="filled"
              color="white"
              _focus={{
                borderColor: '#00ffff',
              }}
            />
            <Button type="submit" colorScheme="custom" bg="#00ffff" size="lg" fontFamily="'Black Han Sans', sans-serif">
              Login
            </Button>
          </Stack>
        </form>
        {error && <Text color="red.500" mt={2}>{error}</Text>}
        <Link onClick={navigateToSignUp} color="white" fontWeight="bold" mt={10}>Don't have an account? SIGN-UP</Link>
      </Box>
    </div>
  );
};

// Export the Login component
export default Login;