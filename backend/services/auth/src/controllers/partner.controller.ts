import { Request, Response } from "express";
import redis from "../../../../shared/redis/redis.js"
import User from "../models/user.model.js";

export const getPartner = async (req:Request, res:Response)=>{
    try {
        const sessionId = req.cookies?.session;
        if(!sessionId){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }

        const session = await redis.get(`session:${sessionId}`)
        if(!session){
            return res.status(401).json({
                success:false,
                message:"Session expired"
            })
        }
        const sessionData = JSON.parse(session)

        const userId = sessionData.userId

        if(!userId){
            return res.status(401).json({
                success:false,
                message:"Invalid session"
            })
        }

        // redis Search

        const cachedPartner = await redis.get(`partner:${userId}`)
        if(cachedPartner){
            const partner = JSON.parse(cachedPartner)

            return res.status(200).json({
                success:true,
                data:"Cached",
                partner
            })
        }

        // mongoDb search
        const partner = await User.findById(userId)

        if(!partner){
            return res.status(404).json({
                success:false,
                message:"Partner not found"
            })
        }

        await redis.set(`partner:${userId}`,JSON.stringify(partner),"EX",7*24*60*60)

        return res.status(200).json({
            success:true,
            data:"mongoDb",
            partner
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch partner profile"
        })
    }
}



export const updatePartner = async (req:Request, res:Response)=>{
    try {
        const sessionId = req.cookies?.session;
        if(!sessionId){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }

        const session = await redis.get(`session:${sessionId}`)
        if(!session){
            return res.status(401).json({
                success:false,
                message:"Session expired"
            })
        }
        const sessionData = JSON.parse(session)

        const userId = sessionData.userId

        if(!userId){
            return res.status(401).json({
                success:false,
                message:"Invalid session"
            })
        }

        // Find User 

        const partner = await User.findById(userId)

        if(!partner){
            return res.status(404).json({
                success:false,
                message:"Partner not found"
            })
        }

        const {name,newPartnerProfile,newPaymentDetails} = req.body
        if(name !== undefined){
            partner.name = name.trim()
        }
        if(newPartnerProfile){
            const currentProfile = partner?.partnerProfile;

            const currentSlug = partner?.partnerProfile?.slug?.trim() || "";

            const newSlug = newPartnerProfile?.slug?.trim().toLowerCase();

            if(currentSlug){
                // USer already has a slug
                // Slug cant be changed
                if(newSlug && newSlug!==currentSlug){
                    return res.status(409).json({
                        success:false,
                        filed:"slug",
                        message:"Profile slug cannot be changed once created."
                    })
                }
            } else {
                if(!newSlug){
                    return res.status(400).json({
                        success:false,
                        filed:"slug",
                        message:"Profile slug is required."
                    })
                }
                // Check Unique Slug

                const existingPartner = await User.findOne({
                    "partnerProfile.slug":newSlug,
                    _id:{
                        $ne: partner._id
                    }
                })

                if(existingPartner){
                    return res.status(409).json({
                        success:false,
                        filed:"slug",
                        message:"This profile slug is already taken."
                    })
                }
            }

            const currentSocialLinks = currentProfile.socialLinks

            // Create Complete Profile Object

            partner.partnerProfile = {
                slug:currentSlug || newSlug || "",

                bio:newPartnerProfile?.bio?.trim() ??
                currentProfile.bio ?? "",

                website:newPartnerProfile?.website?.trim() ??
                currentProfile.website ?? "",

                socialLinks:{
                    youtube:newPartnerProfile?.socialLinks?.youtube.trim() ??
                    currentSocialLinks?.youtube ?? "",

                    instagram:newPartnerProfile?.socialLinks?.instagram.trim() ??
                    currentSocialLinks?.instagram ?? "",

                    linkedin:newPartnerProfile?.socialLinks?.linkedin.trim() ??
                    currentSocialLinks?.linkedin ?? "",

                    github:newPartnerProfile?.socialLinks?.github.trim() ??
                    currentSocialLinks?.github ?? "",
                }
            }
        }

        if(newPaymentDetails){
            const currentPayment = partner.paymentDetails;

            partner.paymentDetails = {
                method: newPaymentDetails?.method ??
                currentPayment?.method ?? "upi",

                upiId: newPaymentDetails?.upiId ??
                currentPayment?.upiId ?? "",

                accountHolderName: newPaymentDetails?.accountHolderName ?? currentPayment?.accountHolderName ?? "",

                accountNumber: newPaymentDetails?.accountNumber ?? currentPayment?.accountNumber ?? "",

                ifscCode: newPaymentDetails?.ifscCode ?? currentPayment?.ifscCode ?? ""
            }
        }

        await partner.save()

        const updatedSession = {
            userId:partner._id,
            name:partner.name,
            email:partner.email,
            role:partner.role
        }

        await redis.set(`session:${sessionId}`,
            JSON.stringify(updatedSession),"EX",7*24*60*60
        )

        const updatedPartner = partner.toObject();

        await redis.set(`partner:${partner._id}`,
            JSON.stringify(updatedPartner)
        )

        return res.status(200).json({
            success:true,
            message:"Partner profile updated successfully",
            partner:updatedPartner
        })

    } catch (error:any) {
        if(error?.code===11000){
            return res.status(400).json({
                success:false,
                field:"slug",
                message:"This profile slug is already taken."
            })
        }

        return res.status(500).json({
            success:false,
            message:"Failed to update partner profile"
        })
    }
}


export const getAllPublicPartners = async (req:Request, res:Response)=>{
    try {
        // get from redis
        const cachedPartners = await redis.get("public:partners")
        if(cachedPartners){
            const partners = JSON.parse(cachedPartners)
            return res.status(200).json({
                success:true,
                partners,
                source:"redis"
            })
        }

        // get from mongodb
        const partners = await User.find({
            role:"partner",
            "partnerProfile.slug":{
                $exists:true,
                $ne:""
            }
        })

        await redis.set("public:partners",
            JSON.stringify(partners),"EX",60*10
        )

        return res.status(200).json({
            success:true,
            partners,
            source:"monogDb"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch partners.."
        })
    }
}