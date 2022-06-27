import { faCircleCheck, faFileCircleCheck, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store/store";

export default function Navbar(): JSX.Element {

    const state = useSelector(() => store.getState().navbar.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const daily_list_nav = () => {
        navigate('./')
    }

    const profile_nav = () => {
        navigate('./profile')
    }

    const tasks_library_nav = () => {
        navigate('./tasks_library')
    }


    return (
        <div className="Navbar">
            <div className={"icon_container daily_list" + (state === 'daily' ? ' active' : '')} >
                <FontAwesomeIcon className="icon" onClick={() => daily_list_nav()} icon={faFileCircleCheck}></FontAwesomeIcon>
            </div>
            <div className={"icon_container profile" + (state === 'profile' ? ' active' : '')} >
                <FontAwesomeIcon className="icon" onClick={() => profile_nav()} icon={faUser}></FontAwesomeIcon>
            </div>
            <div className={"icon_container tasks_library" + (state === 'library' ? ' active' : '')} >
                <FontAwesomeIcon className="icon" onClick={() => tasks_library_nav()} icon={faCircleCheck}></FontAwesomeIcon>
            </div>
        </div>
    )
}