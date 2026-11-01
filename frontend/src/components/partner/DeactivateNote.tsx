import { Contact, ShieldAlert } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"

function DeactivateNote() {
  const {admin} = useSelector((state:RootState)=>state.user)
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4">
      <Card className="max-w-md w-full border-red-100 shadow-sm">
        <CardContent className="flex flex-col items-center text-center gap-4 py-10">
          <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center">
            <ShieldAlert className="h-7 w-7 text-red-500"/>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">
              Your profile has been deactivated by admin
            </h2>
            <p className="text-sm text-slate-500">
              Your currently don'&apos;'t have access to the partner dashboard
            </p>
          </div>

          {admin?.email && (
            <div className="w-full border-t pt-5 mt-2">
              <p className="text-sm text-slate-500 mb-3">
                If you believe this was a mistake, please contact the administrator.
              </p>
              <p className="flex items-center justify-center gap-1 text-sm text-slate-900 mt-2 break-all">
                <Contact className="w-4 h-4"/>: {admin.email}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DeactivateNote
