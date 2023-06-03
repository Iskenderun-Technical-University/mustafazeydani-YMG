import React, {useState, useContext} from 'react'
import "./forms.css"
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

function Login() {

  const [inputs, setInputs] = useState({
    username:"",
    password:""
  })
  
  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    
    const {username, password} = inputs
    
    if(!username || !password)
      return null

    try {
      await login(inputs)
      navigate("/admin/dashboard")
    }
    catch(err) {
      console.log(err.response.data)
      setError(err.response.data)
    }
  }

  return (
    <div className='admin form'>
      <form>
        <h2>Admin Login</h2>
        <input
          name='username'
          onChange={handleChange}
          type="text" 
          placeholder='username' 
        />
        <input
          name='password'
          onChange={handleChange}
          type="password" 
          placeholder='password' 
        />
        {err && <p className="Error">{err}</p>}
        <button onClick={handleSubmit} className='btn btn-main'>Login</button>
      </form>
    </div>
  )
}

export default Login