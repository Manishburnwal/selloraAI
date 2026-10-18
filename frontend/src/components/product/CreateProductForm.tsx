import { useState } from "react"
import { PRODUCT_TYPES, type Product, type ProductLinkItem, type ProductStatus, type ProductType } from "./types"
import { ArrowLeft, FileText, SlidersHorizontal, UploadCloud } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface createProductProps{
    onCreate: (product:Product)=>void
    onCancel: ()=>void
}

function CreateProductForm({
    onCreate,
    onCancel
}:createProductProps) {

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState<ProductType | "">("")
    const [price, setPrice] = useState("")
    const [links, setLinks] = useState<ProductLinkItem[]>([])
    const [status, setStatus] = useState<ProductStatus>("draft")

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* header */}

        <div className="flex items-start gap-3 mb-6">
            <button className="h-9 w-9 shrink-0 rounded-md border bg-white flex items-center justify-center hover:bg-slate-50 mt-0.5"
            onClick={onCancel}
            >
                <ArrowLeft className="w-4 h-4 text-slate-600"/>
            </button>

            <div>
                <p className="text-sm text-slate-400 mb-1">Product &gt; Create</p>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Create Product</h1>
                <p className="text-slate-500 mt-1 text-sm sm:text-base">Add your digital product details to the catalog.</p>
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
                            <Label htmlFor="slug">
                                Product Slug
                                <span className="text-red-500">*</span>
                            </Label>

                            <div className="flex items-center rounded-md border bg-white overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500">
                                <span className="pl-2 sm:pl-3 text-xs sm:text-sm text-slate-400 whitespace-nowrap bg-slate-50 self-stretch flex items-center pr-2 sm:pr-3 border-r">sellora.ai/product/</span>
                                <Input id="slug"
                                    placeholder="advanced-metrics"
                                    className="border-0 focus-visible:ring-0 shadow-none"
                                    onChange={(e)=>setSlug(e.target.value)}
                                    value={slug}
                                />
                            </div>
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
                                        <SelectValue placeholder="Select category"/>
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
                    </section>

                </div>
            </div>

            <div></div>
        </div>
    </div>
  )
}

export default CreateProductForm
