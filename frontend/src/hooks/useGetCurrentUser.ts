import type { IUser } from "@/App"
import type { AppDispatch } from "@/redux/store"
import { setLoading, setUser } from "@/redux/userSlice"
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
                console.log(error)
                dispatch(setLoading(false))
            }
        }

        fetchUser()
    },[])
}