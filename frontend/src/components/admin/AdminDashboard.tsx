import type { IAdmin, IUser } from "@/App"
import type { Product } from "../product/types"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Ban, CheckCircle2, IndianRupee, MoreHorizontal, Package, ShoppingBag, UserRound, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

interface adminDashboardProps{
    partners:IUser[],
    products:Product[],
    admin:IAdmin | null,
    onTogglePartner:(partner:IUser)=>void
}


interface StatCardProps {
    label: string;
    value: string;
    icon: React.ReactNode;
}
  
function StatCard({ label, value, icon }: StatCardProps) {
    return (
        <Card className="shadow-sm">
            <CardContent className="flex items-center justify-between py-5 sm:py-6">
            <div className="min-w-0">
                <p className="text-sm text-slate-500">
                {label}
                </p>

                <p className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1 truncate">
                {value}
                </p>
            </div>

            <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                {icon}
            </div>
            </CardContent>
        </Card>
    );
}

function AdminDashboard({partners, products, admin, onTogglePartner}:adminDashboardProps) {

    const {allOrders} = useSelector((state:RootState)=>state.public)

    const totalSales = allOrders.reduce((total,order)=>total + order.adminAmount + order.partnerAmount, 0)

    const adminEarnings = allOrders.reduce((total,order)=>total + order.adminAmount, 0)

    const totalPartners = partners.length;

    const totalProducts = products.length;


  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">
                Admin Dashboard - Hello, {admin?.name}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
                Monitor your marketplace, partners, products and earnings.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard label="Total Sales" value={`₹${totalSales.toFixed(2)}`}
            icon={<ShoppingBag className="h-5 w-5"/>}
            />

            <StatCard label="Admin Earnings" value={`₹${adminEarnings.toFixed(2)}`}
            icon={<IndianRupee className="h-5 w-5"/>}
            />

            <StatCard label="Total Partners" value={String(totalPartners)}
            icon={<Users className="h-5 w-5"/>}
            />

            <StatCard label="Total Products" value={String(totalProducts)}
            icon={<Package className="h-5 w-5"/>}
            />
        </div>


        <Card className="shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-base">
                            All Partners
                        </CardTitle>
                        <p className="text-sm text-slate-500 mt-1">
                            Manage partner accounts and their products.
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {
                    partners.length===0 ? (
                        <div className="py-12 text-center">
                            <UserRound className="h-8 w-8 mx-auto text-slate-300"/>
                            <p className="text-sm text-slate-500 mt-2">No partners found.</p>
                        </div>
                    )
                    :
                    (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-y bg-slate-50 text-slate-500">
                                        <th className="text-left font-medium px-5 py-3">Partner</th>
                                        <th className="text-left font-medium px-5 py-3">Products</th>
                                        <th className="text-left font-medium px-5 py-3">Sales</th>
                                        <th className="text-left font-medium px-5 py-3">Revenue</th>
                                        <th className="text-left font-medium px-5 py-3">Status</th>
                                        <th className="text-left font-medium px-5 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {partners.map((p,i)=>{
                                        const partnerProducts = products.filter((product)=>product.partnerId === p._id)
                                        return (
                                            <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarFallback>
                                                                {p.name.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>

                                                        <div>
                                                            <p className="font-medium text-slate-900">{p.name}</p>
                                                            <p className="text-xs text-slate-400">{p.email}</p>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="font-medium">{partnerProducts.length}</span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    {p.totalSales}
                                                </td>

                                                <td className="px-5 py-4 font-medium">
                                                    ₹{p.totalRevenue.toFixed(2)}
                                                </td>

                                                <td className="px-5 py-4">
                                                    {p.isActive ? (
                                                        <Badge className="bg-green-50 text-green-700 hover:bg-green-50">
                                                            Active
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="bg-red-50 text-red-700 hover:bg-red-50">
                                                            Inactive
                                                        </Badge>
                                                    )}
                                                </td>

                                                <td className="px-5 py-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                                                            <MoreHorizontal className="w-4 h-4"/>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={()=>onTogglePartner(p)}>
                                                                {p.isActive ? (<>
                                                                <Ban className="h-4 w-4 mr-2"/>
                                                                Disable
                                                                </>):(<>
                                                                <CheckCircle2 className="h-4 w-4 mr-2"/>
                                                                Activate
                                                                </>)}
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </CardContent>

        </Card>
    </div>
  )
}

export default AdminDashboard
