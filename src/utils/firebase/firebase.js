import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyAhpGmjW_edFyeX1wPghS9jHLFOlqJRyDo",
  // authDomain: "crwn-clothing-db-ffb8f.firebaseapp.com",
  // projectId: "crwn-clothing-db-ffb8f",
  // storageBucket: "crwn-clothing-db-ffb8f.appspot.com",
  // messagingSenderId: "871546324516",
  // appId: "1:871546324516:web:b6ec060c2b1cdf94b9fab1",
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey, // this is the name of our collection: 'categories'
  objectsToAdd, // this is document that we add to collection
  field = "title"
) => {
  //getting batch in order to write documents (objects, which we have 5, = categories) in our collection
  const batch = writeBatch(db);
  //firebase makes for us collectionRef (we make collection)
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase()); //obj.title we need for key value (name of document)
    batch.set(docRef, object);
  });

  await batch.commit();
  // console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  //we want collectionRef of 'categories'
  const collectionRef = collection(db, "categories");
  //we apply 'query' method on collectionRef which gives us object 'q'
  const q = query(collectionRef);

  //we get querysnapshot from getDocs on'q';
  const querySnapshot = await getDocs(q);
  //from 'querySnapshot.docs' we have an array of all our categories which we reduce over (we reduce over that arr) in order to structure we want (an arr of objects with 'items.title' and items) = in order to end up with an object
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {}); //this is final obj we want to create which initally is empty
  // console.log(categoryMap);
  return categoryMap;
};

export const createUserProfileDocument = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //   if exists, just return
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//'signOutUser' fnc calls 'signOut' fnc which takse 'auth' obj
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
