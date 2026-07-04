
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const display = { variable: "--font-display" };
const body = { variable: "--font-body" };
const mono = { variable: "--font-mono" };

const SITE_URL = "https://www.outpro.india"; // replace with production domain

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Outpro.India | Operational Excellence, Delivered",
    template: "%s | Outpro.India",
  },
  description:
    "Outpro.India partners with growing businesses to design, run, and optimize their critical operations — from process outsourcing to managed services.",
  openGraph: {
    title: "Outpro.India | Operational Excellence, Delivered",
    description:
      "Outpro.India partners with growing businesses to design, run, and optimize their critical operations.",
    url: SITE_URL,
    siteName: "Outpro.India",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outpro.India",
    description: "Operational excellence, delivered.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// GA4 measurement id — set via env var in production, never hardcode in real deployments
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-XXXXXXXXXX";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />

        {/* Google Analytics 4 — loaded after interactive, non-blocking */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
