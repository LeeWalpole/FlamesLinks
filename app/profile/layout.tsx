import NavBottom from "@/components/NavBottom"
import NavTop from "@/components/NavTop"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <>{children}</>
}
