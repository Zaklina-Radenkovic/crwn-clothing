import { async } from "@firebase/util";
import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import {
  signInWithGooglePopup,
  createUserProfileDocument,
  signInWithGoogleRedirect,
  auth,
} from "../../utils/firebase/firebase";
import SignUpForm from "../../signup/signUpForm";

const SignIn = () => {
  // this is a way to get response from redirect and to set a user in db;
  // with useEffect, because after we are returned from redirect useeffect starts and runs getRedirectResult fnc that will give us response
  //   useEffect(
  //     () => async () => {
  //       const response = await getRedirectResult(auth);
  //       if (response) {
  //         const userDocRef = await createUserProfileDocument(response.user);
  //         console.log(userDocRef);
  //       }
  //     },
  //     []
  //   );

  //   const logGoogleRedirectUser = async () => {
  //     const { user } = await signInWithGoogleRedirect();
  //     console.log(user);
  //   };

  const logGoogleUser = async () => {
    // const response = await signInWithGooglePopup();
    // console.log(response);
    // we need to call createUserProfileDocument with 'response' obj. We need that obj in order to make a user in db (cause we need name, email...)
    // const userDocRef = await createUserProfileDocument(response);
    // BUT we can also destructure 'response' obj and get only 'user' from there
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserProfileDocument(user);
    // console.log(userDocRef);
  };

  return (
    <>
      <h1>sign</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <SignUpForm />
    </>
  );
};
export default SignIn;
