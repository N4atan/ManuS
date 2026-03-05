import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAc4-eWW-vbZ4UJ-5zmxf44mT6zTMOetXQ",
  authDomain: "manus-26.firebaseapp.com",
  projectId: "manus-26",
  storageBucket: "manus-26.firebasestorage.app",
  messagingSenderId: "923222566905",
  appId: "1:923222566905:web:8abf44980f121aef7bbf28",
  measurementId: "G-NVNYV81VBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);