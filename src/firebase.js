// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB54NhlvyGmIZ7RU5WGZL3yfEpx133YT1U",
  authDomain: "cityhospital-5b223.firebaseapp.com",
  projectId: "cityhospital-5b223",
  storageBucket: "cityhospital-5b223.appspot.com",
  messagingSenderId: "112616561480",
  appId: "1:112616561480:web:093df48ed36c6e4dc0f17d",
  measurementId: "G-4S37CHEJ44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);