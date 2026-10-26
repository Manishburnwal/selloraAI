import type { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

function DashboardPanel() {
  
  const {partner} = useSelector((state:RootState)=>state.user)


  return (
    <div className="text-3xl">
      
    </div>
  )
}

export default DashboardPanel
