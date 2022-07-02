import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { createRef, useState } from "react";

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
        e.preventDefault()

        navigate('/to-do-list-react/app')
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