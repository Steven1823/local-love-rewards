import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXVw8NqGRgjxRFJB9o1uEJn2GCqUH-QWs",
  authDomain: "tunza-rewards.firebaseapp.com",
  projectId: "tunza-rewards",
  storageBucket: "tunza-rewards.appspot.com",
  messagingSenderId: "850121234567",
  appId: "1:850121234567:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);