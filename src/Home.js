import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import "./styles/Home.css";
import Journeys from "./Journeys";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [location, setLocation] = useState("");
  const [clubs, setClubs] = useState([]);
  const [user, setUser] = useState(null); // State to store user authentication status
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth(); // Get Firebase Auth instance

  useEffect(() => {
    // Simulate loading delay with setTimeout
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch clubs from Firestore
    const fetchClubs = async () => {
      const querySnapshot = await getDocs(collection(db, "clubs"));
      const clubsData = querySnapshot.docs.map((doc) => doc.data().clubName);
      setClubs(clubsData);
    };
    fetchClubs();
  }, [db]);

  useEffect(() => {
    // Monitor authentication status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user state based on authentication status
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [auth]);

  const handleSearch = () => {
    // Navigate to ClubSearch with location data
    navigate("/ClubSearch", { state: { location } });
  };

  const handleClubClick = (club) => {
    if (!user) {
      // Show alert if the user is not authenticated
      alert("Please register or log in to access club details.");
    } else {
      // Navigate to the specific club page if the user is logged in
      navigate(`/${club.replace(/\s+/g, "")}`);
    }
  };

  return (
    <div className={`container ${isLoaded ? "loaded" : ""}`}>
      <NavBar />
      <div className="body">
        <Box padding={"0px"} className="text1">
          <Heading
            as="h1"
            size={{ base: "lg", md: "xl" }}
            color="#FFF"
            textAlign="center"
            fontFamily={"Montserrat"}
          >
            Learn <span style={{ color: "#00BAE2" }}>Blockchain</span>, Improve
            your
            <span style={{ color: "#00BAE2" }}> Public Speaking</span>
          </Heading>
          <Heading
            as="h1"
            size={{ base: "lg", md: "xl" }}
            color="#FFF"
            textAlign="center"
            fontFamily={"Montserrat"}
          >
            Land Jobs in<span style={{ color: "#00BAE2" }}> Web3</span>
          </Heading>
          <Box mt={8} textAlign="center">
            <Heading
              as="h1"
              mt={{ base: "20px", md: "30px" }}
              size={{ base: "lg", md: "xl" }}
              color="#FFF"
              textAlign="center"
              fontFamily={"Montserrat"}
            >
              Why Join <span style={{ color: "#00BAE2" }}>Blockvocates?</span>
            </Heading>
            <Flex justifyContent="center" mt={5} flexWrap="wrap">
              <Box
                className="glassbox"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                padding="6"
                borderRadius="16px"
                border="1px solid rgba(255, 255, 255, 0.125)"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
                position="relative"
                backdropFilter="blur(16px) saturate(180%)"
                WebkitBackdropFilter="blur(16px) saturate(180%)"
                width={{ base: "260px", md: "300px" }}
                height={{ base: "260px", md: "300px" }}
                margin={{ base: "10px", md: "0 10px" }}
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Payment.png')"
                backgroundPosition="center"
                backgroundSize="cover"
                transition="transform 0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                }}
              >
                <Text
                  color="white"
                  fontSize={{ base: "md", md: "lg" }}
                  textAlign="left"
                  fontWeight={700}
                  marginBottom="10px"
                >
                  Learn Blockchain with a <br />
                  community
                </Text>
              </Box>
  
              <Box
                className="glassbox"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                padding="6"
                borderRadius="16px"
                border="1px solid rgba(255, 255, 255, 0.125)"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
                position="relative"
                backdropFilter="blur(16px) saturate(180%)"
                WebkitBackdropFilter="blur(16px) saturate(180%)"
                width={{ base: "260px", md: "300px" }}
                height={{ base: "260px", md: "300px" }}
                margin={{ base: "10px", md: "0 10px" }}
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Publicspeaking.png')"
                backgroundPosition="center"
                backgroundSize="cover"
                transition="transform 0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                  cursor: "pointer",
                }}
              >
                <Text
                  color="white"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight={700}
                  textAlign="left"
                  marginBottom="10px"
                >
                  Improve Public <br />
                  Speaking
                </Text>
              </Box>
  
              <Box
                className="glassbox"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                padding="6"
                borderRadius="16px"
                border="1px solid rgba(255, 255, 255, 0.125)"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
                position="relative"
                backdropFilter="blur(16px) saturate(180%)"
                WebkitBackdropFilter="blur(16px) saturate(180%)"
                width={{ base: "260px", md: "300px" }}
                height={{ base: "260px", md: "300px" }}
                margin={{ base: "10px", md: "0 10px" }}
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Comm.png')"
                backgroundPosition="center"
                backgroundSize="cover"
                transition="transform 0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                }}
              >
                <Text
                  color="white"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight={700}
                  textAlign="left"
                  marginBottom="10px"
                >
                  Get High paying Web3 <br />
                  Jobs
                </Text>
              </Box>
            </Flex>
          </Box>
          <Heading
            as="h1"
            size={{ base: "lg", md: "xl" }}
            color="#FFF"
            textAlign="center"
            fontFamily={"Montserrat"}
            marginTop="50px"
          >
            Six Customized  <span style={{ color: "#00BAE2" }}>Journeys </span>for your chosen Career Goals
           
          </Heading>
          <Journeys/>
        </Box>
      </div>
      <div className="body2">
        <Box padding={"30px"}>
          <Heading
            as="h1"
            size={{ base: "lg", md: "xl" }}
            color="#FFF"
            textAlign="center"
            fontFamily={"Montserrat"}
          >
            Find a<span style={{ color: "#00BAE2" }}> Club</span> and
          </Heading>
          <Heading
            as="h1"
            size={{ base: "lg", md: "xl" }}
            color="#FFF"
            textAlign="center"
            fontFamily={"Montserrat"}
          >
            Learn <span style={{ color: "#00BAE2" }}>Web3</span> with a
            community
          </Heading>
          <Flex marginTop="20px" justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box justifyContent="center" textAlign="center">
              {clubs.length > 0 ? (
                clubs.map((club, index) => (
                  <Heading
                    as="h1"
                    key={index}
                    size={{ base: "lg", md: "xl" }}
                    color="#FFF"
                    textAlign="center"
                    fontFamily={"Montserrat"}
                    marginBottom="10px"
                    _hover={{
                      color: "#00BAE2",
                      cursor: "pointer",
                    }}
                    onClick={() => handleClubClick(club)}
                  >
                    {club}
                  </Heading>
                ))
              ) : (
                <Text color="white" fontSize="xl" textAlign="center" mb={4}>
                  No clubs available
                </Text>
              )}
             {/* <Flex
                direction="column"
                align="center"
                padding="20px"
                marginRight={{ base: "0", md: "80px" }}
                borderRadius="20px"
                border="1px solid rgba(255, 255, 255, 0.2)"
                boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
                backdropFilter="blur(10px) saturate(180%)"
                WebkitBackdropFilter="blur(10px) saturate(180%)"
                background="rgba(255, 255, 255, 0.05)"
                width={{ base: "80%", md: "600px" }}
                height={{ base: "auto", md: "340px" }}
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Box py={6} px={8} textAlign="center">
                  <Text color="white" fontSize="3xl" fontWeight="bold" mb={4}>
                    Affordable Membership
                  </Text>
                  <Text
                    color="white"
                    fontSize={{ base: "md", md: "2xl" }}
                    fontWeight="semibold"
                    mb={4}
                  >
                    60$ for 6 months (10$/Month) - for Selected Scholars
                    <Text as="span" fontSize="sm" mt={4} fontStyle="italic" display="block">
                      (Original Price 25,000$ for 6 months or 4,200$/Month)
                    </Text>
                  </Text>
                  <Text color="#00BAE2" fontSize={{ base: "md", md: "2xl" }} fontWeight="semibold" mb={4}>
                    6000 $VOCATE tokens in Rewards
                  </Text>
                  {<Checkout /> }
                </Box>
              </Flex> */}
            </Box>
          </Flex>
        </Box>
      </div>
    </div>
  );
};

export default Home;
