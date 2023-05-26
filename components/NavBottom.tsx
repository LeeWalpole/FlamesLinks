"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function NavBottom() {
  const pathname = usePathname()

  return (
    <footer className="fixed bottom-0 z-40 h-12 w-full border-t bg-background">
      <nav className="grid-cols-auto m-auto grid h-full w-96 grid-flow-col items-baseline  bg-slate-400">
        <Button variant="">
          {pathname === "/discover" ? (
            <Icons.heartSolid className="h-6 w-6 text-blue-500" />
          ) : (
            <Icons.heart className="h-6 w-6" />
          )}
        </Button>
        <Button variant="">
          {pathname === "/discover" ? (
            <Icons.heartSolid className="h-6 w-6 text-blue-500" />
          ) : (
            <Icons.heart className="h-6 w-6" />
          )}
        </Button>
        <Button variant="ghost">
          {pathname === "/discover" ? (
            <Icons.heartSolid className="h-6 w-6 text-blue-500" />
          ) : (
            <Icons.heart className="h-6 w-6" />
          )}
        </Button>
      </nav>
    </footer>
  )
}
