// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZwJy6L37KgKPs-M4JnRknRP0wqqSEmi8",
  authDomain: "email-pass-auth-bb54d.firebaseapp.com",
  projectId: "email-pass-auth-bb54d",
  storageBucket: "email-pass-auth-bb54d.appspot.com",
  messagingSenderId: "458512909738",
  appId: "1:458512909738:web:25d9a5f8827581ee2717d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;