import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { getCurrentUser } from "./hooks/useGetCurrentUser"
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import Admin from "./pages/Admin";
import Partner from "./pages/Partner";
import { Toaster } from "./components/ui/sonner";
import { getAllPublicData } from "./hooks/useGetAllPublicData";
import PublicPartner from "./pages/PublicPartner";
import PublicProduct from "./pages/PublicProduct";

interface IPartnerprofile {
  slug? : string;

  bio? : string;

  website? : string;

  socialLinks? : ISocialLinks;
}

interface ISocialLinks {
  youtube?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

interface IPaymentdetails {
  method: "upi" | "bank";
  upiId?: string;
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
}

export interface IUser {

  _id?:string,

  firebaseUid:string,

  name:string,

  email:string,

  role:"partner" | "admin",

  partnerProfile: IPartnerprofile

  paymentDetails: IPaymentdetails

  totalSales: number;

  totalRevenue: number;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}


export interface IAdmin{
  name:string,
  email:string
}


export interface Order {
  _id: string;

  productId: string;
  partnerId: string;

  productTitle: string;
  productPrice: number;

  customerName: string;
  customerEmail: string;
  partnerEmail: string;

  paymentStatus:
      | "pending"
      | "success"
      | "failed";

  partnerAmount: number;
  adminAmount: number;
  createdAt: string;
  updatedAt?: string;
}

function App() {
  getCurrentUser()
  getAllPublicData()

  const {user, loading} = useSelector((state:RootState)=>state.user)
  if(loading){
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"/>

      </div>
    )
  }
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={user?.role === "admin" ? (
          <Navigate to="/admin" replace/>
        ) : (
        <Home/>
        )}/>  

        <Route path="/admin" element={user?.role === "admin" ? (
          <Admin/>
        ) : (
          <Navigate to="/" replace/>
        )}/>  

        <Route path="/partner" element={user?.role === "partner" ? (
          <Partner/>
        ) : user?.role === "admin" ? (
        <Navigate to="/admin" replace/>
        ) : (
        <Navigate to="/" replace/>
        ) }/>  

        <Route path="/partner/:slug" element={<PublicPartner/>}/>

        <Route path="/product/:slug" element={<PublicProduct/>}/>

      </Routes>
    </>
  )
}

export default App