
import { Button } from "../button";
import { useRef, useState } from "react";
import { TvIcon, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./CustomDialog";
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

export default function VerificationModel({ open, setRoute, setOpen, route }: Props) {

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
                            <p className="my-4 text-center text-wrap">Check your email</p>
                            <TvIcon className="w-12 h-12 my-2 text-red-300 self-center" />
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
                            <Button className="sm:w-full w-[80%] mt-4" type="submit" onClick={verificationHandler} >Sign Up</Button>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
