import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig"; // Import Firebase firestore
import { collection, getDocs, query, where, doc, getDoc, addDoc } from "firebase/firestore";
import NavBar from "./components/NavBar";
import "./styles/ClubSearch.css";
import {
  Box,
  Grid,
  Heading,
  Input,
  Flex,
  Radio,
  RadioGroup,
  Button,
  Select,
  Spinner,
  Text,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ClubSearch = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [clubType, setClubType] = useState("");
  const [appliedClubs, setAppliedClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const clubsRef = collection(db, "clubs");
        const clubsQuery = query(clubsRef, where("location", "==", location));
        const querySnapshot = await getDocs(clubsQuery);
        const fetchedClubs = querySnapshot.docs.map((doc) => doc.data());
        setClubs(fetchedClubs);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching clubs: ", error);
      }
    };

    if (location !== "") {
      fetchClubs();
    } else {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    const fetchAppliedClubs = async () => {
      try {
        const user = auth.currentUser;
        const userId = user.email;

        const querySnapshot = await getDocs(
          query(collection(db, "clubApplications"), where("userId", "==", userId))

        );


        const appliedClubIds = querySnapshot.docs.map((doc) => doc.data().clubId);
        setAppliedClubs(appliedClubIds);
      } catch (error) {
        console.error("Error fetching applied clubs:", error);
      }
    };

    fetchAppliedClubs();
  }, []);

  const handleSearch = () => {
    
    // Filter clubs based on search criteria and update state
    const filteredClubs = clubs.filter((club) => {
      const matchesLocation = club.location.includes(location);
      const matchesDays = club.meetingDays.includes(days);
      const matchesMeetingTime = club.meetingTime.includes(meetingTime);
      const matchesClubType = club.clubType === clubType;

      return (
        matchesLocation && matchesDays && matchesMeetingTime && matchesClubType
      );
    });

    setClubs(filteredClubs);
  };

  const handleJoinClick = (clubId, clubLeader) => {
    handleJoinClub(clubId, clubLeader);
  };

  const handleJoinClub = async (clubId, clubLeader) => {
    try {
      const user = auth.currentUser;
      const userId = user.email;
  
      // Query clubApplications collection to check if user has already applied to this club
      const querySnapshot = await getDocs(query(collection(db, 'clubApplications'), where('userId', '==', userId), where('clubId', '==', clubId)));
  
      if (!querySnapshot.empty) {
        // User has already applied to this club
        console.log('User has already applied to this club.');
        // You can display a message to the user or handle this case as per your requirement
      } else {
        // Create a new document in the clubApplications collection with a unique document ID
        await addDoc(collection(db, 'clubApplications'), {
          clubLeader: clubLeader,
          userId: userId,
          clubId: clubId,
          status: 'pending',
        });
        console.log('Application submitted successfully.');
      }
    } catch (error) {
      console.error('Error joining club:', error);

    }
  };

  

  return (
    <div className="container">
      <NavBar />
      <Box padding={"30px"} className="glassmorphism-container2">
        <Heading as="h1" size="lg" color="#FFF" textAlign="center">
          Find a Club
        </Heading>
        <Box mt={5}>
          <Input
            placeholder="Location"
            value={location.toLowerCase()}
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
          <RadioGroup colorScheme="teal" mt={5}>
            <Grid templateColumns="repeat(3, 1fr)" gap={1}>
              <Radio
                value="monday"
                onChange={(e) => setDays((e.target.value))}
                color="#FFF"
              >
                Monday
              </Radio>
              <Radio
                value="tuesday"
                onChange={(e) => setDays((e.target.value))}
                color="#FFF"
              >
                Tuesday
              </Radio>
              <Radio
                value="wednesday"
                onChange={(e) => setDays((e.target.value))}
                color="#FFF"
              >
                Wednesday
              </Radio>
              <Radio
                value="thursday"
                onChange={(e) => setDays((e.target.value))}
                color="#FFF"
              >
                Thursday
              </Radio>
              <Radio
                value="friday"
                onChange={(e) => setDays((e.target.value))}
                color="#FFF"
              >
                Friday
              </Radio>
              <Radio
                value="saturday"
                onChange={(e) => setDays((e.target.value))}
                color="#FFF"
              >
                Saturday
              </Radio>
              <Radio
                value="sunday"
                onChange={(e) => setDays((e.target.value))}
                color="#FFF"
              >
                Sunday
              </Radio>
            </Grid>
          </RadioGroup>
        </Box>
        <Box mt={8}>
          <RadioGroup colorScheme="teal" mt={0}>
            <Flex direction={"column"}>
              <Radio
                value="morning"
                onChange={(e) =>
                  setMeetingTime((e.target.value))
                }
                color="#FFF"
                mr={2}
              >
                Morning
              </Radio>
              <Radio
                value="evening"
                onChange={(e) =>
                  setMeetingTime((e.target.value))
                }
                color="#FFF"
              >
                Evening
              </Radio>
            </Flex>
          </RadioGroup>
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
              color: "white",
            }}
            borderRadius="8px"
            py={3}
            px={0}
            width="100%"
          >
            <option value="online">Online</option>
            <option value="inperson">In-person</option>
          </Select>
        </Box>
        <Flex justify="center">
          <Button
            colorScheme="teal"
            onClick={handleSearch}
            mt={2}
            width="100%"
            bg="#00BAE2"
            _hover={{ bg: "#0597B7" }}
            _active={{ bg: "#008EAF" }}
          >
            Search
          </Button>
        </Flex>
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
              <Box
                key={index}
                bg="rgba(255, 255, 255, 0.05)"
                p={2}
                my={2}
                borderRadius="md"
              >
                <Heading as="h2" size="md" color="#FFF">
        {club.clubName}
      </Heading>
      {/* Display other club details */}
      {appliedClubs.includes(club.clubId) ? (
                  <Button colorScheme="teal" mt={2} isDisabled>
                    Applied
                  </Button>
                ) : (
                  <Button
                    colorScheme="teal"
                    onClick={() => handleJoinClick(club.clubId, club.clubLeader)}
                    mt={2}
                  >
                    Join
                  </Button>
                )}
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