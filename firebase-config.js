// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXzV_Hc6dlDjaOAE0ytnfGaYUTUI5XyTE",
  authDomain: "demoadmin-cdee0.firebaseapp.com",
  projectId: "demoadmin-cdee0",
  storageBucket: "demoadmin-cdee0.appspot.com", // FIXED HERE
  messagingSenderId: "692280160109",
  appId: "1:692280160109:web:e32123854c8cca270cb464"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // this is needed

export { auth, db, storage };
