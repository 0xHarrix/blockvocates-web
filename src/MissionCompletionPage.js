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
  Flex,
} from '@chakra-ui/react';
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons';

const MissionCompletionPage = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingMissions, setPendingMissions] = useState([]);
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
    const fetchCompletedAndPendingMissions = async () => {
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
            const userSnapshot = await getDocs(userQuery);

            if (!userSnapshot.empty) {
              const userEmail = user.email;

              // Fetch pending missions from missionCompletion collection
              const missionCompletionQuery = query(collection(db, 'missionCompletion'), where('userId', '==', userEmail));
              const missionCompletionSnapshot = await getDocs(missionCompletionQuery);
              const pendingMissions = missionCompletionSnapshot.docs
                .filter(doc => doc.data().missionStatus === 'pending')
                .map(doc => doc.data().missionId);

              setPendingMissions(pendingMissions);
            } else {
              console.error('No user found with this email.');
            }
          }
        });
      } catch (error) {
        console.error('Error fetching completed and pending missions:', error);
      }
    };

    fetchCompletedAndPendingMissions();
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

          // Update UI to show mission as pending
          setPendingMissions([...pendingMissions, missionId]);
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
      <HStack spacing={6} overflowX="auto">
        {missions.length > 0 ? (
          missions.map((mission) => (
            <VStack key={mission.id} spacing={4}>
              <Box
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(10px)"
                p={4}
                borderRadius="lg"
                boxShadow="lg"
                className="glassmorphism-container"
                minW="200px"
                maxW="200px"
                textAlign="left"
              >
                <Heading size="sm" color="#FFF">{mission.missionName}</Heading>
                <Text color="#FFF">{mission.objective}</Text>
              </Box>
              <Button
                leftIcon={pendingMissions.includes(mission.id) ? <TimeIcon /> : <CheckCircleIcon />}
                colorScheme={pendingMissions.includes(mission.id) ? "yellow" : "teal"}
                onClick={() => handleCompleteMission(mission.id)}
                isDisabled={pendingMissions.includes(mission.id)}
                width="full"
              >
                {pendingMissions.includes(mission.id) ? 'Pending' : 'Mark as Complete'}
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

export default MissionCompletionPage;
