import React, { useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { getDocs, collection, query, where, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  Spinner,
  Text,
  Center,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CheckCircleIcon, TimeIcon, CheckIcon } from '@chakra-ui/icons';

const MissionCompletion = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [missionStatusMap, setMissionStatusMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
            const userSnapshot = await getDocs(userQuery);

            if (!userSnapshot.empty) {
              const userData = userSnapshot.docs[0].data();
              const pathId = userData.pathId;

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
              console.error('No user found with this email.');
              setLoading(false);
            }
          } else {
            navigate('/login'); // Redirect to login if not authenticated
          }
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchMissions();
  }, [navigate]);

  useEffect(() => {
    const fetchMissionStatus = async () => {
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const missionStatusMap = {};

            // Fetch missionCompletion documents for the current user
            const missionCompletionQuery = query(collection(db, 'missionCompletion'), where('userId', '==', user.email));
            const missionCompletionSnapshot = await getDocs(missionCompletionQuery);

            missionCompletionSnapshot.docs.forEach((doc) => {
              const data = doc.data();
              missionStatusMap[data.missionId] = data.missionStatus;
            });

            setMissionStatusMap(missionStatusMap);
          }
        });
      } catch (error) {
        console.error('Error fetching mission status:', error);
      }
    };

    fetchMissionStatus();
  }, []);

  

  const handleCompleteMission = async (missionId) => {
    try {
      const user = auth.currentUser;

      // Fetch the club details using clubMembership (clubId)
      const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        const clubId = userData.clubMembership;
        const clubQuery = query(collection(db, 'clubs'), where('clubId', '==', clubId));
        const clubSnapshot = await getDocs(clubQuery);

        if (!clubSnapshot.empty) {
          const clubData = clubSnapshot.docs[0].data();
          const clubLeaderEmail = clubData.clubLeader;

          // Add a document to the missionCompletion collection
          const completionData = {
            userId: user.email, // Using email as userId
            missionId: missionId,
            clubLeader: clubLeaderEmail,
            missionStatus: 'pending'
          };

          const docRef = await addDoc(collection(db, 'missionCompletion'), completionData);
          console.log('Mission completion document added with ID: ', docRef.id);

          // Update the missionStatusMap state
          setMissionStatusMap((prevStatusMap) => ({
            ...prevStatusMap,
            [missionId]: 'pending'
          }));
        } else {
          console.error('No club found with this clubId:', clubId);
        }
      } else {
        console.error('No user found with this email.');
      }
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
    <Box padding="30px" textAlign="center">
      <Heading as="h1" size="lg" color="#FFF" mb={6}>
        Mission Completion
      </Heading>
      <HStack spacing={4} overflowX="auto">
        {missions.length > 0 ? (
          missions.map((mission) => (
            <VStack key={mission.id} spacing={4}>
              <Box
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(10px)"
                p={3} // Decreased padding
                borderRadius="lg"
                boxShadow="lg"
                className="glassmorphism-container"
                height="120px"
                width="150px" // Decreased maximum width
                textAlign="left"
              >
                <Heading size="sm" color="#FFF" mb={2}>{mission.missionName}</Heading>
                <Text color="#FFF" fontSize="sm" noOfLines={2}>{mission.objective}</Text> {/* Show only 2 lines of objective */}
              </Box>
              <Button colorScheme="blue" mt="4" onClick={() => navigate('/Mission1')}>Open Mission</Button>
              {/* <Button
                leftIcon={
                  missionStatusMap[mission.id] === 'pending' ? <TimeIcon /> :
                  missionStatusMap[mission.id] === 'completed' ? <CheckCircleIcon /> :
                  <CheckIcon />
                }
                colorScheme={
                  missionStatusMap[mission.id] === 'pending' ? "yellow" :
                  missionStatusMap[mission.id] === 'completed' ? "green" :
                  "teal"
                }
                onClick={() => handleCompleteMission(mission.id)}
                isDisabled={missionStatusMap[mission.id] !== undefined}
                width="full"
                fontSize="sm" 
                padding="2" 
              >
                {
                  missionStatusMap[mission.id] === 'pending' ? 'Pending' :
                  missionStatusMap[mission.id] === 'completed' ? 'Completed' :
                  'Mark as Complete'
                }
              </Button> */}
            </VStack>
          ))
        ) : (
          <Text color="white">No missions found.</Text>
        )}
      </HStack>
    </Box>
  );
};

export default MissionCompletion;
