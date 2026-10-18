import { useState } from "react";

type view = 
| "list"
| "create"
| "edit";

function ProductPanel() {
    const [view,setView] = useState<view>("list")
  return (
    <div className="">
        
    </div>
  )
}

export default ProductPanel
