import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import "./styles/PreviewPage.css";

const cards = [
  {
    title: "Crypto Trader",
    description: "Trading in cryptocurrency is substantially different from traditional markets - 24/7 with no downtimes. And instead of traditional metrics like EPS (earnings per share) a lot of crypto price movement is driven by token-related factors. The TRADER journey will cover the fundamentals of blockchain, basics of project research and tokenomics, wallet setup for DEX (decentralized) and CEX (centralized) exchange trading, technical analysis, choosing your specialization, gaining asymmetric advantages and managing risk.",
    image: "Crypto-Trader.png",
  },
  {
    title: "Marketing",
    description: "Description of Marketing",
    image: "Marketing.png",
  },
  {
    title: "Community",
    description: "Description of Community",
    image: "Community.png",
  },
  {
    title: "Developer",
    description: "Description of Developer",
    image: "Developer.png",
  },
  {
    title: "Designer",
    description: "Description of Designer",
    image: "Designer.png",
  },
];

function PreviewPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="bg">
      <NavBar />
      <Flex justifyContent="center" mt={7}>
        {cards.map((card, index) => (
          <Box
            key={index}
            className="glassbox"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="center"
            padding="6"
            borderRadius="16px"
            border="1px solid rgba(255, 255, 255, 0.125)"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
            position="relative"
            color={"white"}
            WebkitBackdropFilter="blur(16px) saturate(180%)"
            cursor={"pointer"}
            width="200px"
            height="200px"
            margin="0 10px"
            backgroundImage={`linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)), url(${card.image})`}
            backgroundPosition="center"
            backgroundSize="cover"
            transition="transform 0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Text fontSize="lg" fontWeight={700} marginBottom={-4}>
              {card.title}
            </Text>
            <Button
              colorScheme="teal"
              mt={5}
              width="100%"
              bg="#00BAE2"
              _hover={{ bg: "#0597B7" }}
              _active={{ bg: "#008EAF" }}
            >
              Select
            </Button>
          </Box>
        ))}
      </Flex>
      <Box
  className="description-card"
  position="absolute"
  marginTop={50}
  left="50%"
  transform="translateX(-50%)"
  width="1050px"
  padding="10px"
  borderRadius="8px"
  backgroundColor="rgba(255, 255, 255, 0.05)"
  color="white"
  zIndex="999"
  style={{ opacity: hoveredCard !== null ? 1 : 0, pointerEvents: "none" }}
>
  {hoveredCard !== null && <Text>{cards[hoveredCard].description}</Text>}
  <Flex flexWrap="wrap" justifyContent="center" mt={7}>
  <Box
        width="100px"
        height="100px"
        backgroundColor="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="md"
        margin="10px"
      >
        M1: Read, Write, Own.
      </Box>
      <Box
        width="100px"
        height="100px"
        backgroundColor="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="md"
        margin="10px"
      >
M2: Identity Creation
      </Box>
      <Box
        width="100px"
        height="100px"
        backgroundColor="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="md"
        margin="10px"
      >
M3: Wallets, Interface, DEX, CEX.
      </Box>
      <Box
        width="100px"
        height="100px"
        backgroundColor="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="md"
        margin="10px"
      >
M4: Research Report
      </Box>
      <Box
        width="100px"
        height="100px"
        backgroundColor="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="md"
        margin="10px"
      >
M5: Trading Style (Low - Mid - High)
      </Box>
      <Box
        width="100px"
        height="100px"
        backgroundColor="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="md"
        margin="10px"
      >
M6: Managing Risk
      </Box>
      <Box
        width="100px"
        height="100px"
        backgroundColor="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="md"
        margin="10px"
      >
M7: Public Trading Challenge.
      </Box>
      <Box
        width="100px"
        height="100px"
        backgroundColor="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="md"
        margin="10px"
      >
M8: Summarizing Learnings.
      </Box>
  </Flex>
</Box>
    </div>
  );
}

export default PreviewPage;
