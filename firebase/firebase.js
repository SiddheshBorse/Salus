import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCIklXtXgPUgoht3wgOrHriRXFmO4xIcDQ",
  authDomain: "salus-a0631.firebaseapp.com",
  projectId: "salus-a0631",
  storageBucket: "salus-a0631.appspot.com",
  messagingSenderId: "3313572585",
  appId: "1:3313572585:web:45e722005f31e59c0b2e78",
  measurementId: "G-BNDEEXGZQF",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {app, analytics, db, auth, storage}
