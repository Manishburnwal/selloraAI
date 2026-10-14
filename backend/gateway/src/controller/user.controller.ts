import { Request, Response } from "express";

export const getCurrentUser = async (req:Request, res:Response)=>{
    try {
        return res.status(200).json({
            success:true,
            user:req.user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"getCurrentUser Error"
        })
    }
}