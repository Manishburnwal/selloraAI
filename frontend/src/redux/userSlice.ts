import type { IAdmin, IUser } from "@/App";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface IUserState{
    user:IUser | null;
    loading:boolean;
    admin:IAdmin | null;
    partner:IUser | null;
}

const initialState : IUserState = {
    user:null,
    loading:true,
    admin:null,
    partner:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<IUser | null>)=>{
            state.user = action.payload
        },
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.loading = action.payload
        },
        logoutUser:(state)=>{
            state.user = null,
            state.partner = null
        },
        setAdmin:(state,action:PayloadAction<IAdmin | null>)=>{
            state.admin = action.payload
        },
        setPartner:(state,action:PayloadAction<IUser | null>)=>{
            state.partner = action.payload
        },
    }
})

export const {
    setUser,
    setLoading,
    logoutUser,
    setAdmin,
    setPartner
} = userSlice.actions

export default userSlice.reducer
