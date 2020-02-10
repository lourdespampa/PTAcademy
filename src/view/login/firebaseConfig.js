import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAWOjwnakelzb4sXiZ00Jgz3IltnuGbjn4",
    authDomain: "playtec-academy.firebaseapp.com",
    databaseURL: "https://playtec-academy.firebaseio.com",
    projectId: "playtec-academy",
    storageBucket: "playtec-academy.appspot.com",
    messagingSenderId: "600207428850",
    appId: "1:600207428850:web:de87371f18ee0d5b9e146b",
    measurementId: "G-71WTH3JR21"
}

firebase.initializeApp(firebaseConfig)

export default firebase;