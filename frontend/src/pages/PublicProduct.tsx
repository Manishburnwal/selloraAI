import { getAllPublicData } from "@/hooks/useGetAllPublicData"

function PublicProduct() {
    getAllPublicData()
  return (
    <div>
      Public Product
    </div>
  )
}

export default PublicProduct
