import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Kanit, Work_Sans } from "next/font/google";
import ReactQueryProvider from "./providers/ReactQuery";
import NextTopLoader from "nextjs-toploader";
import ScriptInjector from "./ScriptInjector";
import { headers } from "next/headers";

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

export async function generateMetadata(): Promise<Metadata> {
  const header_list = headers();
  const host = header_list.get("host");
  const host_name =
    host == "thefloxtv.com"
      ? "Thefloxtv"
      : host == "flixstream.pro"
      ? "Flixstream"
      : "Movieboxx";

  return {
    title: `${host_name} - Watch Movies and TV Shows For Free`,
    description:
      "Watch free blockbuster movies and binge-worthy series for free! Dive into a wide range of content, from timeless classics to the latest releases. Enjoy easy, hassle-free streaming anytime, anywhere. Start your cinematic adventure now, all for free!",
    keywords: [
      "Movies",
      "Series",
      "Tv Shows",
      "Watch Free Movies and Tv shows",
    ],
    openGraph: {
      type: "website",
      url: `https://${host_name}`,
      title: host_name,
      siteName: host_name,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const header_list = headers();
  const host = header_list.get("host");
  const host_name =
    host == "thefloxtv.com"
      ? "Thefloxtv"
      : host == "flixstream.pro"
      ? "Flixstream"
      : "Movieboxx";
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.4.2/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
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
      <body
        data-theme="dark"
        className={
          workSans.className + " " + host_name == "flixstream.pro"
            ? "flixstream"
            : ""
        }
      >
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
