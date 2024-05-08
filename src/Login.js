import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig';
import { Box, Text, Input, Stack, Button, Image, Link } from '@chakra-ui/react';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; 

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
    <div className='screen'>
      <Box display="flex" height='100vh'>
      <Box>
        <Image src='orbs.png' height='100vh'></Image>
      </Box>
      <Box
        className="glassmorphism-container"
        position="absolute"
        top="3%"
        left="70%"
        transform="translate(-50%, 0%)"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Text className='Logintext'>Login</Text>
        <form onSubmit={handleLogin}>
          <Stack>
            <label>Email</label>
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
                        <label>Password</label>
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
            <Link ml='275px' color='#007AFF'>Forgot Password?</Link>
            <Button type="submit" colorScheme="custom" size="md" bgGradient="linear(to-r, #086EDD, #010C0F)" fontFamily="'Black Han Sans', sans-serif" className='loginbutton'>
              Login
            </Button>
            <Button
    variant="solid"
    bg="rgba(217, 217, 217, 0.1)"
    color="white"
    leftIcon={<FontAwesomeIcon icon={faGoogle} style={{ fontSize: '1.5em', color: 'white' }} />}
    onClick={() => {
      // Handle Google sign-in logic here
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

// Export the Login component
export default Login;