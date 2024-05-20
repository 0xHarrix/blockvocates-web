import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Box, Heading, Flex, Text, Spinner, useToast, Button } from "@chakra-ui/react";
import { db } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, where, query } from "firebase/firestore";
import "./styles/Dashboard.css";

const DashboardOne = () => {
  const [userName, setUserName] = useState("");
  const [userClubId, setUserClubId] = useState("");
  const [clubName, setClubName] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const currentUserEmail = user.email;

            const userQuery = query(
              collection(db, "users"),
              where("email", "==", currentUserEmail)
            );
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();
              setUserName(userData.name);
              setUserClubId(userData.clubMembership.toString());

              const clubsCollection = collection(db, "clubs");
              const clubDoc = query(
                clubsCollection,
                where("clubId", "==", userData.clubMembership)
              );
              const clubSnap = await getDocs(clubDoc);

              if (!clubSnap.empty) {
                const clubData = clubSnap.docs[0].data();
                setClubName(clubData.clubName);
              } else {
                console.log("No such club!");
              }
            } else {
              console.log("No such user!");
            }

            setLoading(false);
          } else {
            setUserLoggedIn(false);
            setLoading(false);
          }
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth]);

  useEffect(() => {
    if (!userLoggedIn) {
      toast({
        title: "Please sign in to access the dashboard.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [userLoggedIn, navigate, toast]);

  return (
    <div className="bg">
      <NavBar />
      <Box>
        {loading ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            paddingBottom={200}
          >
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : (
          <div className="fade-in">
            <Heading
              as="h1"
              size="xl"
              color="#FFF"
              paddingLeft={"300px"}
              mt={10}
            >
              Welcome{" "}
              <span style={{ color: "#00BAE2" }}>{userName} !</span>
            </Heading>
          </div>
        )}

        <Flex justifyContent="flex-start" alignItems="flex-start" mt={2} ml={70}>
          <Flex direction="column" mr={12}>
            <Text
              fontSize={28}
              fontWeight="bold"
              textAlign="left"
              color="white"
              pl={200}
              ml={8}
              mb={1}
            >
              You're a member of
            </Text>
            <Text
              fontSize={28}
              fontWeight="bold"
              textAlign="left"
              color="white"
              pl={810}
              ml={8}
              mt={-10}
              mb={1}
            >
              Your Choosen Journey
            </Text>
          </Flex>
        </Flex>

        <Flex justifyContent="space-between" ml={270} mt={4}>
          <Box className="glassbox" padding="6" textAlign="center">
            <Flex direction="column" alignItems="center">
              <Text fontSize="xl" color="white" mt={10} textAlign="center">
                {clubName}
              </Text>
              <Text fontSize="md" color="white" mt={2} textAlign="center">
                Club Number: 00{userClubId}
              </Text>
            </Flex>
          </Box>




          <Box className="glassbox" padding="6" textAlign="center" mr={300}>
  <Flex direction="column" alignItems="center">
    <Text fontSize="xl" color="white" mt={12} textAlign="center">
      Trader
    </Text>
  </Flex>
</Box>

        </Flex>
        <Text
          fontSize={24}
          fontWeight="bold"
          textAlign="left"
          color="white"
          pl={270}
          mt={3}
          ml={8}
          mb={1}
        >
          Membership #
        </Text>
        <Text
          fontSize={35}
          fontWeight="bold"
          textAlign="left"
          color="white"
          pl={270}
          mt={1}
          ml={8}
          mb={1}
        >
          Misson Progress
        </Text>
        
        <Flex justifyContent="center" mt={1} pr={600}>
  <Box
    width="102px"
    height="102px"
    backgroundColor="rgba(255, 255, 255, 0.1)"
    border="1px solid rgba(255, 255, 255, 0.2)"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    fontSize="md"
    margin="10px"
    borderRadius="8px"
    boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
    color="white"
    transition="transform 0.2s, box-shadow 0.2s"
    _hover={{
      transform: "translateY(-5px)",
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Text fontWeight="bold">M1</Text>
    {/* Content for first box */}
  </Box>

  <Box
    width="102px"
    height="102px"
    backgroundColor="rgba(255, 255, 255, 0.1)"
    border="1px solid rgba(255, 255, 255, 0.2)"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    fontSize="md"
    margin="10px"
    borderRadius="8px"
    boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
    color="white"
    transition="transform 0.2s, box-shadow 0.2s"
    _hover={{
      transform: "translateY(-5px)",
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Text fontWeight="bold">M2</Text>
    <Text fontWeight="bold">Locked</Text>
    {/* Content for second box */}
  </Box>

  <Box
    width="102px"
    height="102px"
    backgroundColor="rgba(255, 255, 255, 0.1)"
    border="1px solid rgba(255, 255, 255, 0.2)"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    fontSize="md"
    margin="10px"
    borderRadius="8px"
    boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
    color="white"
    transition="transform 0.2s, box-shadow 0.2s"
    _hover={{
      transform: "translateY(-5px)",
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Text fontWeight="bold">M3</Text>
    <Text fontWeight="bold">Locked</Text>
    {/* Content for third box */}
  </Box>
</Flex>
  <Button
    bg="blue.400"
    color="white"
    borderRadius="8px"
    left={295}

  >
    Start
  </Button>

    
      </Box>
      
    </div>
  );
};

export default DashboardOne;
