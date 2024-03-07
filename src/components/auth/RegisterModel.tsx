
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../CustomDialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AvatarHolder from "@/components/AvatarHolder";
import { RouteType } from "../header/Header";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { ButtonLoading } from "../LoadingButton";
import { useDispatch } from "react-redux";
import OAuth from "./OAuth";

type Props = {
    open: boolean;
    route: string;
    setRoute: (route: RouteType) => void;
    setOpen: (open: boolean) => void;

};

const formSchema = z.object({
    email: z.string().email().min(0, {
        message: "Enter a must valid email.",
    }),
    phone: z.string().min(10, {
        message: "Phone Number must be  10 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

type UserFormData = z.infer<typeof formSchema>;

export default function RegisterModel({ open, setRoute, setOpen }: Props) {

    const [register, { isSuccess, error, isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();

    const handleToggle = () => {
        setOpen(!open)
    };


    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            phone: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await register(values);
    }

    const loginRedirectHandler = () => {
        setRoute("Login");
    }



    useEffect(() => {
        if (isSuccess) {
            toast.success("Registration successful");
            setRoute("Varification");

        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message || "something went wrong.");
            } else {
                console.log("[REGISTER_ERROR]:", error);
            }
        }
    }, [isSuccess, error])


    return (
        <Dialog open={open}>
            <DialogTrigger className="hidden" onClick={handleToggle}></DialogTrigger>
            <DialogContent>
                <div className="flex justify-between items-center ">
                    <DialogTitle className="font-bold text-2xl p-1">Register</DialogTitle>
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
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="text-start">
                                            <FormLabel>Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your phone Number..." {...field} />
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
                                <div className="font-bold text-center text-slate-500  underline">Or join with</div>
                                    {/* <div className="flex justify-center my-6 gap-8 ">
                                            <FcGoogle
                                                onClick={() => signIn("google")}
                                                size={30} className="cursor-pointer mr-2 hover:opacity-70" />
                                            <AiFillGithub
                                                onClick={() => signIn("github")}
                                                size={30} className="cursor-pointer ml-2 hover:opacity-70" />
                                    </div> */}
                                    <OAuth  setOpen={setOpen} />
                                    <div className="text-end -mb-7 text-red-500">
                                        <p className="hover:underline cursor-pointer" onClick={loginRedirectHandler}>Already have an Account ?</p>
                                    </div>
                                </div>
                                <div className="flex items-center w-full justify-center">
                                    {isLoading ? <ButtonLoading /> : <Button className="w-full" type="submit">Sign Up</Button>}
                                </div>
                            </form>
                        </div>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
