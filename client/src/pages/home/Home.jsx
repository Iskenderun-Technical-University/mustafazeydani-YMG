import React, { useState, useEffect } from 'react'
import "./home.css"
import axios from 'axios'
import Loader from '../../components/loader/Loader'

function Dashboard() {
  const [donations, setDonations] = useState([])
  const [aidRequests, setAidRequests] = useState([])
  const [error, setError] = useState(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    setFetching(true)
    const fetchData = async () => {
      try {
        const [donationRes, aidRes] = await Promise.all([
          axios.get("/donation"),
          axios.get("/aid")
        ]);
        setAidRequests(aidRes.data)
        setDonations(donationRes.data)
        setFetching(false)
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

  function totalAidRequestAmount() {
    let total = 0
    aidRequests.forEach(aidRequest => {
      if(aidRequest.status === "accepted")
        total += aidRequest.amount
    })
    return total
  }

  function totalProcessedAidRequests() {
    return aidRequests.filter(aidRequest => { 
      return aidRequest.status !== "pending"
    }).length
  }

  function donatedAidPercentage() {
    return (totalDonations()/totalAidRequestAmount()*100).toFixed(2)
  }

  function processedAidPercentage() {
    return (totalProcessedAidRequests()/aidRequests.length*100).toFixed(2)
  }

  function numberOfBeneficiaries() {
    // count the number of donations that have different beneficiary_uuid
    console.log(donations.length)
    if(donations.length > 1) {
      let count=0
      for(let i=0;i<donations.length;i++){
        for(let j=i+1;j<donations.length;j++){
          if(donations[i].beneficiary_uuid !== donations[j].beneficiary_uuid)
            count++
        }
      return count
      }
    }
    else return donations.length
  }

  return (
    <div className="dashboard">
      <div className="main-panel">
        <h2>Welcome</h2>
        {fetching ? <Loader/> :
        error ? <p className="error">{error}</p>:
        <div className="statistics">
          <div className="container">
            <span className="text">{totalProcessedAidRequests() + " / " + aidRequests.length}</span>
            <div className="circular-progress" style={{ background: `conic-gradient(var(--color-variant) ${processedAidPercentage() * 3.6}deg, #ededed 0deg)` }}>
              <span className="progress-value">{processedAidPercentage() + "%"}</span>
            </div>
            <span className="text">Total Aid Requests <br/>Procecced / Total</span>
          </div>

          <div className="container">
            <span className="text">{totalDonations() + "TL / " + totalAidRequestAmount() + "TL"}</span>
            <div className="circular-progress" style={{ background: `conic-gradient(var(--color-variant) ${donatedAidPercentage() * 3.6}deg, #ededed 0deg)` }}>
              <span className="progress-value">{donatedAidPercentage() + "%"}</span>
            </div>
            <span className="text">Total Aid <br/>Donated / Requested</span>
          </div>

          <div className="container">
            <div className="beneficiaries-number">
              <p>{numberOfBeneficiaries() + 1}</p>
            </div>
            <span className="text">Number of beneficiaries</span>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Dashboard