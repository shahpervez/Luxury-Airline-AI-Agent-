import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SHAH Airline | Elevate Your Atmosphere",
  description: "Experience the ultimate in private aviation luxury. SHAH Airline offers unparalleled aerodynamic perfection and bespoke design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased bg-black">
        {children}
      </body>
    </html>
  );
}
