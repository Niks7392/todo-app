import React from 'react'
import { useContext, useState } from 'react'
import ListContext from '../context/ListContext'
import { Collapse } from 'react-collapse';
import { UnmountClosed } from 'react-collapse';
import { Login } from './Login'
import { SignUp } from './SignUp'
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
    // contexts 
    const context = useContext(ListContext)
    const { test } = context;

    const navigate = useNavigate()

    // states
    const [login, setlogin] = useState(false)
    const [Sign, setsign] = useState(true)

    // functions 
    const handleLogin = () => {
        setlogin(true)
        setsign(false)
    }
    const handleSignUp = () => {
        setlogin(false)
        setsign(true)
    }
    const handleLogOut = ()=>{
        localStorage.removeItem('token')
        navigate('/user-profile')
    }
    return (
        !localStorage.getItem('token') ?
            <div className='container-sm d-flex align-items-center container-sm flex-column'>
                <div className="btn-group  my-3" role="group" aria-label="Basic mixed styles example">
                    <button type="button" className="btn btn-danger" onClick={handleLogin}>Login</button>
                    <button type="button" className="btn btn-success" onClick={handleSignUp}>SignUp</button>
                </div>
                <Collapse isOpened={login}>
                    <Login />
                </Collapse>
                <UnmountClosed isOpened={Sign}>
                    <SignUp />
                </UnmountClosed>
            </div>
            : <div className="container-sm">
                <h1>Logged in</h1>
                <button className='btn btn-primary' onClick={handleLogOut}>Log Out</button>

            </div>
    )
}
