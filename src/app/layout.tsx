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
  title: "SOPHAT ROEUN — Full-Stack Developer",
  description: "Full-stack engineer crafting performant, elegant digital experiences. 2+ years building web&mobile applications with Vue, Flutter, TypeScript, and more.",
  keywords: ["Full-Stack Developer", "Web Developer","Mobile Application Developer", "Vue", "TypeScript", "Next.js", "Portfolio"],
  authors: [{ name: "SOPHAT ROEUN" }],
 icons: {
    icon: "/logo-fsd.png",
  },
  openGraph: {
    title: "SOPHAT ROEUN — Full-Stack Developer",
    description: "Full-stack engineer crafting performant, elegant digital experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOPHAT ROEUN — Full-Stack Developer",
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
