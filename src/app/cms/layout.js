"use client";

import { Noto_Sans } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/cms/navbar";
import { ThemeProvider } from "@/components/core/common/theme-provider";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function CMSLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} antialiased bg-slate-900`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <main className="flex">
            <Navbar />
            <section>{children}</section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
