import React, { useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Button, Spinner, Text, Center } from '@chakra-ui/react';

const MissionCompletionPage = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedMissions, setCompletedMissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();
            const pathId = userData.pathId;
            const completedMissions = userData.completedMissions || [];

            setCompletedMissions(completedMissions);

            // Fetch missions for the user's selected path
            const missionsQuery = query(collection(db, 'missions'), where('pathId', '==', pathId));
            const missionsSnapshot = await getDocs(missionsQuery);
            const missionsData = missionsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));

            setMissions(missionsData);
            setLoading(false);
          } else {
            navigate('/login'); // Redirect to login if not authenticated
          }
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleCompleteMission = async (missionId) => {
    try {
      const user = auth.currentUser;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      const updatedCompletedMissions = [...userData.completedMissions, missionId];

      await updateDoc(userDocRef, {
        completedMissions: updatedCompletedMissions
      });

      setCompletedMissions(updatedCompletedMissions);
    } catch (error) {
      console.error('Error completing mission:', error);
    }
  };

  if (loading) {
    return (
      <Center mt={6}>
        <Spinner size="lg" color="teal" />
      </Center>
    );
  }

  return (
    <Box padding="30px" className="glassmorphism-container2">
      <Heading as="h1" size="lg" color="#FFF" textAlign="center">
        Mission Completion
      </Heading>
      <Box mt={6}>
        {missions.length > 0 ? (
          missions.map((mission) => (
            <Box
              key={mission.id}
              bg="rgba(255, 255, 255, 0.05)"
              p={2}
              my={2}
              borderRadius="md"
            >
              <Text color="#FFF">Title: {mission.title}</Text>
              <Text color="#FFF">Description: {mission.description}</Text>
              {completedMissions.includes(mission.id) ? (
                <Button colorScheme="teal" isDisabled mt={2} mr={2}>
                  Completed
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  onClick={() => handleCompleteMission(mission.id)}
                  mt={2}
                  mr={2}
                >
                  Mark as Complete
                </Button>
              )}
            </Box>
          ))
        ) : (
          <Text color="white">No missions found.</Text>
        )}
      </Box>
    </Box>
  );
};

export default MissionCompletionPage;
