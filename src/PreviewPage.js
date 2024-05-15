import React, {useState} from "react";
import NavBar from "./components/NavBar";
import { Box, Heading, Flex, Text, Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";
import './styles/PreviewPage.css'

function PreviewPage() {
    const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="bg">
    <NavBar />
    <Flex justifyContent="center" mt={7}>
    <Popover isOpen={isHovered} onClose={() => setIsHovered(false)}>
          <PopoverTrigger>
            <Box
              className="glassbox"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end" // Align content at the bottom
                padding="6"
                borderRadius="16px"
                border="1px solid rgba(255, 255, 255, 0.125)"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
                position="relative"
                color={'white'}
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
              <Text fontSize="lg" fontWeight={700}>
                Crypto Trader
              </Text>
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <Text>Description of Crypto Trader</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
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
    </div>
  )
}

export default PreviewPage;