import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ErrorType } from "@/types/ErrorType";

export function GET() {
    const cookieStore = cookies();

    try {
        // const response = NextResponse.json({
        //     message: "Logout Successful",
        //     success: true,
        // });

        const token = cookieStore.get("token");

        if (token === undefined || token === null) {
            return NextResponse.json(
                { error: "No token found", success: false },
                {
                    status: 400,
                },
            );
        } else {
            cookies().delete("token");
            return NextResponse.json(
                { message: "Logout Successful", success: true },
                {
                    status: 200,
                },
            );
        }

        // return response;
    } catch (error: unknown) {
        const Error = error as ErrorType;
        return NextResponse.json({ error: Error.message });
    }
}
