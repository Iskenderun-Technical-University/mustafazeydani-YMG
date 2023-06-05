import React, {useState, useEffect} from 'react'
import "./dreq.css"
import axios from 'axios'
import Loader from '../../components/loader/Loader'

function Dreq() {

  const [err, setError] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [donations, setDonations] = useState([])

  // Fetching donations
  useEffect(() => {
    setFetching(true)
    const fetchData = async () => {
      try {
        const res = await axios.get("/donation")
        setDonations(res.data)
      } 
      catch (err) {
        setError("Error fetching donations")
      }
      setFetching(false)
    }
    fetchData()
  }, [])

  return (
    <div className="dreq">
      <h2>Donations</h2>
      <div className="dreq-container">
        {
          fetching ? <Loader /> : err ? (err) : (
            donations.map((req, i) => (
              <div key={i} className="dreq-card">
                <p className="dreq-name">{req.name}</p>
                <p className="dreq-email">{req.email}</p>
                <p className="dreq-number">{req.number}</p>
                <p className="dreq-beneficiary">Beneficiary : {req.beneficiary_name}</p>
                <p className="dreq-amount">amount <span>{req.amount} TL</span></p>
              </div>
            ))
          )      
        }
      </div>
    </div>
  )
}

export default Dreq