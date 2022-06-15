import React, { useContext } from 'react'
import { useState } from 'react'
import ListContext from '../context/ListContext'

export const SignUp = () => {
  // contexts 
  const context = useContext(ListContext)
  const {serverHost} = context;
  // states 
  const [credentials, setcredentials] = useState({ name: '', email: '', password: '' })

  // funcs 
  const handleSignUpSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${serverHost}/api/user-auth/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      })
    })
    const json = await response.json()
    if(json.authToken){
      setcredentials({ name: '', email: '', password: '' })
      localStorage.setItem('token', json.authToken)
    }
    console.log(json);
  }
  const onChangeInputs = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container my-3'>
      <h3>Sign up and create  Your Account</h3>
      <form onSubmit={handleSignUpSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter your Name</label>
          <input minLength={3} onChange={onChangeInputs} value={credentials.name} name='name' required type="text" className="form-control" id="signUpname" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input onChange={onChangeInputs} value={credentials.email} name='email' required type="email" className="form-control" id="signUpemail" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={onChangeInputs} value={credentials.password} name='password' type="password" className="form-control" id="signUppassword" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
