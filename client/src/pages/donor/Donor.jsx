import React from 'react'
import "./donor.css"

function Donor() {
    return (
    <div className='donor'>
        <form>
            <h2>Donation</h2>
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
            <p>Choose a beneficiary</p>
            <select name="">
                <option value="">Choose an option</option>
            </select>
            <p>Enter an amount</p>
            <input
                name="amount" 
                type="number" 
            />
            <button className='btn btn-main'>Donate</button>
        </form>
    </div>
    
  )
}

export default Donor