import type { IUser } from "@/App"
import type { AppDispatch } from "@/redux/store"
import { setAdmin, setLoading, setPartner, setUser } from "@/redux/userSlice"
import api from "@/utils/axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const getCurrentUser = ()=>{

    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        const fetchUser = async ()=>{
            try {
                const response = await api.get("/api/me")
                if(!response.data.success){
                    return
                }
                const currentUser : IUser = response?.data?.user

                dispatch(setUser(currentUser))

                dispatch(setLoading(false))
            } catch (error) {
                dispatch(setLoading(false))
                dispatch(setUser(null))
            }
        }


        const fetchAdmin = async ()=>{
            try {
                const response = await api.get("/api/auth/admin")
                if(response.data.success){
                    dispatch(setAdmin(response.data.admin))
                }
            } catch (error) {
                dispatch(setAdmin(null))
            }
        }


        const fetchPartner = async ()=>{
            try {
                const response = await api.get("/api/auth/partner/get")
                if(response.data.success){
                    dispatch(setPartner(response.data.partner))
                }
            } catch (error) {
                dispatch(setPartner(null))
            }
        }

        fetchUser()
        fetchAdmin()
        fetchPartner()

    },[])
}