import React, { useState } from 'react';
import Web3 from 'web3';
import { auth, db } from './firebaseConfig'; // Adjust the path as needed
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Box, Button, useToast, Text } from '@chakra-ui/react';

const ConnectWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const toast = useToast();

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                setWalletAddress(account);

                // Get the user's email
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const email = user.email;
                        setUserEmail(email);

                        // Store email and wallet address in Firestore
                        try {
                            await setDoc(doc(db, "wallets", user.email), {
                                email: email,
                                walletAddress: account
                            });
                            console.log("Wallet address saved to Firestore");
                            setIsConnected(true);
                            toast({
                                title: "Wallet Connected",
                                description: `Wallet address ${account} has been successfully connected.`,
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                            });
                        } catch (e) {
                            console.error("Error adding document: ", e);
                            toast({
                                title: "Error",
                                description: "Failed to save wallet address.",
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                            });
                        }
                    } else {
                        console.log("User is not signed in");
                        toast({
                            title: "User not signed in",
                            description: "Please sign in to connect your wallet.",
                            status: "warning",
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                });

            } catch (error) {
                console.error("User denied account access", error);
                toast({
                    title: "Access Denied",
                    description: "You need to allow account access to connect your wallet.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } else {
            console.error("No Web3 wallet found. Please install MetaMask.");
            toast({
                title: "No Web3 Wallet",
                description: "Please install MetaMask to connect your wallet.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box>
            <Button
                bg="#00BAE2"
                onClick={connectWallet}
                mt={5}
                disabled={isConnected}
            >
                {isConnected ? "Wallet Connected" : "Connect Wallet"}
            </Button>
        </Box>
    );
};

export default ConnectWallet;
