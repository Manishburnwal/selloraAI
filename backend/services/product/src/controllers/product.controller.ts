import { Request, Response } from "express";
import Product from "../models/product.model.js";
import redis from "../../../../shared/redis/redis.js"

export const createProduct = async(req:Request, res:Response)=>{
    try {
        const partnerId = req.headers["x-user-id"] as string
        if(!partnerId){
           return res.status(401).json({
                success:false,
                message:"Unauthorized"
           }) 
        }

        const {title,slug,description,type,price,links,status} = req.body

        if(!slug || !slug.trim()){
            return res.status(400).json({
                success:false,
                message:"Product slug is required"
           }) 
        }

        const clearSlug = slug.trim().toLowerCase()

        const existingProduct = await Product.findOne({
            slug:clearSlug
        })

        if(existingProduct){
            return res.status(409).json({
                success:false,
                field:"slug",
                message:"This product slug is already taken."
           }) 
        }

        const product = await Product.create({
            partnerId,
            title:title?.trim(),
            slug:clearSlug,
            description:description?.trim(),
            type,
            price,
            links,
            status:status || "draft"
        })

        return res.status(201).json({
            success:true,
            message:"Product created successfully",
            product
       }) 
    } catch (error:any) {
        if(error?.code === 11000){
            return res.status(409).json({
                success:false,
                field:"slug",
                message:"This product slug is already taken."
           }) 
        }

        return res.status(500).json({
            success:false,
            message:"Create product failed."
        }) 
    }
}


export const getAllPartnerProduct = async(req:Request, res:Response)=>{
    try {
        const partnerId = req.headers["x-user-id"] as string
        if(!partnerId){
            return res.status(401).json({
                 success:false,
                 message:"Unauthorized"
            }) 
        }

        // redis

        const cachedProducts = await redis.get(`products:${partnerId}`);
        if(cachedProducts){
            return res.status(200).json({
                success:true,
                source:"redis",
                products:JSON.parse(cachedProducts)
            })
        }

        // mongodb
        const products = await Product.find({
            partnerId:partnerId
        }).sort({createdAt: -1})

        await redis.set(`products:${partnerId}`,
            JSON.stringify(products), "EX", 60*10
        )

        return res.status(200).json({
            success:true,
            source:"mongodb",
            products
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to get partner's Products.."
        }) 
    }
}