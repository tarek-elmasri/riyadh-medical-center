import type { Metadata } from "next";
import AuthProvider from "@/providers/auth-provider";
import ToastProvider from "@/providers/toast-provider";
import TopLoader from "nextjs-toploader";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const inter = Noto_Sans_Arabic({ subsets: ["arabic"] });

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
      <body className={inter.className}>
        <TopLoader />
        <div className="h-full w-full bg-neutral-200">
          <AuthProvider>
            <ToastProvider />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
