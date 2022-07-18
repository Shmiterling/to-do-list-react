import { faArrowRightFromBracket, faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeToProfile } from "../../store/navbarSlice";
import preloader from "../../img/Pulse-1.5s-200px.gif"

export type Data = {
    id?: string,
    username?: string,
    email?: string
};

export default function Profile(): JSX.Element {

    const [preloaderVisible, setPreloaderVisible] = useState<boolean>(false);
    const [data, setData] = useState<Data>({})
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        getData()
        dispatch(changeToProfile())
    }, [])

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
                console.log(res)
                setPreloaderVisible(false);
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const edit = () => {
        navigate('../edit')
    };

    const logOut = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('jwt');
        navigate('/');
    };

    return (
        <div className="Profile">
            <FontAwesomeIcon icon={faPenToSquare} className="edit_icon" onClick={() => edit()}></FontAwesomeIcon>
            <div className="picture_container">
                <FontAwesomeIcon className="user" icon={faUser}></FontAwesomeIcon>
            </div>
            {preloaderVisible && <img id="preloader" src={preloader} alt="preloader" />}
            {!preloaderVisible && <h1>{data.username}</h1>}
            {!preloaderVisible && <h1>{data.email}</h1>}
            <button type="button" onClick={() => logOut()}><FontAwesomeIcon className="log_out_icon" icon={faArrowRightFromBracket}></FontAwesomeIcon>Log Out</button>
        </div>
    )
}