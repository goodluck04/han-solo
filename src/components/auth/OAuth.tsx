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
import { app } from "@/firebase";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { toast } from "sonner";
// import {signInSuccess} from "../redux/user/userSlice";

type Props = {
  setOpen: (open: boolean) => void;
}

export default function OAuth({ }: Props) {
  // const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const auth = getAuth(app);

  // const handleGoogleClick = async () => {
  //   await signInWithPopup(auth, googleProvider).then((response) => {
  //     console.log(response)
  //   }).catch((error) => {
  //     if (error.code === 'auth/account-exists-with-different-credential') {
  //       toast.error("please login using github account.")
  //     }
  //     else {
  //       console.log("[GOOGLE_AUTH_ERROR]:", error)
  //     }
  //   })
  // };

  // const handleGitHubClick = async () => {
  //   await signInWithRedirect(auth, githubProvider).then((response) => {
  //     console.log(response)
  //   }).catch((error) => {
  //     if (error.code === 'auth/account-exists-with-different-credential') {
  //       toast.error("please login using google account.")
  //     }
  //     else {
  //       console.log("[GITHUB_AUTH_ERROR]:", error)
  //     }
  //   })
  // };

 
    // Handle the redirect when the component mounts
    const handleGoogleClick = async () => {
      try {
        // Initiate the sign-in process with GitHub provider
        await signInWithRedirect(auth, googleProvider);
      } catch (error) {
        console.error("Error during sign-in with redirect:", error);
      }
    };
    const handleGitHubClick = async () => {
      try {
        // Initiate the sign-in process with GitHub provider
        await signInWithRedirect(auth, githubProvider);
      } catch (error) {
        console.error("Error during sign-in with redirect:", error);
      }
    };


  return (
    <>

      <div className="flex justify-center my-6 gap-8 ">
        <FcGoogle
          onClick={handleGoogleClick}
          size={30}
          className="cursor-pointer mr-2 hover:opacity-70"
        />
        <AiFillGithub
          onClick={handleGitHubClick}
          size={30}
          className="cursor-pointer ml-2 hover:opacity-70"
        />
      </div>
    </>
  );
}
