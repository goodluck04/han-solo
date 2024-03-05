import { Bell, Swords } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MobileNav } from './MobileNav'
import { Button } from './../ui/button'
import LoginModel from './../auth/LoginModel'
import RegisterModel from './../auth/RegisterModel'
import VerificationModel from './../auth/ActivationModel'
import ForgotPasswordModel from './../auth/ForgotPasswordModel'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import AvatarHolder from '../AvatarHolder'
import { Badge } from '../ui/badge'
import { ThemeToggle } from '../ThemeToggle'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@/firebase'

type Props = {}

export type RouteType = "ForgetPassword" | "ForgetPassword" | "Varification" | "Login" | "Register";

export default function Header({ }: Props) {
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState<RouteType>("Login");
    const {user} = useSelector((action: RootState) => action.auth);


    useEffect(() => {
        // Listen for authentication state changes
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in
            console.log("User is signed in:", user);
            console.log("User ID:", user.uid);
            console.log("User email:", user.email);
            console.log("User display name:", user.displayName);
            console.log("User photo URL:", user.photoURL);
            // Access other user properties as needed
          } else {
            // User is signed out
            console.log("User is signed out");
          }
        });
    
        // Clean up subscription when component unmounts
        return () => {
          unsubscribe();
        };
      }, []); /// Empty dependency array ensures the effect runs only once when the component mounts
    
    
    return (
        <div className='w-full relative border-b h-12'>
            <div className='h-full flex justify-between lg:container '>
                <div className='h-full flex items-center gap-6'>
                    <Link href="/"><Button variant={'ghost'}><Swords /></Button></Link>
                    <div className='h-full hidden sm:flex items-center gap-6'>
                        <Link href="/"><Button variant={'ghost'} size={'sm'}>Home</Button></Link>
                        <Link href="/"><Button variant={'ghost'} size={'sm'}>Feeds</Button></Link>
                        <Link href="/"><Button variant={'ghost'} size={'sm'}>Contest</Button></Link>
                        <Link href="/"><Button variant={'ghost'} size={'sm'}>Practice</Button></Link>
                        <Link href="/"><Button variant={'ghost'} size={'sm'}>B-Schools</Button></Link>
                    </div>
                </div>
                <div className='h-full hidden md:flex items-center gap-6'>
                    <div className='h-full hidden md:flex items-center gap-6 relative'>
                        <div className='relative'>
                            <Button size={'icon'} className='p-1.5' variant={"ghost"} ><Bell /></Button>
                            <Badge variant="secondary" className="absolute -top-0.5 -right-1 px-1.5  bg-green-400">4</Badge>
                        </div>
                    </div>
                    <ThemeToggle />
                    <Button size={'sm'} className={`${user && "rounded-full w-9 h-9"} md:mr-1`} onClick={() => !user && setOpen(true)} variant={'default'}>{user ? <AvatarHolder isHeader /> : "Login"}</Button>
                </div>
                <div className='flex items-center mr-2 md:hidden'>
                    <MobileNav setOpen={setOpen} />
                </div>
            </div>
            <div>

                {route === "Login" && open && <LoginModel open={open} setRoute={setRoute} route={route} setOpen={setOpen} />}
                {route === "Register" && open && <RegisterModel open={open} setRoute={setRoute} route={route} setOpen={setOpen} />}
                {route === "Varification" && open && <VerificationModel open={open} setRoute={setRoute} route={route} setOpen={setOpen} />}
                {route === "ForgetPassword" && open && <ForgotPasswordModel open={open} setRoute={setRoute} route={route} setOpen={setOpen} />}
            </div>
        </div>
    )
}