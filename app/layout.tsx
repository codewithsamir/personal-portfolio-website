import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/_components/theme-provider";
import { ThemeInjector } from "@/app/_components/ThemeInjector";
import { Toaster } from "sonner";

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
  manifest: "/manifest.json",
  verification: {
    google: "Geg6MyqELKWvjbsABit5WRiVwZ9ua-TMkbRUObCVSIA",
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
                profiles.facebook,
                profiles.instagram,
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
