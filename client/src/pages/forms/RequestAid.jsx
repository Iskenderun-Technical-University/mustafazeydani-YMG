import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./forms.css"
import axios from 'axios'

function RequestAid() {

  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    number:"",
    title:"",
    description:"",
    amount: 0,
    status: "pending"
  })

  const [submitted, setSubmitted] = useState(false)
  
  const [err, setError] = useState(null)
  
  const navigate = useNavigate()
  
  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const validateInput = () => {
    const {name, email, number, title, description, amount} = inputs
    if(!name || !email || !number || !title || !description || !amount) {
      setError("Please fill in all fields")
      return 
    }
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)===false){
      setError("Please enter a valid email address")
      return 
    }
    if (/^\+90\d{10}$/.test(number)===false) {
      setError("Please enter a valid phone number")
      return 
    }
    return true
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if(!validateInput()) {
      return
    } 
    try {
      await axios.post("/aid", inputs)
      setSubmitted(true)
      setTimeout(() => {
        navigate("/")
        setSubmitted(false)
      }, 3000)
    }
    catch(err) {
      setError(err.response.data)
    }
  }

  return (
    <div className='request-aid form'>
      {!submitted ? (
        <form>
          <h2>Request aid</h2>
          <p>Enter your full name</p>
          <input
            name='name'
            onChange={handleChange}
            type="text"
            placeholder='full name'
          />
          <p>Enter your email address</p>
          <input
            name='email'
            onChange={handleChange}
            type="email"
            placeholder='someone@example.com'
          />
          <p>Enter your phone number</p>
          <input
            name="number"
            onChange={handleChange}
            type="tel"
            placeholder='+905555555555'
          />
          <p>Title</p>
          <input
            name="title"
            onChange={handleChange}
            type="text"
            placeholder='title'
          />
          <p>Describe your situation</p>
          <textarea
            name="description"
            onChange={handleChange}
            rows="4"
          >
          </textarea>
          <p>Enter the amount you are seeking</p>
          <input
            name="amount"
            onChange={handleChange}
            type="number"
          />
          {err && <p className="Error">{err}</p>}
          <button onClick={handleSubmit} className='btn btn-main'>Submit</button>
        </form>
      ) : (
        <div className="submitted">
          <h2>Your request has been recieved</h2>
          <p>We will get back to you as soon as possible</p>
        </div>
      )}
    </div>
  )
}

export default RequestAid