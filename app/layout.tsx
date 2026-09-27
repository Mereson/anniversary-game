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
      <head>
        <link
          rel="preload"
          href="/sounds/background-music-v2.mp3"
          as="audio"
          type="audio/mpeg"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
