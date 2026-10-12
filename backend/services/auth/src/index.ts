import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()

app.use(express.json())

app.use(cookieParser())

const PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.json("Hello from SelloraAI Auth-Service")
})

app.listen(PORT,()=>{
    console.log(`Auth-Service Server running on ${PORT}`)
})