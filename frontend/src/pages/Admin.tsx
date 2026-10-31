import { Button } from "@/components/ui/button"
import logo from "../assets/logo.png"
import { useState } from "react"
import { LayoutDashboard, Wallet } from "lucide-react"
import AdminDashboard from "@/components/admin/AdminDashboard"
import PaytoPartner from "@/components/admin/PaytoPartner"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import type { IUser } from "@/App"
import { toast } from "sonner"

function Admin() {
  const [activeBtn, setActiveBtn] = useState<"dashboard" | "payments">("dashboard")
  const {allPublicPartners, allPublicProducts} = useSelector((state:RootState)=>state.public)
  const {admin} = useSelector((state:RootState)=>state.user)

  const handleToggleStatus = async (partner:IUser)=>{
    toast.success("handleToggleStatus function calling")
  }


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex items-center flex-wrap gap-1 justify-between h-19 sm:h-15">
            <div className="flex items-center gap-2">
              <img src={logo} alt="" className="w-6 h-6 rounded-sm object-contain"/>
              <span className="text-lg font-semibold tracking-tight">Admin Panel</span>
            </div>

            <div className="flex items-center gap-1 bg-slate p-1 rounded-lg">
              <Button size="sm" variant={activeBtn === "dashboard" ? "default" : "ghost"}
              onClick={()=>setActiveBtn("dashboard")}
              >
                <LayoutDashboard className="h-4 w-4 mr-2"/>
                Dashboard
              </Button>
              <Button size="sm" variant={activeBtn === "payments" ? "default" : "ghost"}
              onClick={()=>setActiveBtn("payments")}
              >
                <Wallet className="h-4 w-4 mr-2"/>
                Pay to partner
              </Button>
            </div>
          </div>
        </div>
      </div>


      {
        activeBtn === "dashboard" ? 
        (
          <AdminDashboard
          partners={allPublicPartners}
          products={allPublicProducts}
          admin={admin}
          onTogglePartner={handleToggleStatus}
          />
        ) : (
          <PaytoPartner/>
        )
      }
    </div>
  )
}

export default Admin
