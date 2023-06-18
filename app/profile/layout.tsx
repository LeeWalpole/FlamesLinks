import "@/styles/globals.css"
import { Metadata } from "next"
// import { AuthProvider } from "@/firebase/AuthContext"
import { Analytics } from "@vercel/analytics/react"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
// import PageAnalytics from "@/components/Analytics"
import NavBottom from "@/components/NavBottom"
// import NavLeft from "@/components/NavLeft"
import NavTop from "@/components/NavTop"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <NavTop />
      <main className="relative m-auto flex min-h-screen justify-center pb-32 md:max-w-[1240px] ">
        {children}
      </main>
      <NavBottom />
    </>
  )
}
