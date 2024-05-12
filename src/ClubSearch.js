import React, { useState } from "react";
import NavBar from "./components/NavBar";
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
      <Box padding={"50px"}>
        <Heading as="h1" size="xl" color="#FFF" textAlign="center">
          Find a Club
        </Heading>
        <Box mt={8}>
          <Heading as="h2" size="lg" color="#FFF" className="club-search-heading">
            Enter your location:
          </Heading>
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
          <Heading as="h2" size="lg" color="#FFF" className="club-search-heading">
            Select radius:
          </Heading>
          <Select
            placeholder="Select radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            mt={2}
            bg="rgba(255, 255, 255, 0.05)"
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
            width="100%"
          >
            <option value="5">5 miles</option>
            <option value="10">10 miles</option>
            <option value="15">15 miles</option>
            <option value="20">20 miles</option>
          </Select>
        </Box>
        <Box mt={4}>
          <Heading as="h2" size="lg" color="#FFF" className="club-search-heading">
            Meeting days:
          </Heading>
          <CheckboxGroup colorScheme="teal" mt={2}>
            <Flex>
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
              <Checkbox
                value="Friday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
              >
                Friday
              </Checkbox>
            </Flex>
          </CheckboxGroup>
        </Box>
        <Box mt={4}>
          <Heading as="h2" size="lg" color="#FFF" className="club-search-heading">
            Meeting time:
          </Heading>
          <CheckboxGroup colorScheme="teal" mt={2}>
            <Flex>
              <Checkbox
                value="Morning"
                onChange={(e) => setMeetingTime([...meetingTime, e.target.value])}
                color="#FFF"
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
        <Box mt={4}>
          <Heading as="h2" size="lg" color="#FFF" className="club-search-heading">
            Club type:
          </Heading>
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
            }}
            borderRadius="8px"
            py={3}
            px={4}
            width="100%"
          >
            <option value="Online">Online</option>
            <option value="In-person">In-person</option>
          </Select>
        </Box>
        <Button
          colorScheme="teal"
          onClick={handleSearch}
          mt={8}
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
