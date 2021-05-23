import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyBwaR50Enib_7JGWw2h2L1xrZbSdiioq2A",
  authDomain: "naijamediamp3-site.firebaseapp.com",
  databaseURL: "https://naijamediamp3-site-default-rtdb.firebaseio.com",
  projectId: "naijamediamp3-site",
  storageBucket: "naijamediamp3-site.appspot.com",
  messagingSenderId: "1004437835020",
  appId: "1:1004437835020:web:a74ce16daa9743daca8d29",
  measurementId: "G-8CKJGWJTTT"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();

export {auth, db, storage, database};