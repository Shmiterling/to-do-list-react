import React, { MouseEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import store from "../../store/store";
import { setSignUpFormHidden, setSignUpFormInitial } from "../../store/_signUpForm";
import { setLogInFormVisible } from "../../store/_logInForm";
import PrimaryButton from "../elements/buttons/PrimaryButton";

export interface Data {
    username: string;
    email: string;
    password: string;
}

export default function SignUp(): JSX.Element {

    const dispatch = useDispatch()
    const formState = useSelector((state) => (store.getState().signUpForm.value))

    const [success, setSuccess] = useState<boolean>(false);
    let navigate = useNavigate();

    //ERRORS STATES
    const [emptyUserErr, setEmptyUserErr] = useState<boolean>(false);
    const [emailErr, setEmailErr] = useState<boolean>(false);
    const [emptyPassErr, setEmptyPassErr] = useState<boolean>(false);
    const [numPassErr, setNumPassErr] = useState<boolean>(false);
    const [specPassErr, setSpecPassErr] = useState<boolean>(false);
    const [lengthPassErr, setLengthPassErr] = useState<boolean>(false);
    const [samePassErr, setSamePassErr] = useState<boolean>(false);
    const [errFlag, setErrFlag] = useState<boolean>(false);

    //REFS
    const _usernameInput = React.useRef<HTMLInputElement>(null)
    const _emailInput = React.useRef<HTMLInputElement>(null)
    const _passInput = React.useRef<HTMLInputElement>(null)
    const _confirmPassInput = React.useRef<HTMLInputElement>(null)

    const fieldClear = () => {
        if (_usernameInput.current !== null) {
            _usernameInput.current.value = ''
        }
        if (_emailInput.current !== null) {
            _emailInput.current.value = ''
        }
        if (_passInput.current !== null) {
            _passInput.current.value = ''
        }
        if (_confirmPassInput.current !== null) {
            _confirmPassInput.current.value = '';
        }
    }

    const signUpFunction = (e: MouseEvent) => {

        e.preventDefault()

        let username: string = '';
        let email: string = '';
        let pass: string = '';
        let passConfirm: string = '';

        //RESET FLAGS
        setErrFlag(false);
        let flag: boolean = false

        //RESET ERRORS
        setEmptyUserErr(false);
        setEmailErr(false);
        setEmptyPassErr(false);
        setNumPassErr(false);
        setSpecPassErr(false);
        setLengthPassErr(false);
        setSamePassErr(false);
        setSuccess(false);

        if (_usernameInput.current !== null) {
            username = _usernameInput.current.value;
        }

        if (_emailInput.current !== null) {
            email = _emailInput.current.value;
        }

        if (_passInput.current?.value !== undefined) {
            pass = _passInput.current?.value;
        }

        if (_confirmPassInput.current?.value !== undefined) {
            passConfirm = _confirmPassInput.current?.value;
        }


        // CHECKING ERRORS
        if (username === '') {
            setEmptyUserErr(true)
            flag = true;
        }

        if (email === '') {
            setEmailErr(true);
            flag = true;
        }

        if (!email.match(/(?=.*@)(.{5,})([.])/) && email !== '') {
            setEmailErr(true)
            flag = true;
        }

        if (pass === '') {
            setEmptyPassErr(true)
            flag = true;
        }

        if (!pass.match(/[0-9]/) && pass !== '') {
            setNumPassErr(true)
            flag = true;
        }

        if (!pass.match(/[!#@$%]/) && pass !== '') {
            setSpecPassErr(true)
            flag = true;
        }

        if (pass.length < 6 && pass !== '') {
            setLengthPassErr(true)
            flag = true;
        }

        if (pass !== passConfirm && pass !== '') {
            setSamePassErr(true)
            flag = true;
        }

        if (flag === false) {
            let axiosConfig = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }

            let data: Data = {
                username: username,
                email: email,
                password: pass
            }

            axios.post('https://todo.coldwinternight.ru/todo/users',
                data,
                axiosConfig)
                .then((res) => {
                    if (res.status === 201) {
                        setSuccess(true);
                        setTimeout(() => {
                            dispatch(setSignUpFormHidden())
                        }, 2000)
                        setTimeout(() => {
                            dispatch(setLogInFormVisible())
                        }, 1000)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            setErrFlag(true)
        }

    }

    const [usernameFocus, setUsernameFocus] = useState<boolean>(false);
    const [emailFocus, setEmailFocus] = useState<boolean>(false);
    const [passFocus, setPassFocus] = useState<boolean>(false);
    const [confPassFocus, setConfPassFocus] = useState<boolean>(false);

    let usernamePlaceholderStatus: string;
    if (usernameFocus === true || _usernameInput.current?.value !== '') {
        usernamePlaceholderStatus = 'label'
    } else if (usernameFocus === null) {
        usernamePlaceholderStatus = ''
    } else {
        usernamePlaceholderStatus = 'placeholder'
    }

    let emailPlaceholderStatus: string;
    if (emailFocus === true || _emailInput.current?.value !== '') {
        emailPlaceholderStatus = 'label'
    } else if (emailFocus === null) {
        emailPlaceholderStatus = ''
    } else {
        emailPlaceholderStatus = 'placeholder'
    }

    let passPlaceholderStatus: string;
    if (passFocus === true || _passInput.current?.value !== '') {
        passPlaceholderStatus = 'label'
    } else if (passFocus === null) {
        passPlaceholderStatus = ''
    } else {
        passPlaceholderStatus = 'placeholder'
    }

    let confPassPlaceholderStatus: string;
    if (confPassFocus === true || _confirmPassInput.current?.value !== '') {
        confPassPlaceholderStatus = 'label'
    } else if (confPassFocus === null) {
        confPassPlaceholderStatus = ''
    } else {
        confPassPlaceholderStatus = 'placeholder'
    }

    return (
        <div className={'signup outside-container' + formState}>
            {errFlag && <div className="error-container">
                {emptyUserErr && <p className="error">The username field is required.</p>}
                {emptyPassErr && <p className="error">The password field is empty</p>}
                {samePassErr && <p className="error">Passwords must be the same</p>}
                {specPassErr && <p className="error">Password must include specific charecter !#@$%</p>}
                {lengthPassErr && <p className="error">Password must contain at least 6 charecters</p>}
                {numPassErr && <p className="error">Password must contain at least one number</p>}
                {emailErr && <p className="error">The email field is required.</p>}
            </div>}
            {success && <h1 className="success">Success!</h1>}
            {!success && <form className="form-container">
                <FontAwesomeIcon onClick={() => { dispatch(setSignUpFormHidden()); fieldClear(); setErrFlag(false); setTimeout(() => {dispatch(setSignUpFormInitial())},1000) }} icon={faArrowRight}></FontAwesomeIcon>
                <div className="inputs email">
                    <label htmlFor="signup-email" className={emailPlaceholderStatus}>E-Mail</label>
                    <input id='signup-email' type="text" ref={_emailInput} onFocus={() => { setEmailFocus(true) }} onBlur={() => { setEmailFocus(false) }} />
                </div>
                <div className="inputs username">
                    <label htmlFor="signup-username" className={usernamePlaceholderStatus}>Username</label>
                    <input id='signup-username' type="text" ref={_usernameInput} onFocus={() => { setUsernameFocus(true) }} onBlur={() => { setUsernameFocus(false) }} />
                </div>
                <div className="inputs password">
                    <label htmlFor="signup-pass" className={passPlaceholderStatus}>Password</label>
                    <input id='signup-pass' type="password" ref={_passInput} onFocus={() => { setPassFocus(true) }} onBlur={() => { setPassFocus(false) }} />
                </div>
                <div className="inputs confirmpassword">
                    <label htmlFor="signup-confirmpass" className={confPassPlaceholderStatus}>Confirm password</label>
                    <input id='signup-confirmpass' type="password" ref={_confirmPassInput} onFocus={() => { setConfPassFocus(true) }} onBlur={() => { setConfPassFocus(false) }} />
                </div>
                <PrimaryButton text='Sign Up' color='blue' function={signUpFunction} />
            </form>}
        </div>
    )
}
