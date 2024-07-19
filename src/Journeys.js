import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { Box, Flex, Text, IconButton, Collapse } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import "./styles/Journeys.css";

const journeys = [
  {
    id: 1,
    title: "TRADER",
    description:
      "Trading in cryptocurrency is substantially different from traditional markets - 24/7 with no downtimes. And instead of traditional metrics like EPS (earnings per share) a lot of crypto price movement is driven by token-related factors. The TRADER journey will cover the fundamentals of blockchain, basics of project research and tokenomics, wallet setup for DEX (decentralized) and CEX (centralized) exchange trading, technical analysis, choosing your specialization, gaining asymmetric advantages and managing risk.",
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

function Journeys() {
  const [selectedJourney, setSelectedJourney] = useState(null);

  const handleToggle = (id) => {
    setSelectedJourney(selectedJourney === id ? null : id);
  };

  return (
    <div>
      <Flex justifyContent="center" mt={7} flexDirection="column" alignItems="center">
        {journeys.map((journey) => (
          <Box key={journey.id} width="100%" maxWidth="800px" mb={4}>
            <Flex alignItems="center" justifyContent="space-between" p={4} bg="gray.800" borderRadius="md" cursor="pointer" onClick={() => handleToggle(journey.id)}>
              <Text fontSize="xl" fontWeight="bold" color="white">{journey.title}</Text>
              <IconButton icon={selectedJourney === journey.id ? <ChevronUpIcon /> : <ChevronDownIcon />} aria-label="Expand journey details" variant="outline" colorScheme="teal" />
            </Flex>
            <Collapse in={selectedJourney === journey.id}>
              <Box p={4} bg="gray.700" borderRadius="md" mt={2} color="white">
                <Text mb={4}>{journey.description}</Text>
                <Flex flexWrap="wrap" justifyContent="center">
                  {journey.modules.map((module, index) => (
                    <Box key={index} width="100%" maxWidth="400px" bg="gray.600" p={2} m={1} borderRadius="md">
                      <Text fontWeight="bold" mb={1}>{module.split(":")[0]}</Text>
                      <Text>{module.split(":")[1]}</Text>
                    </Box>
                  ))}
                </Flex>
              </Box>
            </Collapse>
          </Box>
        ))}
      </Flex>
    </div>
  );
}

export default Journeys;
