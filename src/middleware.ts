import { NextRequest, NextResponse } from "next/server";

const isAllowedDomain = (hostname: string, port: string): boolean => {
    return hostname.endsWith(".theshiva.xyz") || hostname === "theshiva.xyz" || (hostname === "localhost" && (port === "" || port === "3000"));
};

export function middleware(request: NextRequest) {
    const { hostname, port } = request.nextUrl;

    if (isAllowedDomain(hostname, port)) {
        return NextResponse.next();
    }

    return NextResponse.json({ message: "Forbidden", hostname: hostname }, { status: 403 });
}

export const config = {
    matcher: "/api/:path*",
};
