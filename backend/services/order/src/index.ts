import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import orderRouter from "./routes/order.route.js"

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.json("Hello from SelloraAI Order-Service")
})

app.use("/",orderRouter)

app.listen(PORT,()=>{
    console.log(`Order-Service Server running on ${PORT}`)
    connectDb()
})