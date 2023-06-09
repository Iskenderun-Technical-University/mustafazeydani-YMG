import {db} from "../db.js"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"

export const addAid = (req, res) => {
    const q = "INSERT INTO aid_requests VALUES(?)"

    const values = [
        uuidv4(),
        req.body.name,
        req.body.email,
        req.body.number,
        req.body.title,
        req.body.description,
        req.body.amount,
        req.body.status
    ]

    db.query(q, [values], (err) => {
        if(err) return res.status(500).json(err)
        return res.json("Request has been added!")
    })
}

export const getAid = (req, res)=>{
    const q = "SELECT * FROM aid_requests"

    db.query(q, (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const updateAid = (req, res)=>{
    const token = req.cookies.access_token
    jwt.verify(token, "jwtkey", (err)=>{
        if(err) return res.status(403).json("Token is not valid!")
        const q = "UPDATE aid_requests SET status = ? WHERE uuid = ?"

        db.query(q, [req.body.status, req.body.uuid], (err)=>{
            if(err) return res.status(500).json(err)
            return res.status(200).json("Status has been updated!")
        })
    })
}


