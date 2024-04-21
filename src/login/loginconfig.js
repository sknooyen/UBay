import React, { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signOut} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDow0ZqaLhB8at6ibASJlPEuDYp4YAIeVY",
  authDomain: "ubay-293a4.firebaseapp.com",
  projectId: "ubay-293a4",
  storageBucket: "ubay-293a4.appspot.com",
  messagingSenderId: "678687010729",
  appId: "1:678687010729:web:846ddd4014e0c0ba76deb8",
  measurementId: "G-3VW2QBN374"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  return currentUser;
}

export function logOut() {
  return signOut(auth)
}

export {auth, provider};
