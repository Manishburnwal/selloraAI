import express from "express"
import { getPartner, updatePartner } from "../controllers/partner.controller.js"

const partnerRouter = express.Router()

partnerRouter.get("/get",getPartner)
partnerRouter.patch("/update",updatePartner)

export default partnerRouter