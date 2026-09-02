import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexProvider";

export const metadata: Metadata = {
  title: "TingTing Tools - AI Office Automation",
  description: "AI-powered office automation platform by TingTing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
