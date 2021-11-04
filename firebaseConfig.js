import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyA127i7D4i35iPW8bWF0GZtSV21aKuSXMA",
    authDomain: "ujcellebrate.firebaseapp.com",
    projectId: "ujcellebrate",
    storageBucket: "ujcellebrate.appspot.com",
    messagingSenderId: "22184342958",
    appId: "1:22184342958:web:b18f23fff3534b8b03843f",
    measurementId: "G-HNWX9HVN5Z"
});

const db = getFirestore();