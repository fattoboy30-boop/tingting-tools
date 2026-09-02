import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TingTing Tools - AI Office Automation",
  description: "14 AI-powered tools that read documents, clean data, write reports, and process finances — in seconds, not hours.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
