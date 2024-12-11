import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrmccP8LMAT5LmS7_tJvRiBhgOBp6a4Yg",
  authDomain: "sih-24-a6cdc.firebaseapp.com",
  projectId: "sih-24-a6cdc",
  storageBucket: "sih-24-a6cdc.firebasestorage.app",
  messagingSenderId: "553817679286",
  appId: "1:553817679286:web:b42f8b54e8b1be8a820d17",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
