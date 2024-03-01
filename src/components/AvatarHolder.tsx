import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {
    src: string;
    alt: string;
}

export default function AvatarHolder({ src, alt }: Props) {

    return (
        <Avatar>
            <AvatarImage src={src} alt="@shadcn" />
            <AvatarFallback>{alt}</AvatarFallback>
        </Avatar>
    )
}