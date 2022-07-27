import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-nCwKmgP1lUiQF1OsbkCdymQwAIJu8hg",
  authDomain: "pwa-firebase-slides.firebaseapp.com",
  databaseURL:
    "https://pwa-firebase-slides-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pwa-firebase-slides",
  storageBucket: "pwa-firebase-slides.appspot.com",
  messagingSenderId: "402250837239",
  appId: "1:402250837239:web:1cb77e9e7e587bfcbab7f2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
