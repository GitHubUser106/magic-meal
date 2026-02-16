import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MagicMeal",
  description: "Real meals from stuff you already have",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-muted/30`}
      >
        <div className="mx-auto max-w-[430px] min-h-screen bg-background shadow-[0_0_40px_rgba(0,0,0,0.06)]">
          {children}
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
