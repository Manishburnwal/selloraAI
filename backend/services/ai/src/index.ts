import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.json("Hello from SelloraAI AI-Service")
})

app.listen(PORT,()=>{
    console.log(`Ai-Service Server running on ${PORT}`)
})