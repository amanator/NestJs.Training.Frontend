import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/notes/AlertContext';

const Login = () => {
    const context = useContext(AlertContext)
    const { showAlert } = context
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", password: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://nestjstraining-production.up.railway.app/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: credentials.username, password: credentials.password })
        });
        let json = await response.json();
        // console.log(json)
        if (json.success) {
            // Save the auth token
            showAlert("Login Successful")
            localStorage.setItem('token', json.authtoken)
            history("/");
        }
        else {
            showAlert("Login Unsuccessful")
        }
    }


    return (
        <div>
            <div style={{ marginBottom: 20 }}>
                <h2>Login</h2>

            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputusername1" className="form-label">Username</label>
                    <input type="text" className="form-control" onChange={onChange} minLength={2} value={credentials.username} id="username" name='username' aria-describedby="usernameHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}" onChange={onChange} value={credentials.password} name='password' id="password" />
                    <p style={{ fontSize: 10 }}>Password must contain One UpperCase, One LowerCase, One Number & One Special character</p>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
