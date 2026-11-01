import express from "express"
import { createOrder, getAllOrders, getAllPartnerPayments, payPartner, verifyPayment } from "../controllers/order.controller.js"

const orderRouter = express.Router()

orderRouter.post("/create",createOrder)
orderRouter.post("/verify",verifyPayment)
orderRouter.get("/all",getAllOrders)
orderRouter.post("/pay",payPartner)
orderRouter.get("/all-payments",getAllPartnerPayments)

export default orderRouter