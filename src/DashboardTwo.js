import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Box, Heading, Flex, Text, Spinner, useToast } from "@chakra-ui/react";
import { db } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, where, query } from "firebase/firestore";
import MissionCompletion from "./MissionCompletion";
import "./styles/Dashboard1.css"; // Import the CSS file

const DashboardTwo = () => {
  const [userName, setUserName] = useState("");
  const [userClubId, setUserClubId] = useState("");
  const [clubName, setClubName] = useState("");
  const [userPathId, setUserPathId] = useState("");
  const [pathName, setPathName] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingPathName, setLoadingPathName] = useState(false);
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
              setUserPathId(userData.pathId);
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

  useEffect(() => {
    const fetchPathName = async () => {
      try {
        if (userClubId) {
          setLoadingPathName(true);
          console.log("Path Id : ", userPathId);
          const pathsCollection = collection(db, "paths");
          const pathDoc = query(pathsCollection, where("pathId", "==", userPathId));
          const pathSnap = await getDocs(pathDoc);

          if (!pathSnap.empty) {
            const pathData = pathSnap.docs[0].data();
            setPathName(pathData.pathName);
          } else {
            console.log("No such path!");
          }

          setLoadingPathName(false);
        }
      } catch (error) {
        console.error("Error fetching path name:", error);
        setLoadingPathName(false);
      }
    };

    fetchPathName();
  }, [userClubId]);

  return (
    <div className="bg">
      <NavBar />
      <Box>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" minHeight="100vh" pb={200}>
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : (
          <div className="fade-in">
            <Heading as="h1" size="xl" color="#FFF" textAlign="center" mt={3}>
              Welcome <span style={{ color: "#00BAE2" }}>{userName}!</span>
            </Heading>
          </div>
        )}

        <Flex justifyContent="center" alignItems="center" mt={10} wrap="wrap">
          <Box className="glassbox-small1" p={4} textAlign="center" mx={2}>
            <Flex direction="column" alignItems="center">
              <Text fontSize="xl" color="white" mt={14} textAlign="center">
                {clubName}
              </Text>
              <Text fontSize="md" color="white" mt={14} textAlign="center">
                Club Number: 00{userClubId}
              </Text>
            </Flex>
          </Box>

          {loadingPathName ? (
            <Spinner size="sm" color="blue.500" />
          ) : (
            <Box className="glassbox-small1" p={4} textAlign="center" mx={2}>
              <Flex direction="column" alignItems="center">
                <Text fontSize="xl" color="white" mt={6} textAlign="center">
                  {pathName}
                </Text>
              </Flex>
            </Box>
          )}
        </Flex>

        <Flex justifyContent="center" mt={3}>
          <MissionCompletion />
        </Flex>
      </Box>
    </div>
  );
};

export default DashboardTwo;
