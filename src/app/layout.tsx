import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TV Maze",
  description: "Explore TV shows by genre, sort by rating, and browse details.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </body>
    </html>
  );
}
