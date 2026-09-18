import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/app/_components/theme-provider";
import { ThemeInjector } from "@/app/_components/ThemeInjector";
import { Toaster } from "sonner";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://samirrain.com.np"),
  title: {
    default: "Samir Rain | Full Stack Developer",
    template: "%s | Samir Rain Portfolio"
  },
  description: "Full Stack Developer specialized in building scalable AI-powered web applications.",
  keywords: ["Samir Rain", "Full Stack Developer", "Next.js", "React", "AI Integration", "Nepal"],
  authors: [{ name: "Samir Rain" }],
  creator: "Samir Rain",
  manifest: "/manifest.json",
  verification: {
    google: "Geg6MyqELKWvjbsABit5WRiVwZ9ua-TMkbRUObCVSIA",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samirrain.com.np",
    siteName: "Samir Rain Portfolio",
    title: "Samir Rain | Full Stack Developer",
    description: "Full Stack Developer specialized in building scalable AI-powered web applications.",
    images: [
      {
        url: "https://samirrain.com.np/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Samir Rain Portfolio Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samir Rain | Full Stack Developer",
    description: "Full Stack Developer specialized in building scalable AI-powered web applications.",
    images: ["https://samirrain.com.np/profile.jpeg"],
    creator: "@samir_rain",
  },
};


const profiles = {
  linkedin: "https://np.linkedin.com/in/samir-rain-0467b7259",
  youtube: "https://www.youtube.com/@codewithsamir",
  github: "https://github.com/codewithsamir",
  portfolio: ["https://samirrain.github.io/", "https://codewithsamir.github.io/"],
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

        {/* Alternate portfolio sites */}
        {profiles.portfolio.map((url) => (
          <link key={url} rel="alternate" href={url} />
        ))}

        {/* Social profiles as Open Graph see_also */}
        <meta property="og:see_also" content={profiles.linkedin} />
        <meta property="og:see_also" content={profiles.youtube} />
        <meta property="og:see_also" content={profiles.github} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Samir Rain",
              "url": "https://samirrain.com.np",
              "jobTitle": "Full Stack Developer",
              "alumniOf": "Rajarshi Janak University",
              "sameAs": [
                profiles.github,
                profiles.linkedin,
                profiles.youtube
              ],
              "knowsAbout": ["React", "Next.js", "Django", "Node.js", "TypeScript", "AI Integration"],
              "description": "Full Stack Developer specialized in building scalable AI-powered web applications."
            }),
          }}
        />
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
