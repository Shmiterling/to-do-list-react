import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn(): JSX.Element {

    const navigate = useNavigate();

    const logInFunction = (e: MouseEvent) => {
        e.preventDefault();
        localStorage.setItem('loggedIn', 'ok');
        navigate('/to-do-list-react', { replace: false });
    }

    return (
        <div className="outside-container">
            <div className="LogIn">
                <div className="form-container">
                    <h1>Log In</h1>
                    <form>
                        <input type="text" placeholder="E-mail" />
                        <input type="password" placeholder="Password" />
                    </form>
                    <button type="submit" onClick={(e: MouseEvent) => { logInFunction(e) }}>Log In</button>
                </div>
            </div>
        </div>
    )
}
