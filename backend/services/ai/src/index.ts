import express from "express"
import dotenv from "dotenv"
import aiRouter from "./routes/ai.routes.js"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.json("Hello from SelloraAI AI-Service")
})


app.use("/",aiRouter)

app.listen(PORT,()=>{
    console.log(`Ai-Service Server running on ${PORT}`)
})