import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Grain } from "@/components/Grain";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Preloader } from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "meroUI — Production-ready UI for Next.js 16",
  description:
    "Type-safe, accessible, zero-config React components built for Next.js 16 and React 19. Ship faster with meroUI.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50">
        <ScrollProgress />
        <Grain />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
