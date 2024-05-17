import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig"; // Import Firebase firestore
import { doc, setDoc, getDoc, runTransaction } from "firebase/firestore";
import NavBar from "./components/NavBar";
import "./styles/CreateClub.css";
import {
  Box,
  Heading,
  Input,
  Flex,
  Radio,
  RadioGroup,
  Button,
  Select,
  Grid,
  Spinner, Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreateClub = () => {
  const navigate = useNavigate();
  const [clubName, setclubName] = useState("");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [clubType, setClubType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the current club ID counter from Firestore
    const fetchCounter = async () => {
      const counterDocRef = doc(db, "counters", "clubIdCounter");
      const counterDocSnap = await getDoc(counterDocRef);
      const counterData = counterDocSnap.data();
      if (!counterData) {
        // If the counter doesn't exist, create it with an initial value of 1
        await setDoc(counterDocRef, { value: 1 });
      }
    };

    fetchCounter();
  }, []);

  const handleCreateClub = async () => {
    try {
      setLoading(true);
  
      // Get current user
      const user = auth.currentUser;
      const userId = user.email;
  
      // Increment the club ID counter
      const counterDocRef = doc(db, "counters", "clubIdCounter");
      await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterDocRef);
        const newClubId = counterDoc.data().value + 1;
  
        // Generate auto ID for club document
        const clubRef = doc(db, "clubs"); // No need to specify document ID
  
        // Create a new document in the "clubs" collection with auto-generated ID
        await setDoc(clubRef, {
          clubId: newClubId, // Include clubId field
          clubName: clubName,
          location: location,
          meetingDays: days,
          meetingTime: meetingTime,
          clubType: clubType,
          clubLeader: userId,
        });
  
        // Update the club ID counter
        transaction.update(counterDocRef, { value: newClubId });
      });
  
      console.log("Club created successfully.");
      navigate("/"); // Redirect to home page or any other page
    } catch (error) {
      console.error("Error creating club: ", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      <NavBar />
      <Box padding={"30px"} className="glassmorphism-container3">
        <Heading as="h1" size="lg" color="#FFF" textAlign="center">
          Create a Club
        </Heading>
        <Box mt={5}>
          <Input
            placeholder="Club Name"
            value={clubName}
            onChange={(e) => setclubName(e.target.value)}
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
        <Box mt={3}>
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
        <Box mt={5}>
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
            onClick={handleCreateClub}
            mt={2}
            width="100%"
            bg="#00BAE2"
            _hover={{ bg: "#0597B7" }}
            _active={{ bg: "#008EAF" }}
          >
            Create Club
          </Button>
        </Flex>
        {/* Display Spinner while loading */}
        {loading && (
          <Flex justify="center" mt={6}>
            <Spinner size="lg" color="teal" />
          </Flex>
        )}
      </Box>
    </div>
  );
};

export default CreateClub;
