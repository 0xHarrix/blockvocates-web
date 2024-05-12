import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig"; // Import Firebase firestore
import { collection, getDocs, query, where } from 'firebase/firestore';
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
  Spinner,
  Text 
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';


const ClubSearch = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("");
  const [days, setDays] = useState([]);
  const [meetingTime, setMeetingTime] = useState([]);
  const [clubType, setClubType] = useState("");

  useEffect(() => {
    // Fetch clubs from Firestore
    const fetchClubs = async () => {
      try {
        const clubsRef = collection(db, 'clubs');
        const clubsQuery = query(clubsRef, where("location", "==", location));
        const querySnapshot = await getDocs(clubsQuery);
        const fetchedClubs = querySnapshot.docs.map((doc) => doc.data());
        setClubs(fetchedClubs);
        setLoading(false); // Set loading to false after clubs are fetched
      } catch (error) {
        console.error("Error fetching clubs: ", error);
      }
    };

    // Fetch clubs only if location is not empty
    if (location !== "") {
      fetchClubs();
    } else {
      setLoading(false); // Set loading to false if location is empty
    }
  }, [location]);

  const handleSearch = () => {
    console.log("Location:", location);
    console.log("Days:", days);
    console.log("Meeting Time:", meetingTime);
    console.log("Club Type:", clubType);
  
    // Filter clubs based on search criteria and update state
    const filteredClubs = clubs.filter((club) => {
      const matchesLocation = club.location.includes(location);
      const matchesDays = days.some((day) => club.meetingDays.includes(day));
      const matchesMeetingTime = club.meetingTime.includes(meetingTime);
      const matchesClubType = club.clubType === clubType;
  
      console.log("Club:", club.clubName);
      console.log("Matches Location:", matchesLocation);
      console.log("Matches Days:", matchesDays);
      console.log("Matches Meeting Time:", matchesMeetingTime);
      console.log("Matches Club Type:", matchesClubType);
  
      return matchesLocation && matchesDays && matchesMeetingTime && matchesClubType;
    });
  
    console.log("Filtered Clubs:", filteredClubs);
    setClubs(filteredClubs);
  };
  

  return (
    <div className="container">
      <NavBar />
      <Box padding={"30px"} className="glassmorphism-container">
        <Heading as="h1" size="lg" color="#FFF" textAlign="center">
          Find a Club
        </Heading>
        <Box mt={5}>
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
          <CheckboxGroup colorScheme="teal" mt={5}>
            <Flex justify={'space-between'}>
              <Checkbox
                value="monday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
              >
                Monday
              </Checkbox>
              <Checkbox
                value="tuesday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
              >
                Tuesday
              </Checkbox>
              <Checkbox
                value="wednesday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
              >
                Wednesday
              </Checkbox>
              <Checkbox
                value="thursday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
              >
                Thursday
              </Checkbox>
              <Checkbox
                value="friday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
              >
                Friday
              </Checkbox>
            </Flex>
            <Flex justify={'center'}>
              <Checkbox
                value="saturday"
                onChange={(e) => setDays([...days, e.target.value])}
                color="#FFF"
                mr={5}
              >
                Saturday
              </Checkbox>
              <Checkbox
                value="sunday"
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
                value="morning"
                onChange={(e) => setMeetingTime([...meetingTime, e.target.value])}
                color="#FFF"
                mr={2}
              >
                Morning
              </Checkbox>
              <Checkbox
                value="evening"
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
            <option value="online">Online</option>
            <option value="inperson">In-person</option>
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

        {/* Display Spinner while loading */}
        {loading && (
          <Flex justify="center" mt={6}>
            <Spinner size="lg" color="teal" />
          </Flex>
        )}

        {/* Display Clubs */}
        <Box mt={6}>
          {clubs.length > 0 ? (
            clubs.map((club, index) => (
              <Box key={index} bg="rgba(255, 255, 255, 0.05)" p={4} my={2} borderRadius="md">
                <Heading as="h2" size="md" color="#FFF">{club.clubName}</Heading>
                {/* Display other club details */}
              </Box>
            ))
          ) : (
            <Text color="white">No clubs found.</Text>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ClubSearch;