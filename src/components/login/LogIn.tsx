import React, { MouseEvent, RefObject } from "react";

import Navbar from "../navbar/Navbar";

export default function LogIn():JSX.Element {

    const _emailInput = React.createRef()


    const logInFunction = (e:MouseEvent) => {
        e.preventDefault();
        localStorage.setItem('loggedIn', 'ok');
        window.location.href = '/Home';
    }

    return (
        <div className="outside-container">
            {/* <Navbar /> */}
            <div className="LogIn">
                <div className="form-container">
                    <h1>Log In</h1>
                    <form>
                        <input type="text" placeholder="E-mail" />
                        <input type="password" placeholder="Password" />
                    </form>
                    <button type="submit" onClick={(e:MouseEvent) => {logInFunction(e)}}>Log In</button>
                </div>
            </div>
        </div>
    )
}
