const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyBM_MKsXkcXqA2eQWfdR_lp4KzZhDnrx54",
  authDomain: "blockvocates.firebaseapp.com",
  projectId: "blockvocates",
  storageBucket: "blockvocates.appspot.com",
  messagingSenderId: "508636376077",
  appId: "1:508636376077:web:ecdcba2305ae7d8b7d7944",
  measurementId: "G-YE646ZSKP9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const createMissions = async () => {
  try {
    // Create documents with IDs from 2 to 6
    let j=4;
    for (let i = 114; i <= 116; i++) {
      await setDoc(doc(db, "missions", "mission"+i.toString()), {
        missionId: "mission"+i.toString(),
        missionName: "Mission 2",
        pathId: j,
        objective: 'Read, Write, Own'
      });
      j=j+1;
      console.log(`Document with ID ${i} successfully written`);
    }
  } catch (error) {
    console.error(`Error creating documents: ${error}`);
  }
};

createMissions();