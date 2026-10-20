import express from "express"
import { createProduct, deleteProduct, getAllPartnerProduct, updateProduct } from "../controllers/product.controller.js"

const productRouter = express.Router()

productRouter.post("/create",createProduct)
productRouter.get("/all",getAllPartnerProduct)
productRouter.patch("/update",updateProduct)
productRouter.delete("/delete",deleteProduct);

export default productRouter