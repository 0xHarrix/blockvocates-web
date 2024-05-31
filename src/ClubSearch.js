import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig"; // Import Firebase firestore
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
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
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const ClubSearch = () => {
  const locationState = useLocation(); // Use useLocation to get navigation state
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(locationState.state?.location || ""); // Set initial location state from navigation state
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
    const filteredClubs = clubs.filter((club) => {
      const matchesLocation = club.location.includes(location);
      const matchesDays = Array.isArray(club.meetingDays) && club.meetingDays.includes(days);
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

      const querySnapshot = await getDocs(query(collection(db, 'clubApplications'), where('userId', '==', userId), where('clubId', '==', clubId)));

      if (!querySnapshot.empty) {
        console.log('User has already applied to this club.');
      } else {
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
          <RadioGroup colorScheme="teal" mt={5}>
            <Grid templateColumns="repeat(3, 1fr)" gap={1}>
              <Radio value="monday" onChange={(e) => setDays(e.target.value)} color="#FFF">
                Monday
              </Radio>
              <Radio value="tuesday" onChange={(e) => setDays(e.target.value)} color="#FFF">
                Tuesday
              </Radio>
              <Radio value="wednesday" onChange={(e) => setDays(e.target.value)} color="#FFF">
                Wednesday
              </Radio>
              <Radio value="thursday" onChange={(e) => setDays(e.target.value)} color="#FFF">
                Thursday
              </Radio>
              <Radio value="friday" onChange={(e) => setDays(e.target.value)} color="#FFF">
                Friday
              </Radio>
              <Radio value="saturday" onChange={(e) => setDays(e.target.value)} color="#FFF">
                Saturday
              </Radio>
              <Radio value="sunday" onChange={(e) => setDays(e.target.value)} color="#FFF">
                Sunday
              </Radio>
            </Grid>
          </RadioGroup>
        </Box>
        <Box mt={4}>
          <Input
            placeholder="Meeting Time"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
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
            placeholder="Club Type"
            value={clubType}
            onChange={(e) => setClubType(e.target.value)}
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
          >
            <option value="blockchain">Blockchain</option>
            <option value="public-speaking">Public Speaking</option>
            <option value="web3">Web3</option>
          </Select>
        </Box>
        <Box mt={4} textAlign="center">
          <Button colorScheme="teal" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        {loading ? (
          <Box textAlign="center" mt={4}>
            <Spinner />
            <Text color="#FFF" mt={2}>
              Loading clubs...
            </Text>
          </Box>
        ) : (
          <Box mt={4}>
            {clubs.length > 0 ? (
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {clubs.map((club) => (
                  <Box
                    key={club.id}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    className="glassmorphism-container3"
                  >
                    <Heading fontSize="xl" color="#FFF">{club.name}</Heading>
                    <Text mt={4} color="#FFF">Location: {club.location}</Text>
                    <Text color="#FFF">
                      Meeting Days: {Array.isArray(club.meetingDays) ? club.meetingDays.join(", ") : "N/A"}
                    </Text>
                    <Text color="#FFF">Meeting Time: {club.meetingTime}</Text>
                    <Text color="#FFF">Club Type: {club.clubType}</Text>
                    {appliedClubs.includes(club.id) ? (
                      <Button mt={4} colorScheme="teal" isDisabled>
                        Application Submitted
                      </Button>
                    ) : (
                      <Button mt={4} colorScheme="teal" onClick={() => handleJoinClick(club.id, club.clubLeader)}>
                        Join
                      </Button>
                    )}
                  </Box>
                ))}
              </Grid>
            ) : (
              <Text color="#FFF" textAlign="center">
                No clubs found for the selected criteria.
              </Text>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ClubSearch;
