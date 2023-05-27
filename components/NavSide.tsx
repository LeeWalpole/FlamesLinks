"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SheetTrigger } from "@/components/ui/sheet"
import Card from "@/components/Card"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

export default function NavSide() {
  const pathname = usePathname()
  return (
    <>
      <nav className="flex flex-col">
        <Link href="/" className="b-2 w-full border-b p-3.5 text-lg">
          <SheetTrigger className="flex w-full flex-row justify-start gap-4 align-middle font-semibold ">
            {pathname === "/" ? (
              <Icons.homeSolid className="h-6 w-6 " />
            ) : (
              <Icons.home className="h-6 w-6" />
            )}
            Home
          </SheetTrigger>
        </Link>
        <Link href="/about" className="b-2 w-full border-b p-3.5  text-lg">
          <SheetTrigger className="flex w-full flex-row justify-start gap-4 align-middle font-semibold ">
            {pathname === "/about" ? (
              <Icons.homeSolid className="h-6 w-6 " />
            ) : (
              <Icons.home className="h-6 w-6" />
            )}
            About
          </SheetTrigger>
        </Link>
        <Link href="/profile" className="b-2 w-full border-b p-3.5  text-lg">
          <SheetTrigger className="flex w-full flex-row justify-start gap-4  align-middle font-semibold ">
            {pathname === "/profile" ? (
              <Icons.homeSolid className="h-6 w-6 " />
            ) : (
              <Icons.home className="h-6 w-6" />
            )}
            Profile
          </SheetTrigger>
        </Link>
      </nav>
      <br></br>

      <ThemeToggle />
    </>
  )
}
