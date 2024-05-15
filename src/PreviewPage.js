import React from "react";
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
} from "@chakra-ui/react";
import "./styles/PreviewPage.css";

const cards = [
  { title: "Crypto Trader", description: "Description of Marketing", image: "Crypto-Trader.png" },
  { title: "Marketing", description: "Description of Marketing", image: "Marketing.png" },
  { title: "Community", description: "Description of Community", image: "Community.png" },
  { title: "Developer", description: "Description of Developer", image: "Developer.png" },
  { title: "Designer", description: "Description of Designer", image: "Designer.png" },
];

function PreviewPage() {
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
              </Box>
            </PopoverTrigger> 
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Text>{card.description}</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ))}
      </Flex>
    </div>
  );
}

export default PreviewPage;
