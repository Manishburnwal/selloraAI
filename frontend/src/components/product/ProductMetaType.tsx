import { AppWindow, BookOpen, Code2, GraduationCap, LayoutGrid, LayoutTemplate, Package, Sparkles, type LucideIcon } from "lucide-react";
import type { ProductType } from "./types";
import courseImg from "../../assets/courses.png"
import sourceCodeImg from "../../assets/sourcecode.png"
import ebookImg from "../../assets/ebook.png"
import uikitImg from "../../assets/uikit.png"
import templateImg from "../../assets/template.png"
import aipromptImg from "../../assets/aiprompt.png"
import softwareImg from "../../assets/software.png"
import otherImg from "../../assets/other.png"

interface productMetaType{
    label:string,
    icon:LucideIcon,
    className:string,
    thumbnail:string
}

export const PRODUCT_META_TYPES:Record<ProductType,productMetaType> = {
    course:{
        label:"Course",
        icon:GraduationCap,
        className:"bg-amber-50 text-amber-600",
        thumbnail:courseImg
    },
    "source-code":{
        label:"Source Code",
        icon:Code2,
        className:"bg-slate-100 text-slate-600",
        thumbnail:sourceCodeImg
    },
    ebook: {
        label: "Ebook",
        icon: BookOpen,
        className: "bg-blue-50 text-blue-600",
        thumbnail: ebookImg,
    },
    "ui-kit": {
        label: "UI Kit",
        icon: LayoutGrid,
        className: "bg-purple-50 text-purple-600",
        thumbnail: uikitImg,
    },
    template: {
        label: "Template",
        icon: LayoutTemplate,
        className: "bg-teal-50 text-teal-600",
        thumbnail: templateImg,
    },
    "ai-prompt": {
        label: "AI Prompt",
        icon: Sparkles,
        className: "bg-pink-50 text-pink-600",
        thumbnail: aipromptImg,
    },
    software: {
        label: "Software",
        icon: AppWindow,
        className: "bg-indigo-50 text-indigo-600",
        thumbnail: softwareImg,
    },
    other:{
        label:"Other",
        icon:Package,
        className: "bg-gray-100 text-gray-600",
        thumbnail: otherImg
    }
}


const SIZE_CLASSES = {
    sm: { box: "h-9 w-9 rounded-md", icon: "h-4 w-4" },
    md: { box: "h-11 w-11 rounded-lg", icon: "h-5 w-5" },
    lg: { box: "h-16 w-16 rounded-xl", icon: "h-7 w-7" },
    xl: { box: "h-28 w-28 sm:h-32 sm:w-32 rounded-3xl", icon: "h-10 w-10" },
};


interface categoryProps{
    type: ProductType;
    size?: keyof typeof SIZE_CLASSES;
    showIconBadge?: boolean;
    className?: string;
    fill?: boolean;
}

export function CategoryThumbnail({
    type,
    size="md",
    showIconBadge=false,
    className="",
    fill = false
}:categoryProps) {
    const meta = PRODUCT_META_TYPES[type] ?? PRODUCT_META_TYPES.other;
    const Icon = meta.icon;
    const sizing = SIZE_CLASSES[size];
    const boxSizing = fill ? "h-full w-full" : `${sizing.box} shrink-0`;

    return (
        <div className={`relative overflow-hidden ${meta.className} ${boxSizing} ${className}`}>
            <img
            src={meta.thumbnail}
            alt={meta.label}
            className="h-full w-full object-cover"
            />

            {showIconBadge && (
                <div className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center border">
                    <Icon className="w-4 h-4 text-slate-600"/>
                </div>
            )}
        </div>
    )
}