import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CineTaste - Your Personalized Movie & Series Companion",
  description: "Track movies, series, and anime. Get AI-powered recommendations based on your unique taste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-accent">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
