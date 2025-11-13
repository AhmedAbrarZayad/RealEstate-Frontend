// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5nu8VXk5Jj8fbDLhCTJt6iytfwo1adHM",
  authDomain: "realestate-fbcf5.firebaseapp.com",
  projectId: "realestate-fbcf5",
  storageBucket: "realestate-fbcf5.firebasestorage.app",
  messagingSenderId: "481121817715",
  appId: "1:481121817715:web:d3da752744562f869f4606"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
