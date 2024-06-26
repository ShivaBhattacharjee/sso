"use client";
import { Suspense, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

// import Google from "@/components/shared/Google";
import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/types/ErrorType";

const Login = () => {
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirectUrl");
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const { toast } = useToast();
    const bodyParams = {
        email: email,
        password: password,
    };

    const handleSubmit = async () => {
        if (!email || !password) {
            toast({ title: "Error", description: "Please fill all the fields", variant: "destructive" });
            return;
        }
        try {
            setIsLoading(true);
            const res = await axios.post(`${redirectUrl ? `/api/login?redirectUrl=${redirectUrl}` : "/api/login"}`, bodyParams);
            console.log(res);
            console.log(redirectUrl);
            toast({ title: "Login Success", description: "You have successfully logged in" });
            if (res.data.redirectUrl && res?.data?.redirectUrl) {
                router.push(res.data.redirectUrl);
            }
        } catch (err) {
            const ErrorMsg = err as ErrorType;
            toast({ title: "Something went wrong", description: ErrorMsg.response?.data?.message || "Internal server error", variant: "destructive" });
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Suspense fallback={<>Loading....</>}>
            <section className="flex justify-center items-center min-h-screen p-4">
                <div className=" border-2 shadow-lg dark:shadow-white/10 dark:border-white/10 border-black/10 md:w-1/2 lg:w-1/3 w-full rounded-md dark:bg-white/10 bg-black/10 min-h-96 h-auto">
                    <div className="flex flex-col gap-3 h-full p-3">
                        <h1 className=" text-xl uppercase font-bold text-center">Login</h1>
                        <label htmlFor="email" className=" capitalize font-normal text-lg">
                            Email:
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className=" border focus:outline-none border-white/10 p-4 rounded-md" />
                        <label htmlFor="password" className=" capitalize font-normal text-lg">
                            Password:
                        </label>
                        <div className="flex items-center gap-3 border dark:border-white/10 border-black/10 p-4 rounded-md dark:bg-black/30 bg-white">
                            <input onChange={(e) => setPassword(e.target.value)} type={`${isShowPassword ? "text" : "password"}`} placeholder="Enter your password" className=" focus:outline-none w-[93%] bg-transparent " />
                            <div onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <EyeOff /> : <Eye />}</div>
                        </div>
                        <Link href={"/forgot-password"} className=" underline mb-1 text-lg">
                            Forgot Password?
                        </Link>
                        {/* <div className="flex justify-between gap-3">
                        <button className="border-2 justify-center gap-3 flex items-center dark:border-white/10 border-black/10 dark:hover:bg-white/10 dark:bg-black/10 bg-black duration-200 text-white w-full rounded-lg p-3">
                            <div className=" w-6">
                                <Google />
                            </div>
                            <span className=" text-center font-medium uppercase">Google</span>
                        </button>
                        <button className="border-2 justify-center gap-3 flex items-center border-white/10 dark:hover:bg-white/10 dark:bg-black/10 bg-black duration-200 text-white w-full rounded-lg p-3">
                            <GithubIcon />
                            <span className=" text-center uppercase font-medium">Github</span>
                        </button>
                    </div> */}
                        {isLoading ? (
                            <button className=" mb-2 duration-200 p-2 text-black bg-white w-full rounded-md font-semibold flex items-center gap-3 justify-center">
                                <ClipLoader size={20} /> Loading
                            </button>
                        ) : (
                            <button onClick={handleSubmit} className=" mb-2 dark:hover:bg-transparent hover:border-2 dark:hover:border-white duration-200 dark:hover:text-white p-2 text-black bg-white w-full rounded-md font-semibold">
                                Submit
                            </button>
                        )}
                        <div className="flex justify-center text-lg gap-2">
                            <h1>Dont have an account?</h1>
                            {redirectUrl ? (
                                <Link href={`/register?redirectUrl=${redirectUrl}`} className=" underline">
                                    Register
                                </Link>
                            ) : (
                                <Link href="/register" className=" underline">
                                    Register
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Suspense>
    );
};

export default Login;
