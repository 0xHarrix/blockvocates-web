import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Input, useBreakpointValue } from "@chakra-ui/react";
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Step5 = ({ prevStep }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const [missionData, setMissionData] = useState([]);
  const [missionStatusMap, setMissionStatusMap] = useState({});
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const handlePostToTwitter = () => {
    const tweetText = encodeURIComponent(tweetContent);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, "_blank");
  };

  const handleCompleteMission = async (missionId) => {
    console.log('handleCompleteMission called with missionId:', missionId);
    try {
      setLoading(true);
      const user = auth.currentUser;
      const userId = user.email;

      const userQuery = query(collection(db, 'users'), where('email', '==', userId));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userRef = doc(db, 'users', userDoc.id);

        const userData = userDoc.data();
        const clubId = userData.clubMembership;
        const clubQuery = query(collection(db, 'clubs'), where('clubId', '==', clubId));
        const clubSnapshot = await getDocs(clubQuery);

        if (!clubSnapshot.empty) {
          const clubData = clubSnapshot.docs[0].data();
          const clubLeaderEmail = clubData.clubLeader;

          const completionData = {
            userId: userId,
            missionId: 'mission111',
            clubLeader: clubLeaderEmail,
            missionStatus: 'completed'
          };

          console.log('completionData:', completionData);
          const docRef = await addDoc(collection(db, 'missionCompletion'), completionData);
          console.log('Mission completion document added with ID: ', docRef.id);

          await updateDoc(userRef, {
            completedMissions: [...(userData.completedMissions || []), 'mission111']
          });

          setMissionData(prevData => prevData.filter(item => item.id !== missionId));

          setMissionStatusMap((prevStatusMap) => ({
            ...prevStatusMap,
            [missionId]: 'pending'
          }));
          navigate('/dashboard')
        } else {
          console.error('No club found with this clubId:', clubId);
        }
      } else {
        console.error(`User document with email ${userId} does not exist.`);
      }
    } catch (error) {
      console.error('Error completing mission:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message or spinner
  }

  return (
    <div className="container">
      <Box
   
       margin="50px"
       marginLeft="235px"
       padding={isMobile ? "10px" : "40px"}
       borderRadius="20px"
       border="1px solid rgba(255, 255, 255, 0.2)"
       boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
       backdropFilter="blur(10px) saturate(180%)"
       WebkitBackdropFilter="blur(10px) saturate(180%)"
       background="rgba(255, 255, 255, 0.05)"
       width={isMobile ? "90%" : "900px"}
       height={isMobile ? "auto" : "auto"}
       transition="all 0.3s ease"
       _hover={{
         transform: "translateY(-5px)",
         boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
       }}
       textAlign="center"
       color="white"
      >
        <Heading as="h2" size="md" marginBottom="30px">Make a Post!</Heading>
        <Text fontSize={isMobile ? "md" : "lg"} mb="6">
          Convert the speech you’ve written into a Thread format, you can use Chatgpt or Google Gemini to do this. Post the thread across Twitter, Farcaster and Lens and make sure you tag us! You can also post to other platforms like Linkedin, Insta etc. to show your community what you’re learning.</Text>
        <Input
          value={tweetContent}
          onChange={(e) => setTweetContent(e.target.value)}
          placeholder="Type your tweet here..."
          mt="4"
        />
        <Button bg="#00BAE2" mt="4"  mr="5" onClick={prevStep}>Previous</Button>
        <Button bg="#00BAE2" mt="4" onClick={handlePostToTwitter} mr="5">Post to Twitter</Button>
        <Button colorScheme='green' mt="4" onClick={handleCompleteMission}>Mark as Complete</Button>
      </Box>
    </div>
  );
};

export default Step5;
