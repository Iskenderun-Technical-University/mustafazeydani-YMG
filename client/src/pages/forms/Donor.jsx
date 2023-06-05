import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "./forms.css"
import axios from 'axios'

function Donor() {

    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        number:"",
        beneficiary_name:"",
        amount: 0
    })

    const [submitted, setSubmitted] = useState(false)

    const [fetching, setFetching] = useState(false)

    const [donations, setDonations] = useState([])
    
    const [beneficiaries, setBeneficiaries] = useState([])

    const [err, setError] = useState(null)
    
    const navigate = useNavigate()
    
    const handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    useEffect(() => {
      setFetching(true)
      const fetchData = async () => {
        try {
          const [donationRes, beneficiaryRes] = await Promise.all([
            axios.get("/donation"),
            axios.get("/donation/beneficiary")
          ])
          setDonations(donationRes.data)
          setBeneficiaries(beneficiaryRes.data)
          setFetching(false)
        } 
        catch (err) {
          setError("Error fetching requests")
        }
      }
      fetchData()
    }, [])

    const validateInput = () => {
        const {name, email, number, beneficiary_name, amount} = inputs
        if(!name || !email || !number || !beneficiary_name || !amount) {
          setError("Please fill in all fields")
          return 
        }
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)===false){
          setError("Please enter a valid email address")
          return 
        }
        if (/^\+90\d{10}$/.test(number)===false) {
          setError("Please enter a valid phone number")
          return 
        }
        return true
      }

    const handleSubmit = async e => {
        e.preventDefault()
        if(!validateInput()) 
          return
        try {
          const beneficiary = beneficiaries.find(b => b.name === inputs.beneficiary_name);
          const inputsWithUUID = {
            ...inputs,
            beneficiary_uuid: beneficiary.uuid
          };
          await axios.post("/donation", inputsWithUUID)
          console.log("Donation successful")
          setSubmitted(true)
          setTimeout(() => {
            navigate("/")
            setSubmitted(false)
          }, 3000)
        }
        catch(err) {
          setError(err.response.data)
        }
    }

    function leftToDonate(beneficiary) {
      const totalDonations = donations.reduce((acc, donation) => {
        if (donation.beneficiary_uuid === beneficiary.uuid) {
          return acc + donation.amount;
        }
        return acc;
      }, 0);
      return beneficiary.amount - totalDonations;
    }

    return (
      <div className='donor form'>
        {submitted? (<p className="success">Thank you for your donation!</p>) : (
          <form>
          <h2>Donation</h2>
          <p>Enter your full name</p>
          <input
            name='name'
            onChange={handleChange}
            type="text" 
            placeholder='full name' 
          />
          <p>Enter your email address</p>
          <input
            name='email'
            onChange={handleChange}
            type="email" 
            placeholder='someone@example.com' 
          />
          <p>Enter your phone number</p>
          <input
            name="number" 
            onChange={handleChange}
            type="tel" 
            placeholder='+905555555555'
          />
          <p>Choose a beneficiary</p>
          <select name="beneficiary_name" onChange={handleChange}>
            <option value="" key="default">Choose an option</option>
            {beneficiaries.map((beneficiary) => (
                <option value={beneficiary.name} key={beneficiary.uuid}>
                    {beneficiary.title + " - " + leftToDonate(beneficiary) + " TL Remaining"}
                </option>
            ))}
          </select>
          <p>Enter an amount</p>
          <input
            name="amount" 
            onChange={handleChange}
            type="number"
            min={0}
            max={inputs.beneficiary_name ? leftToDonate(beneficiaries.find((beneficiary)=>beneficiary.name === inputs.beneficiary_name)) : 0}
          />
          {err && <p className="Error">{err}</p>}
          <button onClick={handleSubmit} className='btn btn-main'>Donate</button>
        </form>
        )}
      </div>
    )
}

export default Donor