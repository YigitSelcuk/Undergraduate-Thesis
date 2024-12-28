import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2RLfMaZ8E2hZA_HYEEoZSMsyN_bUxofU",
  authDomain: "travai-c4903.firebaseapp.com",
  projectId: "travai-c4903",
  storageBucket: "travai-c4903.appspot.com",
  messagingSenderId: "59929966785",
  appId: "1:59929966785:web:0c4e2abd929c96db56bc40",
  measurementId: "G-KP5JD1CJ9T"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app)