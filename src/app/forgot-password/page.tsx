"use client";
import React from "react";
const Login = () => {
    return (
        <section className="flex justify-center items-center min-h-screen p-4">
            <div className=" border-2 dark:border-white/10 border-black/10 md:w-1/3 w-full rounded-md dark:bg-white/10 bg-black/10  h-auto">
                <div className="flex  flex-col gap-3 h-full p-3">
                    <h1 className=" text-xl uppercase font-bold text-center">Password Recovery</h1>
                    <label htmlFor="Email">Enter Your Email</label>
                    <input type="email" placeholder="Enter your email" className=" border focus:outline-none border-white/10 p-4 rounded-md" />
                    <button className=" mb-2 dark:hover:bg-transparent hover:border-2 dark:hover:border-white duration-200 dark:hover:text-white p-2 text-black bg-white w-full rounded-md font-semibold">Submit</button>
                </div>
            </div>
        </section>
    );
};

export default Login;
