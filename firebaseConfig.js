import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBlQgItodF5N_rYB2W587mhf3dXBOcupBw",
    authDomain: "fir-permission.firebaseapp.com",
    projectId: "fir-permission",
    storageBucket: "fir-permission.appspot.com",
    messagingSenderId: "822683267546",
    appId: "1:822683267546:web:0176e2b2707b3c80d690e3"
});

const db = getFirestore();