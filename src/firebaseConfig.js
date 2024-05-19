// firebaseConfig.js
import { initializeApp } from "firebase/app";

import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBM_MKsXkcXqA2eQWfdR_lp4KzZhDnrx54",
    authDomain: "blockvocates.firebaseapp.com",
    projectId: "blockvocates",
    storageBucket: "blockvocates.appspot.com",
    messagingSenderId: "508636376077",
    appId: "1:508636376077:web:ecdcba2305ae7d8b7d7944",
    measurementId: "G-YE646ZSKP9"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable session persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence enabled");
  })
  .catch((error) => {
    console.error("Error enabling session persistence: ", error);
  });

const db = getFirestore(app);
const analytics = getAnalytics(app);

export {app, analytics, auth, db};