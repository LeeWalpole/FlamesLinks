import NavBottom from "@/components/NavBottom"
import NavTop from "@/components/NavTop"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavTop />
      <main>{children}</main>
      <NavBottom />
    </>
  )
}
