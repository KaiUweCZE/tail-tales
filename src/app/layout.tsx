import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import NavbarPrimary from "@/components/navbar-primary";
import AuthProvider from "@/components/providers/auth-provider";
import { FileProvider } from "@/contexts/files-context";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tail-tales.xyz"),
  title: {
    default: "Notes with power of Tailwind",
    template: "%s | Tail Tales",
  },
  description:
    "Create and style your notes with the power of Tailwind CSS. Simple, beautiful, and customizable note-taking application.",
  keywords:
    "notes, tailwind css, note-taking app, styling, organization, productivity, tail tales, rich text editor",
  authors: [{ name: "Kai Uwe" }],
  category: "Productivity",
  creator: "Kai Uwe",
  publisher: "Tail Tales",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Notes with power of Tailwind",
    description: "Create and style your notes with the power of Tailwind CSS",
    type: "website",
    locale: "en_US",
    siteName: "Tail Tales",
    url: "https://tail-tales.xyz",
    images: [
      {
        url: "https://tail-tales.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tail Tales Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes with power of Tailwind",
    description: "Create and style your notes with the power of Tailwind CSS",
    images: ["https://tail-tales.xyz/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://tail-tales.xyz",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Tail Tales",
              description:
                "Create and style your notes with the power of Tailwind CSS",
              url: "https://tail-tales.xyz",
              applicationCategory: "Productivity",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
              },
              creator: {
                "@type": "Person",
                name: "Kai Uwe",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${fredoka.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <FileProvider>
            <NavbarPrimary />
            {children}
          </FileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
