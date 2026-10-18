import { useState } from "react";
import CreateProductForm from "../product/CreateProductForm";
import ProductList from "../product/ProductList";
import EditProductForm from "../product/EditProductForm";
import type { Product } from "../product/types";

type view = 
| "list"
| "create"
| "edit";

function ProductPanel() {
    const [view,setView] = useState<view>("list")

    const gotoList = ()=>{
        setView("list")
    }


    const handleCreate = async (product:Product)=>{
        try {
            
        } catch (error) {
            
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
