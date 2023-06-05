import React, {useEffect, useState} from 'react'
import Loader from '../../components/loader/Loader' 
import "./dhis.css"
import axios from 'axios'

function Dhis() {

  const[donations, setDonations] = useState([])
  const[fetching, setFetching] = useState(false)
  const[error, setError] = useState(null)

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
    <div className="admin-dhis">
      <h2>Donation History</h2>
      {fetching ? <Loader /> : error ? <p className="error">{error}</p>:
        <table>
        <thead>
          <tr>
            <th>Donator's Name</th>
            <th>Donater's Email</th>
            <th>Donater's Number</th>
            <th>Beneficiary's Name</th>
            <th>Donation Amount</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => {
            const {
              uuid,
              name,
              email,
              number,
              beneficiary_name,
              amount
            } = donation;
            return (
              <tr
                key={uuid}
              >
                <td>{name}</td>
                <td className="donation-email">
                    <a href={`mailto:${email}`}>{email}</a>
                </td>
                <td>
                    <p>{number}</p>
                </td>
                <td>{beneficiary_name}</td>
                <td>
                    <p>{amount} TL</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>}
    </div>
  )
}

export default Dhis