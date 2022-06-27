import { useNavigate } from "react-router-dom"

export default function StartingPage():JSX.Element {

    const navigate = useNavigate()

    return (
        <div className="StartingPage">
            <div className="global_container">
                <div className="heading_container">
                    <h1>Welcome</h1>
                    <h3>to your <span>Daily List</span></h3>
                </div>
                <div className="buttons_container">
                    <button type="button" onClick={() => navigate('./create_account')}>Create account</button>
                    <button type="button" onClick={() => navigate('./log_in')}>Log In</button>
                </div>
            </div>
        </div>
    )
}