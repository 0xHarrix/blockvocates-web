import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, useBreakpointValue } from "@chakra-ui/react";
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import "../../styles/Dashboard.css";

const Step4 = ({ nextStep }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [slotBooked, setSlotBooked] = useState(false); // State to track slot booking
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        checkBookingStatus(currentUser.email);
      }
    });

    return unsubscribe;
  }, []);

  const checkBookingStatus = async (email) => {
    try {
      setLoading(true);
      const bookingQuery = query(collection(db, 'clubMeetingsSlot'), where('userId', '==', email));
      const bookingSnapshot = await getDocs(bookingQuery);

      if (!bookingSnapshot.empty) {
        setSlotBooked(true);
      }
    } catch (error) {
      console.error("Error checking booking status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSlot = async () => {
    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    setLoading(true);

    try {
      const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        const clubId = userData.clubMembership;

        if (!clubId) {
          console.error("User is not a member of any club.");
          setLoading(false);
          return;
        }

        const bookingData = {
          userId: user.email,
          userName: user.displayName || "Anonymous",
          clubId: clubId,
          status: "booked"
        };

        await addDoc(collection(db, 'clubMeetingsSlot'), bookingData);
        console.log('Slot booked successfully:', bookingData);
        setSlotBooked(true); // Set slotBooked to true
      } else {
        console.error("User document not found.");
      }
    } catch (error) {
      console.error("Error booking slot:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message or spinner
  }

  return (
    <div className="container4">
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
        <Heading as="h3" size={isMobile ? "lg" : "xl"} mb="3">
          Schedule Your Speech
        </Heading>
        <Text fontSize={isMobile ? "md" : "lg"} mb="6">
          Are you ready to share your blockchain journey with our club members? Schedule your slot for an upcoming club meeting now!
        </Text>
        <Button
          bg="#00BAE2"
          size={isMobile ? "md" : "lg"}
          onClick={handleBookSlot}
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.3s ease-in-out"
          disabled={slotBooked} // Disable the button if the slot is booked
        >
          {slotBooked ? "Booked Slot" : "Book Your Slot"} {/* Conditionally render button text */}
        </Button>
      </Box>
      <Button
        colorScheme="teal"
        size={isMobile ? "md" : "lg"}
        onClick={nextStep}
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.3s ease-in-out"
        position="absolute"
        bottom={isMobile ? "10px" : "20px"}
        right={isMobile ? "10px" : "20px"}
      >
        Next
      </Button>
    </div>
  );
};

export default Step4;
