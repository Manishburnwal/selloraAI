import express from "express"
import { createProduct, deleteProduct, getAllPartnerProduct, getAllPublicProducts, handleDownload, updateProduct, updateProductSales } from "../controllers/product.controller.js"

const productRouter = express.Router()

productRouter.post("/create",createProduct)
productRouter.get("/all",getAllPartnerProduct)
productRouter.patch("/:id/update",updateProduct)
productRouter.delete("/:id/delete",deleteProduct);
productRouter.get("/all-public",getAllPublicProducts)
productRouter.post("/update-sale",updateProductSales)
productRouter.post("/download",handleDownload)

export default productRouter