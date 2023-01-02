import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhpGmjW_edFyeX1wPghS9jHLFOlqJRyDo",
  authDomain: "crwn-clothing-db-ffb8f.firebaseapp.com",
  projectId: "crwn-clothing-db-ffb8f",
  storageBucket: "crwn-clothing-db-ffb8f.appspot.com",
  messagingSenderId: "871546324516",
  appId: "1:871546324516:web:b6ec060c2b1cdf94b9fab1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserProfileDocument = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  //   console.log(userDocRef); we get document obj from db

  //we check and get data with special obj 'snapshot'
  const userSnapshot = await getDoc(userDocRef);
  //   console.log(userSnapshot); on that obj we check is there some documents

  //   if data doesn`t exist we want to create, set
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //   if exists, just return
  return userDocRef;
};
