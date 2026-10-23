import { setAllPublicPartners, setAllPublicProducts } from "@/redux/publicSlice"
import type { AppDispatch } from "@/redux/store"
import api from "@/utils/axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const getAllPublicData = ()=>{

    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        const getAllPartners = async ()=>{
            try {
                const response = await api.get("/api/auth/partner/all")
                if(response.data.success){
                    dispatch(setAllPublicPartners(response.data?.partners ?? []))
                }
            } catch (error) {
                console.log(error)
                dispatch(setAllPublicPartners([]))
            }
        }

        const getAllProducts = async ()=>{
            try {
                const response = await api.get("/api/public-product/all-public")
                if(response.data.success){
                    dispatch(setAllPublicProducts(response.data?.products ?? []))
                }
            } catch (error) {
                console.log(error)
                dispatch(setAllPublicProducts([]))
            }
        }

        getAllPartners()
        getAllProducts()
    },[])
}