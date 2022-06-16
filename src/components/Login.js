import React, { useContext } from 'react'
import ListContext from '../context/ListContext'

export const Login = (props) => {
  // some basic declares
  const {navigate} = props;

  // contexts 
  const context = useContext(ListContext)
  const { credentials, setcredentials, showAlert, serverHost } = context


  // funcs 
  const onChangeInputs = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${serverHost}/api/user-auth/login-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })
    const json = await response.json()
    if (json.authToken) {
      setcredentials({ email: '', password: '' })
      localStorage.setItem('token', json.authToken)
      showAlert('success', 'Niks7392 says : Welcome to the tasks')
      navigate('/')
    } else {
      showAlert('danger', 'Niks7392 says : Please login with correct details')
    }
    // console.log(json);
  };

  return (
    <div className='container my-3'>
      <h3>Login to Your Account</h3>
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input onChange={onChangeInputs} value={credentials.email} name='email' required type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input minLength={8} required onChange={onChangeInputs} value={credentials.password} name='password' type="password" className="form-control" id="password" />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}
