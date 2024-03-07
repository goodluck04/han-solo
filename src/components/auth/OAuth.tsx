import React, { useEffect } from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { toast } from "sonner";
// import {signInSuccess} from "../redux/user/userSlice";
import { signIn } from 'next-auth/react';


type Props = {
  setOpen: (open: boolean) => void;
  setAuth: (auth: boolean) => void ;
}

export default function OAuth({ setAuth }: Props) {
  // const dispatch = useDispatch();
  //   const navigate = useNavigate();



  const handleGoogleClick = async () => {
    signIn("google")
    setAuth(true)

  };

  const handleGitHubClick = async () => {
    signIn("github");
    setAuth(true)
  };


  // Handle the redirect when the component mounts
  // const handleGoogleClick = async () => {
  //   try {
  //     // Initiate the sign-in process with GitHub provider
  //     await signInWithRedirect(auth, googleProvider);
  //   } catch (error) {
  //     console.error("Error during sign-in with redirect:", error);
  //   }
  // };
  // const handleGitHubClick = async () => {
  //   try {
  //     // Initiate the sign-in process with GitHub provider
  //     await signInWithRedirect(auth, githubProvider);
  //   } catch (error) {
  //     console.error("Error during sign-in with redirect:", error);
  //   }
  // };


  return (
    <>

      <div className="flex justify-center my-6 gap-8 ">
        <FcGoogle
          // onClick={handleGoogleClick}
          onClick={handleGoogleClick}
          size={30}
          className="cursor-pointer mr-2 hover:opacity-70"
        />
        <AiFillGithub
          // onClick={handleGitHubClick}
          onClick={handleGitHubClick}
          size={30}
          className="cursor-pointer ml-2 hover:opacity-70"
        />
      </div>
    </>
  );
}
