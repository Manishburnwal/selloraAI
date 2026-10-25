import { Request, Response } from "express";
import { razorpay } from "../config/razorpay.js";
import Order from "../models/order.model.js";

export const createOrder = async (req:Request, res:Response)=>{
    try {
        const {productId,partnerId, amount, customerName, customerEmail, partnerEmail, productTitle, links} = req.body

        if(!productId || !partnerId || !amount || !customerName || !customerEmail || !partnerEmail || !productTitle || !links){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const razorpayOrder = await razorpay.orders.create({
            amount: amount*100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        })

        const order = await Order.create({
            productId,
            partnerId,
            productPrice:amount,
            customerName,
            customerEmail,
            partnerEmail,
            productTitle,
            links,
            razorpayOrderId: razorpayOrder.id,

            paymentStatus:"pending",

            partnerAmount:amount*0.95,

            adminAmount:amount*0.05
        })


        return res.status(201).json({
            success:true,
            message:"Order created successfully..",
            orderId:order._id,
            razorpayOrderId:razorpayOrder.id,
            amount,
            key:process.env.RAZORPAY_KEY_ID
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to create order"
        })
    }
}