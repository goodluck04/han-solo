// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBunXGptWfzyjRXWHRHqs45xdIgeuZNxmw",
  authDomain: "goodluck-8d0f7.firebaseapp.com",
  projectId: "goodluck-8d0f7",
  storageBucket: "goodluck-8d0f7.appspot.com",
  messagingSenderId: "245578035405",
  appId: "1:245578035405:web:9fbf4eb8d6650a265df984",
  measurementId: "G-GZJ80KLGWY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);