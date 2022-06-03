import { useDispatch } from "react-redux";
import store from '../../store/store';
import { setLogInFormVisible, setLogInFormHidden } from "../../store/_logInForm";
import { setSignUpFormHidden, setSignUpFormVisible } from "../../store/_signUpForm";
import PrimaryButton from "../elements/buttons/PrimaryButton";
import LogIn from "../login/LogIn";
import SignUp from "../signup/SignUp";

export default function LandingPage(): JSX.Element {

  const dispatch = useDispatch();

  return (
    <div className="LandingPage-outside-container">
      <div className='LandingPage'>
        <div className="container">

          <div className="heading content-container">
            <h2>Welcome</h2>
            <h3>to your</h3>
            <h1>TO DO LIST</h1>
          </div>

          <div className="buttons content-container">
            <div className="button">
              <PrimaryButton function={() => {dispatch(setLogInFormVisible())}} text="Log In" color="orange" />
            </div>
            <div className="button">
              <PrimaryButton function={() => {dispatch(setSignUpFormVisible())}} text="Sign up" color="blue" />
            </div>
          </div>
        </div>

        <div className="top"></div>
        <div className="bot"></div>
      </div>
      <LogIn/>
      <SignUp />
    </div>
  );
}

