


import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, TvIcon, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../CustomDialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RouteType } from "../header/Header";
import { useChangePasswordMutation, useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { ButtonLoading } from "../LoadingButton";
import { resetTempToken } from "@/redux/features/auth/authSlice";

type Props = {
    open: boolean;
    route: string;
    setRoute: (route: RouteType) => void;
    setOpen: (open: boolean) => void;
};

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
};


const formSchemaEmail = z.object({
    email: z.string().email().min(2, {
        message: "email must be at least 2 characters.",
    }),

})


const formSchemaPassword = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})


type UserFormDataEmail = z.infer<typeof formSchemaEmail>;
type UserFormDataPassword = z.infer<typeof formSchemaPassword>;



export default function ForgotPasswordModel({ open, setRoute, setOpen, route }: Props) {

    const dispatch = useDispatch();
    const [invalidError, setInvalidErrror] = useState(false);
    const [forgotPassord, { isLoading: forgotLoading, isSuccess: forgotSuccess, data: forgotData, error: forgotError }] = useForgotPasswordMutation();
    const [changePassword, { isLoading, isSuccess, data, error }] = useChangePasswordMutation();
    const { temp_token } = useSelector((state: RootState) => state.auth)
    const inputRef = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: "",
        1: "",
        2: "",
        3: "",
    })

    const handleInputChange = (index: number, value: string) => {

        setInvalidErrror(false);
        const newVerifyNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifyNumber);

        if (value === "" && index > 0) {
            inputRef[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRef[index + 1].current?.focus();
        }
    };

    const handleToggle = () => {
        setOpen(!open);
        setRoute("Login");
    };

    // forgot password schema
    const form = useForm<UserFormDataEmail>({
        resolver: zodResolver(formSchemaEmail),
        defaultValues: {
            email: "",
        },
    })
    // change password schema
    const formPassword = useForm<UserFormDataPassword>({
        resolver: zodResolver(formSchemaPassword),
        defaultValues: {
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchemaEmail>) {
        await forgotPassord(values);

    }
    async function onSubmitPassword(values: z.infer<typeof formSchemaPassword>) {
        // check otp varification
        const verificationNumber = Object.values(verifyNumber).join("");
        if (verificationNumber.length !== 4) {
            setInvalidErrror(true);
            return;
        }

        await changePassword({
            activation_code: verificationNumber,
            activation_token: temp_token,
            newPassword: values.password
        })
    }

    useEffect(() => {
        if (forgotSuccess) {
            // setOpen(false);
            toast.success("OTP sent on your email.");
        }
        if (forgotError) {
            if ("data" in forgotError) {
                const errorData = forgotError as any;
                toast.error(errorData.data.message || "Something went wrong");
            } else {
                console.log("[FORGOT_ERROR]:", forgotError)
            }
        }
    }, [forgotSuccess, forgotError]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password changed successfully.");
            dispatch(resetTempToken())
            setRoute("Login");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                if (errorData.data.message === "Invalid activation code") {
                    setInvalidErrror(true);
                    toast.error(errorData.data.message || "Something went wrong");
                } else {
                    toast.error("something went wrong.Please try again...");
                }
            } else {
                console.log("[CHANGE_PASSWORD_ERROR]:", error)
            }
        }

    }, [isSuccess, error]);


    return (
        <Dialog open={open}>
            <DialogTrigger className="hidden" onClick={handleToggle}></DialogTrigger>
            <DialogContent>
                <div className="flex justify-between items-center ">
                    <DialogTitle className="ml-[40%] font-bold text-2xl p-1">Forgot Password</DialogTitle>
                    <Button variant={"ghost"} onClick={handleToggle}><X /></Button>
                </div>
                <DialogHeader>
                    <div>
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
                                                    <Input disabled={forgotSuccess} placeholder="Enter your Email..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex items-center  w-full justify-center">
                                        {forgotLoading ? <ButtonLoading /> : <Button disabled={forgotSuccess} className="w-[80%] sm:w-full" type="submit"  >Submit</Button>}
                                    </div>
                                </form>
                            </div>
                        </Form>
                    </div>
                    {/* OTP */}
                    {/* show this section only on success of code gette it successfully */}
                    {forgotSuccess && <div className="">
                        <div className="flex flex-col justify-center mt-5">
                            <p className="text-wrap pr-4 text-center">Check your Email inbox as spam for code send to email</p>
                            <ShieldCheck className="self-center w-12 h-12 my-4 text-green-400" />
                        </div>
                        <div className="flex container gap-1 items-center justify-center">
                            {Object.keys(verifyNumber).map((key, index) => (
                                <input
                                    type="number"
                                    ref={inputRef[index]}
                                    key={key}
                                    className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${invalidError ? "shake border-red-500" : "dark:border-white border-[#0000004a]"}`}
                                    placeholder=""
                                    maxLength={1}
                                    value={verifyNumber[key as keyof VerifyNumber]}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                            ))}
                        </div>
                        <div>
                            <Form {...formPassword}>
                                <div className="my-4">
                                    <form onSubmit={formPassword.handleSubmit(onSubmitPassword)} className="space-y-8">
                                        <FormField
                                            control={formPassword.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className="text-start">
                                                    <FormLabel>Password New Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Enter your password..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex items-center  w-full justify-center">
                                            {isLoading ? <ButtonLoading /> : <Button className="w-[80%] sm:w-full" type="submit"  >Submit</Button>}
                                        </div>
                                    </form>
                                </div>
                            </Form>
                        </div>
                    </div>}

                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
