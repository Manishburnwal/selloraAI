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
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

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

    const handleEditProduct = async (product:Product)=>{
        alert("edit")
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
