import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamCraft",
  description: "Create ai generated content for your stream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <SpeedInsights />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
