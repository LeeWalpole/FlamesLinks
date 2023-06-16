import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import NavOnboard from "@/app/account/add/NavOnboard"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="m-auto flex h-screen items-center justify-center">
      <main className="w-[640px]">{children}</main>
    </section>
  )
}
