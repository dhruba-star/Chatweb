// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXzV_Hc6dlDjaOAE0ytnfGaYUTUI5XyTE",
  authDomain: "demoadmin-cdee0.firebaseapp.com",
  projectId: "demoadmin-cdee0",
  storageBucket: "demoadmin-cdee0.appspot.com", // Fixed this from ".app" to ".com"
  messagingSenderId: "692280160109",
  appId: "1:692280160109:web:e32123854c8cca270cb464"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
