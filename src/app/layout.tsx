import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Kanit, Work_Sans } from "next/font/google";
import ReactQueryProvider from "./providers/ReactQuery";
import NextTopLoader from "nextjs-toploader";
import ScriptInjector from "./ScriptInjector";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thefloxtv - Watch Movies and TV Shows For Free",
  description:
    "Watch free blockbuster movies and binge-worthy series for free! Dive into a wide range of content, from timeless classics to the latest releases. Enjoy easy, hassle-free streaming anytime, anywhere. Start your cinematic adventure now, all for free!",
  keywords: ["Movies", "Series", "Tv Shows", "Watch Free Movies and Tv shows"],
  openGraph: {
    type: "website",
    url: "https://thefloxtv.com",
    title: "Thefloxtv",
    siteName: "Thefloxtv",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.4.2/css/all.css"
        />
      </head>
      <Script
        strategy="afterInteractive"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-MGNE4PFYE5"
      ></Script>
      <Script id="google-analytics">
        {` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MGNE4PFYE5');`}
      </Script>
      <body data-theme="dark" className={workSans.className}>
        <NextTopLoader
          color="var(--color-3)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2.1}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow=""
        />
        <ScriptInjector />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
