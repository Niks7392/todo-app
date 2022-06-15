import React, { useEffect, useRef } from 'react'
import { useContext, useState } from 'react'
import ListContext from '../context/ListContext'
import { Collapse } from 'react-collapse';
import { UnmountClosed } from 'react-collapse';
import { Login } from './Login'
import { SignUp } from './SignUp'
import { useNavigate } from 'react-router-dom';

export const UserProfile = (props) => {
    const {Title} = props;
    // contexts 
    const context = useContext(ListContext)
    const { getUser, User } = context;

    // basic stuff 
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser()
            document.title = Title
        }
        // eslint-disable-next-line
    }, [])
    const navigate = useNavigate()
    const loginRef = useRef()

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
    const handleLogOut = () => {
        localStorage.removeItem('token')
        navigate('/user-profile')
    }
    return (
        !localStorage.getItem('token') ?
            <div className='container-sm d-flex align-items-center container-sm flex-column'>
                <div className="btn-group  my-3" role="group" aria-label="Basic mixed styles example">
                    <button type="button" className="btn btn-danger" ref={loginRef} onClick={handleLogin}>Login</button>
                    <button type="button" className="btn btn-success" onClick={handleSignUp}>SignUp</button>
                </div>
                <Collapse isOpened={login}>
                    <Login  navigate={navigate}/>
                </Collapse>
                <UnmountClosed isOpened={Sign}>
                    <SignUp navigate={navigate} loginRef={loginRef} />
                </UnmountClosed>
            </div>
            : <div className="container-sm  d-flex align-items-center justify-content-center flex-column" style={{ height: '60vh' }}>
                <h1>Your Account</h1>
                <div style={profileStyle} className='my-3'>
                    <div className='my-3' style={logoStyle}>{User?.name?.charAt(0).toUpperCase()}</div>
                    <h5 className='my-2'>Your Name : {User.name}</h5>
                    <h5 className='my-2'>Your Email : {User.email}</h5>
                </div>
                <button className='btn btn-primary' onClick={handleLogOut}>Log Out</button>

            </div>
    )
}


const profileStyle = {
    'border': '5px solid red',
    'background': '#f8f9fa',
    'padding': '2rem 3rem',
    'borderRadius': '30px',
};
const logoStyle = {
    'width': '5rem',
    'height': '5rem',
    'borderRadius': '100px',
    'border': '2px solid black',
    'background': 'red',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'fontSize': '1.8rem'
}