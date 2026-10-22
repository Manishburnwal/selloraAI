import { useState } from "react";
import { PRODUCT_TYPES, type Product, type ProductLinkItem, type ProductStatus, type ProductType } from "./types"
import { toast } from "sonner";
import { FileText, SlidersHorizontal, Trash2, UploadCloud } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import ProductLinksEditor from "./ProductLinksEditor";
import { Button } from "../ui/button";
import ProductPreviewCard from "./ProductPreviewCard";

interface EditProductProps{
    product: Product;
    onSave: (product:Product)=>void;
    onDelete: (product:Product)=>void;
    onCancel:()=>void;
    loading:boolean
}


function EditProductForm({
    product, 
    onSave,
    onDelete,
    onCancel,
    loading
}:EditProductProps) {
    const [title, setTitle] = useState(product.title)
    const [description, setDescription] = useState(product.description)
    const [type, setType] = useState<ProductType>(product.type)
    const [price, setPrice] = useState(String(product.price))
    const [links, setLinks] = useState<ProductLinkItem[]>(product.links ?? [])
    const [status, setStatus] = useState<ProductStatus>(product.status)


    const buildProduct = (overrideStatus?: ProductStatus): Product=>({
        ...product,
        title,
        description,
        type,
        price:Number(price),
        links,
        status:overrideStatus ?? status,
    })



    const handleSubmit = ()=>{
        if(!title || !description || !price){
            toast.success("Please fill all required fields.")
            return;
        }
        onSave(buildProduct())
    }


    const handleToggleStatus = ()=>{
        const nextStatus:ProductStatus = status === "published" ? "draft" : "published";
        setStatus(nextStatus)
        onSave(buildProduct(nextStatus))
    }


    const isPublished = status==="published"

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* header */}

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
            <div>
                <p className="text-sm text-slate-400 mb-1">Product &gt; Edit</p>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Edit Product</h1>
                <p className="text-slate-500 mt-1 text-sm sm:text-base">Update your product information and settings.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button 
                onClick={()=>onDelete(product)}
                variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-1.5 w-full sm:w-auto">
                    <Trash2 className="h-4 w-4"/>
                    Delete Product
                </Button>

                <Button
                onClick={handleToggleStatus}
                className={isPublished
                    ? "bg-slate-600 hover:bg-slate-700 w-full sm:w-auto"
                    : "bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto"
                }>
                    {isPublished ? "Move to Draft" : "Publish Product"}
                </Button>
            </div>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl border bg-white shadow-sm">
                <div className="p-4 sm:p-8 space-y-8 sm:space-y-10">
                    {/* basic info */}
                    <section className="space-y-5">
                        <div className="flex items-center gap-2 border-b pb-3">
                            <FileText className="h-4 w-4 text-indigo-600"/>
                            <h2 className="text-lg font-semibold text-slate-900">Basic Info</h2>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="title">
                                Product Title
                                <span className="text-red-500">*</span>
                            </Label>

                            <Input id="title"
                            placeholder="e.g. Advanced Metrics Dashboard"
                            onChange={(e)=>setTitle(e.target.value)}
                            value={title}
                            />
                        </div>


                        <div className="space-y-1.5">
                            <Label htmlFor="desc">
                                Product Description
                                <span className="text-red-500">*</span>
                            </Label>

                            <Textarea id="desc"
                            rows={5}
                            placeholder="Briefly describe the product..."
                            onChange={(e)=>setDescription(e.target.value)}
                            value={description}
                            />
                        </div>

                    </section>


                    <section className="space-y-5">
                        <div className="flex items-center gap-2 border-b pb-3">
                            <SlidersHorizontal className="h-4 w-4 text-indigo-600"/>
                            <h2 className="text-lg font-semibold text-slate-900">Product Details</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <Label>
                                    Category
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Select value={type} onValueChange={(v)=>setType(v as ProductType)}>
                                    <SelectTrigger>
                                        <SelectValue
                                        placeholder="Select category"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PRODUCT_TYPES.map((type)=>(
                                            <SelectItem 
                                            key={type.value}
                                            value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>

                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="price">
                                    Price (INR)
                                    <span className="text-red-500">*</span>
                                </Label>

                                <div className="flex items-center rounded-md border bg-white overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500">
                                    <span className="pl-3 pr-2 text-sm text-slate-400">₹</span>

                                    <Input id="price"
                                    type="number"
                                    step="1"
                                    placeholder="299"
                                    onChange={(e)=>setPrice(e.target.value)}
                                    value={price}
                                    className="border-0 focus-visible:ring-0 shadow-none pl-0"
                                    />
                                </div>
                            </div>

                        </div>


                        <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3.5 flex gap-3">
                            <UploadCloud className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5"/>

                            <div className="text-sm">
                                <p className="font-medium text-slate-900">Where do I host my product files?</p>

                                <p className="text-slate-500 mt-0.5">Upload your product (files, folders, source code, etc.) to Google Drive, set sharing to <span className="font-medium text-slate-700">&quot;Anyone with the link&quot;</span>, then paste that link below — e.g. title it &quot;Download&quot; and add the Drive URL as a Product Link.</p>

                            </div>

                        </div>

                        <ProductLinksEditor links={links} onChange={setLinks}/>

                    </section>

                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t px-4 sm:px-8 py-5 bg-slate-50 rounded-b-xl">
                    <Button disabled={loading} onClick={onCancel} variant="outline" className="w-full sm:w-auto">
                        Cancel
                    </Button>

                    <Button disabled={loading} onClick={handleSubmit} variant="outline" className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto">
                        {loading ? "Updating..." : "Update Product"}
                    </Button>
                </div>
            </div>


            <div>
                <ProductPreviewCard title={title} price={Number(price) || 0} description={description}
                type={type}
                status={status}/>
            </div>
        </div>
    </div>
  )
}

export default EditProductForm
