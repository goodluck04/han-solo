import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {
    src?: string;
    alt?: string;
    isHeader?:boolean;
}

export default function AvatarHolder({ src, alt,isHeader }: Props) {

    return (
        <Avatar className={`${isHeader && "w-9 h-9 border-yellow-400 border-4"}`} >
            <AvatarImage  src={src ? src : "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>{alt ? alt : "NA"}</AvatarFallback>
        </Avatar>
    )
}