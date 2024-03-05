import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
type Props = {
    src?: string;
    alt?: string;
    isHeader?:boolean;
    onClick?:any
}

export default function AvatarHolder({ src, alt,isHeader }: Props) {

    return (
        <Avatar className={`${isHeader && "w-9 h-9 border-yellow-400 border-4"} cursor-pointer hover:opacity-70`} >
            <AvatarImage  src={src ? src : "https://res.cloudinary.com/dkwacgwnd/image/upload/v1709613419/s8bkezrj2xchesgr6wte.png"} alt="@shadcn" />
            <AvatarFallback>{alt ? alt : "NA"}</AvatarFallback>
        </Avatar>
    )
}