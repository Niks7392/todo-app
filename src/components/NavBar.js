import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/">Tasks</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create-new-task">Create new Task</NavLink>
                        </li>
                    </ul>
                    <li className="nav-items" style={{ listStyle: 'none' }}>
                        <NavLink className="nav-link" to='user-profile'>Your Account</NavLink>
                    </li>
                </div>
            </div>
        </nav>
    )
}
