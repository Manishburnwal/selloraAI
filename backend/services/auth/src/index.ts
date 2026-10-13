import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDb } from "./config/db.js"
import authRouter from "./routes/auth.route.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use(cookieParser())

const PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.json("Hello from SelloraAI Auth-Service")
})

app.use("/",authRouter)

app.listen(PORT,()=>{
    console.log(`Auth-Service Server running on ${PORT}`)
    connectDb()
})