import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/home/theme-provider"
import { AuthSessionProvider } from "@/components/providers/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "XEGO - Learn to Code with Guided Tutorials",
  description:
    "XEGO is a step-by-step platform that helps non-programmers build real projects through guided tutorials.",
  keywords: "XEGO, learn to code, coding tutorials, beginner programming, no-code, low-code",
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon-32x32.png"
  },
  openGraph: {
    title: "XEGO - Learn to Code with Guided Tutorials",
    description:
      "XEGO is a step-by-step platform that helps non-programmers build real projects through guided tutorials.",
    url: "https://xego.com",
    siteName: "XEGO",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "XEGO",
      },
    ],
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "XEGO",
              url: "https://xego.com",
              applicationCategory: "DeveloperApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "XEGO is a step-by-step platform that helps non-programmers build real projects through guided tutorials.",
            }),
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthSessionProvider>
            {children}
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
