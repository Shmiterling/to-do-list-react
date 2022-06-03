import { configureStore } from "@reduxjs/toolkit";
import _landingPageButtons from "./_landingPageButtons";
import _logInForm from "./_logInForm";
import _signUpForm from "./_signUpForm";

export default configureStore({
    reducer: {
        buttons: _landingPageButtons,
        logInForm: _logInForm,
        signUpForm: _signUpForm,
    }
})