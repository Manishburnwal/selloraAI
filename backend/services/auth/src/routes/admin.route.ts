import express from "express"
import { getAdmin } from "../controllers/admin.controller.js"

const adminRouter = express.Router()

adminRouter.get("/",getAdmin)

export default adminRouter