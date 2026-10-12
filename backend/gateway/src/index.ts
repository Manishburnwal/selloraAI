import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import morgan from "morgan"
dotenv.config()

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(morgan("dev"))

const PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.json("Hello from SelloraAI Gateway")
})

app.listen(PORT,()=>{
    console.log(`Gateway server running on ${PORT}`)
})