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

const createDocuments = async () => {
  try {
    // Create documents with IDs from 2 to 6
    for (let i = 2; i <= 6; i++) {
      await setDoc(doc(db, "paths", i.toString()), {
        description: 'Trader Description',
        missions: ['mission101', 'mission102', 'mission103', 'mission104', 'mission105', 'mission106', 'mission107', 'mission108'],
        pathId: i,
        pathName: 'Crypto Trader'
      });
      console.log(`Document with ID ${i} successfully written`);
    }
  } catch (error) {
    console.error(`Error creating documents: ${error}`);
  }
};

createDocuments();