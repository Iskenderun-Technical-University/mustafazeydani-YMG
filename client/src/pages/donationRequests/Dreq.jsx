import React from 'react'
import "./dreq.css"

function Dreq() {
  return (
    <div className="dreq">
      <h2>Donation Requests</h2>
      <div className="dreq-container">
        <div className="dreq-card">
          <p className="dreq-name">Mustafa</p>
          <p className="dreq-email">info@example.com</p>
          <p className="dreq-number">+90 553 844 94 50</p>
          {/* <p className="dreq-description">Hello</p> */}
          <p className="dreq-amount">amout <span>1500$</span></p>
        </div>
      </div>
    </div>
  )
}

export default Dreq