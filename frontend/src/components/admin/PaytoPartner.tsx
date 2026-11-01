import { useState } from "react"
import { Button } from "../ui/button"
import { History, Users, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import type { IUser } from "@/App"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Badge } from "../ui/badge"

interface PaytoPartnerProps{
    partners:IUser[],
    onPaymentSuccess:(partner:IUser)=>void
}


function PaytoPartner({partners, onPaymentSuccess}:PaytoPartnerProps) {
    const [activeTab, setActiveTab] = useState<"partner" | "history">("partner")
    const [selectedPartner, setSelectedPartner] = useState<IUser | null>(null)

    const handlePay=(partner:IUser)=>{
        setSelectedPartner(partner)
    }

    const eligiblePartners = partners.filter((partner)=>partner.totalRevenue >= 10000)
    
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Partner Payments</h1>
                <p className="text-sm text-slate-500 mt-1 max-w-2xl">Manage partner payouts and view your complete payment history.</p>
            </div>

            <div className="w-full sm:w-auto flex items-center gap-1 rounded-lg bg-slate-100 p-1">
                <Button size="sm" variant={activeTab==="partner" ? "default" : "ghost"} onClick={()=>setActiveTab("partner")} className="flex-1 sm:flex-none gap-2">
                    <Users className="h-4 w-4"/>
                    Partners
                </Button>

                <Button size="sm" variant={activeTab==="history" ? "default" : "ghost"} onClick={()=>setActiveTab("history")} className="flex-1 sm:flex-none gap-2">
                    <History className="h-4 w-4"/>
                    History
                </Button>
            </div>
        </div>


        {activeTab === "partner" && (
            <Card className="shadow-sm overflow-hidden">
                <CardHeader className="px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Wallet className="w-4 h-4 sm:h-5 sm:w-5"/>
                        </div>

                        <div>
                            <CardTitle className="text-base">
                                Eligible For Payment
                            </CardTitle>

                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                {eligiblePartners.length} Partner ready to payout
                            </p>
                        </div>
                    </div>
                    
                </CardHeader>

                <CardContent className="p-0">
                    {eligiblePartners.length===0 ? (
                        <div className="text-center">
                        <Wallet className="h-9 w-9 mx-auto text-slate-300" />
                        <p className="font-medium text-slate-700">No partner payments pending</p>
                        <p className="text-sm text-slate-400 mt-1">Partners need at least ₹10,000 in earnings.</p>
                      </div>
                    ):(
                        <div className="w-full overflow-x-auto">
                            <table className="w-full min-w-[650px]">
                                <thead>
                                    <tr className="border-y bg-slate-50 text-slate-500">
                                    <th className="text-left font-medium px-4 sm:px-5 py-3">
                                    Partner
                                    </th>

                                    <th className="text-left font-medium px-4 sm:px-5 py-3">
                                    Total Sales
                                    </th>

                                    <th className="text-left font-medium px-4 sm:px-5 py-3">
                                    Payable Amount
                                    </th>

                                    <th className="text-right font-medium px-4 sm:px-5 py-3">
                                    Action
                                    </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {eligiblePartners.map((partner,index)=>(
                                        <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                                            <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarFallback>
                                                                {partner.name.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>

                                                        <div>
                                                            <p className="font-medium text-slate-900">{partner.name}</p>
                                                            <p className="text-xs text-slate-400">{partner.email}</p>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    {partner.totalSales}
                                                </td>

                                                <td className="px-5 py-4 font-medium">
                                                    ₹{partner.totalRevenue.toFixed(2)}
                                                </td>

                                                <td className="px-4 sm:px-5 py-4 text-right">
                                                    <Button onClick={()=>handlePay(partner)} size="sm" className="text-nowrap">
                                                        Pay Partner
                                                    </Button>

                                                </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        )}



        {activeTab==="history" && (
            <Card>
                History
            </Card>
        )}


        <Dialog open={selectedPartner !== null}
        onOpenChange={(open)=>{
            if(!open){
                setSelectedPartner(null)
            }
        }}
        >
            <DialogContent className="w-[calc(100%-1.5rem)] sm:w-full sm:max-w-md max-h-[90vh] overflow-y-auto rounded-xl p-4 sm:p-6">
                {selectedPartner && <>
                    <DialogHeader>
                        <DialogTitle>Partner Payment</DialogTitle>
                        <DialogDescription>
                            Review the payment details before marking this payout as completed.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center gap-3 rounded-lg border bg-slate-50 p-3 sm:p-4">
                        <Avatar>
                            <AvatarFallback>
                                {selectedPartner.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                            <p className="font-semibold truncate">{selectedPartner.name}</p>
                            <p className="text-xs sm:text-sm text-slate-500 truncate">{selectedPartner.email}</p>
                        </div>
                    </div>

                    <div className="rounded-lg border p-4">
                        <p className="text-sm text-slate-500">
                            Payment Amount
                        </p>
                        <p className="text-2xl font-bold mt-1">
                            ₹
                            {selectedPartner.totalRevenue.toFixed(2)}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-slate-500">Payment Method</span>
                            <Badge variant="secondary">
                                {selectedPartner.paymentDetails.method.toUpperCase()}
                            </Badge>
                        </div>

                        {selectedPartner.paymentDetails.method === "upi" ? (
                        <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-slate-400">Account Holder Name</p>
                                <p className="font-medium mt-1 break-all">{selectedPartner.paymentDetails.accountHolderName || "Not provided"}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-slate-400">UPI ID</p>
                                <p className="font-medium mt-1 break-all">{selectedPartner.paymentDetails.upiId || "Not provided"}</p>
                            </div>
                            <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
                                <Button variant="outline" className="w-full sm:w-auto" onClick={() => setSelectedPartner(null)}>
                                    Cancel
                                </Button>

                                <Button onClick={() => {
                                    onPaymentSuccess(selectedPartner!); 
                                    setSelectedPartner(null);}} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                                    Complete Payment
                                </Button>
                            </DialogFooter>
                        </div>
                        ) : (
                            <div className="rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-slate-400">Account Holder Name</p>
                                    <p className="font-medium mt-1 break-all">{selectedPartner.paymentDetails.accountHolderName || "Not provided"}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-slate-400">Account Number</p>
                                    <p className="font-medium mt-1 break-all">{selectedPartner.paymentDetails.accountNumber || "Not provided"}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-slate-400">IFSC Code</p>
                                    <p className="font-medium mt-1 break-all">{selectedPartner.paymentDetails.ifscCode || "Not provided"}</p>
                                </div>
                                <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
                                    <Button variant="outline" className="w-full sm:w-auto" onClick={() => setSelectedPartner(null)}>
                                        Cancel
                                    </Button>

                                    <Button onClick={() => onPaymentSuccess(selectedPartner!)} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                                        Complete Payment
                                    </Button>
                                </DialogFooter>
                            </div>
                        )}


                    </div>
                
                </>}
            </DialogContent>
        </Dialog>


    </div>
  )
}

export default PaytoPartner
