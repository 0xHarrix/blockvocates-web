import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig"; // Import Firebase firestore
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import NavBar from "./components/NavBar";
import "./styles/ClubLeaderPage.css";
import {
  Box,
  Heading,
  Button,
  Spinner,
  Text,
  Center,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ClubLeaderPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [clubMembers, setClubMembers] = useState([]);
  const [details, setDetails] = useState([]); // State to store club members
  const [clubName, setClubName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.email;
        console.log("User :", userId);

        // Check if the user is a club leader
        const isClubLeader = await checkIfClubLeader(userId);
        if (!isClubLeader) {
          navigate("/");
          return;
        }

        console.log("User :", userId);
        const querySnapshot = await getDocs(
          query(
            collection(db, "clubApplications"),
            where("clubLeader", "==", userId)
          )
        );

        const fetchedApplications = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Use Firestore document ID as application ID
          ...doc.data(),
          accepted: false, // Initially set accepted status to false
        }));

        setApplications(fetchedApplications);
        setLoading(false);

        // Fetch club members
        fetchClubMembers(userId);
      } else {
        navigate("/Login"); // Redirect to login if no user is found
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const fetchClubMembers = async (userId) => {
    try {
      // Step 1: Query the clubs collection to get the club data for the current user as club leader
      const clubsQuerySnapshot = await getDocs(query(collection(db, 'clubs'), where('clubLeader', '==', userId)));
  
      if (clubsQuerySnapshot.empty) {
        console.log("No club found for the current user.");
        return;
      }
  
      // Assuming there is only one document for the user in the clubs collection
      const clubData = clubsQuerySnapshot.docs[0].data();
      const clubName = clubData.clubName; // Assuming the club name field is 'clubName'
      setClubName(clubName);
  
      // Step 2: Use the clubId from clubData to query the clubMembers collection
      const clubMembersQuerySnapshot = await getDocs(query(collection(db, 'clubMembers'), where('clubId', '==', clubData.clubId)));
  
      if (clubMembersQuerySnapshot.empty) {
        console.log("No members found for the club.");
        return;
      }
  
      // Step 3: Extract and set the club members data
      const members = clubMembersQuerySnapshot.docs.map(doc => doc.data());
      setClubMembers(members);
      console.log(members);
  
      // Step 4: Fetch and set user details for each member
      members.forEach(async member => {
        const userQuerySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", member.userId)));
  
        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0].data();
          console.log(userDoc);
  
          // Update the details state for each member (you may need to modify this based on your card rendering logic)
          setDetails(prevDetails => [...prevDetails, userDoc]);
        } else {
          console.error("No user document found with email:", member.userId);
        }
      });
    } catch (error) {
      console.error("Error fetching Club Members:", error);
    }
  };
  
  

  const checkIfClubLeader = async (userId) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "clubs"), where("clubLeader", "==", userId))
      );

      if (!querySnapshot.empty) {
        // If the user is listed as the club leader in at least one club, return true
        return true;
      } else {
        // If the user is not listed as the club leader in any club, return false
        return false;
      }
    } catch (error) {
      console.error("Error checking if user is a club leader: ", error);
      return false;
    }
  };

  const handleAccept = async (applicationId, userId, clubId, index) => {
    try {
      // Update the status of the application in Firestore
      await updateDoc(doc(db, "clubApplications", applicationId), {
        status: "accepted",
      });

      // Add the user to the clubMembers collection
      await addMemberToClub(userId, clubId);

      // Find the user document with the specified email
      const userQuerySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", userId))
      );

      // Check if the query returned any documents
      if (!userQuerySnapshot.empty) {
        // Get the first document (assuming email is unique)
        const userDoc = userQuerySnapshot.docs[0];
        const userDocId = userDoc.id;

        // Update the clubMembership field in the user's document
        await updateDoc(doc(db, "users", userDocId), {
          clubMembership: clubId,
        });
      } else {
        console.error("No user document found with email:", userId);
      }

      // Update the accepted status in state
      const updatedApplications = [...applications];
      updatedApplications[index].accepted = true;
      setApplications(updatedApplications);
    } catch (error) {
      console.error("Error accepting application: ", error);
    }
  };

  const addMemberToClub = async (userId, clubId) => {
    try {
      // Add the user to the clubMembers collection
      await addDoc(collection(db, "clubMembers"), {
        userId: userId,
        clubId: clubId,
      });
    } catch (error) {
      console.error("Error adding member to club: ", error);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      // Update the status of the application in Firestore
      await updateDoc(doc(db, "clubApplications", applicationId), {
        status: "rejected",
      });
    } catch (error) {
      console.error("Error rejecting application: ", error);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <Box display="flex" alignItems="center" justifyContent="center" flex="1">
        <Box
          className="clubMembersBox"
          flex={4}
          marginLeft={5}
          marginRight={5}
          display={"flex"}
          flexDirection={"row"}
        >
{clubMembers.length > 0 ? (
  clubMembers.map((member, index) => (
    <Card
      key={index}
      mt={4}
      borderRadius="md"
      boxShadow="md"
      marginRight={5}
      className="clubMemberCard"
      width={200}
      height={270}
      color={"white"}
      bg={
        "linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2));"
      }
      textAlign={'center'}
    >
      <CardBody>
        {/* Displaying the user's name from userDoc */}
        {details[index] && (
          <>
            <Text>User Name: {details[index].name}</Text>
            <br/>
            <Text>Club Name: {clubName}</Text>
          </>
        )}
      </CardBody>
    </Card>
  ))
) : (
  <Text color="white">No members found for the club.</Text>
)}
        </Box>

        <Box
          flex="2"
          padding={"30px"}
          className="glassmorphism-container2"
          marginRight={20}
        >
          <Heading as="h1" size="lg" color="#FFF" textAlign="center">
            Club Leader Dashboard
          </Heading>
          {/* Display Spinner while loading */}
          {loading && (
            <Center mt={6}>
              <Spinner size="lg" color="teal" />
            </Center>
          )}

          {/* Display Applications */}
          <Box mt={6}>
            {applications.length > 0 ? (
              applications.map((application, index) => (
                <Box
                  key={index}
                  bg="rgba(255 , 255, 255, 0.05)"
                  p={2}
                  my={2}
                  borderRadius="md"
                >
                  <Text color="#FFF">User ID: {application.userId}</Text>
                  <Text color="#FFF">Club ID: {application.clubId}</Text>
                  <Text color="#FFF">Status: {application.status}</Text>
                  {application.status === "accepted" ? (
                    <Button colorScheme="teal" isDisabled mt={2} mr={2}>
                      Accepted
                    </Button>
                  ) : (
                    <>
                      <Button
                        colorScheme="teal"
                        onClick={() =>
                          handleAccept(
                            application.id,
                            application.userId,
                            application.clubId,
                            index
                          )
                        }
                        mt={2}
                        mr={2}
                      >
                        Accept
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleReject(application.id)}
                        mt={2}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </Box>
              ))
            ) : (
              <Text color="white">No applications found.</Text>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ClubLeaderPage;
