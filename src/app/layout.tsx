import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import DurgaBanner from "@/components/custom/durga-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "%s | Tripura 365", default: "Tripura 365" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" href="/rss" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}
      >
        {/* <div id="fb-root"></div>
        <script
          async
          defer
          //@ts-ignore
          crossorigin="anonymous"
          src={`https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v23.0&appId=${process.env.FACEBOOK_APP_ID}`}
        ></script> */}
        <div>
          <Navbar />
          <DurgaBanner />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
