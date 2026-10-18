import { useState } from "react";
import CreateProductForm from "../product/CreateProductForm";
import ProductList from "../product/ProductList";
import EditProductForm from "../product/EditProductForm";
import type { Product } from "../product/types";
import api from "@/utils/axios";
import { toast } from "sonner";

type view = 
| "list"
| "create"
| "edit";

function ProductPanel() {
    const [view,setView] = useState<view>("list")
    const [creating,setCreating] = useState(false)

    const gotoList = ()=>{
        setView("list")
    }


    const handleCreate = async (product:Product)=>{
        try {
            setCreating(true)
            const response = await api.post("/api/product/create",product)

            console.log(response.data)
            toast.success("Product Created")
        } catch (error) {
            console.log(error)
            toast.error("failed to create product")
        }
    }

    const handleEditProduct = async (product:Product)=>{
        alert("edit")
    }

    const handleDelete = async (product:Product)=>{
        alert("delete")
    }

  return (
    <div className="min-h-screen bg-slate-50">
        {view==="create" && (
            <CreateProductForm
            onCreate={handleCreate}
            onCancel={gotoList}
            loading={creating}
            />
        )}

        {view==="list" && (
            <ProductList 
            onCreateClick={()=>setView("create")}
            onEditClick={handleEditProduct}
            onDeleteClick={handleDelete}
            />
        )}

        {view==="edit" && (
            <EditProductForm/>
        )}
    </div>
  )
}

export default ProductPanel
