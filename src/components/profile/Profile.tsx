import { faArrowRightFromBracket, faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeToProfile } from "../../store/navbarSlice";

export type Data = {
    id: string,
    username: string,
    email: string
};

export default function Profile(): JSX.Element {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeToProfile())
    },[])

    const data:Data = {
        id: '1',
        username: 'Marcus',
        email: 'Marcus@gmail.com'
    };

    const edit = () => {
        navigate('../edit')
    };

    const logOut = () => {
        navigate('/to-do-list-react')
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