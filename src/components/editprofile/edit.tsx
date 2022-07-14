import { Data } from "../profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft,faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { createRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Edit(): JSX.Element {

    const [data,setData] = useState<Data>({});

    const navigate = useNavigate();
    const _username = createRef<HTMLInputElement>()

    useEffect(() => {
        getData()
    },[])

    const getData = () => {
        let config = {
            method: 'get',
            url: 'http://localhost:8080/api/users/' + localStorage.user_id,
            headers: {
                'Authorization': localStorage.jwt
            },
        }

        axios(config)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    const backward = () => {
        navigate('../profile')
    }

    const changePassword = () => {
        navigate('../change_password')
    }

    const submit = () => {
        let username:string = (_username.current !== null? _username.current.value: '')

        if (username === '' && data.username !== undefined) {
            username = data.username
        } 

        navigate('../profile')

    }

    return (
        <div className="Edit">
            <FontAwesomeIcon icon={faArrowCircleLeft} className="back_icon" onClick={() => backward()}></FontAwesomeIcon>
            <div className="picture_container">
                <FontAwesomeIcon className="user" icon={faUser}></FontAwesomeIcon>
            </div>
            <input ref={_username} type="text" placeholder={data.username} />
            <button type="button" className="change_password_button" onClick={() => changePassword()}>Change Password</button>
            <button type="button" className="submit_button" onClick={() => submit()}>Submit</button>
        </div>
    )
}