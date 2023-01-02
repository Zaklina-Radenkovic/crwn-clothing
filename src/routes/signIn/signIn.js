import {
  signInWithGooglePopup,
  createUserProfileDocument,
} from "../../utils/firebase/firebase";

const SignIn = () => {
  const googleHandler = async () => {
    // const response = await signInWithGooglePopup();
    // console.log(response);
    // we need to call createUserProfileDocument with 'response' obj. We need that obj in order to make a user in db (cause we need name, email...)
    // const userDocRef = await createUserProfileDocument(response);
    // BUT we can also destructure 'response' obj and get only 'user' from there
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserProfileDocument(user);
    console.log(userDocRef);
  };

  return (
    <>
      <h1>sign</h1>
      <button onClick={googleHandler}>Sign in with Google</button>
    </>
  );
};
export default SignIn;
