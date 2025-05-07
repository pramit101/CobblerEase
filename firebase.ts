import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKdM23GSzcwqJJKgExW2likyN1SxT8FHM",
  authDomain: "cobblerease.firebaseapp.com",
  projectId: "cobblerease",
  storageBucket: "cobblerease.appspot.com",  
  messagingSenderId: "733286371722",
  appId: "1:733286371722:web:18c44da90957742a103873",
  measurementId: "G-YFNKGLP753"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);