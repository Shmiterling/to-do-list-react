import { Data } from "../profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight,faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { createRef } from "react";

export default function Edit(): JSX.Element {

    const navigate = useNavigate();

    const _username = createRef<HTMLInputElement>()

    const data: Data = {
        id: '1',
        username: 'Marcus',
        email: 'Marcus@gmail.com'
    }

    const backward = () => {
        navigate('../profile')
    }

    const changePassword = () => {
        navigate('../change_password')
    }

    const submit = () => {
        let username:string = (_username.current !== null? _username.current.value: '')

        if (username === '') {
            username = data.username
        } 

        navigate('../profile')

    }

    return (
        <div className="Edit">
            <FontAwesomeIcon icon={faArrowCircleRight} className="back_icon" onClick={() => backward()}></FontAwesomeIcon>
            <div className="picture_container">
                <FontAwesomeIcon className="user" icon={faUser}></FontAwesomeIcon>
            </div>
            <input ref={_username} type="text" placeholder={data.username} />
            <button type="button" className="change_password_button" onClick={() => changePassword()}>Change Password</button>
            <button type="button" className="submit_button" onClick={() => submit()}>Submit</button>
        </div>
    )
}