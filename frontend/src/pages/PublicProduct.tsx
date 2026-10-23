import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPublicData } from "@/hooks/useGetAllPublicData"
import type { RootState } from "@/redux/store"
import { AlertTriangle } from "lucide-react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

function PublicProduct() {
    const {slug} = useParams<{slug:string}>()
    getAllPublicData()

    const navigate = useNavigate()

    const {allPublicPartners, allPublicProducts} = useSelector((state:RootState)=>state.public)

    const product = allPublicProducts.find((p)=>p.slug===slug)

    const creator = product ? allPublicPartners.find((p)=>p._id === product.partnerId) : undefined

    const isProductAvailable = !!product && !!creator && creator.isActive === true

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

  return (
    <div>
      
    </div>
  )
}

export default PublicProduct
