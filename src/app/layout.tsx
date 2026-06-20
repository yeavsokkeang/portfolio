import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Chen — Full-Stack Engineer",
  description: "Full-stack engineer crafting performant, elegant digital experiences. 7+ years building web applications with React, TypeScript, Node.js, and more.",
  keywords: ["Full-Stack Engineer", "Web Developer", "React", "TypeScript", "Next.js", "Node.js", "Portfolio"],
  authors: [{ name: "Alex Chen" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Alex Chen — Full-Stack Engineer",
    description: "Full-stack engineer crafting performant, elegant digital experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Chen — Full-Stack Engineer",
    description: "Full-stack engineer crafting performant, elegant digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
