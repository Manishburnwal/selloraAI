import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import type { Product } from "./types"

interface productlistProps{
    products:Product[]
    onCreateClick: ()=>void
    onEditClick: (product:Product)=>void
    onDeleteClick: (product:Product)=>void
}


function ProductList({
    products,
    onCreateClick,
    onEditClick,
    onDeleteClick
}:productlistProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
                <p className="text-sm text-slate-400 mb-1">Product &gt; All Products</p>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Products</h1>
                <p className="text-slate-500 mt-1 text-sm sm:text-base">Manage your digital products and sell them to customers.</p>
            </div>

            <Button
            onClick={onCreateClick}
            className="bg-indigo-600 hover:bg-indigo-700 gap-1.5 w-full sm:w-auto">
                <Plus className="w-4 h-4"/>
                Create Product
            </Button>
        </div>
    </div>
  )
}

export default ProductList
