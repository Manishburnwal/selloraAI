import { Button } from "@/components/ui/button"
import logo from "../assets/logo.png"
import { useState } from "react"
import { LayoutDashboard, Wallet } from "lucide-react"

function Admin() {
  const [activeBtn, setActiveBtn] = useState<"dashboard" | "payments">("dashboard")
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex items-center flex-wrap gap-3 justify-between h-16">
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
    </div>
  )
}

export default Admin
