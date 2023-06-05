import React, {useContext} from 'react'
import "./panel.css"
import { Link } from 'react-router-dom'
import {GrLogout} from "react-icons/gr"
import { AuthContext } from '../../context/AuthContext'

function Panel() {
  const { logout } = useContext(AuthContext)
  return (
    <div className="panel">
        <div className="menu-items">
            <h2>Menu</h2>
            <Link to="/admin/dashboard" className="menu-item">Home</Link>
            <Link to="/admin/aid-requests" className="menu-item">Manage Aid Requests</Link>
            <Link to="/admin/donation-requests" className="menu-item">Donations</Link>
            <Link to="/admin/donation-history" className="menu-item">Donation History</Link>
            <Link onClick={logout} to="/admin" className="logout"><GrLogout/></Link>
        </div>
    </div>
  )
}

export default Panel