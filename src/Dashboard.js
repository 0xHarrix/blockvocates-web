import React, { useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import DashboardOne from './DashboardOne';
import DashboardTwo from './DashboardTwo';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState(null); // null, 'home', 'dashboard', 'dashboardMain'
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const currentUserEmail = user.email;
            const q = query(collection(db, 'users'), where('email', '==', currentUserEmail));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();

              if (userData.clubMembership === 0) {
                // User has not joined a club
                setUserStatus('home');
              } else if (userData.clubMembership !== 0 && userData.pathId === 0) {
                // User has joined a club but not selected a path
                setUserStatus('dashboard');
              } else {
                // User has joined a club and selected a path
                setUserStatus('dashboardMain');
              }
            } else {
              console.error('No user document found with email:', currentUserEmail);
              setUserStatus('home'); // Default to home if no user document is found
            }
          } else {
            navigate('/login'); // Redirect to login if not authenticated
          }

          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userStatus === 'home') {
    return <Home />;
  } else if (userStatus === 'dashboard') {
    return <DashboardOne />;
  } else if (userStatus === 'dashboardMain') {
    return <DashboardTwo />;
  } else {
    return <div>Error determining user status</div>;
  }
};

export default Dashboard;
