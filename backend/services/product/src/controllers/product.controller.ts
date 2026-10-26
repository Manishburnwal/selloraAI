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


        await redis.del(`products:${partnerId}`)

        if(product.status==="published"){
            await redis.del("public:products")
        }


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


export const updateProduct = async (req:Request, res:Response)=>{
    try {
        const partnerId = req.headers["x-user-id"] as string
        
        const product = await Product.findOne({
            _id:req.params.id,
            partnerId:partnerId
        })
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            }) 
        }
        const {title, description, type, price, status, links} = req.body;

        product.title = title ?? product.title;
        product.description = description ?? product.description;
        product.type = type ?? product.type;
        product.price = price ?? product.price;
        product.links = links ?? product.links;
        product.status = status ?? product.status;

        await product.save()

        await redis.del(`products:${partnerId}`)

        if(product.status==="published"){
            await redis.del("public:products")
        }

        return res.status(200).json({
            success:true,
            message:"Product updated",
            product
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to update product"
        })
    }
}


export const deleteProduct = async (req:Request, res:Response)=>{
    try {
        const partnerId = req.headers["x-user-id"] as string
        
        const product = await Product.findOneAndDelete({
            _id:req.params.id,
            partnerId:partnerId
        })

        await redis.del(`products:${partnerId}`)

        await redis.del("public:products")

        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            }) 
        }

        return res.status(200).json({
            success:true,
            message:"Product deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to delete product"
        })
    }
}



export const getAllPublicProducts = async(req:Request, res:Response)=>{
    try {
        // redis
        const cachedProducts = await redis.get("public:products")
        if(cachedProducts){
            const products = JSON.parse(cachedProducts)
            return res.status(200).json({
                success:true,
                products,
                source:"redis"
            })
        }



        // mongodb
        const products = await Product.find({
            status:"published"
        }).sort({createdAt:-1})

        await redis.set("public:products",JSON.stringify(products),"EX",60*10)

        return res.status(200).json({
            success:true,
            products,
            source:"mongoDb"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch products."
        })
    }
}



export const updateProductSales = async (req:Request, res:Response)=>{
    try {
        const {productId, amount} = req.body;
        if(!productId || !amount){
            return res.status(400).json({
                success:false,
                message:"Product id and amount required."
            })
        }

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        const partnerRevenue = amount*0.95;
        product.totalSales += 1;
        product.totalRevenue += partnerRevenue;
        await product.save();

        await redis.del(`products:${product.partnerId}`)

        await redis.del("public:products")

        return res.status(200).json({
            success:true,
            message:"Product sales updated",
            product
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to update product sales."
        })
    }
}