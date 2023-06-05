import React, { useState, useEffect } from 'react'
import "./home.css"
import axios from 'axios'

function Dashboard() {
  const [donations, setDonations] = useState([])
  const [aidRequests, setAidRequests] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donationRes, aidRes] = await Promise.all([
          axios.get("/donation"),
          axios.get("/aid")
        ]);
  
        setAidRequests(aidRes.data)
        setDonations(donationRes.data)
      } 
      catch (err) {
        console.error("Error fetching tasks:", err)
      }
    }
  
    fetchData()
  }, [])

  return (
    <div className="dashboard">
      <div className="main-panel">
        <h2>Welcome</h2>
        <div className="statistics">
          <div className="container">
            <div className="circular-progress" style={{ background: `conic-gradient(#7d2ae8 ${donations.length * 3.6}deg, #ededed 0deg)` }}>
              <span className="progress-value">{`${donations.length}%`}</span>
            </div>
            <span className="text">Donation Requests</span>
          </div>

          <div className="container">
            <div className="circular-progress" style={{ background: `conic-gradient(#7d2ae8 ${aidRequests.length * 3.6}deg, #ededed 0deg)` }}>
              <span className="progress-value">{`${aidRequests.length}%`}</span>
            </div>
            <span className="text">Aid Requests</span>
          </div>

          <div className="container">
            <div className="circular-progress" style={{ background: 'conic-gradient(#7d2ae8 0deg, #ededed 0deg)' }}>
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