"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import NavSide from "@/components/NavSide"
import Notifications from "@/components/Notifications"
import { Icons } from "@/components/icons"

export default function NavTop() {
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const threshold = 100 // Adjust this value to control when the navbar appears

      setShowNavbar(scrolled > threshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-20 h-16 w-full  bg-gradient-to-b from-black/80 to-transparent transition-all duration-100
        ${
          showNavbar
            ? "border-b bg-background opacity-100"
            : "bg-transparent opacity-100 "
        }
      `}
    >
      <nav className="grid w-full auto-cols-fr grid-cols-3">
        <div className="container flex w-full items-center  justify-start space-x-4 ">
          <Sheet>
            <SheetTrigger>
              <Icons.nav className="h-6 w-6 " />
            </SheetTrigger>
            <SheetContent position="left" size="default">
              {/* <SheetTitle></SheetTitle> */}
              {/* <SheetDescription>
              </SheetDescription> */}
              <NavSide />
            </SheetContent>
          </Sheet>
        </div>
        <div className="container flex h-16 w-full items-center  justify-center space-x-4 ">
          <Link href="/">
            <Icons.twitter className="h-5 w-5 fill-current" />
          </Link>
        </div>
        <div className="container flex h-16 w-full items-center justify-end space-x-4 ">
          <Sheet>
            <SheetTrigger>
              <Icons.profile className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent>
              {/* <SheetTitle></SheetTitle> */}
              {/* <SheetDescription>
              </SheetDescription> */}
              <Notifications />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
