import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDipYaH7j7BMhYqNssBa6hVhnOSS46qPPc",
  authDomain: "pathforge2.firebaseapp.com",
  projectId: "pathforge2",
  storageBucket: "pathforge2.firebasestorage.app",
  messagingSenderId: "839049749696",
  appId: "1:839049749696:web:642ca63a48b4662eb17925"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 