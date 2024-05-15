import React from "react";
import NavBar from "./components/NavBar";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import "./styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="bg">
      <NavBar />
      <Box>
        <Heading as="h1" size="xl" color="#FFF" paddingLeft={"100px"} mt={-4}>
          Welcome <span style={{ color: "#00BAE2" }}>YourName</span>
        </Heading>

        <Flex justifyContent="center" alignItems="center" mt={6}>
          <Flex direction={'column'}>
        <Heading as="h1" size="xl" color="#FFF" textAlign="center" mr={12}>
          You're a member of
        </Heading>
        <Text fontSize={28} fontWeight={'bold'} textAlign={'center'} mt={4} color={'white'}>Membership Number</Text>
        </Flex>
          <Box className="glassbox" padding="6" textAlign="center">
            <Text fontSize="xl" color="white" paddingTop={"48px"}>
              Club Name
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
                  Community builder
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
                backgroundImage="linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('Comm.png')"
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
