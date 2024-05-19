import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import "./styles/PreviewPage.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebaseConfig"; // Import Firebase firestore
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

const cards = [
  {
    id: "1",
    title: "Crypto Trader",
    description: "Trading in cryptocurrency is substantially different from traditional markets...",
    image: "Crypto-Trader.png",
  },
  {
    id: "2",
    title: "Marketing",
    description: "Description of Marketing",
    image: "Marketing.png",
  },
  {
    id: "3",
    title: "Community",
    description: "Description of Community",
    image: "Community.png",
  },
  {
    id: "4",
    title: "Developer",
    description: "Description of Developer",
    image: "Developer.png",
  },
  {
    id: "5",
    title: "Designer",
    description: "Description of Designer",
    image: "Designer.png",
  },
];

const modules = [
  "M1: Read, Write, Own.",
  "M2: Identity Creation",
  "M3: Wallets, Interface, DEX, CEX.",
  "M4: Research Report",
  "M5: Trading Style (Low - Mid - High)",
  "M6: Managing Risk",
  "M7: Public Trading Challenge.",
  "M8: Summarizing Learnings.",
];

function PreviewPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userId = user.email;
        console.log("User:", userId);

        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("email", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserData({ id: userDoc.id, ...userDoc.data() });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSelectPath = async (cardPathId) => {
    try {
      setLoading(true);

      if (!userData) {
        console.error("User data not found.");
        return;
      }

      await updateDoc(doc(db, "users", userData.id), {
        pathId: cardPathId,
      });

      console.log("Path selected successfully.");
      navigate("/DashboardMain");
    } catch (error) {
      console.error("Error selecting path:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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
            padding="5"
            borderRadius="16px"
            border="1px solid rgba(255, 255, 255, 0.125)"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
            position="relative"
            color={"white"}
            WebkitBackdropFilter="blur(16px) saturate(180%)"
            cursor={"pointer"}
            width="300px" // Increased width
            height="300px" // Increased height
            margin="0 10px"
            backgroundImage={`url(${card.image})`}
            backgroundRepeat={"no-repeat"}
            backgroundPosition="top"
            backgroundSize="75%"
            transition="transform 0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Text fontSize="lg" fontWeight={700} marginBottom={-2}>
              {card.title}
            </Text>
            <Button
              colorScheme="teal"
              mt={5}
              width="100%"
              bg="#00BAE2"
              onClick={() => handleSelectPath(card.id)}
              _hover={{ bg: "#0597B7" }}
              _active={{ bg: "#008EAF" }}
              marginBottom={-2}
            >
              Select
            </Button>
          </Box>
        ))}
      </Flex>
      {hoveredCard !== null && (
        <Box
  className="description-card"
  position="absolute"
  marginTop={50}
  left="50%"
  transform="translateX(-50%)"
  width="1000px"
  padding="10px"
  borderRadius="8px"
  backgroundColor="rgba(255, 255, 255, 0.05)"
  color="white"
  zIndex="999"
  style={{ opacity: 1, pointerEvents: "none" }}
  textAlign="center" // Center align the description heading
>
  <Text fontSize="xl" fontWeight="bold" marginBottom="10px">
    {cards[hoveredCard].title} Description
  </Text>
  <Text>{cards[hoveredCard].description}</Text>
  <Flex flexWrap="wrap" justifyContent="center" mt={7}>
    {modules.map((module, index) => (
      <Box
        key={index}
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
        <Text fontWeight="bold" marginBottom="5px">
          {module.split(":")[0]}
        </Text>
        <Text textAlign="center">{module.split(":")[1]}</Text>
      </Box>
    ))}
  </Flex>
</Box>

      )}
      {loading && <Spinner />}
    </div>
  );
}

export default PreviewPage;
