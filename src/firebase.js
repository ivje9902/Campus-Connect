import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, setDoc, updateDoc, deleteDoc, count, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAjWnGy2HpTFM-07fRp3VIokULmU_dyMg4",
    authDomain: "campusconnect-30c4a.firebaseapp.com",
    databaseURL: "https://campusconnect-30c4a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "campusconnect-30c4a",
    storageBucket: "campusconnect-30c4a.appspot.com",
    messagingSenderId: "728123265116",
    appId: "1:728123265116:web:2d24f83a222e156fe4d699",
    measurementId: "G-YRMP4KDMNX"
  };

  //To help with debugging later
  if (!firebaseConfig.apiKey) throw new Error("Missing firebase credentials: apiKey");  
  if (!firebaseConfig.authDomain) throw new Error("Missing firebase credentials: authDomain");
  if (!firebaseConfig.projectId) throw new Error("Missing firebase credentials: projectId");
  if (!firebaseConfig.storageBucket) throw new Error("Missing firebase credentials: storageBucket");
  if (!firebaseConfig.messagingSenderId) throw new Error("Missing firebase credentials: messagingSenderId");
  if (!firebaseConfig.appId) throw new Error("Missing firebase credentials: appId");
  if (!firebaseConfig.measurementId) throw new Error("Missing firebase credentials: measurementId");

  const firebaseApp = initializeApp(firebaseConfig); 
  const db = getFirestore(); 

  export { db };