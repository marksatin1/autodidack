"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./ui/nav-bar";
import Logo from "./ui/logo";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" className={inter.className}>
      {pathname === "/" && (
        <body>
          <div>{children}</div>
        </body>
      )}

      {pathname !== "/" && (
        <body className="h-screen grid grid-rows-layout">
          <header className="w-full grid justify-center items-center p-4">
            <Logo />
          </header>
          <div className="overflow-auto">{children}</div>
          <footer className="p-4">
            <NavBar />
          </footer>
        </body>
      )}
    </html>
  );
}
