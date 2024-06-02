"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import jwt from "jsonwebtoken";

const Page = () => {
    const router = useRouter();
    const getparams = useSearchParams();
    const token = getparams.get("token") || "";

    useEffect(() => {
        const verifyToken = async () => {
            if (token.length <= 0) {
                alert("Invalid Token");
                router.push("/signin");
                return;
            }

            try {
                jwt.decode(token);
                router.push("/");
            } catch (e) {
                console.error(e);
                alert("Invalid Token");
                router.push("/signin");
            }
        };

        verifyToken();
    }, [token, router]);

    return (
        <div>
            <h1>Verifying........</h1>
        </div>
    );
};

export default Page;
