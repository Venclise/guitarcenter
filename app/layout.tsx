import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBtn from "@/components/ChatBtn";
import { Suspense } from "react";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guitar Center | Premium Guitars & Musical Instruments",
  description: "Browse our complete collection of acoustic, classical, and electric guitars in Lahore.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col antialiased">
   
       <Suspense fallback={null}>
          <Header />
        </Suspense>
       <Suspense fallback={null}>

    <ChatBtn />
        </Suspense>

        <main className="flex-1">
          {children}
        </main>
<Footer />
        <Toaster />
      </body>
    </html>
  );
}