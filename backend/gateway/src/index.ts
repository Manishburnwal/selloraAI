import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import proxy from "express-http-proxy"
import cors from "cors"
import isAuth from "./middleware/isAuth.js"
import { getCurrentUser } from "./controller/user.controller.js"

dotenv.config()

const app = express()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(express.json())

app.use(cookieParser())

app.use(morgan("dev"))

const PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.json("Hello from SelloraAI Gateway")
})

app.get("/api/me",isAuth,getCurrentUser)

app.use("/api/auth",proxy(process.env.AUTH_SERVICE_URL as string))
app.use("/api/product",proxy(process.env.PRODUCT_SERVICE_URL as string))

app.listen(PORT,()=>{
    console.log(`Gateway server running on ${PORT}`)
})