import { ThemeProvider } from "@/components/common/theme-provider";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: any;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return { title: `${t("Welcome to Template Chat AI")}` };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
