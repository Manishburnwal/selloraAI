import express from "express"
import { getAllPublicPartners, getPartner, updatePartner, updatePartnerSales } from "../controllers/partner.controller.js"

const partnerRouter = express.Router()

partnerRouter.get("/get",getPartner)
partnerRouter.patch("/update",updatePartner)
partnerRouter.get("/all",getAllPublicPartners)
partnerRouter.post("/updateSale",updatePartnerSales)

export default partnerRouter