import SignUpForm from "../../components/signup/SignUp";
import SignInForm from "../../components/signIn/SignIn";
import "./Authentication.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
export default Authentication;
