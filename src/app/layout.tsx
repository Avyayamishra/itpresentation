import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "IT for Managers · Mini-Capstone — Patents, Cyberattacks & Cyber Law",
  description:
    "Three landmark cases — Apple v Samsung, the Colonial Pipeline cyberattack, and Shreya Singhal v Union of India — and what managers can learn from them.",
  keywords: [
    "IT for Managers",
    "Mini-Capstone",
    "Apple v Samsung",
    "Colonial Pipeline",
    "Shreya Singhal",
    "IT Act 2000",
    "Patent Law",
    "Cybersecurity",
  ],
  authors: [{ name: "IT for Managers — Capstone Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Patents, Cyberattacks & Cyber Law — Mini-Capstone",
    description:
      "Three landmark cases and what managers can learn from them. A luxury presentation deck.",
    siteName: "IT for Managers · Mini-Capstone",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${jost.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
