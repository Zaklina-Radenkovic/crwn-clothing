import { useState } from "react";
// import { UserContext } from "../../context/UserContext";
import {
  signInUserWithEmailAndPassword,
  // createUserProfileDocument,
  signInWithGooglePopup,
  // signInWithGoogleRedirect,
  // auth,
} from "../../utils/firebase/firebase";
// import { getRedirectResult } from "firebase/auth";
import FormInput from "../formInput/FormInput";
import Button from "../button/Button";
import "./SignIn.scss";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  // const { setCurrentUser } = useContext(UserContext);
  ///////************* WORKING WITH GOOGLE REDIRECT//////
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

  const signInWithGoogle = async () => {
    // const response = await signInWithGooglePopup();
    // console.log(response);
    // we need to call createUserProfileDocument with 'response' obj. We need that obj in order to make a user in db (cause we need name, email...)
    // const userDocRef = await createUserProfileDocument(response);
    // BUT we can also destructure 'response' obj and get only 'user' from there
    // const { user } = await signInWithGooglePopup();
    await signInWithGooglePopup();
    // const userDocRef = await createUserProfileDocument(user);
    // console.log(userDocRef);
    navigate("/");
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //       const response = await signInUserWithEmailAndPassword(email, password);
      //       console.log(response);
      // // OR
      // const { user } = await signInUserWithEmailAndPassword(email, password);
      // setCurrentUser(user);
      await signInUserWithEmailAndPassword(email, password);
      resetFormFields();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
