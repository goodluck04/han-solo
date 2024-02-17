"use client"
import { Button } from "@/components/ui/button";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";


export default function Home() {
  const dispatch = useDispatch()
  return (
    <div>
      <Button onClick={
        () => dispatch(userLoggedIn({accessToken:"lsnfklnfwbgwjgwle", user:"goodluck"}))
      }>Hello</Button>
    </div>
  );
}
