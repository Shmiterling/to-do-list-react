import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar():JSX.Element {

    const [loggedIn, setLoggedIn] = useState<boolean>()

    useEffect(() => {
        if(localStorage.loggedIn === 'ok') {
            setLoggedIn(true);
        }
    })

    const logOut = () => {
        localStorage.setItem('loggedIn', 'not ok');
        window.location.href = '/Home';
    }

    return (
        <div className="Navbar-outside-container">
            <div className='Navbar'>
                <Link id="home" className="Link" to="/Home">Home</Link>
                {loggedIn && <Link id="profile" className="Link" to="/Profile">Profile</Link>}
                {loggedIn && <Link id="profile" className="Link" to="/MyTasks">My Tasks</Link>}
                {loggedIn && <Link id="profile" className="Link" to="/TodaysList">Today's List</Link>}
                <div className='Right-side-container'>
                    {!loggedIn && <Link id="login" className="Link" to="/LogIn">Log In</Link>}
                    {!loggedIn && <Link id="signup" className="Link" to="/SignUp">Sign Up</Link>}
                    {loggedIn && <Link id="logout" className="Link" to="/Home" onClick={logOut}>Log Out</Link>}
                </div>
            </div>
        </div>
    )
}
