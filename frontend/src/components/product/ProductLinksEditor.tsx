import { Link2, Plus, Trash } from "lucide-react"
import type { ProductLinkItem } from "./types"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface productLinksProps{
    links:ProductLinkItem[],
    onChange:(links:ProductLinkItem[])=>void
}

function ProductLinksEditor({links, onChange}) {

    const updateLink = (index:number, key:keyof ProductLinkItem, value:string)=>{
        const updateLinks = [...links];
        updateLinks[index] = {...updateLinks[index], [key]:value}
        onChange(updateLinks)
    }

    const addLinks = ()=>onChange([...links, {title:"", url:""}])
    const removeLink = (index:number)=>onChange(links.filter((_,i)=>i!==index))
  return (
    <div className="space-y-3">
        <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-indigo-600"/>
                <h2 className="text-base sm:text-lg font-semibold text-slate-900">Product Links</h2>
            </div>

            <button 
            onClick={addLinks}
            type="button" className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 shrink-0">
                <Plus className="h-4 w-4"/>
                <span className="hidden sm:inline">Add Link</span>
                <span className="sm:hidden">Add</span>
            </button>
        </div>
        {links.length===0 && (
            <p className="text-sm text-slate-400">No links added yet. Add documentation, demo, or support links for customers.</p>
        )}

        <div className="space-y-3">
            {links.map((link,index)=>(
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 rounded-md border sm:border-0 p-3 sm:p-0">
                    <Input
                    value={link.title}
                    onChange={(e)=>updateLink(index,"title",e.target.value)}
                    placeholder="Link Title (e.g. Documentation)"
                    className="sm:w-56"/>

                    <div className="flex items-center gap-2 flex-1">
                        <div className="relative flex-1">
                            <Link2 className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                            <Input 
                            value={link.url}
                            onChange={(e)=>updateLink(index,"url",e.target.value)}
                            className="pl-9" placeholder="https://..."/>
                        </div>

                        <Button 
                        onClick={()=>removeLink(index)}
                        size="icon"
                        type="button"
                        variant="ghost"
                        className="text-slate-400 hover:text-red-500 shrink-0">
                            <Trash className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default ProductLinksEditor
