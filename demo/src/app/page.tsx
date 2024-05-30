"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { getUser } from "@/server/actions";
const page = () => {
    const cookie = getCookie("token") || "";
    const [user, setUser] = React.useState({} as any); // Add type assertion here
    const getUserProfile = async () => {
        if (cookie) {
            const decodedToken = jwt.decode(cookie) as jwt.JwtPayload; // Add type assertion here
            if (!decodedToken) {
                alert("Invalid Token");
            }
            if (decodedToken && decodedToken.username) {
                const user = await getUser(decodedToken.username);
                setUser(user);
                console.log(user);
            }
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div className=" flex justify-center items-center min-h-screen">
            {cookie ? (
                <div className="flex flex-col gap-4 text-center">
                    <Link href={"/signin"} className=" border-2 border-blue-600 p-3 rounded-md text-center w-72 font-semibold hover:bg-blue-600 duration-200">
                        You are logged in
                    </Link>

                    <h1>Profile Information</h1>
                    {JSON.stringify(user)}
                </div>
            ) : (
                <Link href={"/signin"} className=" border-2 border-blue-600 p-3 rounded-md text-center w-72 font-semibold hover:bg-blue-600 duration-200">
                    Login
                </Link>
            )}
        </div>
    );
};

export default page;
