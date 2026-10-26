import type { IUser, Order } from "@/App";
import type { Product } from "@/components/product/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface publicState{
    allPublicPartners:IUser[],
    allPublicProducts:Product[],
    allOrders:Order[]
}

const initialState : publicState = {
    allPublicPartners:[],
    allPublicProducts:[],
    allOrders:[]
}

const publicSlice = createSlice({
    name:"public",
    initialState,
    reducers:{
        setAllPublicPartners:(state,action:PayloadAction<IUser[]>)=>{
            state.allPublicPartners=action.payload
        },
        setAllPublicProducts:(state,action:PayloadAction<Product[]>)=>{
            state.allPublicProducts=action.payload
        },
        setAllOrders:(state,action:PayloadAction<Order[]>)=>{
            state.allOrders=action.payload
        },
    }
})

export const {
    
    setAllPublicPartners, 
    setAllPublicProducts,
    setAllOrders

} = publicSlice.actions

export default publicSlice.reducer
