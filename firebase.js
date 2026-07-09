// Firebase v11
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBybDygKzNg-x6omI_taG7XLDxOmRjJ52s",
  authDomain: "expense-tracker-pro-aa062.firebaseapp.com",
  projectId: "expense-tracker-pro-aa062",
  storageBucket: "expense-tracker-pro-aa062.firebasestorage.app",
  messagingSenderId: "565461031793",
  appId: "1:565461031793:web:da40f0d507d8f00b7474d0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);