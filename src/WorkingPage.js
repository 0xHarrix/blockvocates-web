import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import {
  Box,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Button, 
  Spinner
} from "@chakra-ui/react";
import "./styles/PreviewPage.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebaseConfig"; // Import Firebase firestore
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

const cards = [
  {
    title: "Crypto Trader",
    id: 1,
    description: "Description of Crypto Trader",
    image: "Crypto-Trader.png",
  },
  {
    title: "Marketing",
    id: 2,
    description: "Description of Marketing",
    image: "Marketing.png",
  },
  {
    title: "Community",
    id: 3,
    description: "Description of Community",
    image: "Community.png",
  },
  {
    title: "Developer",
    id: 4,
    description: "Description of Developer",
    image: "Developer.png",
  },
  {
    title: "Designer",
    id: 5,
    description: "Description of Designer",
    image: "Designer.png",
  },
];

function WorkingPage() {
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
          console.log(userData)
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
        pathId: cardPathId
      });

      console.log("Path selected successfully.");
      navigate("/DashboardMain"); // Redirect to home page or any other page
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
          <Popover key={index} isLazy>
            <PopoverTrigger>
              <Box
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
              >
                <Text fontSize="lg" fontWeight={700} marginBottom={-4}>
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
                >
                  Select
                </Button>
              </Box>
            </PopoverTrigger>
            <PopoverContent
              bg="rgba(255, 255, 255, 0.07)" // Glassmorphic background
              boxShadow="0 8px 32px rgba(31, 38, 135, 0.37)" // Glassmorphic shadow
              backdropFilter="blur(16px)"
              borderRadius="16px"
              color="white"
            >
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Text>{card.description}</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ))}
      </Flex>
      {loading && (
        <Flex justify="center" mt={6}>
          <Spinner size="lg" color="teal" />
        </Flex>
      )}
    </div>
  );
}

export default WorkingPage;
