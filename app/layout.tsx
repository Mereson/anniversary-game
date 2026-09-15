import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Next Chapter",
  description: "A little game about us, and what comes next.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
