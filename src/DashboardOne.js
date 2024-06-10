import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Box, Heading, Flex, Text, Spinner, useToast } from "@chakra-ui/react";
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
      <Box px={{ base: 4, md: 8 }}>
        {loading ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            pb={200}
          >
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : (
          <div className="fade-in">
            <Heading
              as="h1"
              size="xl"
              color="#FFF"
              pl={{ base: 4, md: 8 }}
              mt={-4}
            >
              Welcome <span style={{ color: "#00BAE2" }}>{userName} !</span>
            </Heading>
          </div>
        )}
        <Flex
          justifyContent="center"
          alignItems="center"
          mt={6}
          flexDirection={{ base: "column", md: "row" }}
          textAlign="center"
        >
          <Flex direction="column" mb={{ base: 4, md: 0 }}>
            <Heading as="h2" size="xl" color="#FFF" mr={12}>
              You're a member of
            </Heading>
            <Heading as="h1" size="xl" color="#FFF" mr={12}>
              {clubName}
            </Heading>
          </Flex>
          <Box className="glassbox" p="6" textAlign="center">
            <Text fontSize="xl" color="white" pt="48px">
              {clubName}
            </Text>
            <Text fontSize="md" color="white" mt={2}>
              Club Number: 00{userClubId}
            </Text>
          </Box>
        </Flex>
        <Text
          fontSize={28}
          fontWeight="bold"
          textAlign="center"
          mt={4}
          color="white"
        >
          Choose your Blockvocates Journey (Journey cannot be changed once picked)
        </Text>
        <Flex
          justifyContent="center"
          mt={7}
          flexWrap="wrap"
          px={{ base: 4, md: 0 }}
        >
          {[
            "Crypto Trader",
            "Community Builder",
            "Designer",
            "Founder",
            "Musician",
            "Developer",
          ].map((role, index) => (
            <Box
              key={index}
              className="glassbox"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              p="6"
              borderRadius="16px"
              border="1px solid rgba(255, 255, 255, 0.125)"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
              position="relative"
              cursor="pointer"
              backdropFilter="blur(16px) saturate(180%)"
              WebkitBackdropFilter="blur(16px) saturate(180%)"
              width={{ base: "100%", sm: "45%", md: "30%", lg: "200px" }}
              height="200px"
              m="10px"
              backgroundImage={`linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('${role.replace(
                " ",
                "-"
              )}.png')`}
              backgroundPosition="center"
              backgroundSize="cover"
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
              onClick={() => navigate('/PreviewPage')}
            >
              <Text
                color="white"
                fontSize="lg"
                textAlign="center"
                fontWeight={700}
                mb="-14px"
              >
                {role}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default DashboardOne;
