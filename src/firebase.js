import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDoms-OFmzR-sPHWyJ_xeX_6LqA5Y0PmdM",
    authDomain: "disneyplus-clone-df7cb.firebaseapp.com",
    projectId: "disneyplus-clone-df7cb",
    storageBucket: "disneyplus-clone-df7cb.appspot.com",
    messagingSenderId: "309813795289",
    appId: "1:309813795289:web:cce7a4c191ee22f97261c8",
    measurementId: "G-LS3C2X0HC6"
  };
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
const  auth = firebase.auth();
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider(); 
const storage = firebase.storage()
export {auth , provider , storage};
export default db;