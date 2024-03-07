
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../CustomDialog";
import { RouteType } from "../header/Header";
import { useVerificationMutation } from "@/redux/features/auth/authApi";
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

export default function VerificationModel({ open, setRoute, setOpen, route }: Props) {

    const [invalidError, setInvalidErrror] = useState(false);
    const [verification, { isLoading, isSuccess, error }] = useVerificationMutation()
    const { temp_token } = useSelector((action: RootState) => action.auth);
    const dispatch = useDispatch();

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
    console.log("activation", temp_token)
    const verificationHandler = async () => {
        const verificationNumber = Object.values(verifyNumber).join("");
        if (verificationNumber.length !== 4) {
            setInvalidErrror(true);
            return;
        }
        await verification({
            activation_token: temp_token,
            activation_code: verificationNumber,
        })
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

    useEffect(() => {
        if (isSuccess) {
            toast.success("Account activated successfully");
            dispatch(resetTempToken());
            setRoute("Login");
        };
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                setInvalidErrror(true);
                toast.error(errorData.data.message || "Something went wrong.");
            } else {
                console.log("[VERIFICATION_ERROR]:", error)
            }
        }
    }, [isSuccess, error, setInvalidErrror]);

    return (
        <Dialog open={open}>
            <DialogTrigger className="hidden" onClick={handleToggle}></DialogTrigger>
            <DialogContent>
                <div className="flex justify-between items-center ">
                    <DialogTitle className="ml-[40%] font-bold text-2xl p-1">Verification</DialogTitle>
                    <Button variant={"ghost"} onClick={handleToggle}><X /></Button>
                </div>
                <DialogHeader>
                    <div className="">
                        <div className="flex flex-col justify-center">
                            <p className="my-4 text-center text-wrap">We have sent you OTP on registered email.Check your email inbox and spam.</p>
                            <ShieldCheck className="w-12 h-12 my-2 text-green-400 self-center" />
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
                            {isLoading ? <ButtonLoading /> : <Button className="sm:w-full w-[80%] mt-4" type="submit" onClick={verificationHandler} >Sign Up</Button>}
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
