import { Noto_Sans } from "next/font/google";
import "@/app/globals.css";
import Header from "@/core/components/Header";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
