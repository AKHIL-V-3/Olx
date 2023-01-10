import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {

  apiKey: "AIzaSyB7Y-mKZvQAbZaFOaAt0I8H-kRTrjAHebw",
  authDomain: "olx-becaa.firebaseapp.com",
  projectId: "olx-becaa",
  storageBucket: "olx-becaa.appspot.com",
  messagingSenderId: "924543577894",
  appId: "1:924543577894:web:1c3a4633855f060245dbe7",
  measurementId: "G-0NXFQS6ZY8"
  // ...
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app)
  

export { app, auth, db , storage};
