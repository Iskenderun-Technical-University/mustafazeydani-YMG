import express from "express"
import { addAid, getAid } from "../controllers/aid.js"

const router = express.Router()

router.post("/", addAid)
router.get("/", getAid)

export default router