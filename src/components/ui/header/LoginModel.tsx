
import { Button } from "../button";
import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./CustomDialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { RouteType } from "./Header";
import AvatarHolder from "@/components/AvatarHolder";

type Props = {
    open: boolean;
    route: string;
    setRoute: (route:RouteType) => void;
    setOpen: (open: boolean) => void;
};

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

type UserFormData = z.infer<typeof formSchema>;


export default function LoginModel({ open, setRoute, setOpen }: Props) {

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        setRoute("Register");

    }

    const handleToggle = () => {
        setOpen(!open)
    };


    return (
        <Dialog open={open}>
            <DialogTrigger className="hidden" onClick={handleToggle}></DialogTrigger>
            <DialogContent>
                <div className="flex justify-between items-center ">
                    <DialogTitle className="ml-[45%] font-bold text-2xl p-1">Login</DialogTitle>
                    <Button variant={"ghost"} onClick={handleToggle}><X /></Button>
                </div>
                <DialogHeader>
                    <Form {...form}>
                        <div>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField

                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="text-start">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your Email..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField

                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="text-start">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter yourn password..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="">
                                    <div className="text-end  -mt-8  text-red-500">
                                        <p className="hover:underline cursor-pointer">forgotten password ?</p>
                                    </div>
                                    <div className="font-bold text-center text-slate-500  underline">OR</div>
                                    <div className="flex justify-center my-2 gap-12">
                                        <AvatarHolder src="https://github.com/shadcn.png" alt="G+" />
                                        <AvatarHolder src="https://github.com/shadcn.png" alt="Git" />
                                    </div>
                                    <div className="text-end -mb-8 text-red-500">
                                        <p className="hover:underline cursor-pointer">Don&rsquo;t have an Account ?</p>
                                    </div>
                                </div>
                                <div className="flex items-center w-full justify-center">
                                    <Button className="w-full" type="submit"  >Sign Up</Button>
                                </div>
                            </form>
                        </div>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
