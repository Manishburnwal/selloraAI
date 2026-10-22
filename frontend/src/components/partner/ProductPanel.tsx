import { useEffect, useState } from "react";
import CreateProductForm from "../product/CreateProductForm";
import ProductList from "../product/ProductList";
import EditProductForm from "../product/EditProductForm";
import type { Product } from "../product/types";
import api from "@/utils/axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import ProfileCompleteNote from "../product/ProfileCompleteNote";

type view = 
| "list"
| "create"
| "edit";

function ProductPanel() {
    const [view,setView] = useState<view>("list")
    const [creating,setCreating] = useState(false)
    const [updating,setUpdating] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const {partner} = useSelector((state:RootState)=>state.user)

    const isProfileComplete = ()=>{
        if(!partner){
            return false
        }

        if(!partner.name?.trim()){
            return false
        }

        if(!partner.partnerProfile?.slug?.trim()){
            return false
        }

        if(!partner.partnerProfile?.bio?.trim()){
            return false
        }


        const payment = partner.paymentDetails

        if(!payment){
            return false;
        }

        if(!payment.accountHolderName?.trim()){
            return false;
        }

        if(payment.method === "upi"){
            if(!payment.upiId?.trim()){
                return false;
            }
        }

        if(payment.method === "bank"){
            if(!payment.accountNumber?.trim()){
                return false;
            }

            if(!payment.ifscCode?.trim()){
                return false;
            }
        }

        return true;
    }

    const profileComplete = isProfileComplete()


    const fetchProducts = async ()=>{
        try {
            setLoading(true)
            const response = await api.get("/api/product/all")
            if(response.data.success){
                setProducts(response.data.products ?? [])
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    const gotoList = ()=>{
        setView("list")
    }


    const handleCreate = async (product:Product)=>{
        try {
            setCreating(true)
            const response = await api.post("/api/product/create",product)

            setProducts((prev)=>[...prev, response.data.product])
            gotoList()
            toast.success("Product Created")
            setCreating(false)
        } catch (error) {
            console.log(error)
            setCreating(false)
            toast.error("failed to create product")
        }
    }

    const handleEditClick = async (product:Product)=>{
        setSelectedProduct(product)
        setView('edit')
    }


    const handleEditProduct = async (updated:Product)=>{
        try {
            setUpdating(true)
            const response = await api.patch(`/api/product/${updated._id}/update`,updated)
            if(response.data.success){
                setProducts((prev)=>prev.map((product)=>product._id===updated._id ? response.data.product : product))
                setUpdating(false)
                gotoList()
            }
            toast.success("Product Updated.")
        } catch (error) {
            console.log(error)
            setUpdating(false)
            toast.error("Failed to update product.")
        }
    }

    const handleDelete = async (product:Product)=>{
        alert("delete")
    }

    if(loading){
        return (
          <div className="flex h-screen items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"/>
    
          </div>
        )
    }


    if(!profileComplete){
        return(
            <ProfileCompleteNote/>
        )
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
            products={products} 
            onCreateClick={()=>setView("create")}
            onEditClick={handleEditClick}
            onDeleteClick={handleDelete}
            />
        )}

        {view==="edit" && (
            selectedProduct && (<EditProductForm
            product={selectedProduct}
            onSave={handleEditProduct}
            onDelete={handleDelete}
            onCancel={gotoList}
            loading={updating}
            />)
        )}
    </div>
  )
}

export default ProductPanel
