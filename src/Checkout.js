import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Box, Button, useToast } from '@chakra-ui/react';

const stripePromise = loadStripe('pk_test_51PJIXUSJm0sOLQTxEqt8f2IJYGZ8AAPDW4veiN2nh8hVy0BEumtnP5LMXaDOOvaRQ15DPpKJoYQ6N1EazlAbKzaB00L0adhTm5');

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [priceId, setPriceId] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const auth = getAuth();

  useEffect(() => {
    const fetchPriceId = async () => {

        const user = auth.currentUser;
        console.log(user.uid);
      const q = query(collection(db, 'membership'), where('active', '==', true));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const membershipDoc = querySnapshot.docs[0];
        const priceSnapshot = await getDocs(collection(membershipDoc.ref, 'prices'));

        if (!priceSnapshot.empty) {
          setPriceId(priceSnapshot.docs[0].id);
        }
      }
    };

    fetchPriceId();
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    const user = auth.currentUser;
    console.log(user.uid);
    if (!user) {
      toast({
        title: "You must be logged in to checkout.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }

    if (!priceId) {
      toast({
        title: "No price available for checkout.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
        
      const checkoutSessionRef = await addDoc(
        collection(db, 'users', user.uid, 'checkout_sessions'),
        {
          price: priceId,
          success_url: window.location.origin,
          cancel_url: window.location.origin,
          mode: 'payment',
        }
      );

      onSnapshot(checkoutSessionRef, (docSnapshot) => {
        const data = docSnapshot.data();
        if (data) {
          const { error, url, status } = data;
          if (error) {
            console.error("Error creating checkout session: ", error);
            toast({
              title: error.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            setLoading(false);
          } else if (url) {
            window.location.assign(url);
          } else if (status === 'succeeded') {
            updateUserMembership(user.uid);
            console.log("inside elseif")
            console.log("user id :",user.uid)
          }
        }
      });
    } catch (error) {
      console.error("Error creating checkout session: ", error);
      toast({
        title: "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const updateUserMembership = async (userId) => {
    const userRef = doc(db, 'users', userId);
    try {
      await updateDoc(userRef, {
        clubMembership: '1' // Replace '1' with the actual club ID to assign
      });
      toast({
        title: "Payment successful! Club membership updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      navigate('/dashboard'); // Redirect to the dashboard after successful membership update
    } catch (error) {
      console.error("Error updating club membership: ", error);
      toast({
        title: "An error occurred while updating club membership.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Box textAlign="center" mt={5}>
      <Button
        colorScheme="teal"
        onClick={handleCheckout}
        isLoading={loading}
        loadingText="Processing"
      >
        Checkout
      </Button>
    </Box>
  );
};

export default Checkout;
