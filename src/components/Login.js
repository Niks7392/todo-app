import React, { useContext } from 'react'
import ListContext from '../context/ListContext'

export const Login = () => {
  const context = useContext(ListContext)
  const { handleLoginSubmit, onChangeInputs, credentials } = context


  return (
    <div className='container my-3'>
      <h3>Login to Your Account</h3>
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input onChange={onChangeInputs} value={credentials.email} name='email' required  type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={onChangeInputs} value={credentials.password} name='password' type="password" className="form-control" id="password" />
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
