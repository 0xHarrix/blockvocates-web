// SignUp.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig';
import { Box, Text, Input, Stack, Button, Image, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);
      // You might want to perform additional actions after successful signup
      navigate('/Home');
    } catch (error) {
      setError(error.message);
      console.error('SignUp error:', error.message);
    }
  };

  const navigateToLogin = () => {
    navigate('/Login');
  };

  return (
    <div>
      <Box
        className="glassmorphism-container"
        position="absolute"
        top="50%"
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
        <form onSubmit={handleSignUp}>
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
              Sign Up
            </Button>
          </Stack>
        </form>
        {error && <Text color="red.500" mt={2}>{error}</Text>}
        <Link onClick={navigateToLogin} color="white" fontWeight="bold" mt={10}>
          Already have an account? LOGIN
        </Link>
      </Box>
    </div>
  );
};

export default SignUp;