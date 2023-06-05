import React, {useState, useEffect} from 'react'
import Loader from "../../components/loader/Loader"
import "./dhis.css"
import axios from "axios"

function DonationHistory() {
    const [donations, setDonations] = useState([])
    const [aidRequests, setAidRequests] = useState([])
    const[fetching, setFetching] = useState(false)
    const[error, setError] = useState(null)
  
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
  
    function donatedAidPercentage() {
      if(totalAidRequestAmount() === 0) return 0
      return (totalDonations()/totalAidRequestAmount()*100)
    }
  
    function numberOfBeneficiaries() {
      // count the number of donations that have different beneficiary_uuid
      let beneficiaries = []
      donations.forEach(donation => {
        if(!beneficiaries.includes(donation.beneficiary_uuid))
          beneficiaries.push(donation.beneficiary_uuid)
      }
      )
      return beneficiaries.length
    }

    function encryptName(namesString) {
      const names = namesString.split(' ')
      const encryptedNames = [];
      names.forEach(function(name) {
        let encryptedName = name.substring(0, 3)
        for (let i = 3; i < name.length; i++) {
          encryptedName += '*'
        }
        encryptedNames.push(encryptedName);
      })
      return encryptedNames.join(' ');
    }
    
  
    return (
      <div className="public-dhis">
        <h2>Donation History</h2>
        {fetching ? <Loader /> :
        error ? <p className="error">{error}</p>:
        <div className="public-dhis-container">
          <div className="statistics">
            <div className="container">
              <span className="text">{totalDonations() + "TL / " + totalAidRequestAmount() + "TL"}</span>
              <div className="circular-progress" style={{ background: `conic-gradient(var(--color-darkgrey) ${donatedAidPercentage() * 3.6}deg, #ededed 0deg)` }}>
                <span className="progress-value">{donatedAidPercentage().toFixed(2) + "%"}</span>
              </div>
              <span className="text">Total Aid <br/>Donated / Requested</span>
            </div>

            <div className="container">
              <div className="beneficiaries-number">
                <p>{numberOfBeneficiaries()}</p>
              </div>
              <span className="text">Number of beneficiaries</span>
            </div>
          </div>
          <div className="donations-table">
            <table>
              <thead>
                <tr>
                  <th>Donator's Name</th>
                  <th>Beneficiary's Name</th>
                  <th>Donation Amount</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => {
                  const {
                    uuid,
                    name,
                    beneficiary_name,
                    amount
                  } = donation;
                  return (
                    <tr
                      key={uuid}
                    >
                      <td>{name}</td>
                      <td>{encryptName(beneficiary_name)}</td>
                      <td>
                          <p>{amount} TL</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>}
      </div>
  )
}

export default DonationHistory