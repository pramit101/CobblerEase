import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

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

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
