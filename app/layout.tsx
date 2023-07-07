import "./globals.css";
import type { Metadata } from "next";
import { Noto_Naskh_Arabic } from "next/font/google";

const inter = Noto_Naskh_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Riyadh Medical Center",
  description:
    "Riyadh Medical Center (RMC) is a poly-clinic located in Riyadh, Saudi Arabia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
