import React, { useState } from 'react';
import { Box, Text, Button, IconButton, useDisclosure, VStack, HStack, Image, Input } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const ConnectModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputVisible, setInputVisible] = useState(false); // State to manage visibility of input box
  const [platformToConnect, setPlatformToConnect] = useState(''); // State to store the platform name for connection

  const openInput = (platform) => {
    setInputVisible(true);
    setPlatformToConnect(platform);
  };

  const closeInput = () => {
    setInputVisible(false);
  };

  const handleConnect = () => {
    // Handle connection logic here
    console.log(`Connecting to ${platformToConnect}`);
    setInputVisible(false); // Close input box after connecting
  };

  return (
    <Box>
      <Button onClick={onOpen}>Open Connect Modal</Button>
      {isOpen && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="gray.800"
          color="white"
          borderRadius="md"
          p="20px"
          boxShadow="md"
          zIndex="1000"
          width="90%"
          maxW="400px"
        >
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            size="sm"
            position="absolute"
            top="10px"
            right="10px"
            onClick={onClose}
          />
          <VStack spacing={4} align="stretch">
            <HStack justifyContent="space-between">
              <HStack>
                <Image height={6} width={6} src='Farcaster.png' />
                <Text ml="10px">Connect Farcaster</Text>
              </HStack>
              <Button variant="link" colorScheme="blue" onClick={() => openInput('Farcaster')}>Connect</Button>
            </HStack>
            <HStack justifyContent="space-between">
              <HStack>
                <Image height={6} width={6} src='twitter.jpg' />
                <Text ml="10px">Connect Twitter</Text>
              </HStack>
              <Button variant="link" colorScheme="blue" onClick={() => openInput('Twitter')}>Connect</Button>
            </HStack>
            <HStack justifyContent="space-between">
              <HStack>
                <Image height={6} width={6} src='Bluesky.png' />
                <Text ml="10px">Connect Bluesky</Text>
              </HStack>
              <Button variant="link" colorScheme="blue" onClick={() => openInput('Bluesky')}>Connect</Button>
            </HStack>
            <HStack justifyContent="space-between">
              <HStack>
                <Image height={6} width={6} src='lensprotocol.png' />
                <Text ml="10px">Connect Lens</Text>
              </HStack>
              <Button variant="link" colorScheme="blue" onClick={() => openInput('Lens')}>Connect</Button>
            </HStack>
            <HStack justifyContent="space-between">
              <HStack>
                <Image height={6} width={6} src='Threads.png' />
                <Text ml="10px">Connect Threads</Text>
              </HStack>
              <Button variant="link" colorScheme="blue" onClick={() => openInput('Threads')}>Connect</Button>
            </HStack>
            {inputVisible && (
              <Box>
                <Text mt="4">Enter social media link for {platformToConnect}:</Text>
                <Input placeholder="https://example.com" onBlur={closeInput} />
                <Button mt="2" colorScheme="blue" onClick={handleConnect}>Confirm</Button>
              </Box>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default ConnectModal;
