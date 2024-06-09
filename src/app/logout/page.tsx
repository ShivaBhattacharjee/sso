"use client";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/types/ErrorType";
const Logout = () => {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirectUrl");
    const [Loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${redirectUrl ? `/api/logout?redirectUrl=${redirectUrl}` : "/api/logout"}`);
            console.log(res);
            toast({ title: "Success", description: res.data.message });
            if (redirectUrl) {
                router.push(redirectUrl);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            const ErrorMsg = error as ErrorType;
            toast({ title: "Error", description: ErrorMsg.response?.data?.message || "Something went wrong", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen">
            {Loading ? (
                <button className=" mb-2 w-1/2 duration-200 p-2 text-black bg-white  rounded-md font-semibold flex items-center gap-3 justify-center">
                    <ClipLoader size={20} /> Loading
                </button>
            ) : (
                <button onClick={handleLogout} className=" mb-2 dark:hover:bg-transparent hover:border-2 dark:hover:border-white duration-200 dark:hover:text-white p-2 text-black bg-white w-1/2 rounded-md font-semibold">
                    Logout
                </button>
            )}
        </div>
    );
};

export default Logout;
