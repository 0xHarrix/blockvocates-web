import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import "./styles/PreviewPage.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebaseConfig"; // Import Firebase firestore
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

const cards = [
  {
    id: 1,
    title: "TRADER",
    description:
      "Trading in cryptocurrency is substantially different from traditional markets - 24/7 with no downtimes. And instead of traditional metrics like EPS (earnings per share) a lot of crypto price movement is driven by token-related factors. The TRADER journey will cover the fundamentals of blockchain, basics of project research and tokenomics, wallet setup for DEX (decentralized) and CEX (centralized) exchange trading, technical analysis, choosing your specialization, gaining asymmetric advantages and managing risk.",
    image: "Crypto-Trader.png",
    modules: [
      "M1: Read, Write, Own.",
      "M2: Identity Creation",
      "M3: Wallets, Interface, DEX, CEX.",
      "M4: Research Report",
      "M5: Trading Style (Low - Mid - High)",
      "M6: Managing Risk",
      "M7: Public Trading Challenge.",
      "M8: Summarizing Learnings.",
    ],
  },
  {
    id: 2,
    title: "COMMUNITY BUILDER",
    description:
      "Communities are the backbone of blockchains, true community involvement and ownership are what sets Web3 apart from Web2. Blockchain Projects invest millions in creating equitable communities. The COMMUNITY BUILDER journey will cover the fundamentals of blockchain, creating your identity, understanding the types of communities and platforms, picking your ideal community role and different tools that you can use.",
    image: "Marketing.png",
    modules: [
      "M1: Read, Write, Own.",
      "M2: Identity Creation",
      "M3: Understanding the types of Communities and Platforms found in Web3.",
      "M4: Discovering your ideal Community Match (sector)",
      "M5: Picking your Community Role (airdrop contributor, content creator, governance specialist/moderator, KOL partnerships/BD Specialist, growth, support, guerrilla/miscellaneous marketing)",
      "M6 Community Builder Tools.",
      "M7: Public Community Contribution Challenge (bounties etc.)",
      "M8: Summanzing Leamings.",
    ],
  },
  {
    id: 3,
    title: "DESIGNER",
    description:
      "Whenever there is a new renaissance, it is the artists and creatives that convey  the story -  from NFTs and visuals to brand identity, the blockchain world would not run without designers. The DESIGNER Journey will teach the fundamentals of blockchain, paint an understanding of what design means in Web3, help you find your voice and your role and equip you with the right tools to succeed.",
    image: "Community.png",
    modules: [
      "M1: Read, Wite, Own ",
      "M2: Identity Creation ",
      "M3: Understanding the Web3 Design Landscape ",
      "M4: Finding your Design Voice",
      "M5: Picking your Design Role (NFT Artist, Marketing Designer, UI/ UX or Product Design, Motion Designers, Metaverse etc.)",
      "M6: Web3 Designer Tools",
      "M7: Contribute to Web3 Design (bounties)",
      "M8: Summarizing Learnings",
    ],
  },
  {
    id: 4,
    title: "FOUNDER",
    description:
      "The trailblazers of ideas and innovation - founders build on the powerful technology of Blockchain - realizing the ideals of Web3 through innovative and revolutionary ideas.The FOUNDER journey will teach you the fundamentals of blockchain, how you canbecome a Web3 founder, select the right idea, find a team and community and launch your project.",
    image: "Developer.png",
    modules: [
      "M1: Read, Write, Own",
      "M2: Identity Creation",
      "M3: How can you become a (Web3) founder? ",
      "M4: Prioritizing and selecting an Idea for your first Project",
      "M5: Finding a Tean and Community for your idea",
      "M6: Web3 Founder Tools",
      "M7: Launching your project",
      "M8: Summarizing Learnings",
    ],
  },
  {
    id: 5,
    title: "MUSICIAN",
    description:
      "Web3 Music is poised to revolutionize the music industry - make it more equitable while giving fans much more ownership. The MUSICIAN journey will teach you the fundamentals of blockchain, how you can become a Web3 Musician, build music communities and launch your own Music NFTs.",
    image: "Designer.png",
    modules: [
      "M1: Create your Identity!",
      "M2: Read, Write, Own",
      "M3: Understanding the world of Web3 Music",
      "M4: Building and joining Music Communities",
      "M5: Exploring and Using Web3 Music Platforms.",
      "M6: Web3 Musician Tods",
      "M7: Launch a Music NET!",
      "M8: Summanzing Learniings.",
    ],
  },
  {
    id: 6,
    title: "DEVELOPER",
    description: "Developers are the backbone of the blockchain industry - shipping and moulding the dreams of a decentralized, distributed future. The DEVELOPER journey will teach you the fundamentals of blockchain, how you can get started with building Decentralized Applications and eventually launch your own Dapp!",
    image: "Developer.png",
    modules: [
      "M1: Create your Identity!",
      "M2: Read, Write, Own",
      "M3: Understanding the world of Web3 Development",
      "M4: Building and joining Development Communities",
      "M5: Exploring and Using Web3 Development Platforms.",
      "M6: Web3 Developer Tools",
      "M7: Launch a Dapp!",
      "M8: Summarizing Learnings.",
    ],
  },
];

function PreviewPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInitializing, setAuthInitializing] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User logged in:", user.email);
        await fetchUserData(user.email);
      } else {
        console.log("No user logged in");
        setLoading(false);
      }
      setAuthInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (email) => {
    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = { id: userDoc.id, ...userDoc.data() };
        setUserData(userData);
        console.log("User Data:", userData);

        // Check if user already has a path
        if (userData.pathId && userData.pathId !== 0) {
          navigate("/Dashboard");
        }
      } else {
        console.log("User data not found in Firestore");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const handleSelectPath = async (cardPathId) => {
    try {
      setLoading(true);

      if (!userData) {
        console.error("User data not found.");
        setLoading(false);
        return;
      }

      await updateDoc(doc(db, "users", userData.id), {
        pathId: cardPathId,
      });

      console.log("Path selected successfully.");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error selecting path:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (authInitializing) {
    return <Spinner />;
  }

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
            onClick={() => setSelectedCard(index)}
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
              isDisabled={userData && userData.clubMembership === 0}
            >
              Select
            </Button>
          </Box>
        ))}
      </Flex>
      {selectedCard !== null && (
        <Box
          className="description-card"
          position="absolute"
          marginTop={50}
          left="50%"
          transform="translateX(-50%)"
          width="1400px"
          padding="10px"
          borderRadius="8px"
          backgroundColor="rgba(255, 255, 255, 0.05)"
          color="white"
          zIndex="999"
          style={{ opacity: 1, pointerEvents: "none" }}
          textAlign="center"
        >
          <Text fontSize="xl" fontWeight="bold" marginBottom="10px">
            {cards[selectedCard].title}
          </Text>
          <Text>{cards[selectedCard].description}</Text>
          <Flex flexWrap="wrap" justifyContent="center" mt={7}>
            {cards[selectedCard].modules.map((module, index) => (
              <Box
                key={index}
                width="252px"
                height="252px"
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
                  boxShadow:
                    "0 6px 10px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
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
