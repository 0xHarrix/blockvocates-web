import React, { useState } from "react";
import NavBar from "./components/NavBar";
import './styles/ClubSearch.css';
import {
  Box,
  Heading,
  Input,
  Flex,
  Checkbox,
  CheckboxGroup,
  Button,
  Select,
} from "@chakra-ui/react";

const ClubSearch = () => {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("");
  const [days, setDays] = useState([]);
  const [meetingTime, setMeetingTime] = useState([]);
  const [clubType, setClubType] = useState("");

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching...");
  };

  return (
    <div className="container">
      <NavBar />
      <Box padding={"30px"} className="glassmorphism-container">
        <Heading as="h1" size="lg" color="#FFF" textAlign="center">
          Find a Club
        </Heading>
        <Box mt={10}>
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            mt={2}
            variant="outline"
            color="#FFF"
            bg="rgba(255, 255, 255, 0.05)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            _placeholder={{ color: "#FFF" }}
            _hover={{ borderColor: "#00BAE2" }}
            _focus={{
              borderColor: "#00BAE2",
              boxShadow: "0 0 0 1px #00BAE2",
            }}
            borderRadius="8px"
            py={3}
            px={4}
            width="100%"
          />
        </Box>
        <Box mt={4}>
          <Select
            placeholder="Select radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            mt={2}
            bg="rgba(255, 255, 255, 0.05)"
            _placeholder={{ color: "black" }}
            color="white"
            _hover={{ borderColor: "#00BAE2" }}
            _focus={{
              borderColor: "#00BAE2",
              boxShadow: "0 0 0 1px #00BAE2",
              color: "black"
            }}
            borderRadius="8px"
            py={3}
            px={0}
            width="98%"
            colorScheme="dark"
          >
            <option value="5" color="black">5 miles</option>
            <option value="10">10 miles</option>
            <option value="15">15 miles</option>
            <option value="20">20 miles</option>
          </Select>
        </Box>
        <Box mt={4}>
          <CheckboxGroup colorScheme="teal" mt={5}>
            <Flex justify={'space-between'}>
              <Checkbox
                value="Monday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
              >
                Monday
              </Checkbox>
              <Checkbox
                value="Tuesday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
              >
                Tuesday
              </Checkbox>
              <Checkbox
                value="Wednesday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
              >
                Wednesday
              </Checkbox>
              <Checkbox
                value="Thursday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
              >
                Thursday
              </Checkbox>
              </Flex>
              <Flex justify={'center'}>
              <Checkbox
                value="Friday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
                mr={5}
              >
                Friday
              </Checkbox>
              <Checkbox
                value="Friday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
                mr={5}
              >
                Saturday
              </Checkbox>
              <Checkbox
                value="Friday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
              >
                Sunday
              </Checkbox>
            </Flex>
          </CheckboxGroup>
        </Box>
        <Box mt={8}>
          <CheckboxGroup colorScheme="teal" mt={0}>
            <Flex direction={'column'}>
              <Checkbox
                value="Morning"
                onChange={(e) => setMeetingTime([...meetingTime, e.target.value])}
                color="#FFF"
                mr={2}
              >
                Morning
              </Checkbox>
              <Checkbox
                value="Evening"
                onChange={(e) => setMeetingTime([...meetingTime, e.target.value])}
                color="#FFF"
              >
                Evening
              </Checkbox>
            </Flex>
          </CheckboxGroup>
        </Box>
        <Box mt={0}>
          <Select
            placeholder="Select club type"
            value={clubType}
            onChange={(e) => setClubType(e.target.value)}
            mt={2}
            bg="rgba(255, 255, 255, 0.05)"
            color="#FFF"
            _placeholder={{ color: "#FFF" }}
            _hover={{ borderColor: "#00BAE2" }}
            _focus={{
              borderColor: "#00BAE2",
              boxShadow: "0 0 0 1px #00BAE2",
              color: "black"
            }}
            borderRadius="8px"
            py={3}
            px={0}
            width="98%"
          >
            <option value="Online">Online</option>
            <option value="In-person">In-person</option>
          </Select>
        </Box>
        <Button
          colorScheme="teal"
          onClick={handleSearch}
          mt={6}
          bg="#00BAE2"
          _hover={{ bg: "#0597B7" }}
          _active={{ bg: "#008EAF" }}
        >
          Search
        </Button>
      </Box>
    </div>
  );
};

export default ClubSearch;
