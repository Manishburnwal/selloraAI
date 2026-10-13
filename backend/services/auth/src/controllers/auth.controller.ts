import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";
import redis from "../../../../shared/redis/redis.js"

export const login = async (req:Request, res:Response)=>{
    try {
        const {token} = req.body;
        
        const decoded = await getAuth(app).verifyIdToken(token)

        let user = await User.findOne({firebaseUid:decoded.uid})

        if(!user){
            user = await User.create({
                name:decoded.name || "",
                email:decoded.email || "",
                firebaseUid:decoded.uid
            })
        }

        const sessionId = crypto.randomUUID();

        await redis

    } catch (error) {
        
    }
}