import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Shifto",
  description: "シフトを管理するためのアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <TooltipProvider>
          <Toaster richColors position="top-center" duration={3000} />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
