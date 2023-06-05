import express from "express"
import { addAid, getAid, updateAid } from "../controllers/aid.js"

const router = express.Router()

router.post("/", addAid)
router.get("/", getAid)
router.put("/", updateAid)

export default router