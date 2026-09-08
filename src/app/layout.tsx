import type { Metadata } from "next";
import { Tinos } from "next/font/google";
import HomeLogo from "@/components/HomeLogo";
import Nav from "@/components/Nav";
import "./globals.css";

const tinos = Tinos({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-tinos",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Doyoon (Daniel) Kim",
  description: "UChicago CS. Experiences, projects, food and notes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={tinos.variable}>
      <body className="text-[1.12rem] leading-[1.6]">
        <div className="flex min-h-dvh w-full flex-col px-6 pb-10 pt-5 sm:pb-12 sm:pt-6">
          <header className="relative">
            <HomeLogo />
            <Nav />
          </header>
          <main className="flex flex-1 flex-col pt-14">{children}</main>
        </div>
      </body>
    </html>
  );
}
