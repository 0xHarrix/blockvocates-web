import React from 'react';
import { Box, Text, Button, IconButton, useDisclosure, VStack, HStack, Image } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { FaTwitter, FaFaucet, FaSkyatlas, FaLeaf } from 'react-icons/fa';

const ConnectModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <Button variant="link" colorScheme="blue">Connect</Button>
            </HStack>
            <HStack justifyContent="space-between">
              <HStack>
              <Image height={6} width={6} src='twitter.jpg' />
                <Text ml="10px">Connect Twitter</Text>
              </HStack>
              <Button variant="link" colorScheme="blue">Connect</Button>
            </HStack>
            <HStack justifyContent="space-between">
              <HStack>
              <Image height={6} width={6} src='Bluesky.png' />
                <Text ml="10px">Connect Bluesky</Text>
              </HStack>
              <Button variant="link" colorScheme="blue">Connect</Button>
            </HStack>
            <HStack justifyContent="space-between">
              <HStack>
              <Image height={6} width={6} src='lensprotocol.png' />
                <Text ml="10px">Connect Lens</Text>
              </HStack>
              <Button variant="link" colorScheme="blue">Connect</Button>
            </HStack>
            <HStack justifyContent="space-between">
              <HStack>
              <Image height={6} width={6} src='Threads.png' />
                <Text ml="10px">Connect Threads</Text>
              </HStack>
              <Button variant="link" colorScheme="blue">Connect</Button>
            </HStack>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default ConnectModal;
