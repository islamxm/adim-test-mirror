import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../_app/styles/main.scss";
import { App } from "@/_app/app";

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic", "math"],
});

export const metadata: Metadata = {
  title: "Ädim",
  description: "Ädim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${openSans.variable}`}>
        <App>{children}</App>
      </body>
    </html>
  );
}
