import express from "express"
import { createOrder, getAllOrders, verifyPayment } from "../controllers/order.controller.js"

const orderRouter = express.Router()

orderRouter.post("/create",createOrder)
orderRouter.post("/verify",verifyPayment)
orderRouter.get("/all",getAllOrders)

export default orderRouter