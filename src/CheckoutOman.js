import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Box, Button, useToast } from '@chakra-ui/react';


const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [priceId, setPriceId] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);

        const fetchPriceId = async () => {
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
      } else {
        navigate('/login'); // Redirect to login if no user is found
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [auth, navigate]);

  const handleCheckout = async () => {
    setLoading(true);

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
        collection(db, 'members', user.uid, 'checkout_sessions'),
        {
          price: priceId,
          success_url: `${window.location.origin}/dashboard`,
          cancel_url: window.location.origin,
          mode: 'subscription',
          email: user.email // Add email field to the members collection
        }
      );

      onSnapshot(checkoutSessionRef, (docSnapshot) => {
        const data = docSnapshot.data();
        if (data) {
          const { error, url } = data;
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
            window.open(url, '_blank');
            console.log("Opening new tab");

            // Start listening for payment status updates
            const paymentsRef = collection(db, 'members', user.uid, 'payments');
            const unsubscribePayments = onSnapshot(paymentsRef, (snapshot) => {
              snapshot.docChanges().forEach((change) => {
                if (change.type === 'added' || change.type === 'modified') {
                  const paymentData = change.doc.data();
                  console.log(paymentData);
                  console.log(paymentData.status);
                  if (paymentData.status === 'succeeded') {
                    updateUserMembership(user.email);
                    unsubscribePayments(); // Stop listening after successful payment
                  }
                }
              });
            });
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

  const updateUserMembership = async (email) => {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(query(usersRef, where('email', '==', email)));
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;
      const userRef = doc(db, 'users', userId);
      try {
        await updateDoc(userRef, {
          clubMembership: 3 // Replace '1' with the actual club ID to assign
        });
        toast({
          title: "Payment successful! Club membership updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        navigate('/dashboard');
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
    } else {
      console.error("User document not found for email: ", email);
      toast({
        title: "User not found.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      navigate('/dashboard');
    }
  };

  return (
      <Button
        bg="#00BAE2"
        onClick={handleCheckout}
        isLoading={loading}
        loadingText="Processing"
        mt={5}
      >
      Join as a Member
      </Button>
  );
};

export default Checkout;
