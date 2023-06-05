import React, {useState, useEffect} from 'react'
import "./areq.css"
import axios from 'axios'
import {BsFillClipboardFill, BsCheck2All} from 'react-icons/bs'
import {ImCross} from 'react-icons/im'
import Popup from '../../components/modal/Popup'
import Loader from '../../components/loader/Loader'

function Areq() {

  const [err, setError] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [aidRequests, setAidRequests] = useState([])
  const [donations, setDonations] = useState([])
  const[showPopup, setShowPopup] = useState(null)

  // Fetching aid requests
  useEffect(() => {
    setFetching(true)
    const fetchData = async () => {
      try {
        const [donationRes, aidRes] = await Promise.all([
          axios.get("/donation"),
          axios.get("/aid")
        ])
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

  async function handleClick(e,i) {
    if(e.target.closest("button").dataset.id === "description") {
      setShowPopup(aidRequests[i])
    }
    else if(e.target.closest("button").dataset.id === "accept") {
      try {
        await axios.put(`/aid`, {status: "accepted", uuid: aidRequests[i].uuid})
        setAidRequests(prevState => { 
          const newAidRequests = [...prevState]
          newAidRequests[i].status = "accepted"
          return newAidRequests
        })
      }
      catch (err) {
        setError("Error accepting aid request")
      }
    }
    else if(e.target.closest("button").dataset.id === "reject") {
      try {
        await axios.put(`/aid`, {status: "rejected", uuid: aidRequests[i].uuid})
        setAidRequests(prevState => {
          const newAidRequests = [...prevState]
          newAidRequests[i].status = "rejected"
          return newAidRequests
        })
      }
      catch (err) {
        setError("Error rejecting aid request")
      }
    }
  }

  function handleClose() {
    setShowPopup(null)
  }

  function totalDonations(i) {
    let total = 0
    donations.forEach(donation => {
      if(donation.beneficiary_uuid === aidRequests[i].uuid) {
        total += donation.amount
      }
        
    })
    return total
  }

  return (
    <div className="areq">
      <h2>Aid Requests</h2>
      <div className="areq-container">
        {showPopup && <Popup showPopup={showPopup} handleClose={handleClose}/>}
           {fetching ? <Loader/> : err ? (err) : (
            aidRequests.map((req, i) => (
              <div className={`areq-card ${req.status}`} key={i}>
                <p className="areq-name">{req.name}</p>
                <p className="areq-email">{req.email}</p>
                <p className="areq-number">{req.number}</p>
                <div className="areq-footer">
                  <div className="areq-donations">
                    <p className="areq-amount">requested aid <span>{req.amount} TL</span></p>
                    {req.status==="accepted" && <p className="areq-amount">recieved aid <span>{totalDonations(i)} TL</span></p>}
                  </div>
                  <button className="areq-icon" data-id="description"><BsFillClipboardFill onClick={(e) => handleClick(e,i)}/></button>
                  {req.status === "pending" && 
                    <>
                      <button className="areq-icon" data-id="accept"><BsCheck2All onClick={(e) => handleClick(e,i)}/></button>
                      <button className="areq-icon" data-id="reject"><ImCross onClick={(e) => handleClick(e,i)}/></button>
                    </>
                  }
                </div>
              </div>
            ))
          )      
        }
      </div>
    </div>
  )
}

export default Areq