import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPublicData } from "@/hooks/useGetAllPublicData"
import type { RootState } from "@/redux/store"
import { AlertTriangle, Link2 } from "lucide-react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import logo from "../assets/logo.png"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"
import { CategoryThumbnail, PRODUCT_META_TYPES } from "@/components/product/ProductMetaType"
import { Badge } from "@/components/ui/badge"

function PublicPartner() {
    const {slug} = useParams<{slug:string}>()
    getAllPublicData()

    const navigate = useNavigate()

    const {allPublicPartners, allPublicProducts} = useSelector((state:RootState)=>state.public)

    const partner = allPublicPartners.find((p)=>p.partnerProfile.slug === slug && p.isActive === true)

    const products = partner ? allPublicProducts.filter((product)=>product.partnerId === partner._id) : []

    if(!partner){
        return(
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <Card className="w-full max-w-md shadow-sm">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
                            <AlertTriangle className="h-7 w-7 text-amber-600"/>
                        </div>

                        <CardTitle className="text-xl">
                            Creator Unavailable
                        </CardTitle>

                        <CardDescription className="mt-2">
                            This creator profile is currently unavailable or no longer exists.
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

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32 mx-auto">
                    <AvatarFallback className="bg-indigo-100 text-3xl sm:text-4xl font-bold text-indigo-600">
                        {partner?.name.split(" ").map((part)=>part[0]).join("").toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-5">{partner.name}</h1>

                {partner.partnerProfile.bio && <p className="text-slate-500 mt-1 text-base sm:text-lg">
                    {partner.partnerProfile.bio}    
                </p>}

                {
                    partner.partnerProfile.website &&
                    <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                        partner.partnerProfile.website.startsWith("http://") ||
                        partner.partnerProfile.website.startsWith("https://")
                          ? partner.partnerProfile.website
                          : `https://${partner.partnerProfile.website}`
                    }
                    className="inline-flex items-center gap-1.5 text-indigo-600 hover:underline mt-3 text-sm sm:text-base break-all">
                        <Link2 className="h-4 w-4 shrink-0"/>
                        {partner.partnerProfile.website}
                    </a>
                }


                <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
                    {partner.partnerProfile.socialLinks?.youtube &&
                    <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                        partner.partnerProfile.socialLinks?.youtube.startsWith("http://") ||
                        partner.partnerProfile.socialLinks?.youtube.startsWith("https://")
                          ? partner.partnerProfile.socialLinks?.youtube
                          : `https://${partner.partnerProfile.socialLinks?.youtube}`
                    }
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
                        <FaYoutube className="h-4 w-4 shrink-0"/>
                    </a>
                    }

                    {partner.partnerProfile.socialLinks?.instagram &&
                    <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                        partner.partnerProfile.socialLinks?.instagram.startsWith("http://") ||
                        partner.partnerProfile.socialLinks?.instagram.startsWith("https://")
                          ? partner.partnerProfile.socialLinks?.instagram
                          : `https://${partner.partnerProfile.socialLinks?.instagram}`
                    }
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
                        <FaInstagram className="h-4 w-4 shrink-0"/>
                    </a>
                    }

                    {partner.partnerProfile.socialLinks?.linkedin &&
                    <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                        partner.partnerProfile.socialLinks?.linkedin.startsWith("http://") ||
                        partner.partnerProfile.socialLinks?.linkedin.startsWith("https://")
                          ? partner.partnerProfile.socialLinks?.linkedin
                          : `https://${partner.partnerProfile.socialLinks?.linkedin}`
                    }
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
                        <FaLinkedin className="h-4 w-4 shrink-0"/>
                    </a>
                    }

                    {partner.partnerProfile.socialLinks?.github &&
                    <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                        partner.partnerProfile.socialLinks?.github.startsWith("http://") ||
                        partner.partnerProfile.socialLinks?.github.startsWith("https://")
                          ? partner.partnerProfile.socialLinks?.github
                          : `https://${partner.partnerProfile.socialLinks?.github}`
                    }
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
                        <FaGithub className="h-4 w-4 shrink-0"/>
                    </a>
                    }
                    

                </div>

            </div>

            <div className="mt-10 sm:mt-14">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 border-b pb-4 mb-6">
                    Products by {partner.name}
                </h2>
                {products.length===0 ? 
                (<p className="text-slate-400 text-sm">
                    This creator has not listed any products yet.
                </p>):(
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {products.map((product)=>{
                            const metaType = PRODUCT_META_TYPES[product.type]
                            return (
                                <div key={product._id} className="rounded-2xl border bg-white overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all">
                                    <div className="relative h-36 sm:h-40 w-full">
                                        <CategoryThumbnail type={product.type} fill className="rounded-none"/>
                                    </div>

                                    <div className="p-4 sm:p-5 space-y-2">
                                        <Badge className={`${metaType?.className}`}>
                                            {metaType.label ?? product.type}
                                        </Badge>

                                        <h3 className="font-semibold text-slate-900 leading-snug">{product.title}</h3>

                                        <p className="text-sm text-slate-500 line-clamp-2">{product.description}</p>

                                        <div className="flex items-center justify-between pt-2">

                                            <p className="text-lg font-bold text-slate-900">₹{product.price}</p>
                                            <Button variant="outline" size="sm" onClick={()=>window.open(`/product/${product.slug}`,"_blank", "noopener noreferrer")}>
                                                View Product
                                            </Button>

                                        </div>
                                    </div>

                                    

                                </div>
                            )
                        })}
                    </div>
                )
                }

            </div>

        </div>
    </div>
  )
}

export default PublicPartner
