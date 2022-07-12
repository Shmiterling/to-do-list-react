import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark, faCheck, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { createRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangePassword(): JSX.Element {

    const navigate = useNavigate();

    const [success, setSuccess] = useState<boolean>(false);

    //REFS
    const _currentPassword = createRef<HTMLInputElement>();
    const _newPassword = createRef<HTMLInputElement>();
    const _confirmNewPassword = createRef<HTMLInputElement>();


    //VALIDATION ERRORS STATE
    const [errorFlag, setErrorFlag] = useState<boolean>(false);
    const [currentWrong, setCurrentWrong] = useState<boolean>(false);
    const [currentPassEmpty, setCurrentPassEmpty] = useState<boolean>(false);
    const [newPassEmpty, setNewPassEmpty] = useState<boolean>(false);
    const [confirmPassEmpty, setConfirmPassEmpty] = useState<boolean>(false);
    const [passSpecial, setPassSpecial] = useState<boolean>(false);
    const [passNumber, setPassNumber] = useState<boolean>(false);
    const [passLength, setPassLength] = useState<boolean>(false);
    const [passMatch, setPassMatch] = useState<boolean>(false);

    const submit = () => {
        setErrorFlag(false)
        setCurrentWrong(false)
        setCurrentPassEmpty(false)
        setNewPassEmpty(false)
        setConfirmPassEmpty(false)
        setPassSpecial(false)
        setPassNumber(false)
        setPassLength(false)
        setPassMatch(false)

        let flag: boolean = false;

        let currentPassword = (_currentPassword.current !== null ? _currentPassword.current.value : '');
        let newPassword = (_newPassword.current !== null ? _newPassword.current.value : '');
        let confirmPassword = (_confirmNewPassword.current !== null ? _confirmNewPassword.current.value : '');

        if (currentPassword === '') {
            setCurrentPassEmpty(true)
            flag = true
        }

        if (newPassword === '') {
            setNewPassEmpty(true)
            flag = true
        }

        if (confirmPassword === '') {
            setConfirmPassEmpty(true)
            flag = true
        }

        if (!newPassword.match(/[0-9]/) && newPassword !== '') {
            setPassNumber(true)
            flag = true
        }

        if (!newPassword.match(/[!#@$%]/) && newPassword !== '') {
            setPassSpecial(true)
            flag = true
        }

        if (newPassword.length < 6 && newPassword !== '') {
            setPassLength(true)
            flag = true
        }

        if (newPassword !== confirmPassword && newPassword !== '' && confirmPassword !== '') {
            setPassMatch(true)
            flag = true
        }

        if (flag === false) {

            let data = {
                oldpassword: currentPassword,
                newpassword: newPassword
            };

            let config = {
                method: 'PATCH',
                url: 'https://todo.coldwinternight.ru/api/users/' + localStorage.user_id + '/password',
                headers: {
                    'Authorization': localStorage.jwt,
                },
                data
            };

            console.log(data)
            axios(config)
                .then(res => {
                    console.log(res)
                    setSuccess(true)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setErrorFlag(true);
        }
    }


    const backward = () => {
        navigate('../profile')
    }

    const closeErrors = () => {
        setErrorFlag(false)
    }

    return (
        <div className="ChangePassword">
            {success && <div className="success">
                <div className="success_content">
                    <h1><FontAwesomeIcon className="check" icon={faCheck}></FontAwesomeIcon>Success</h1>
                    <h3>Your password was changed</h3>
                </div>
            </div>}
            {errorFlag && <div className="errors">
                <div className="error_field">
                    <FontAwesomeIcon icon={faXmark} className="x_mark" onClick={() => { closeErrors() }}></FontAwesomeIcon>
                    <h1>Oops...</h1>
                    {currentWrong && <p>Current password is wrong</p>}
                    {passSpecial && <p>Password must include at least one special character
                        !@#$%^&*</p>}
                    {passMatch && <p>Passwords do not match</p>}
                    {passNumber && <p>Password must include at least one number</p>}
                    {passLength && <p>Password must include at least 6 characters</p>}
                    {currentPassEmpty && <p>Current password field is required</p>}
                    {newPassEmpty && <p>New password field is required</p>}
                    {confirmPassEmpty && <p>Confirm new password field is required</p>}
                </div>
            </div>}
            <FontAwesomeIcon icon={faArrowCircleLeft} className="back_icon" onClick={() => backward()}></FontAwesomeIcon>
            <div className="picture_container">
                <FontAwesomeIcon className="user" icon={faUser}></FontAwesomeIcon>
            </div>
            <input ref={_currentPassword} type="password" placeholder="Current Password" />
            <input ref={_newPassword} type="password" placeholder="New Password" />
            <input ref={_confirmNewPassword} type="password" placeholder="Confirm new password" />
            <button type="button" className="submit_button" onClick={() => submit()}>Submit</button>
        </div>
    )
}