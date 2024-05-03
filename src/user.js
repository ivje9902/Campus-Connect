import { initializeApp } from "firebase/app";  
import { getFirestore, collection, addDoc, getDocs, query, where, doc, setDoc, updateDoc, deleteDoc, count, getDoc, arrayUnion } from "firebase/firestore";

import { getDB } from "./backend";

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


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();
  
const storage = getStorage();

const user = firebase.auth().currentUser;

const userEmail = user.email;

function createoncefunction() {
    let hasbeencalled = false;
    return function () {
        if (!hasbeencalled) {
            signOutWithGoogle();
            var myVariable = "false";
            localStorage.setItem("myVariable", myVariable);
            hasbeencalled = true;
        }
    }
}

const state = createoncefunction();

function set_name() {
    var status = localStorage.getItem("myVariable");
    if (status === "false") {
        document.getElementById("login_status").innerHTML = "Login"
    }
    else {
        document.getElementById("login_status").innerHTML = "Logout"
    }

}

function google_event() {
    var status = localStorage.getItem("myVariable");
    if (status === "false") {
        event_login();

    }
    else {
        event_logout();

    }
}

function event_login() {
    change();
    signInWithGoogle();
    return;
}

function event_logout() {
    change();
    signOutWithGoogle();
    return;
}

function change() {
    var myVariable = localStorage.getItem("myVariable");
    if (myVariable === "false") {
        myVariable = "true";
    }
    else {
        myVariable = "false";
    }
    localStorage.setItem("myVariable", myVariable);
}

function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user;
        console.log("Signed in", user)
        document.getElementById("login_status").innerHTML = "Logout"
    }).catch(function (error) {
        console.error(error);
    });
}

function signOutWithGoogle() {
    firebase.auth().signOut().then(() => {
        console.log("Signed out");
        document.getElementById("login_status").innerHTML = "Login"
    }).catch((error) => {
        console.error(error);
    });
}


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User is signed in");
    } else {
        console.log("User is signed out");
    }
})

async function createUser(){
    const docRef = doc(db, courseID, "users.");
    const docSnap = collection(docRef, "users");
    const docs = await getDocs(docSnap);

    let userExists = false;
    collection.forEach((field) => {
        if (field.id === userEmail) {
            userExists = true;
        }
    });
    if (userExists) {
        errorMessageElement.textContent = "no";
    }else{
        const quizDocRef = field(db, courseID, 'users', 'users', userEmail);
    }
}
