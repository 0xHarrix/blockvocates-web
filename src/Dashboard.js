import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from "./components/NavBar";
import { Box, Heading, Flex, Text, Spinner } from "@chakra-ui/react";
import "./styles/Dashboard.css";
import { db } from './firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDocs, doc, collection, where } from 'firebase/firestore';
import { useToast } from "@chakra-ui/react";

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userClubId, setUserClubId] = useState('');
  const [clubName, setClubName] = useState('');
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const auth = getAuth();
  const history = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const currentUserEmail = user.email;
            console.log(currentUserEmail)
            const querySnapshot = await getDocs(
              collection(db, 'users'),
              where('email', '==', currentUserEmail)
          );
            console.log(querySnapshot)
  
            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();
              console.log(userData)
              setUserName(userData.name);
              setUserClubId(userData.clubMembership);
  
              // Fetch club name based on club id
              if (userData.clubMembership) {
                const clubSnapshot = await getDocs(doc(db, 'clubs', userData.clubMembership));
                if (clubSnapshot.exists()) {
                  const clubData = clubSnapshot.data();
                  setClubName(clubData.clubName);
                }
              }
            }
          } else {
            setUserName('');
            setUserClubId('');
            setUserLoggedIn(false);
          }
  
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [auth]);
  

  if (!userLoggedIn) {
    toast({
      title: "Please sign in to access the dashboard.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });

    setTimeout(() => {
      history('/login');
    }, 3000);
  }

  return (
    <div className="bg">
      <NavBar />
      <Box>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" minHeight="100vh" paddingBottom={200}>
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : (
          <div className="fade-in">
            <Heading as="h1" size="xl" color="#FFF" paddingLeft={"100px"} mt={-4} >
              Welcome <span style={{ color: "#00BAE2" }}>{userName} !</span>
            </Heading>
          </div>
        )}
        <Flex justifyContent="center" alignItems="center" mt={6}>
          <Flex direction={'column'}>
            <Heading as="h2" size="xl" color="#FFF" textAlign="center" mr={12}>
              You're a member of
            </Heading>
            <Heading as="h1" size="xl" color="#FFF" textAlign="center" mr={12}>
              {clubName} {/* Display Club Name */}
            </Heading>
            <Text fontSize={28} fontWeight={'bold'} textAlign={'center'} mt={4} color={'white'}>Membership Number</Text>
          </Flex>
          <Box className="glassbox" padding="6" textAlign="center">
            <Text fontSize="xl" color="white" paddingTop={"48px"}>
              {userClubId}
            </Text>
            <Text fontSize="md" color="white" mt={2}>
              Club Number: XXXX
            </Text>
          </Box>
        </Flex>
        <Text fontSize={28} fontWeight={'bold'} textAlign={'center'} mt={4} color={'white'}>Choose your Blockvocates Journey (Journey cannot be changed once picked)</Text>
        <Flex justifyContent="center" mt={7}>
        <Box
                className="glassbox"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end" // Align content at the bottom
                padding="6"
                borderRadius="16px"
                border="1px solid rgba(255, 255, 255, 0.125)"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
                position="relative"
                cursor={'pointer'}
                backdropFilter="blur(16px) saturate(180%)"
                WebkitBackdropFilter="blur(16px) saturate(180%)"
                width="200px"
                height="200px"
                margin="0 10px"
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Crypto-Trader.png')"
                backgroundPosition="center"
                backgroundSize="cover"
                transition="transform 0.3s ease-in-out" // Add transition for smooth effect
                _hover={{
                  transform: "scale(1.05)", // Increase scale on hover
                }}
              >
                <Text
                  color="white"
                  fontSize={"lg"}
                  textAlign="left"
                  fontWeight={700}
                  marginBottom="10px"
                >
                  Crypto Trader
                </Text>
              </Box>
              <Box
                className="glassbox"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end" // Align content at the bottom
                padding="6"
                borderRadius="16px"
                border="1px solid rgba(255, 255, 255, 0.125)"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
                position="relative"
                backdropFilter="blur(16px) saturate(180%)"
                WebkitBackdropFilter="blur(16px) saturate(180%)"
                cursor={'pointer'}
                width="200px"
                height="200px"
                margin="0 10px"
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Designer.png')"
                backgroundPosition="center"
                backgroundSize="cover"
                transition="transform 0.3s ease-in-out" // Add transition for smooth effect
                _hover={{
                  transform: "scale(1.05)", // Increase scale on hover
                }}
              >
                <Text
                  color="white"
                  fontSize={"lg"}
                  fontWeight={700}
                  textAlign="left"
                  marginBottom="10px"
                >
Designer
                </Text>
              </Box>
              <Box
                className="glassbox"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end" // Align content at the bottom
                padding="6"
                borderRadius="16px"
                border="1px solid rgba(255, 255, 255, 0.125)"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
                position="relative"
                cursor={'pointer'}
                backdropFilter="blur(16px) saturate(180%)"
                WebkitBackdropFilter="blur(16px) saturate(180%)"
                width="200px"
                height="200px"
                margin="0 10px"
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Developer.png')"
                backgroundPosition="center"
                backgroundSize="cover"
                transition="transform 0.3s ease-in-out" // Add transition for smooth effect
                _hover={{
                  transform: "scale(1.05)", // Increase scale on hover
                }}
              >
                <Text
                  color="white"
                  fontSize={"lg"}
                  fontWeight={700}
                  textAlign="left"
                  marginBottom="10px"
                >
                  Developer
                </Text>
              </Box>
              <Box
                className="glassbox"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end" // Align content at the bottom
                padding="6"
                borderRadius="16px"
                border="1px solid rgba(255, 255, 255, 0.125)"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
                position="relative"
                cursor={'pointer'}
                backdropFilter="blur(16px) saturate(180%)"
                WebkitBackdropFilter="blur(16px) saturate(180%)"
                width="200px"
                height="200px"
                margin="0 10px"
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Community.png')"
                backgroundPosition="center"
                backgroundSize="cover"
                transition="transform 0.3s ease-in-out" // Add transition for smooth effect
                _hover={{
                  transform: "scale(1.05)", // Increase scale on hover
                }}
              >
                <Text
                  color="white"
                  fontSize={"lg"}
                  fontWeight={700}
                  textAlign="left"
                  marginBottom="10px"
                >
                  Community
                </Text>
              </Box>
              <Box
                className="glassbox"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end" // Align content at the bottom
                padding="6"
                borderRadius="16px"
                border="1px solid rgba(255, 255, 255, 0.125)"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
                position="relative"
                backdropFilter="blur(16px) saturate(180%)"
                WebkitBackdropFilter="blur(16px) saturate(180%)"
                width="200px"
                height="200px"
                margin="0 10px"
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Marketing.png')"
                backgroundPosition="center"
                backgroundSize="cover"
                transition="transform 0.3s ease-in-out" // Add transition for smooth effect
                _hover={{
                  transform: "scale(1.05)", // Increase scale on hover
                }}
                cursor={'pointer'}
              >
                <Text
                  color="white"
                  fontSize={"lg"}
                  fontWeight={700}
                  textAlign="left"
                  marginBottom="10px"
                >
Marketing
                </Text>
              </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default Dashboard;
