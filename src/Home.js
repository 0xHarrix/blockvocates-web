import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Box, Heading, Input, Text, Flex, Button } from "@chakra-ui/react";
import "./styles/Home.css";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay with setTimeout
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);


    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`container ${isLoaded ? "loaded" : ""}`}>
      <div className="body">
        <NavBar />
        <Box padding={"0px"}>
          <Heading as="h1" size="xl" color="#FFF" textAlign="center">
            Learn Blockchain, Improve your 
            <span style={{ color: "#00BAE2" }}> Public Speaking</span>
          </Heading>
          <Heading as="h1" size="xl" color="#FFF" textAlign="center">
            Land Jobs in<span style={{ color: "#00BAE2" }}> Web3</span>
          </Heading>
          <Box mt={8} textAlign="center">
            <Input
              variant="outline"
              placeholder="Enter your location or address"
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              color="#FFF"
              _placeholder={{ color: "#FFF" }}
              _hover={{ borderColor: "#00BAE2" }}
              _focus={{
                borderColor: "#00BAE2",
                boxShadow: "0 0 0 1px #00BAE2",
              }}
              borderRadius="8px"
              py={3}
              px={4}
              width="500px"
              height={50}
            />
            <Heading
              as="h1"
              mt="30px"
              size="xl"
              color="#FFF"
              textAlign="center"
            >
              Why Join <span style={{ color: "#00BAE2" }}>Blockvocates?</span>
            </Heading>
            <Flex justifyContent="center" mt={5}>
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
                width="300px"
                height="300px"
                margin="0 10px"
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Payment.png')"
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
                  Learn Blockchain with a <br />
                  community
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
                width="300px"
                height="300px"
                margin="0 10px"
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Publicspeaking.png')"
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
                  Improve Public <br />
                  Speaking
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
                width="300px"
                height="300px"
                margin="0 10px"
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Comm.png')"
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
                  Get High paying Web3 <br />
                  Jobs
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </div>
      <div className="body2">
        <Box padding={"30px"}>
          <Heading as="h1" size="xl" color="#FFF" textAlign="center">
            Find a<span style={{ color: "#00BAE2" }}> Club</span> and
          </Heading>
          <Heading as="h1" size="xl" color="#FFF" textAlign="center">
            Learn <span style={{ color: "#00BAE2" }}>Web3</span> with a
            community
          </Heading>
          <Flex justifyContent="center" alignItems="center">
            {" "}
            {/* Center the content horizontally and vertically */}
            <Box textAlign="left" flex="1" mt={30}>
              <Heading
                as="h1"
                mt="80px"
                size="lg"
                color="#FFF"
                textAlign="left"
              >
                Attend meetings as a guest before <br />
                <span style={{ color: "#00BAE2" }}>signing up</span> for free
              </Heading>
              <Text color={"white"} textAlign="left" mt={4} width={'100%'}>
                Experience the vibrant world of blockchain firsthand by
                attending our meetings as a guest. Immerse yourself in engaging
                discussions, where you'll explore the latest trends, challenges,
                and innovations shaping the blockchain industry. Gain valuable
                insights from seasoned professionals and passionate enthusiasts
                alike, sharing their expertise and perspectives. Connect with
                like-minded individuals who share your passion for blockchain
                technology and its potential to revolutionize various sectors.
                Whether you're a beginner eager to learn or an experienced
                professional seeking to expand your network, our meetings offer
                a welcoming environment for all.
              </Text>
              <Button mt={"10px"}>Find a Club</Button>
            </Box>
            <Box flex="1" justifyContent="center" mt={120} ml={20}>
              <Box
                padding="20px"
                marginRight="80px"
                borderRadius="20px"
                border="1px solid rgba(255, 255, 255, 0.2)"
                boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
                backdropFilter="blur(10px) saturate(180%)"
                WebkitBackdropFilter="blur(10px) saturate(180%)"
                background="rgba(255, 255, 255, 0.05)"
                width="600px"
                height="260px"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Box py={6} px={8}>
                  <Text color="white" fontSize="3xl" fontWeight="bold" mb={4}>
                    Affordable Membership
                  </Text>
                  <Text
                    color="white"
                    fontSize="2xl"
                    fontWeight="semibold"
                    mb={4}
                  >
                    $60 USD - 6 months
                  </Text>
                  <Text color="white" fontSize="lg" fontWeight="medium">
                    60000 Advocate in Rewards
                  </Text>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>
      </div>
    </div>
  );
};

export default Home;
