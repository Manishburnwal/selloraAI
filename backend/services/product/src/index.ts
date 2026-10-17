import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import productRouter from "./routes/product.route.js"

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.json("Hello from SelloraAI Product-Service")
})

app.use("/",productRouter)

app.listen(PORT,()=>{
    console.log(`Product-Service Server running on ${PORT}`)
    connectDb()
})