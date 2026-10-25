import mongoose, { Document } from "mongoose";

export interface IOrder extends Document{
    productId: mongoose.Types.ObjectId;
    partnerId: mongoose.Types.ObjectId;

    productTitle: string;
    productPrice: number;

    links: {
        title: string;
        url: string;
    }[];

    partnerEmail:string;

    customerName:string;
    customerEmail:string;

    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;

    paymentStatus:
    | "pending"
    | "success"
    | "failed";

    partnerAmount: number;

    adminAmount: number;

    createdAt: Date;
    updatedAt: Date;
}


const orderSchema = new mongoose.Schema<IOrder>({
    productId:{
        type:mongoose.Types.ObjectId,
        required:true,
        index:true
    },
    partnerId:{
        type:mongoose.Types.ObjectId,
        required:true,
        index:true
    },
    productTitle:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    partnerEmail:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    links:[
        {
            title:{
                type:String,
                required:true,
                trim:true
            },
            url:{
                type:String,
                required:true,
                trim:true
            }
        }
    ],

    customerName:{
        type:String,
        required:true,
        trim:true
    },

    customerEmail:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },

    razorpayOrderId:{
        type:String,
        index:true
    },
    razorpayPaymentId:{
        type:String
    },
    razorpaySignature:{
        type:String
    },

    paymentStatus: {
        type: String,
        enum: [
          "pending",
          "success",
          "failed",
        ],
        default: "pending",
        index: true,
    },   

    partnerAmount:{
        type: Number,
        default: 0,
    },
      
    adminAmount:{
        type: Number,
        default: 0,
    }

},{timestamps:true})

const Order = mongoose.model("Order",orderSchema)

export default Order