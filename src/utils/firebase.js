// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmCjp342svJVkAD0lDP9v3VZJRPaJLDRo",
  authDomain: "netflixgpt-eef20.firebaseapp.com",
  projectId: "netflixgpt-eef20",
  storageBucket: "netflixgpt-eef20.firebasestorage.app",
  messagingSenderId: "951757241958",
  appId: "1:951757241958:web:01f36d6301e7fced5cb7a7",
  measurementId: "G-KGB23Y4QFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//ye neeche waali line har API call ke sath use hoti hai, isliye yaha eak baar likhdiya aur 
//baar baar easily use karlenge instead of writing it again and again
export const auth = getAuth();