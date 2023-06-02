import React from 'react'
import "./forms.css"

function Login() {

  return (
    <div className='admin form'>
      <form>
        <h2>Admin Login</h2>
        <input
          name='username'
          type="text" 
          placeholder='username' 
        />
        <input
          name='password'
          on
          type="password" 
          placeholder='password' 
        />
        <p className='error'>Error</p>
        <button className='btn btn-main'>Login</button>
      </form>
    </div>
  )
}

export default Login