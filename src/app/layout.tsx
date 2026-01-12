import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Open_Sans } from "next/font/google";

import { App } from "@/_app/app";

import "../_app/styles/main.scss";

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic", "math"],
});

export const metadata: Metadata = {
  title: "Ädim",
  description: "Ädim",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${openSans.variable} ${openSans.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <App>{children}</App>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
