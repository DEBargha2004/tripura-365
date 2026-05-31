import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "%s | Tripura Law Times", default: "Tripura Law Times" },
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
        className={`${inter.variable} ${playfair.variable} antialiased min-h-dvh font-sans`}
      >
        <div>
          <Navbar />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
