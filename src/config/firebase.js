// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOuADWuN7rvrq9jQW42v44CJ177C39Bns",
  authDomain: "ricettario-1df94.firebaseapp.com",
  projectId: "ricettario-1df94",
  storageBucket: "ricettario-1df94.firebasestorage.app",
  messagingSenderId: "1030091118957",
  appId: "1:1030091118957:web:a509a9b5133c58c8352264",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
