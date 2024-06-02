import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/themeprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SSO auth login system",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} dark:bg-black bg-white min-h-screen dark:text-white text-black `}>
                <ThemeProvider enableColorScheme={true} attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Toaster />
                    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                </ThemeProvider>
            </body>
        </html>
    );
}
