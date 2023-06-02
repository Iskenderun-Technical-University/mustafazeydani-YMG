import React from 'react'
import "./home.css"

function Dashboard() {
  return (
    <div className="dashboard">
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