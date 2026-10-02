import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/app/_components/theme-provider";
import { ThemeInjector } from "@/app/_components/ThemeInjector";
import { Toaster } from "sonner";
import { SITE_URL } from "@/lib/site";

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteDescription =
  "Samir Rain is a Full Stack Developer from Janakpur, Nepal with 3+ years of experience building fast, scalable web apps with React, Next.js, Django and Node.js.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Samir Rain | Full Stack Developer in Nepal",
    template: "%s | Samir Rain",
  },
  description: siteDescription,
  applicationName: "Samir Rain",
  authors: [{ name: "Samir Rain", url: SITE_URL }],
  creator: "Samir Rain",
  publisher: "Samir Rain",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "Geg6MyqELKWvjbsABit5WRiVwZ9ua-TMkbRUObCVSIA",
  },
  // og:image / twitter:image come from app/opengraph-image.jpg and app/twitter-image.jpg
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Samir Rain",
    title: "Samir Rain | Full Stack Developer in Nepal",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Samir Rain | Full Stack Developer in Nepal",
    description: siteDescription,
    creator: "@samir_rain",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInjector />

        {/* Google AdSense — only loads once NEXT_PUBLIC_ADSENSE_CLIENT_ID is set (after approval) */}
        {adsenseClientId && (
          <>
            <meta name="google-adsense-account" content={adsenseClientId} />
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          </>
        )}
      </head>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
