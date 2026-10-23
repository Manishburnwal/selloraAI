import type { IUser } from "@/App";
import type { Product } from "@/components/product/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface publicState{
    allPublicPartners:IUser[],
    allPublicProducts:Product[]
}

const initialState : publicState = {
    allPublicPartners:[],
    allPublicProducts:[]
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
        }
    }
})

export const {
    
    setAllPublicPartners, 
    setAllPublicProducts

} = publicSlice.actions

export default publicSlice.reducer
