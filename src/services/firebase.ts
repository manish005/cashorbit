import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwnhFKohOHLaHqKB7-Aodl_YPrgIkMobc",
  authDomain: "cashorbit-72ecf.firebaseapp.com",
  projectId: "cashorbit-72ecf",
  storageBucket: "cashorbit-72ecf.firebasestorage.app",
  messagingSenderId: "218342822062",
  appId: "1:218342822062:web:216913951ae589f0b39d3f",
  measurementId: "G-BDWEH30RK0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
