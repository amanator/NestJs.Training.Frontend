import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from 'react'
export default function Navbar() {
    let location = useLocation();
    let nav = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        nav("/login")
    }

    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => {
        setIsNavCollapsed(!isNavCollapsed);

    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">SAS Notes (Nest.js)</Link>
                <button class="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                        </li> */}
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-2" to="/login" role='button'>Login</Link>
                        <Link className="btn btn-primary mx-2" to="/signup" role='button'>SignUp</Link>

                    </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}


                </div>
            </div>
        </nav>
    )
}
