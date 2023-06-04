import express from "express"
import authRoutes from "./routes/auth.js"
import aidRoutes from "./routes/aid.js"
import donationRoutes from "./routes/donation.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/server/auth", authRoutes)
app.use("/server/aid", aidRoutes)
app.use("/server/donation", donationRoutes)

app.listen(8800, ()=> {
    console.log("connected")
})