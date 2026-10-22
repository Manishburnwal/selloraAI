import express from "express"
import { createProduct, deleteProduct, getAllPartnerProduct, updateProduct } from "../controllers/product.controller.js"

const productRouter = express.Router()

productRouter.post("/create",createProduct)
productRouter.get("/all",getAllPartnerProduct)
productRouter.patch("/:id/update",updateProduct)
productRouter.delete("/:id/delete",deleteProduct);

export default productRouter