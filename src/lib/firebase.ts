import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBtgHNW2GTeygdNtgSY-VvIgLOmjTheCFI",
    authDomain: "quiz-app-4a894.firebaseapp.com",
    projectId: "quiz-app-4a894",
    storageBucket: "quiz-app-4a894.firebasestorage.app",
    messagingSenderId: "997473587946",
    appId: "1:997473587946:web:b74a6f6dcea40ed5a8fd93",
    measurementId: "G-1P59WFYMCF",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);