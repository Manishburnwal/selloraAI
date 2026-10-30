import { Request, Response } from "express";
import { AnalyticsData } from "../types/ai.types.js";
import redis from "../../../../shared/redis/redis.js"
import { aiAgent } from "../agent/ai.agent.js";

const CACHE_TTL = 60*10;

export const getAIAnalytics = async (req:Request, res:Response)=>{
    try {
        const PartnerId = req.headers["x-user-id"]
        if(!PartnerId){
            return res.status(401).json({
                success:false,
                message:"UserID header is required",
            });
        }

        const analyticsData = req.body as AnalyticsData

        const cachedData = await redis.get(`ai:${PartnerId}`)

        if(cachedData){
            const data = JSON.parse(cachedData)

            const expiresIn = await redis.ttl(`ai:${PartnerId}`)

            return res.status(200).json({
                success:true,
                cached:true,
                expiresIn,
                data
            })
        }

        const aiResponse = await aiAgent(analyticsData)

        const productPerformance = analyticsData.products.map((product)=>({
            productId:product.id,
            product:product.title,
            sales:product.totalSales,
            revenue:product.totalRevenue
        }))


        const salesMap : Record<string,number>={}

        analyticsData.orders.forEach((order) => {
            const date = new Date(order.createdAt)
                .toISOString()
                .split("T")[0];
        
            salesMap[date] = (salesMap[date] || 0) + 1;
        });
        
        const salesTrend = Object.entries(salesMap).map(
            ([date, sales]) => ({
                date,
                sales,
            })
        );

        const result = {
            summary: analyticsData.summary,
            charts:{
                productPerformance,
                salesTrend,
            },
            aiResponse
        }

        await redis.set(`ai:${PartnerId}`,JSON.stringify(result),"EX",CACHE_TTL)

        return res.status(200).json({
            success:true,
            cached:false,
            expiresIn:CACHE_TTL,
            data:result
        })


    } catch (error) {
        console.error("AI Analytics Error:",error)
        return res.status(500).json({
            success:false,
            message:"Failed to generate AI analytics",
        })
    }
}