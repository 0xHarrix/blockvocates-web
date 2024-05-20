import React, { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import { getDocs, getDoc, collection, query, where, updateDoc, doc } from 'firebase/firestore';
import { Box, Button, Spinner, Text, Center, VStack, HStack, Heading } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const MissionVerification = () => {
  const [missionData, setMissionData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchData(currentUser);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const fetchData = async (currentUser) => {
    try {
      // Fetch missions to verify from missionCompletion collection
      const missionQuery = query(collection(db, 'missionCompletion'), where('clubLeader', '==', currentUser.email));
      const missionSnapshot = await getDocs(missionQuery);
      const missionData = missionSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(mission => mission.missionStatus !== 'completed'); // Filter out completed missions
      setMissionData(missionData);
    } catch (error) {
      console.error('Error fetching mission data:', error);
    }
  };

  const handleVerifyMission = async (missionId) => {
    try {
      // Update mission status in missionCompletion collection
      const missionRef = doc(db, 'missionCompletion', missionId);
      await updateDoc(missionRef, { missionStatus: 'completed' });

      // Retrieve userId from missionCompletion document
      const missionDoc = await getDoc(missionRef);
      const userId = missionDoc.data().userId;
      const missionIdentifier = missionDoc.data().missionId; // Assuming missionId field exists in missionCompletion

      // Query users collection to find the document with matching email
      const userQuery = query(collection(db, 'users'), where('email', '==', userId));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userRef = doc(db, 'users', userDoc.id);

        // Add mission to completedMissions array in users collection
        await updateDoc(userRef, {
          completedMissions: [...(userDoc.data().completedMissions || []), missionIdentifier]
        });

        // Remove the mission from missionData state
        setMissionData(prevData => prevData.filter(item => item.id !== missionId));
      } else {
        console.error(`User document with email ${userId} does not exist.`);
      }
    } catch (error) {
      console.error('Error verifying mission:', error);
    }
  };

  if (!user || loading) {
    return (
      <Center mt={6}>
        <Spinner size="lg" color="teal" />
      </Center>
    );
  }

  return (
    <Box padding="30px" textAlign="center">
      <Heading as="h1" size="lg" color="#FFF" mb={6}>
        Mission Verification
      </Heading>
      <HStack spacing={4} overflowX="auto">
        {missionData.length > 0 ? (
          missionData.map((mission) => (
            <VStack key={mission.id} spacing={4}>
              <Box
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(10px)"
                p={3}
                borderRadius="lg"
                boxShadow="lg"
                className="glassmorphism-container"
                height="150px"
                width="250px"
                textAlign="left"
              >
                <Text fontWeight="bold" color="#fff">{mission.missionId}</Text>
                <Text color="#fff">Mission Status: {mission.missionStatus}</Text>
                <Text color="#fff">User ID: {mission.userId}</Text>
              </Box>
              <Button
                colorScheme="teal"
                variant="outline"
                leftIcon={<CheckIcon />}
                onClick={() => handleVerifyMission(mission.id)}
                width="full"
                fontSize="sm"
                padding="2"
              >
                Verify Mission
              </Button>
            </VStack>
          ))
        ) : (
          <Text color="white">No missions found.</Text>
        )}
      </HStack>
    </Box>
  );
};

export default MissionVerification;
