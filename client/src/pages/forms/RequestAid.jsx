import React from 'react'
import "../forms.css"

function RequestAid() {
  return (
    <div className='request-aid form'>
      <form>
            <h2>Request aid</h2>
            <p>Enter your full name</p>
            <input
                name='name'
                type="text" 
                placeholder='full name' 
            />
            <p>Enter your email address</p>
            <input
                name='email'
                type="email" 
                placeholder='someone@example.com' 
            />
            <p>Enter your phone number</p>
            <input
                name="number" 
                type="tel" 
                placeholder='+905555555555'
            />
            <p>Describe your situation</p>
            <textarea name="description" rows="4"></textarea>
            <p>Enter the amount you are seeking</p>
            <input
                name="amount" 
                type="number" 
            />
            <p className='error'>Error</p>
            <button className='btn btn-main'>Submit</button>
        </form>
    </div>
  )
}

export default RequestAid