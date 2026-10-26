import { Request, Response } from "express";
import { razorpay } from "../config/razorpay.js";
import Order from "../models/order.model.js";
import { createHmac } from "crypto";
import redis from "../../../../shared/redis/redis.js"

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


export const verifyPayment = async (req:Request, res:Response)=>{
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
            return res.status(400).json({
                success:false,
                message:"Payment details missing"
            })
        }

        const generatedSignature = createHmac("sha256",process.env.RAZORPAY_KEY_SECRET!).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex")

        const order = await Order.findOne({
            razorpayOrderId: razorpay_order_id
        })

        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not found"
            })
        }

        if(generatedSignature!==razorpay_signature){
            order.paymentStatus = "failed"
            await order.save()
            return res.status(400).json({
                success:false,
                message:"Payment Verification failed..."
            })
        }

        order.paymentStatus = "success"

        order.razorpayPaymentId = razorpay_payment_id
        order.razorpaySignature = razorpay_signature

        await order.save()

        return res.status(200).json({
            success:true,
            message:"Payment verified successfully",
            order
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to verify order"
        })
    }
}


export const getAllOrders = async(req:Request, res:Response)=>{
    try {
        // get order from redis

        const cachedOrders = await redis.get("orders:all")
        if(cachedOrders){
            return res.status(200).json({
                success:true,
                source:"redis",
                orders:JSON.parse(cachedOrders)
            })
        }

        // get order from mongodb
        const orders = await Order.find().select(
            "_id productId partnerId productTitle productPrice customerName customerEmail partnerEmail paymentStatus partnerAmount adminAmount createdAt"
        ).sort({createdAt:-1})

        await redis.set("orders:all", JSON.stringify(orders),"EX",600)

        return res.status(200).json({
            success:true,
            source:"database",
            orders
        })
    } catch (error) {
        console.log("Get all orders error:",error)
        return res.status(500).json({
            success:false,
            message:"Failed to fetch orders"
        })
    }
}