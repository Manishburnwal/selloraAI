import express from "express"
import { getAllPublicPartners, getPartner, togglePartnerStatus, updatePartner, updatePartnerSales } from "../controllers/partner.controller.js"

const partnerRouter = express.Router()

partnerRouter.get("/get",getPartner)
partnerRouter.patch("/update",updatePartner)
partnerRouter.get("/all",getAllPublicPartners)
partnerRouter.post("/update-sale",updatePartnerSales)
partnerRouter.get("/status",togglePartnerStatus)

export default partnerRouter