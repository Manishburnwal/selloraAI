import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPublicData } from "@/hooks/useGetAllPublicData"
import type { RootState } from "@/redux/store"
import { AlertTriangle, Link2 } from "lucide-react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import logo from "../assets/logo.png"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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
                    href={partner.partnerProfile.website} 
                    className="inline-flex items-center gap-1.5 text-indigo-600 hover:underline mt-3 text-sm sm:text-base break-all">
                        <Link2 className="h-4 w-4 shrink-0"/>
                        {partner.partnerProfile.website}
                    </a>
                }

            </div>
        </div>
    </div>
  )
}

export default PublicPartner
