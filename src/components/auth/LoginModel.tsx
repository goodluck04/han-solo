
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../CustomDialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { RouteType } from "../header/Header";
import { toast } from "sonner";
import { ButtonLoading } from "../LoadingButton";
import OAuth from "./OAuth";


type Props = {
    open: boolean;
    route: string;
    setRoute: (route: RouteType) => void;
    setOpen: (open: boolean) => void;
    setAuth: (auth:boolean)=>void;
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


export default function LoginModel({ open, setRoute, setOpen, setAuth }: Props) {

    const [login, { isLoading, data, error, isSuccess }] = useLoginMutation();

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values)
        await login(values)
    }

    const handleToggle = () => {
        setOpen(!open)
    };

    const forgetPasswordHandler = () => {
        setRoute("ForgetPassword");
    }

    const registerRedirectHandler = () => {
        setRoute("Register");
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            toast.success("Login Successfully");
            // reftch user

        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            } else {
                console.log("[LOGIN_ERROR]:", error)
            }
        }
    }, [isSuccess, error]);



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
                                        <p onClick={forgetPasswordHandler} className="hover:underline cursor-pointer">forgotten password ?</p>
                                    </div>
                                    <div className="font-bold text-center text-slate-500  underline">Or join with</div>
                                    {/* <div className="flex justify-center my-6 gap-8 ">
                                            <FcGoogle
                                                onClick={() => signIn("google")}
                                                size={30} className="cursor-pointer mr-2 hover:opacity-70" />
                                            <AiFillGithub
                                                onClick={() => signIn("github")}
                                                size={30} className="cursor-pointer ml-2 hover:opacity-70" />
                                    </div> */}
                                    <OAuth setAuth={setAuth} setOpen={setOpen} />
                                    <div className="text-end -mb-8 text-red-500">
                                        <p onClick={registerRedirectHandler} className="hover:underline cursor-pointer">Don&rsquo;t have an Account ?</p>
                                    </div>
                                </div>
                                <div className="flex items-center w-full justify-center">
                                    {isLoading ? <ButtonLoading /> : <Button className="w-full" type="submit"  >Sign Up</Button>}
                                </div>
                            </form>
                        </div>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
