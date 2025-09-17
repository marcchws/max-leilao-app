import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Max Leilão - Centralize todos os leilões de veículos do Brasil",
  description: "Monitore mais de 3.000 leiloeiros no Brasil, receba alertas personalizados e encontre as melhores oportunidades de compra sem perder tempo.",
  keywords: "leilão, veículos, carros, motos, caminhões, leiloeiro, brasil, compra, venda, alertas whatsapp, filtros avançados, calculadora de lucro",
  authors: [{ name: "Max Leilão" }],
  creator: "Max Leilão",
  publisher: "Max Leilão",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://maxleilao.com.br",
    title: "Max Leilão - Centralize todos os leilões de veículos do Brasil",
    description: "Monitore mais de 3.000 leiloeiros no Brasil, receba alertas personalizados e encontre as melhores oportunidades de compra sem perder tempo.",
    siteName: "Max Leilão",
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Leilão - Centralize todos os leilões de veículos do Brasil",
    description: "Monitore mais de 3.000 leiloeiros no Brasil, receba alertas personalizados e encontre as melhores oportunidades de compra sem perder tempo.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <AuthProvider>
          <SubscriptionProvider>
            {children}
          </SubscriptionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
