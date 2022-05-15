import React, { MouseEvent, useState } from "react";
import {  useNavigate } from 'react-router-dom';
import axios from "axios";

export interface Data {
    username: string;
    email: string;
    password: string;
}

export default function SignUp(): JSX.Element {

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

    const signUpFunction = (e: MouseEvent) => {

        e.preventDefault()

        let username:string = '';
        let email:string = '';
        let pass:string = '';
        let passConfirm:string = '';

        //RESET FLAGS
        setErrFlag(false);
        let flag:boolean = false
        
        //RESET ERRORS
        setEmptyUserErr(false);
        setEmailErr(false);
        setEmptyPassErr(false);
        setNumPassErr(false);
        setSpecPassErr(false);
        setLengthPassErr(false);
        setSamePassErr(false);
        setSuccess(false);
        
        if (_usernameInput.current !== null){
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

            axios.post('http://62.113.113.151:8080/todo/users',
                data,
                axiosConfig)
                .then((res) => {
                    if (res.status === 201) {
                        setSuccess(true);
                        setTimeout(() => {
                            navigate('to-do-list-react/LogIn', {replace: true})
                        }, 2000)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            setErrFlag(true)
        }

    }

    return (
        <div className="outside-container">
            <div className="SignUp">
                <div className="form-container">
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
                    {!success && <h1>Sign Up</h1>}
                    {!success && <form>
                        <input type="text" ref={_usernameInput} placeholder="Username" />
                        <input type="text" ref={_emailInput} placeholder="E-mail" />
                        <input type="password" ref={_passInput} placeholder="Password" />
                        <input type="password" ref={_confirmPassInput} placeholder="Confirm password" />
                    </form>}
                    {!success && <button type="submit" onClick={(e) => { signUpFunction(e) }}>Sign Up</button>}
                </div>
            </div>
        </div>
    )
}
