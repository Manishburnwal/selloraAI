import express from "express"
import { getAllPublicPartners, getPartner, updatePartner } from "../controllers/partner.controller.js"

const partnerRouter = express.Router()

partnerRouter.get("/get",getPartner)
partnerRouter.patch("/update",updatePartner)
partnerRouter.get("/all",getAllPublicPartners)

export default partnerRouter