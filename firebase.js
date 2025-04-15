import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your actual config
const firebaseConfig = {
  apiKey: "AIzaSyAKdM23GSzcwqJJKgExW2likyN1SxT8FHM",
  authDomain: "cobblerease.firebaseapp.com",
  projectId: "cobblerease",
  storageBucket: "cobblerease.firebasestorage.app",
  messagingSenderId: "733286371722",
  appId: "1:733286371722:web:18c44da90957742a103873",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
