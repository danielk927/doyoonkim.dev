import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Doyoon (Daniel) Kim",
  description:
    "CS and Statistics at the University of Chicago. Walk around Hong Kong to read about my work — or use the plain text version.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pixel.variable}>
      <body className="antialiased">
        <noscript>
          <p style={{ padding: "1rem" }}>
            This page is an interactive map that needs JavaScript.{" "}
            <a href="/plain">Read the plain text version</a>.
          </p>
        </noscript>
        {children}
      </body>
    </html>
  );
}
