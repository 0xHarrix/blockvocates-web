import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Box, Heading, Flex, Text, Spinner, useToast, Button } from "@chakra-ui/react";
import { db } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, where, query } from "firebase/firestore";
import "./styles/Dashboard.css";
import MissionCompletionPage from "./MissionCompletionPage";

const DashboardTwo = () => {
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
          <Flex justifyContent="center" alignItems="center" minHeight="100vh" paddingBottom={200}>
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : (
          <div className="fade-in">
            <Heading as="h1" size="xl" color="#FFF" textAlign="center" mt={10}>
              Welcome <span style={{ color: "#00BAE2" }}>{userName}!</span>
            </Heading>
          </div>
        )}

        <Flex justifyContent="center" alignItems="center" mt={10}>
          <Box className="glassbox" padding="6" textAlign="center" marginX={4}>
            <Flex direction="column" alignItems="center">
              <Text fontSize="xl" color="white" mt={10} textAlign="center">
                {clubName}
              </Text>
              <Text fontSize="md" color="white" mt={2} textAlign="center">
                Club Number: 00{userClubId}
              </Text>
            </Flex>
          </Box>

          <Box className="glassbox" padding="6" textAlign="center" marginX={4}>
            <Flex direction="column" alignItems="center">
              <Text fontSize="xl" color="white" mt={10} textAlign="center">
                Trader
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Flex justifyContent="center" mt={10}>
          <MissionCompletionPage />
        </Flex>
      </Box>
    </div>
  );
};

export default DashboardTwo;
