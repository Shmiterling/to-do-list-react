import { faArrowRightFromBracket, faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeToProfile } from "../../store/navbarSlice";

export type Data = {
    id?: string,
    username?: string,
    email?: string
};

export default function Profile(): JSX.Element {


    const [data,setData] = useState<Data>({})
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getData()
        dispatch(changeToProfile())
    },[])

    const getData = () => {
        let config = {
            method: 'get',
            url: 'https://todo.coldwinternight.ru/api/users/' + localStorage.user_id,
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

    const edit = () => {
        navigate('../edit')
    };

    const logOut = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('jwt');
        navigate('/to-do-list-react');
    };

    return (
        <div className="Profile">
            <FontAwesomeIcon icon={faPenToSquare} className="edit_icon" onClick={() => edit()}></FontAwesomeIcon>
            <div className="picture_container">
                <FontAwesomeIcon className="user" icon={faUser}></FontAwesomeIcon>
            </div>
            <h1>{data.username}</h1>
            <h1>{data.email}</h1>
            <button type="button" onClick={() => logOut()}><FontAwesomeIcon className="log_out_icon" icon={faArrowRightFromBracket}></FontAwesomeIcon>Log Out</button>
        </div>
    )
}