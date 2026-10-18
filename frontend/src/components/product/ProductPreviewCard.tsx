import { Badge } from "../ui/badge"
import { CategoryThumbnail } from "./ProductMetaType"
import type { ProductStatus, ProductType } from "./types"

interface previewProps{
    title:string,
    price:number,
    type:ProductType | "",
    description:string,
    status:ProductStatus
}


function ProductPreviewCard({title, price, type, description, status}: previewProps) {
  return (
    <div className="lg:sticky lg:top-6 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="h-28 sm:h-32 bg-slate-50 flex items-center justify-center overflow-hidden">
            {type ? 
            <CategoryThumbnail type={type} fill showIconBadge/>:
            <div className="h-16 w-16 rounded-xl bg-slate-100"/>}
        </div>

        <div className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Live Preview</p>
                <Badge className={
                    status === "published"
                    ? "bg-green-100 text-green-700 hover:bg-green-50"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-50"
                }>
                    {status==="published" ? "Published" : "Draft"}

                </Badge>
            </div>

            <h3 className="text-base font-semibold text-slate-900 leading-snug break-words">
                {title || "Untitled product"}
            </h3>

            <p className="text-xs text-slate-400">{type.toUpperCase() ?? "No category selected"}</p>

            <p className="text-xl font-bold text-slate-900">
                ₹{price ? price.toFixed(2) : "0.00"}
            </p>

            {description && (
                <p className="text-sm text-slate-500 line-clamp-4">{description}</p>
            )}
        </div>
      
    </div>
  )
}

export default ProductPreviewCard
