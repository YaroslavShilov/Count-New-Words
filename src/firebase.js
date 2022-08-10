/*
// @ts-nocheck
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfuyXaExE1EoGiyjlj-KoEoGRtOB-dKds",
  authDomain: "count-new-words.firebaseapp.com",
  projectId: "count-new-words",
  storageBucket: "count-new-words.appspot.com",
  messagingSenderId: "920314796615",
  appId: "1:920314796615:web:103400ecda7e551d082f62",
  measurementId: "G-J9546BKL28",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error("Error in signInWithGoogle: ", err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error("Error in logInWithEmailAndPassword: ", err);
    alert(err.message);
  }
};
*/
