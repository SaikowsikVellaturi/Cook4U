import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCLzPvvfMWPGxtlemBj9CHlfD2OYjBG27c",
  authDomain: "practicecook-f7aaf.firebaseapp.com",
  projectId: "practicecook-f7aaf",
  storageBucket: "practicecook-f7aaf.appspot.com",
  messagingSenderId: "696949118327",
  appId: "1:696949118327:web:15d52a07590c0dc7d4bd72",
};
firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
export { projectFirestore };
