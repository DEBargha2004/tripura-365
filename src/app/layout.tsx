import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import Footer from "@/components/custom/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { LiveNotificationPill } from "@/components/custom/live-notification-pill";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "%s | Janamat News", default: "Janamat News" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="application/rss+xml" href="/rss" />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} font-sans antialiased min-h-dvh`}
      >
        <div className="bg-background text-foreground relative">
          <Navbar />
          {/* <LiveNotificationPill /> */}
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
