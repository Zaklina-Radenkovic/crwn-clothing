import { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserProfileDocument,
} from "../../utils/firebase/firebase";
import { UserContext } from "../../context/UserContext";
import FormInput from "../formInput/FormInput";
import Button from "../button/Button";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  //this is our [name]:value  // row 21
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  //   destructuring our input values from initial (formFields) because we re gonna use it in form
  const { displayName, email, password, confirmPassword } = formFields;
  //   console.log(formFields);
  const handleChange = (e) => {
    // we need name and value from 'e' in order to know which input is fired and take its value
    const { name, value } = e.target;
    // console.log(name);
    // we update all fields and the fired input
    setFormFields({ ...formFields, [name]: value });
  };

  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters");
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      //   console.log(user); here we don`t have displayName because we didn`t do it in authentication method

      await createUserProfileDocument(user, { displayName }); //this 'displayName' is our obj from input: displayName: somevalue
      setCurrentUser(user);
      resetFormFields();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />

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

        <FormInput
          label="Confirm password"
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
