"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

export default function NavLeft() {
  const pathname = usePathname()
  return (
    <>
      <h1>Helo</h1>
    </>
  )
}
