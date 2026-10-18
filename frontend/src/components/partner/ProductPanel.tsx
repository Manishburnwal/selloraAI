import { useState } from "react";
import CreateProductForm from "../product/CreateProductForm";
import ProductList from "../product/ProductList";
import EditProductForm from "../product/EditProductForm";

type view = 
| "list"
| "create"
| "edit";

function ProductPanel() {
    const [view,setView] = useState<view>("list")
  return (
    <div className="min-h-screen bg-slate-50">
        {view==="create" && (
            <CreateProductForm/>
        )}

        {view==="list" && (
            <ProductList/>
        )}

        {view==="create" && (
            <EditProductForm/>
        )}
    </div>
  )
}

export default ProductPanel
