import { Data } from "../profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft,faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { createRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import preloader from "../../img/Pulse-1.5s-200px.gif"

export default function Edit(): JSX.Element {

    const [data,setData] = useState<Data>({});
    const [preloaderVisible, setPreloaderVisible] = useState<boolean>(false)
    const navigate = useNavigate();
    const _username = createRef<HTMLInputElement>()

    useEffect(() => {
        getData()
    },[])

    const getData = () => {

        setPreloaderVisible(true);

        let config = {
            method: 'get',
            url: 'https://todo.coldwinternight.ru/api/users/',
            headers: {
                'Authorization': localStorage.jwt
            },
        }

        axios(config)
            .then(res => {
                setData(res.data)
                setPreloaderVisible(false)
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

        if(username !== '') {
            let data = {
                username: username
            };

            let config = {
                method: 'PATCH',
                url: 'https://todo.coldwinternight.ru/api/users/username',
                headers: {
                    'Authorization': localStorage.jwt
                },
                data
            };
    
            axios(config)
                .then(res => {
                    console.log(res)
                    backward()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div className="Edit">
            <FontAwesomeIcon icon={faArrowCircleLeft} className="back_icon" onClick={() => backward()}></FontAwesomeIcon>
            <div className="picture_container">
                <FontAwesomeIcon className="user" icon={faUser}></FontAwesomeIcon>
            </div>
            {preloaderVisible && <img src={preloader} id="preloader" alt="preloader" />}
            {!preloaderVisible && <input ref={_username} type="text" placeholder={data.username} />}
            <button type="button" className="change_password_button" onClick={() => changePassword()}>Change Password</button>
            <button type="button" className="submit_button" onClick={() => submit()}>Submit</button>
        </div>
    )
}