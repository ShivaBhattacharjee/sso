import React from "react";
import Link from "next/link";
const page = () => {
    return (
        <div className=" flex justify-center items-center min-h-screen">
            <Link href={"/signin"} className=" border-2 border-blue-600 p-3 rounded-md text-center w-72 font-semibold hover:bg-blue-600 duration-200">
                Login
            </Link>
        </div>
    );
};

export default page;
