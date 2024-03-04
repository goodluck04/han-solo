
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AmpersandIcon, Bell, LogIn, MenuIcon, Power, Swords, User, X } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ThemeToggle } from "../ThemeToggle"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import AvatarHolder from "../AvatarHolder"



export function MobileNav() {
    const [open, setOpen] = useState(false);
    const user = useSelector((action: RootState) => action.auth.user);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link"><MenuIcon /></Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                </SheetHeader>
                <div className="grid gap-4 py-4 mt-4">
                    <div className='flex flex-wrap justify-evenly p-2  rounded-sm border gap-4'>
                        <div className='relative'>
                            <Button size={'icon'} className='p-1.5' variant={"ghost"} ><Bell /></Button>
                            <Badge variant="secondary" className="absolute -top-0.5 -right-1 px-1.5  bg-green-400">4</Badge>
                        </div>
                        <ThemeToggle />
                        <Button size={'sm'} className={`${user && "rounded-full w-9 h-9"} md:mr-1`} onClick={() => setOpen(true)} variant={'default'}>{user ? <AvatarHolder isHeader /> : "Login"}</Button>
                        {/* <SheetClose asChild className="">
                            <Button variant="ghost" type="submit">Log Out</Button>
                        </SheetClose> */}
                    </div>
                    <div className='h-full sm:hidden flex flex-col gap-1 items-start text-start'>
                        <Link className='' href="/"><Button variant={'ghost'} size={'sm'}>Home</Button></Link>
                        <Link className='' href="/"><Button variant={'ghost'} size={'sm'}>Feeds</Button></Link>
                        <Link className='' href="/"><Button variant={'ghost'} size={'sm'}>Contest</Button></Link>
                        <Link className='' href="/"><Button variant={'ghost'} size={'sm'}>Practice</Button></Link>
                        <Link className='' href="/"><Button variant={'ghost'} size={'sm'}>B-Schools</Button></Link>

                    </div>
                </div>
                <SheetFooter>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
