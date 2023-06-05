import {db} from "../db.js"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"

export const addDonation = (req, res) => {
    const q = "INSERT INTO donations VALUES(?)"

    const values = [
        uuidv4(),
        req.body.name,
        req.body.email,
        req.body.number,
        req.body.beneficiary_uuid,
        req.body.beneficiary_name,
        req.body.amount
    ]

    db.query(q, [values], (err) => {
        if(err) return res.status(500).json(err)
        return res.json("Donation has been added!")
    })
}

export const getDonations = (req, res)=>{
    const token = req.cookies.access_token
    jwt.verify(token, "jwtkey", (err)=>{
        if(err) return res.status(403).json("Token is not valid!")
        const q = "SELECT * FROM donations"

        db.query(q, (err, data)=>{
            if(err) return res.send(err)
            return res.status(200).json(data)
        })
    })
}

export const getBeneficiary = (req, res)=>{
    const q = "SELECT * FROM aid_requests WHERE status = 'accepted'"

    db.query(q, (err, data)=>{
        if(err) return res.send(err)
        return res.status(200).json(data)
    })
}