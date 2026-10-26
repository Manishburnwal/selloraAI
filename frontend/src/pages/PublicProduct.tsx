import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPublicData } from "@/hooks/useGetAllPublicData"
import type { RootState } from "@/redux/store"
import { AlertTriangle, ExternalLink, InfinityIcon, Link2, Lock, ShieldCheck, ShoppingCart, Sparkles, Star } from "lucide-react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import logo from "../assets/logo.png"
import { CategoryIcon, CategoryThumbnail, PRODUCT_META_TYPES } from "@/components/product/ProductMetaType"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import type { ProductLinkItem } from "@/components/product/types"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import api from "@/utils/axios"

function PublicProduct() {
    const {slug} = useParams<{slug:string}>()
    getAllPublicData()

    const navigate = useNavigate()

    const {allPublicPartners, allPublicProducts} = useSelector((state:RootState)=>state.public)

    const product = allPublicProducts.find((p)=>p.slug===slug)

    const creator = product ? allPublicPartners.find((p)=>p._id === product.partnerId) : undefined

    const isProductAvailable = !!product && !!creator && creator.isActive === true

    const [purchasedLinks, setPurchasedLinks] = useState<ProductLinkItem[] | null>(null)

    const [isBuyOpen, setIsBuyOpen] = useState(false)
    const [buyerName, setBuyerName] = useState("")
    const [buyerEmail, setBuyerEmail] = useState("")

    const [processing, setProcessing] = useState(false)

    if(!isProductAvailable){
        return(
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <Card className="w-full max-w-md shadow-sm">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
                            <AlertTriangle className="h-7 w-7 text-amber-600"/>
                        </div>

                        <CardTitle className="text-xl">
                            Product Unavailable
                        </CardTitle>

                        <CardDescription className="mt-2">
                            This product or its creator is currently unavailable. Please explore other products on SelloraAI.
                        </CardDescription>

                        <Button 
                        onClick={()=>navigate("/")}
                        className="mt-6 bg-indigo-600 hover:bg-indigo-700">
                            Back to MarketPlace
                        </Button>
                    </CardHeader>
                </Card>

            </div>
        )
    }

    const handlePay = async ()=>{
        if(!buyerEmail.trim() || !buyerName.trim()){
            toast.error("Please enter your name and email.");
            return;
        }
        try {
            setProcessing(true)
            const response = await api.post("/api/order/create",{
                productId: product._id,
                partnerId: product.partnerId,
                amount: product.price,
                customerName: buyerName,
                customerEmail: buyerEmail,
                partnerEmail: creator?.email,
                productTitle: product.title,
                links:product.links
            })

            if(!response.data.success){
                toast.error("Order creation failed");
                return;
            }

            const options = {
                key:response.data.key,
                amount:response.data.amount * 100,
                currency:"INR",
                name:"SelloraAI",
                description:product.title,
                order_id:response.data.razorpayOrderId,
                prefill:{
                    name:buyerName,
                    email:buyerEmail
                },
                theme:{
                    color:"#4f46e5"
                },
                handler:
                async function(response:any) {
                    console.log(response)
                }
            }

            const rzp = new window.Razorpay(options)

            rzp.open()
        } catch (error) {
            console.log(error)
        }
    }

    const metaType = PRODUCT_META_TYPES[product?.type]

  return (
    <div className="min-h-screen bg-slate-50">
        <div className="border-b bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                    <img src={logo} alt="logo"  className="w-6 h-6 rounded-sm object-contain shrink-0"/>
                    <span className="text-base sm:text-lg font-semibold tracking-tight truncate">SelloraAI</span>
                </div>

                <Button onClick={()=>navigate("/")} size="sm" className="bg-indigo-600 hover:bg-indigo-700 shrink-0">
                    <span className="hidden sm:inline">Add Your Own Product</span>
                    <span className="sm:hidden">List Product</span>
                </Button>
            </div>
        </div>


        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
                    <div className="relative h-44 sm:h-64 md:h-80 w-full">
                        <CategoryThumbnail type={product.type} fill showIconBadge className="rounded-none"/>
                    </div>

                    <div className="p-6 sm:p-8 md:p-12 text-center">
                        <Badge className={`${metaType?.className} text-md`}>
                            <Sparkles className="w-3 h-3"/>
                            {metaType.label ?? product.type}
                        </Badge>

                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{product.title}</h1>

                        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-5 sm:mt-7">₹{product.price}</p>

                        <Button onClick={()=>setIsBuyOpen(true)} size="lg" className="mt-6 bg-indigo-600 hover:bg-indigo-700 gap-2 w-full sm:w-auto px-10 shadow-md shadow-indigo-200">
                            <ShoppingCart className="w-4 h-4"/>
                            Buy Now
                        </Button>
                    </div>
                </div>

                <div className="rounded-2xl border bg-white p-6 sm:p-8">
                    <h2 className="text-base sm:text-lg font-semibold text-slate-900 border-b pb-3 mb-4">About this {metaType.label ?? "Product"}</h2>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{product.description}</p>
                </div>

                <div className="rounded-2xl border bg-white p-6 sm:p-8">
                    <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
                        <Link2 className="h-4 w-4 text-indigo-600"/>
                        Included Resources
                    </h2>

                    {purchasedLinks && <div className="mb-4 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5"/>
                        <p>Your payment is successful. Download all purchased resources below. Keep this page open until your downloads are complete.</p>
                    </div>}

                    <div className="space-y-3">
                        {(product.links ?? []).map((link,index)=>{
                            const unlocked = purchasedLinks?.[index];
                            return(
                                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 rounded-lg border bg-slate-50 px-4 py-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-9 w-9 shrink-0 rounded-md bg-white border flex items-center justify-center text-slate-400">
                                            {unlocked ? <ExternalLink className="h-4 w-4 text-indigo-600"/> : <Link2 className="h-4 w-4"/>}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-slate-900">{link.title}</p>
                                            {!unlocked && 
                                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                                <Lock className="w-3 h-3"/>
                                                Purchase this product to access resources
                                            </p>}
                                        </div>
                                    </div>

                                    {unlocked ? 
                                    <Button>
                                        Download
                                    </Button>
                                    :
                                    <Button size="sm" disabled className="shrink-0 w-full sm:w-auto">
                                        Download
                                    </Button>
                                    }

                                </div>
                            )
                        })}

                        {
                           (!product.links || product.links.length===0) && <p className="text-sm text-slate-400">No resources listed for this product.</p> 
                        }
                    </div>
                </div>

            </div>

            {/* right side */}

            <div className="space-y-4 sm:space-y-6">
                <div className="rounded-2xl border bg-white p-5 sm:p-6 text-center">
                    <div className="h-16 w-16 mx-auto rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-semibold">
                        {creator?.name.split(" ").map((part)=>part[0]).join("").toUpperCase()}
                    </div>

                    <h3 className="font-semibold text-slate-900 mt-3">
                        {creator.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 tracking-wide uppercase mt-0.5">
                        Creator
                    </p>

                    {creator.partnerProfile.bio &&
                        <div className="mt-4 rounded-md bg-slate-100 px-3 py-2 text-sm italic text-slate-500">
                            &quot;{creator?.partnerProfile?.bio}&quot;
                        </div>
                    }

                    <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={()=>navigate(`/partner/${creator.partnerProfile.slug}`)}
                    >
                        View Profile
                    </Button>
                </div>


                <div className="rounded-2xl border bg-white p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                        <Star className="h-4 w-4 text-indigo-600"/>
                        High Quality Content
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-700">
                        <InfinityIcon className="h-4 w-4 text-indigo-600"/>
                        Lifetime Access
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-700">
                        <ShieldCheck className="h-4 w-4 text-indigo-600"/>
                        Secure Checkout
                    </div>
                </div>
            </div>
        </div>


        <Dialog open={isBuyOpen} onOpenChange={setIsBuyOpen}>
            <DialogContent className="overflow-hidden p-0 w-[92vw] sm:w-full rounded-xl">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 px-5 sm:px-6 py-5 sm:py-6 text-white">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                        <CategoryIcon type={product.type} size="sm"/>
                        </div>

                        <div className="min-w-0">
                            <p className="font-semibold truncate">{product.title}</p>
                            <p className="text-indigo-100 text-sm">₹{product.price}</p>
                        </div>
                     </div>
                </div>

                <div className="px-5 sm:px-6 pt-5">
                    <DialogHeader>
                        <DialogTitle>
                            Complete your purchase
                        </DialogTitle>
                        <DialogDescription>
                            Enter your details below to continue to payment.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="space-y-4 px-5 sm:px-6 py-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="buyerName">
                            Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                        id="buyerName"
                        placeholder="Enter your name"
                        onChange={(e)=>setBuyerName(e.target.value)}
                        value={buyerName}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="buyerEmail">
                            Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                        id="buyerEmail"
                        placeholder="you@example.com"
                        type="email"
                        onChange={(e)=>setBuyerEmail(e.target.value)}
                        value={buyerEmail}
                        />
                    </div>

                    <div className="flex items-start gap-2 rounded-md bg-indigo-50 px-3 py-2.5 text-xs text-indigo-700">
                        <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5"/>
                        <span>Secure payment powered by Razorpay. Your card and UPI details are handled by Razorpay and never stored on our servers.</span>
                    </div>
                </div>

                <DialogFooter className="px-5 sm:px-6 pb-5 sm:pb-6 flex-col sm:flex-row gap-2">
                    <Button variant="outline" disabled={processing} className="w-full sm:w-auto"
                    onClick={()=>setIsBuyOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button onClick={handlePay} disabled={processing} className="bg-indigo-600 hover:bg-indigo-700 gap-2 w-full sm:w-auto">
                        <ShoppingCart className="w-4 h-4"/>
                        {processing ? "Processing..." : `Pay ₹${product.price}`}
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default PublicProduct
