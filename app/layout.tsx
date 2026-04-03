import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Learning Platform",
  description: "Production-ready platform for learning AI-powered development"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
