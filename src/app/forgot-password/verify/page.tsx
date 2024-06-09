"use client";
import { Suspense, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/types/ErrorType";
const Login = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();
    const handleResetPassword = async () => {
        if (!newPassword) {
            toast({ title: "Error", description: "Please enter a new password", variant: "destructive" });
            return;
        }
        try {
            setIsLoading(true);
            const res = await axios.post("/api/forgot-password/verify", { token: token, password: newPassword });
            console.log(res);
            toast({ title: "Success", description: res.data.message || "Password reset successfully" });
            router.push("/login");
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            const ErrorMsg = error as ErrorType;
            toast({ title: "Error", description: ErrorMsg.response?.data?.message || "Something went wrong", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, []);
    return (
        <Suspense fallback={<>Loading....</>}>
            <section className="flex justify-center items-center min-h-screen p-4">
                {!token ? (
                    <div className="flex justify-center items-center min-h-screen text-red-500">
                        <h1 className=" text-xl font-medium uppercase">Invalid Token</h1>
                    </div>
                ) : (
                    <div className=" border-2 dark:border-white/10 border-black/10 md:w-1/2 lg:w-1/3 w-full rounded-md dark:bg-white/10 bg-black/10  h-auto">
                        <div className="flex flex-col gap-3 h-full p-3">
                            <h1 className=" text-xl uppercase font-bold text-center">Reset Password</h1>
                            <label htmlFor="password" className=" capitalize font-normal text-lg">
                                Password:
                            </label>
                            <div className="flex items-center gap-3 border dark:border-white/10 border-black/10 p-4 rounded-md dark:bg-black/30 bg-white">
                                <input onChange={(e) => setNewPassword(e.target.value)} type={`${isShowPassword ? "text" : "password"}`} placeholder="Enter a new password" className=" focus:outline-none w-[93%] bg-transparent " />
                                <div onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <EyeOff /> : <Eye />}</div>
                            </div>

                            {isLoading ? (
                                <button className=" mb-2 duration-200 p-2 text-black bg-white w-full rounded-md font-semibold flex items-center gap-3 justify-center">
                                    <ClipLoader size={20} /> Loading
                                </button>
                            ) : (
                                <button onClick={handleResetPassword} className=" mb-2 dark:hover:bg-transparent hover:border-2 dark:hover:border-white duration-200 dark:hover:text-white p-2 text-black bg-white w-full rounded-md font-semibold">
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </Suspense>
    );
};

export default Login;
