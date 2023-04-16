// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_p3XmCApTcvPf9TONagbktulCGlyyokk",
  authDomain: "lekan-alight-motion-app.firebaseapp.com",
  projectId: "lekan-alight-motion-app",
  storageBucket: "lekan-alight-motion-app.appspot.com",
  messagingSenderId: "588466530816",
  appId: "1:588466530816:web:17e7e3b127ca70e5ad46e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth}