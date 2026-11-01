import mongoose, { Document } from "mongoose";

export interface IPartnerPayment extends Document{
    partnerId: mongoose.Types.ObjectId;
    partnerName: string;
    partnerEmail: string;
    amount: number;
    status: 
    | "success";
    createdAt: Date;
    updatedAt: Date;
}

const partnerPaymentSchema = new mongoose.Schema<IPartnerPayment>({
    partnerId:{
        type:mongoose.Types.ObjectId,
        required:true,
        index:true
    },
    partnerName:{
        type:String,
        required:true,
        trim:true
    },
    partnerEmail:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    amount:{
        type:Number,
        required:true,
        min:0
    },
    status:{
        type:String,
        enum:["success"],
        default:"success"
    }
},{timestamps:true})

const PartnerPayment = mongoose.model("PartnerPayment",partnerPaymentSchema)
export default PartnerPayment