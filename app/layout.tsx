import "@/styles/globals.css"
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import PageAnalytics from "@/components/Analytics"
import NavBottom from "@/components/NavBottom"
import NavLeft from "@/components/NavLeft"
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
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background pb-1 font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <NavTop />

            <main className="relative m-auto min-h-screen py-16 md:max-w-[1240px]">
              {children}
            </main>

            <NavBottom />
            <TailwindIndicator />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </>
  )
}
;``
