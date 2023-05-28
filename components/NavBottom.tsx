"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function NavBottom() {
  const pathname = usePathname()

  return (
    <footer className="fixed bottom-0 z-40 h-14 w-full border-t bg-background">
      <nav className="grid-cols-auto m-auto grid h-full w-96 grid-flow-col items-stretch justify-stretch bg-background align-middle ">
        <Link href="/" className="flex items-center justify-center ">
          {pathname === "/" ? (
            <Icons.homeSolid className="h-6 w-6 " />
          ) : (
            <Icons.home className="h-6 w-6" />
          )}
        </Link>

        <Link href="/about" className="flex items-center justify-center">
          {pathname === "/about" ? (
            <Icons.heartSolid className="h-6 w-6" />
          ) : (
            <Icons.heart className="h-6 w-6" />
          )}
        </Link>

        <Link href="/profile" className="flex items-center justify-center">
          {pathname === "/profile" ? (
            <Icons.profileSolid className="h-6 w-6 " />
          ) : (
            <Icons.profile className="h-6 w-6" />
          )}
        </Link>
        <Link href="/grid" className="flex items-center justify-center">
          {pathname === "/grid" ? (
            <Icons.search className="h-6 w-6 " />
          ) : (
            <Icons.search className="h-6 w-6" />
          )}
        </Link>
      </nav>
    </footer>
  )
}
