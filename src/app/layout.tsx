import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import Folio from "@/components/Folio";
import Nav from "@/components/Nav";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Doyoon (Daniel) Kim",
  description:
    "Computer science and statistics at the University of Chicago. Work, projects, restaurants and notes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${garamond.className} text-[1.14rem] leading-[1.62]`}>
        <div className="flex min-h-dvh max-w-[40rem] flex-col px-6 py-12 sm:py-16 sm:pl-[7vw] sm:pr-8">
          <header>
            <p
              className="text-[0.95rem] tracking-[0.11em] text-ink-soft"
              style={{ fontVariantCaps: "small-caps" }}
            >
              Doyoon Kim
            </p>
            <Nav />
          </header>
          <main className="flex-1 pt-11">{children}</main>
          <Folio />
        </div>
      </body>
    </html>
  );
}
