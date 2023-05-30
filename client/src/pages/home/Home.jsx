import React from 'react'
import "./home.css"
import { Link } from "react-router-dom"

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="left-panel">
        <h2>Menu</h2>
        <ul className="menu-items">
          <Link className="menu-item">Home</Link>
          <Link className="menu-item">Manage Donation Requests</Link>
          <Link className="menu-item">Manage Aid Requests</Link>
          <Link className="menu-item">Donation History</Link>
        </ul>
      </div>
      <div className="main-panel">
        <h2>Welcome</h2>
        <div className="statistics">
          <div className="container">
              <div className="circular-progress">
                  <span className="progress-value">0%</span>
              </div>
              <span className="text">Donation Requests</span>
          </div>

          <div className="container">
              <div className="circular-progress">
                  <span className="progress-value">0%</span>
              </div>
              <span className="text">Aid Requests</span>
          </div>

          <div className="container">
              <div className="circular-progress">
                  <span className="progress-value">0%</span>
              </div>
              <span className="text">HTML & CSS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard