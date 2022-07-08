import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { createRef, useState } from "react";
import axios from "axios";
import qs from 'qs';

export default function LogIn(): JSX.Element {

    const navigate = useNavigate()

    const [resError, setResError] = useState<boolean>(false)

    //REFS
    const _email = createRef<HTMLInputElement>();
    const _password = createRef<HTMLInputElement>();

    const backward = () => {
        navigate('/to-do-list-react/')
    }

    const logIn = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();


        let email = (_email.current !== null ? _email.current.value : '');
        let password = (_password.current !== null ? _password.current.value : '');

        // let data = {
        //     email: email,
        //     password: password
        // };
        // let data = "email=admin%40email.com&password=qwerty123";
        // let axiosConfig = {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // };


        // let qs = require('qs');


        // axios.post('https://todo.coldwinternight.ru/api/login',
        //     data,
        //     axiosConfig)
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        // navigate('/to-do-list-react/app')

        const qs = require('qs');
        let data = qs.stringify({
            'email': 'admin@email.com',
            'password': 'qwerty123'
        });
        let config = {
            method: 'post',
            url: 'https://todo.coldwinternight.ru/api/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        console.log(data)

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
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