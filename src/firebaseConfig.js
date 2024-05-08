// firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, analytics, auth, db};