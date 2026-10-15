import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { getCurrentUser } from "./hooks/useGetCurrentUser"

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

function App() {
  getCurrentUser()
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>  
      </Routes>
    </>
  )
}

export default App