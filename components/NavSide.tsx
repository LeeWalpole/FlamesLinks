"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bars2Icon, BeakerIcon, HeartIcon } from "@heroicons/react/24/outline"
import {
  Bars2Icon as Bars2IconSolid,
  BeakerIcon as BeakerIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid"

import { SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export default function NavSide() {
  const pathname = usePathname()
  return (
    <>
      <nav className="flex flex-col">
        <Link href="/" className="b-2 w-full border-b p-3.5 text-lg">
          <SheetTrigger className="flex w-full flex-row justify-start gap-4 align-middle font-semibold ">
            {pathname === "/" ? (
              <BeakerIconSolid className="h-7 w-7 text-blue-500 " />
            ) : (
              <BeakerIcon className="h-7 w-7" />
            )}
            Home
          </SheetTrigger>
        </Link>
        <Link href="/discover" className="b-2 w-full border-b p-3.5  text-lg">
          <SheetTrigger className="flex w-full flex-row justify-start gap-4  align-middle font-semibold ">
            {pathname === "/discover" ? (
              <BeakerIconSolid className="h-7 w-7 text-blue-500 " />
            ) : (
              <BeakerIcon className="h-7 w-7" />
            )}
            Discover
          </SheetTrigger>
        </Link>
      </nav>
      <br></br>
      <ThemeToggle />
    </>
  )
}
