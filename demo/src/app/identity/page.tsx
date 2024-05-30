"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
    const getparams = useSearchParams();
    const token = getparams.get("token");
    return <div>{token}</div>;
};

export default page;
