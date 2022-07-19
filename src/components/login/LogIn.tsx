import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { createRef, useState, useEffect } from "react";
import axios from "axios";

export default function LogIn(): JSX.Element {

    const navigate = useNavigate()

    const [resError, setResError] = useState<boolean>(false)

    //REFS
    const _email = createRef<HTMLInputElement>();
    const _password = createRef<HTMLInputElement>();

    const backward = () => {
        navigate('/')
    }
    
    const logIn = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setResError(false);

        let email = (_email.current !== null ? _email.current.value : '');
        let password = (_password.current !== null ? _password.current.value : '');

        const qs = require('qs');
        
        let data = qs.stringify({
            'email': email,
            'password': password
        });

        let config = {
            method: 'post',
            url: 'https://todo.coldwinternight.ru/api/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config)
            .then((res) => {
                localStorage.setItem('user_id',res.data.user_id);
                localStorage.setItem('jwt',res.data.Authorization);
                navigate('/app');
            })
            .catch((err) => {
                console.log(err);
                setResError(true);
            });
        

    }

    return (
        <div className="LogIn">
            <FontAwesomeIcon icon={faCircleArrowLeft} className="back" onClick={() => backward()}></FontAwesomeIcon>
            <form>
                <label htmlFor="email">E-Mail</label>
                <input ref={_email} id="email" type="text" />

                <label htmlFor="password">Password</label>
                <input ref={_password} type="password" />
                {resError && <p>E-mail or password is wrong</p>}

                <button type="submit" onClick={(e) => logIn(e)}>Log In</button>
            </form>
        </div>
    )
}