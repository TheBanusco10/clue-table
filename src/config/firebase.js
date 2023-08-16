// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWwSzunCqBCBjAPC7yFyzJbFEcLBhW3GU",
  authDomain: "clue-table.firebaseapp.com",
  projectId: "clue-table",
  storageBucket: "clue-table.appspot.com",
  messagingSenderId: "746318856852",
  appId: "1:746318856852:web:9a1454a30f440e6c682a81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
