import { AmpersandIcon, Flag, LogIn, PiIcon, Power, User, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { MobileNav } from './MobileNav'
import { Button } from '../button'
import LoginModel from './LoginModel'
import RegisterModel from './RegisterModel'
import VerificationModel from './ActivationModel'
import ForgotPasswordModel from './ForgotPasswordModel'

type Props = {}

export type RouteType = "ForgetPassword" | "ForgetPassword" | "Varification" | "Login" | "Register" ;

export default function Header({ }: Props) {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState<RouteType>("ForgetPassword");
    // const [activeItem, setActiveItem] = useState(0);
    // console.log(route)

    return (
        <div className='w-full relative border-b h-12'>
            <div className='h-full flex justify-between lg:container '>
                <div className='h-full flex items-center gap-6'>
                    <Link className='ml-2 hover:bg-blue-100 py-1 px-2 rounded delay-100 transition font-bold' href="/"><PiIcon /></Link>
                    <Link className='hidden sm:block hover:bg-blue-100 py-1 px-2 rounded delay-100 transition' href="/">Courses</Link>
                    <Link className='hidden sm:block hover:bg-blue-100 py-1 px-2 rounded delay-100 transition' href="/">Explore</Link>
                    <Link className='hidden sm:block hover:bg-blue-100 py-1 px-2 rounded delay-100 transition' href="/">About</Link>
                    <Link className='hidden sm:block hover:bg-blue-100 py-1 px-2 rounded delay-100 transition' href="/">Privacy</Link>
                </div>
                <div className='h-full hidden md:flex items-center gap-6'>
                    <Link className='hover:bg-blue-200 p-1 rounded-sm delay-100 transition' href="/"><User /></Link>
                    <Link className='hover:bg-blue-200 p-1 rounded-sm delay-100 transition' href="/"><LogIn /></Link>
                    <Link className='hover:bg-blue-200 p-1 rounded-sm delay-100 transition' href="/"><X /></Link>
                    <Link className='hover:bg-blue-200 p-1 rounded-sm delay-100 transition' href="/"><AmpersandIcon /></Link>
                    <Button className='hover:bg-blue-200 mr-1 rounded-sm delay-100 transition  ' onClick={() => setOpen(true)} variant={'ghost'}>Login</Button>
                </div>
                <div className='flex items-center mr-2 md:hidden'>
                    <MobileNav />
                </div>
            </div>
            <div>

                {route === "Login" && open &&<LoginModel open={open} setRoute={setRoute} route={route} setOpen={setOpen} />} 
                {route === "Register" && open &&<RegisterModel open={open} setRoute={setRoute} route={route} setOpen={setOpen} />}
                {route === "Varification" && open &&<VerificationModel open={open} setRoute={setRoute} route={route} setOpen={setOpen} />}
                {route === "ForgetPassword" && open && <ForgotPasswordModel open={open} setRoute={setRoute} route={route} setOpen={setOpen} />}
            </div>
        </div>
    )
}