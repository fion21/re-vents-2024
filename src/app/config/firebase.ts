import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "revents-2024-448bf.firebaseapp.com",
  projectId: "revents-2024-448bf",
  storageBucket: "revents-2024-448bf.appspot.com",
  messagingSenderId: "627868038312",
  appId: "1:627868038312:web:6e36e73bbb4637f219be9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
