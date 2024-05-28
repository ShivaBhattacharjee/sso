"use client";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/types/ErrorType";
const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const handleRequestResetPassword = async () => {
        if (!email) {
            toast({ title: "Error", description: "Please enter your email", variant: "destructive" });
            return;
        }
        try {
            setIsLoading(true);
            const res = await axios.post("/api/forgot-password", { email: email });
            console.log(res);
            toast({ title: "Success", description: res.data.message });
        } catch (error) {
            const ErrorMsg = error as ErrorType;
            toast({ title: "Error", description: ErrorMsg.response?.data?.message || "Internal server error", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <section className="flex justify-center items-center min-h-screen p-4">
            <div className=" border-2 dark:border-white/10 border-black/10 md:w-1/3 w-full rounded-md dark:bg-white/10 bg-black/10  h-auto">
                <div className="flex  flex-col gap-3 h-full p-3">
                    <h1 className=" text-xl uppercase font-bold text-center">Password Recovery</h1>
                    <label htmlFor="Email">Enter Your Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className=" border focus:outline-none border-white/10 p-4 rounded-md" />
                    {isLoading ? (
                        <button className=" mb-2 duration-200 p-2 text-black bg-white w-full rounded-md font-semibold flex items-center gap-3 justify-center">
                            <ClipLoader size={20} /> Loading
                        </button>
                    ) : (
                        <button onClick={handleRequestResetPassword} className=" mb-2 dark:hover:bg-transparent hover:border-2 dark:hover:border-white duration-200 dark:hover:text-white p-2 text-black bg-white w-full rounded-md font-semibold">
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Login;
