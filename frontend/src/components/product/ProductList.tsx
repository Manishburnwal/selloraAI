interface productlistProps{
    onCreateClick: ()=>void
    onEditClick: (product)=>void
    onDeleteClick: (product)=>void
}


function ProductList({
    onCreateClick,
    onEditClick,
    onDeleteClick
}:productlistProps) {
  return (
    <div className="">
    
    </div>
  )
}

export default ProductList
