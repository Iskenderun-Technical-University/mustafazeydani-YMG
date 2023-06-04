import express from "express"
import { addDonation, getBeneficiary, getDonations } from "../controllers/donation.js"

const router = express.Router()

router.post("/", addDonation)
router.get("/", getDonations)
router.get("/beneficiary", getBeneficiary)

export default router