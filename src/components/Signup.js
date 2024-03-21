import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/notes/AlertContext';

const Signup = () => {
    const context = useContext(AlertContext)
    const { showAlert } = context
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", password: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        let { name, password } = credentials;
        const response = await fetch(`https://nestjstraining-production.up.railway.app/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: name, password: password })
        });
        let json = await response.json();
        // console.log(json)

        // Save the auth token
        if (json.success === true) {
            showAlert("Signup Successful")
            history("/");
            localStorage.setItem('token', json.authtoken)
        }
        else
            showAlert("Username Already Exists!")


    }

    return (
        <div>
            <div style={{ marginBottom: 20 }}>
                <h2>SignUp</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="name" name="name" minLength={2} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text"></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}" onChange={onChange} />
                    <p style={{ fontSize: 10 }}>Password must contain One UpperCase, One LowerCase, One Number & One Special character</p>
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
