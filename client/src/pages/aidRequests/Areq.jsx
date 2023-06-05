import React, {useState, useEffect} from 'react'
import "./areq.css"
import axios from 'axios'
import {BsFillClipboardFill, BsCheck2All} from 'react-icons/bs'
import {ImCross} from 'react-icons/im'
import Popup from '../../components/modal/Popup'

function Areq() {

  const [err, setError] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [aidRequests, setAidRequests] = useState([])

  const[showPopup, setShowPopup] = useState(null)
  // Fetching aid requests
  useEffect(() => {
    setFetching(true)
    const fetchData = async () => {
      try {
        const res = await axios.get("/aid")
        setAidRequests(res.data)
      } 
      catch (err) {
        setError("Error fetching aid requests")
      }
      setFetching(false)
    }
    fetchData()
  }, [])

  function handleClick(i) {
    setShowPopup(aidRequests[i])
  }

  function handleClose() {
    setShowPopup(null)
  }

  return (
    <div className="areq">
      <h2>Aid Requests</h2>
      <div className="areq-container">
        {showPopup && <Popup showPopup={showPopup} handleClose={handleClose}/>}
           {fetching ? ("Loading...") : err ? (err) : (
            aidRequests.map((req, i) => (
              <div key={i} className="areq-card">
                <p className="areq-name">{req.name}</p>
                <p className="areq-email">{req.email}</p>
                <p className="areq-number">{req.number}</p>
                <div className="areq-footer">
                  <p className="areq-amount">amount <span>{req.amount} TL</span></p>
                  <button className="areq-icon"><BsFillClipboardFill onClick={() => handleClick(i)}/></button>
                  <button className="areq-icon"><BsCheck2All/></button>
                  <button className="areq-icon"><ImCross/></button>
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