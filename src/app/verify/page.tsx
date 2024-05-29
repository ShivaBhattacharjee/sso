"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/types/ErrorType";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import Link from "next/link";
import Confetti from "react-confetti";
const page = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(true);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const handleVerify = async () => {
        if (!token) {
            toast({ title: "Error", description: "Invalid token", variant: "destructive" });
            router.push("/");
            return;
        }
        try {
            const res = await axios.post("/api/register/verify-user", { token: token });
            console.log(res);
            toast({ title: "Success", description: res.data.message });
            setIsVerified(true);
        } catch (error) {
            console.log(error);
            const ErrorMsg = error as ErrorType;
            toast({ title: "Error", description: ErrorMsg.response?.data?.message || "Something went wrong", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (token) {
            handleVerify();
        }
    }, [token]);
    return (
        <div>
            {loading ? (
                <div className="flex justify-center text-white items-center min-h-screen">
                    <MoonLoader size={40} color="white" />
                </div>
            ) : (
                <>
                    {isVerified ? (
                        <>
                            <Confetti width={globalThis.innerWidth > 600 ? 800 : globalThis.innerWidth} className=" lg:m-auto" />
                            <div className="flex flex-col justify-center text-white items-center min-h-screen">
                                <h1 className="text-2xl">Your account has been verified</h1>
                                <Link href={"/login"} className=" w-44 rounded-md text-center font-normal dark:bg-white dark:text-black text-white bg-black p-2">
                                    Login
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center text-red-500 items-center min-h-screen">
                            <h1 className="text-2xl">Invalid token</h1>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default page;
