"use client"
import { HeaderLoader } from "@/components/HeaderLoader";
import Header from "@/components/header/Header";
import UnAuthHeader from "@/components/header/UnAuthHeader";
import { useUserInfoQuery } from "@/redux/features/user/userApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


export default function Home() {
  const { data: currentUser, isLoading, refetch } = useUserInfoQuery({});
  const { token } = useSelector((state: RootState) => state.auth);
  if (isLoading) {
    return <HeaderLoader />;
  }
  return (
    <div>

      {currentUser || token ? <>
        <Header />
        <h1>hi</h1>        
      </> : <UnAuthHeader refetch={refetch} />
      }
    </div>
  );
}
