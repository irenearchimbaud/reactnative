import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGXmtj3Ew5qdVPT0uVP_4PziTg3fH2Eek",
  authDomain: "gsb-support-d4ab0.firebaseapp.com",
  projectId: "gsb-support-d4ab0",
  storageBucket: "gsb-support-d4ab0.firebasestorage.app",
  messagingSenderId: "79112087041",
  appId: "1:79112087041:web:46d3871a4f3e65d2618200",
  measurementId: "G-FBSNSQXYBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
