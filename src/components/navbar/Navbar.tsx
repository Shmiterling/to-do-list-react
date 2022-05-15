import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar():JSX.Element {

    let navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState<boolean>();

    useEffect(() => {
        if(localStorage.loggedIn === 'ok') {
            setLoggedIn(true);
        }
    })

    const logOut = () => {
        localStorage.setItem('loggedIn', 'not ok');
        navigate('to-do-list-react/Home', {replace: true});
    }

    return (
        <div className="Navbar-outside-container">
            <div className='Navbar'>
                <Link id="home" className="Link" to="/Home">Home</Link>
                {loggedIn && <Link id="profile" className="Link" to="to-do-list-react/Profile">Profile</Link>}
                {loggedIn && <Link id="profile" className="Link" to="to-do-list-react/MyTasks">My Tasks</Link>}
                {loggedIn && <Link id="profile" className="Link" to="to-do-list-react/TodaysList">Today's List</Link>}
                <div className='Right-side-container'>
                    {!loggedIn && <Link id="login" className="Link" to="to-do-list-react/LogIn">Log In</Link>}
                    {!loggedIn && <Link id="signup" className="Link" to="to-do-list-react/SignUp">Sign Up</Link>}
                    {loggedIn && <Link id="logout" className="Link" to="to-do-list-react/Home" onClick={logOut}>Log Out</Link>}
                </div>
            </div>
        </div>
    )
}
