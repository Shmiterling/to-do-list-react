import React from "react";
import { MouseEvent, useState } from "react";
import PrimaryButton from '../elements/buttons/PrimaryButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { setLogInFormHidden, setLogInFormInitial } from "../../store/_logInForm";
import { useDispatch } from "react-redux";
import store from "../../store/store";



export default function LogIn(): JSX.Element {
    
    const dispatch = useDispatch();
    const formState = useSelector((state) => store.getState().logInForm.value)

    const [emailFocus, setEmailFocus] = useState<boolean | null>(null)
    const [passFocus, setPassFocus] = useState<boolean | null>(null)
    
    const _emailInput = React.useRef<HTMLInputElement>(null)
    const _passInput = React.useRef<HTMLInputElement>(null)


    const logInFunction = (e: MouseEvent) => {
        e.preventDefault();
        console.log('ok')
    }

    const fieldClear = () => {
        if (_emailInput.current !== null) {
            _emailInput.current.value = ''
        }
        if (_passInput.current !== null) {
            _passInput.current.value = ''
        }
    }

    let emailPlaceholderStatus:string;
    if (emailFocus === true || _emailInput.current?.value !== '') {
        emailPlaceholderStatus = 'label'
    } else if (emailFocus === null){
        emailPlaceholderStatus = ''
    }  else {
        emailPlaceholderStatus = 'placeholder'
    }

    let passPlaceholderStatus:string;
    if (passFocus === true || _passInput.current?.value !== '') {
        passPlaceholderStatus = 'label'
    } else if (passFocus === null){
        passPlaceholderStatus = ''
    }  else {
        passPlaceholderStatus = 'placeholder'
    }

    return (
        <div className={'login outside-container' + formState}>
            <form className="form-container">
                <FontAwesomeIcon onClick={() => {dispatch(setLogInFormHidden()); fieldClear(); setTimeout(() => {dispatch(setLogInFormInitial())},1000)}} icon={faArrowRight}></FontAwesomeIcon>
                <div className="inputs email">
                    <label htmlFor='email' className={emailPlaceholderStatus}>E-Mail</label>
                    <input id='email' ref={_emailInput} type="text" onFocus={() => {setEmailFocus(true)}} onBlur={() => {setEmailFocus(false)}}></input>
                </div>
                <div className="inputs password">
                    <label htmlFor='pass' className={passPlaceholderStatus}>Password</label>
                    <input id='pass' ref={_passInput} onFocus={() => {setPassFocus(true)}} onBlur={() => {setPassFocus(false)}} type="password"></input>
                </div>
                <PrimaryButton text='Log In' color='orange' function={logInFunction}/>
            </form>
        </div>
    )
}
