import React from 'react'
import ListContext from './ListContext'
import { useState } from 'react'

export const ListState = (props) => {
    // serverhost
    const serverHost = process.env.REACT_APP_SERVER_HOST;
    // states 
    const [credentials, setcredentials] = useState({  email: '', password: '' })

    // functions 
    const onChangeInputs = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${serverHost}/api/user-auth/login-user`, {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : credentials.email,
                password : credentials.password
            })
        })
        const json = await response.json()
        if(json.authToken){
            setcredentials({ email: '', password: '' })
            localStorage.setItem('token', json.authToken)
        }
        console.log(json);
    }
    return (
        <ListContext.Provider value={{serverHost, handleLoginSubmit, onChangeInputs, credentials }}>
            {props.children}
        </ListContext.Provider>
    )
}
