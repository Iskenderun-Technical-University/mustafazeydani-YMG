import React, {useState, useEffect} from 'react'
import "./areq.css"
import axios from 'axios'

function Areq() {

  const [err, setError] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [aidRequests, setAidRequests] = useState([])

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

  return (
    <div className="areq">
      <h2>Aid Requests</h2>
      <div className="areq-container">
        {
          fetching ? ("Loading...") : err ? (err) : (
            aidRequests.map((req, i) => (
              <div key={i} className="areq-card">
                <p className="areq-name">{req.name}</p>
                <p className="areq-email">{req.email}</p>
                <p className="areq-number">{req.number}</p>
                <p className="areq-amount">amount <span>{req.amount} TL</span></p>
              </div>
            ))
          )      
        }
      </div>
    </div>
  )
}

export default Areq