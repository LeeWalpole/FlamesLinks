import "@/styles/globals.css"
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import { siteConfig } from "@/config/site"
import { AuthProvider } from "@/lib/firebase/AuthProvider"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import NavBottom from "@/components/NavBottom"
// import NavLeft from "@/components/NavLeft"
import NavTop from "@/components/NavTop"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head></head>
        <body
          className={cn(
            "min-h-screen bg-background  font-sans antialiased",
            fontSans.variable
          )}
        >
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <NavTop />
              <main className="relative m-auto flex min-h-screen w-full justify-center pb-32 md:max-w-[1240px]">
                {children}
              </main>
              <NavBottom />
              {modal}
              <TailwindIndicator />
            </ThemeProvider>
            <Analytics />
          </AuthProvider>
        </body>
      </html>
    </>
  )
}
