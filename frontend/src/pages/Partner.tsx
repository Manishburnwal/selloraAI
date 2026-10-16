import DashboardPanel from "@/components/partner/DashboardPanel"
import DeactivateNote from "@/components/partner/DeactivateNote"
import PartnerNav, { type PartnerTab } from "@/components/partner/PartnerNav"
import ProductPanel from "@/components/partner/ProductPanel"
import ProfilePanel from "@/components/partner/ProfilePanel"
import type { RootState } from "@/redux/store"
import { useState } from "react"
import { useSelector } from "react-redux"

function Partner() {
    const [activeTab, setActiveTab] = useState<PartnerTab>("dashboard")

    const {partner} = useSelector((state:RootState)=>state.user)

    if(!partner){
        return (
            <div className="flex h-screen items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"/>
      
            </div>
        )
    }

    if(partner.isActive===false){
        <DeactivateNote/>
    }
  return (
    <div className="min-h-screen bg-slate-50">
        <PartnerNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab}/>

        {activeTab==="dashboard" ? (
            <DashboardPanel/>
        ): activeTab==="profile" ? (
            <ProfilePanel/>
        ):(
            <ProductPanel/>
        )}
    </div>
  )
}

export default Partner
