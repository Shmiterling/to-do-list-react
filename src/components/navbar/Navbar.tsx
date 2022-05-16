import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar():JSX.Element {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.loggedIn === 'ok') {
            setLoggedIn(true);
        }
    },[localStorage.loggedIn])

    const logOut = () => {
        setLoggedIn(false);
        localStorage.setItem('loggedIn', 'not ok');
        navigate('to-do-list-react/', {replace: true});
    }

    return (
        <div className="Navbar-outside-container">
            <div className='Navbar'>
                <Link id="home" className="Link" to="to-do-list-react/">Home</Link>
                {loggedIn && <Link id="profile" className="Link" to="to-do-list-react/Profile">Profile</Link>}
                {loggedIn && <Link id="profile" className="Link" to="to-do-list-react/MyTasks">My Tasks</Link>}
                {loggedIn && <Link id="profile" className="Link" to="to-do-list-react/TodaysList">Today's List</Link>}
                <div className='Right-side-container'>
                    {!loggedIn && <Link id="login" className="Link" to="to-do-list-react/LogIn">Log In</Link>}
                    {!loggedIn && <Link id="signup" className="Link" to="to-do-list-react/SignUp">Sign Up</Link>}
                    {loggedIn && <Link id="logout" className="Link" to="to-do-list-react/" onClick={logOut}>Log Out</Link>}
                </div>
            </div>
        </div>
    )
}
