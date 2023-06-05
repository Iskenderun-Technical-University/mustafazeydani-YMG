import React, { useState, useEffect } from 'react'
import "./home.css"
import axios from 'axios'

function Dashboard() {
  const [donations, setDonations] = useState([])
  const [aidRequests, setAidRequests] = useState([])
  const [error, setError] = useState(null)

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
        setError("Error fetching requests")
      }
    }
  
    fetchData()
  }, [])

  function totalDonations() {
    let total = 0
    donations.forEach(donation => {
      total += donation.amount
    })
    return total
  }

  function totalAidRequests() {
    let total = 0
    aidRequests.forEach(aidRequest => {
      if(aidRequest.status === "accepted")
        total += aidRequest.amount
    })
    return total
  } 

  function donatedAidPercentage() {
    return (totalDonations()/totalAidRequests()*100).toFixed(2)
  }

  return (
    <div className="dashboard">
      <div className="main-panel">
        <h2>Welcome</h2>
        <div className="statistics">
          <div className="container">
            <div className="circular-progress" style={{ background: `conic-gradient(#7d2ae8 ${donatedAidPercentage() * 3.6}deg, #ededed 0deg)` }}>
              <span className="progress-value">{donatedAidPercentage() + "%"}</span>
            </div>
            <span className="text">Total aid <br/>donated / requested <br/>{totalDonations() + "TL / " + totalAidRequests() + "TL"}</span>

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