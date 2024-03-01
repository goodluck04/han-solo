


import { Button } from "../button";
import { useRef, useState } from "react";
import { TvIcon, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./CustomDialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RouteType } from "./Header";

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
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
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

    const [invalidError, setInvalidErrror] = useState(false);

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

    const verificationHandler = async () => {
        // console.log("test")
        // setInvalidErrror(true);

        const verificationNumber = Object.values(verifyNumber).join("");
        if (verificationNumber.length !== 4) {
            setInvalidErrror(true);
            return;
        }
        // await activation({
        //     activation_token: token,
        //     activation_code: verificationNumber,
        // })
        // setOpen(false);
        setRoute("ForgetPassword");
    };

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
        setOpen(!open)
    };



    const form = useForm<UserFormDataEmail>({
        resolver: zodResolver(formSchemaEmail),
        defaultValues: {
            email: "",
        },
    })
    const formPassword = useForm<UserFormDataPassword>({
        resolver: zodResolver(formSchemaPassword),
        defaultValues: {
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchemaEmail>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        setRoute("Register");

    }

    function onSubmitPassword(values: z.infer<typeof formSchemaPassword>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        setRoute("Register");

    }
    return (
        <Dialog open={open}>
            <DialogTrigger className="hidden" onClick={handleToggle}></DialogTrigger>
            <DialogContent>
                <div className="flex justify-between items-center ">
                    <DialogTitle className="ml-[40%] font-bold text-2xl p-1">Verification</DialogTitle>
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
                                                    <Input placeholder="Enter your Email..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex items-center  w-full justify-center">
                                        {/* disbale the button on success of email found and god the otpm */}
                                        <Button className="w-[80%] sm:w-full" type="submit"  >Submit</Button>
                                    </div>
                                </form>
                            </div>
                        </Form>
                    </div>

                    {/* OTP */}
                    {/* show this section only on success of code gette it successfully */}
                    <div className="">
                        <div className="flex flex-col justify-center mt-5">
                            <p className="text-wrap pr-4 text-center">Check your Email inbox as spam for code send to email</p>
                            <TvIcon className="self-center w-12 h-12 my-4" />
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
                        </div>
                        <div className="flex items-center w-full justify-center">
                            <Button className="sm:w-full w-[80%] mt-4" type="submit" onClick={verificationHandler} >Verify Your code</Button>
                        </div>
                    </div>

                    <div>
                        <Form {...formPassword}>
                            <div>
                                <form onSubmit={formPassword.handleSubmit(onSubmitPassword)} className="space-y-8">
                                    <FormField

                                        control={formPassword.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="text-start">
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Enter your password..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex items-center w-full justify-center">
                                        <Button className="w-[80%] sm:w-full" type="submit"  >Sign Up</Button>
                                    </div>
                                </form>
                            </div>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
