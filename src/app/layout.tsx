import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/themeprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TEST SSO",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} dark:bg-black bg-white`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
