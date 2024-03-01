
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
import { Button } from "../button"
import { AmpersandIcon, LogIn, MenuIcon, Power, User, X } from "lucide-react"
import Link from "next/link"

export function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link"><MenuIcon /></Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    {/* <SheetTitle>Edit profile</SheetTitle> */}
                    {/* <SheetDescription>
                        Hello
                    </SheetDescription> */}
                </SheetHeader>
                <div className="grid gap-4 py-4 mt-4">

                    <div className='flex flex-wrap justify-evenly p-2  rounded-sm border gap-4'>
                        <Link className='rounded' href="/new"><User /></Link>
                        <Link className='rounded' href="/"><LogIn /></Link>
                        <Link className='rounded' href="/"><X /></Link>
                        <Link className='rounded' href="/"><AmpersandIcon /></Link>
                        <Link className='rounded' href="/"><Power /></Link>
                        <SheetClose asChild className="">
                            <Button  variant="ghost" type="submit">Login</Button>
                        </SheetClose>
                    </div>
                    <div className='h-full flex flex-col gap-1'>
                        <Link className=' sm:hidden p-1' href="/">Courses</Link>
                        <Link className=' sm:hidden p-1' href="/">Explore</Link>
                        <Link className=' sm:hidden p-1' href="/">About</Link>
                        <Link className=' sm:hidden p-1' href="/">Privacy</Link>
                    </div>
                </div>
                <SheetFooter>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
