import { faCheck, faCircleArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount(): JSX.Element {

    const navigate = useNavigate()

    const [success, setSuccess] = useState<boolean>(false);

    //REFS
    const _username = createRef<HTMLInputElement>();
    const _email = createRef<HTMLInputElement>();
    const _password = createRef<HTMLInputElement>();
    const _confirmPassword = createRef<HTMLInputElement>();


    //VALIDATION ERRORS STATE
    const [errorFlag, setErrorFlag] = useState<boolean>(false);
    const [userEmpty, setUserEmpty] = useState<boolean>(false);
    const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
    const [notEmail, setNotEmail] = useState<boolean>(false);
    const [passEmpty, setPassEmpty] = useState<boolean>(false);
    const [confirmPassEmpty, setConfirmPassEmpty] = useState<boolean>(false);
    const [passSpecial, setPassSpecial] = useState<boolean>(false);
    const [passNumber, setPassNumber] = useState<boolean>(false);
    const [passLength, setPassLength] = useState<boolean>(false);
    const [passMatch, setPassMatch] = useState<boolean>(false);


    const createAccount = (e: React.MouseEvent<HTMLElement>) => {

        e.preventDefault();

        let flag: boolean = false;

        setErrorFlag(false);
        setUserEmpty(false);
        setEmailEmpty(false);
        setNotEmail(false);
        setPassEmpty(false);
        setConfirmPassEmpty(false);
        setPassSpecial(false);
        setPassNumber(false);
        setPassLength(false);
        setPassMatch(false);

        let username: string = (_username.current !== null ? _username.current.value : '')
        let email: string = (_email.current !== null ? _email.current.value : '')
        let password: string = (_password.current !== null ? _password.current.value : '')
        let confirmPassword: string = (_confirmPassword.current !== null ? _confirmPassword.current.value : '')

        //VALIDATION
        if (username === '') {
            setUserEmpty(true)
            flag = true
        }


        if (email === '') {
            setEmailEmpty(true)
            flag = true
        }

        if (!email.match(/(?=.*@)(.{5,})([.])/) && email !== '') {
            setNotEmail(true)
            flag = true
        }

        if (password === '') {
            setPassEmpty(true)
            flag = true
        }

        if (!password.match(/[0-9]/) && password !== '') {
            setPassNumber(true)
            flag = true
        }

        if (!password.match(/[!#@$%]/) && password !== '') {
            setPassSpecial(true)
            flag = true
        }

        if (password.length < 6 && password !== '') {
            setPassLength(true)
            flag = true
        }

        if (confirmPassword === '') {
            setConfirmPassEmpty(true)
            flag = true
        }

        if (password !== confirmPassword && password !== '' && confirmPassword !== '') {
            setPassMatch(true)
            flag = true
        }

        if (flag === false) {
            console.log('success')
            setSuccess(true)
        } else {
            setErrorFlag(true);
        }

    }

    const closeErrors = () => {
        setErrorFlag(false)
    }

    const backward = () => {
        navigate('/to-do-list-react/')
    }

    const logIn = () => {
        navigate('/to-do-list-react/log_in')
    }

    return (
        <div className="CreateAccount">
            {success && <div className="success">
                <div className="success_content">
                    <h1><FontAwesomeIcon className="check" icon={faCheck}></FontAwesomeIcon>Success</h1>
                    <h3>Your account was created</h3>
                    <button type="button" onClick={() => logIn()}>Log In</button>
                </div>
            </div>}
            {errorFlag && <div className="errors">
                <div className="error_field">
                    <FontAwesomeIcon icon={faXmark} className="x_mark" onClick={() => { closeErrors() }}></FontAwesomeIcon>
                    <h1>Oops...</h1>
                    {passSpecial && <p>Password must include at least one special character
                        !@#$%^&*</p>}
                    {passNumber && <p>Password must include at least one number</p>}
                    {passLength && <p>Password must include at least 6 characters</p>}
                    {passMatch && <p>Passwords do not match</p>}
                    {passEmpty && <p>Password field is required</p>}
                    {confirmPassEmpty && <p>Confirm password field is required</p>}
                    {userEmpty && <p>Username field is required</p>}
                    {emailEmpty && <p>E-Mail field is required</p>}
                    {notEmail && <p>Please provide an E-mail address</p>}
                </div>
            </div>}
            <FontAwesomeIcon icon={faCircleArrowRight} className="back" onClick={() => backward()}></FontAwesomeIcon>
            <form>
                <label htmlFor="username">Username</label>
                <input ref={_username} id="username" type="text" />

                <label htmlFor="email">E-Mail</label>
                <input ref={_email} id="email" type="text" />

                <label htmlFor="password">Password<span className="add_info">6-16 characters length</span></label>
                <input ref={_password} type="password" />
                <p>Must include at least one numer and special character !@#$%^&*</p>

                <label htmlFor="confirm_password">Confirm Password</label>
                <input ref={_confirmPassword} type="password" />
                <button type="submit" onClick={(e) => createAccount(e)}>Create account</button>
            </form>
        </div>
    )
}