import React from 'react'
import "./panel.css"
import { Link } from 'react-router-dom'

function Panel() {
  return (
    <div className="panel">
        <h2>Menu</h2>
        <div className="menu-items">
            <Link to="/admin/dashboard" className="menu-item">Home</Link>
            <Link to="/admin/donation-requests" className="menu-item">Manage Donation Requests</Link>
            <Link to="/admin/aid-requests" className="menu-item">Manage Aid Requests</Link>
            <Link to="/admin/donation-history" className="menu-item">Donation History</Link>
        </div>
    </div>
  )
}

export default Panel