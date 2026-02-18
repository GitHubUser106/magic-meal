import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "MagicMeal — 3 Ingredients. Dinner Done.",
  description:
    "Real meals from stuff you already have. Pick 3 ingredients, get a recipe, start cooking in under 20 minutes.",
  applicationName: "MagicMeal",
  openGraph: {
    title: "MagicMeal — 3 Ingredients. Dinner Done.",
    description:
      "Real meals from stuff you already have. Pick 3 ingredients, get a recipe, start cooking in under 20 minutes.",
    // TODO: Uncomment once domain is purchased and live
    // url: "https://magicmeal.app",
    siteName: "MagicMeal",
    type: "website",
    locale: "en_US",
    // Add this once you create a /public/og-image.png (1200x630px):
    // images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MagicMeal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MagicMeal — 3 Ingredients. Dinner Done.",
    description:
      "Real meals from stuff you already have. Pick 3 ingredients, get a recipe, start cooking in under 20 minutes.",
    // images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    // Add these once you create the files:
    // apple: "/apple-touch-icon.png",
  },
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
