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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthSessionProvider>
            {children}
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
