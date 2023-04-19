import React from 'react'
import "./main.css"
import {Link} from "react-router-dom"

function Main() {
  return (
    <div className='main'>
        <h1>GiveHope</h1>
        <h2>Together, we can make a difference and provide hope for those in need - donate to our charity today!</h2>
        <div className='buttons'>
          <button className='btn'>Donate</button>
          <button className='btn btn-main'>Request Aid</button>
        </div>
        <p>Check out the <Link className="donation-history" to="">donations history</Link></p>
    </div>
  )
}

export default Main