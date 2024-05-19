import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig"; // Import Firebase firestore
import { collection, getDocs, query, where, updateDoc, doc, addDoc } from "firebase/firestore";
import NavBar from "./components/NavBar";
import "./styles/ClubLeaderPage.css";
import {
  Box,
  Heading,
  Button,
  Spinner,
  Text,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ClubLeaderPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

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
          query(collection(db, "clubApplications"), where("clubLeader", "==", userId))
        );

        const fetchedApplications = querySnapshot.docs.map(doc => ({
          id: doc.id, // Use Firestore document ID as application ID
          ...doc.data(),
          accepted: false // Initially set accepted status to false
        }));

        setApplications(fetchedApplications);
        setLoading(false);
      } else {
        navigate('/Login'); // Redirect to login if no user is found
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const checkIfClubLeader = async (userId) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "clubs"), where("clubLeader", "==", userId)));

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
        status: "accepted"
      });

      // Add the user to the clubMembers collection
      await addMemberToClub(userId, clubId);

      // Find the user document with the specified email
      const userQuerySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", userId)));

      // Check if the query returned any documents
      if (!userQuerySnapshot.empty) {
        // Get the first document (assuming email is unique)
        const userDoc = userQuerySnapshot.docs[0];
        const userDocId = userDoc.id;

        // Update the clubMembership field in the user's document
        await updateDoc(doc(db, "users", userDocId), {
          clubMembership: clubId
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
      await addDoc(collection(db, 'clubMembers'), {
        userId: userId,
        clubId: clubId
      });
    } catch (error) {
      console.error("Error adding member to club: ", error);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      // Update the status of the application in Firestore
      await updateDoc(doc(db, "clubApplications", applicationId), {
        status: "rejected"
      });
    } catch (error) {
      console.error("Error rejecting application: ", error);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <Box padding={"30px"} className="glassmorphism-container2">
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
                      onClick={() => handleAccept(application.id, application.userId, application.clubId, index)}
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
            <Text color="white ">No applications found.</Text>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ClubLeaderPage;
