"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
const Login = () => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    return (
        <section className="flex justify-center items-center min-h-screen p-4">
            <div className=" border-2 dark:border-white/10 border-black/10 md:w-1/2 lg:w-1/3 w-full rounded-md dark:bg-white/10 bg-black/10  h-auto">
                <div className="flex flex-col gap-3 h-full p-3">
                    <h1 className=" text-xl uppercase font-bold text-center">Reset Password</h1>
                    <label htmlFor="password" className=" capitalize font-normal text-lg">
                        Password:
                    </label>
                    <div className="flex items-center gap-3 border dark:border-white/10 border-black/10 p-4 rounded-md dark:bg-black/30 bg-white">
                        <input type={`${isShowPassword ? "text" : "password"}`} placeholder="Enter a new password" className=" focus:outline-none w-[93%] bg-transparent " />
                        <div onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <EyeOff /> : <Eye />}</div>
                    </div>

                    <button className=" mb-2 dark:hover:bg-transparent hover:border-2 dark:hover:border-white duration-200 dark:hover:text-white p-2 text-black bg-white w-full rounded-md font-semibold">Submit</button>
                </div>
            </div>
        </section>
    );
};

export default Login;
