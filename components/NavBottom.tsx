"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BeakerIcon, HeartIcon } from "@heroicons/react/24/outline"
import {
  BeakerIcon as BeakerSolidIcon,
  HeartIcon as HeartSolidIcon,
} from "@heroicons/react/24/solid"

export default function NavBottom() {
  const pathname = usePathname()

  return (
    <footer className="fixed bottom-0 z-40 w-full border-t bg-background">
      <nav className="m-auto flex w-96 justify-evenly align-middle">
        <div className="container flex h-16 w-full items-center  justify-start space-x-4 ">
          <button>
            <Link href="/discover">
              <span>
                {pathname === "/discover" ? (
                  <BeakerSolidIcon className="h-6 w-6 text-blue-500" />
                ) : (
                  <BeakerIcon className="h-6 w-6" />
                )}
              </span>
            </Link>
          </button>
        </div>
        <div className="container flex h-16 w-full items-center  justify-center space-x-4 ">
          <button>
            <Link href="/dashboard">
              <span>
                {pathname === "/dashboard" ? (
                  <HeartSolidIcon className="h-6 w-6 text-blue-500" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
              </span>
            </Link>
          </button>
        </div>
        <div className="container flex h-16 w-full items-center justify-end space-x-4 ">
          <button>
            <Link href="/profile">
              <span>
                {pathname === "/profile" ? (
                  <HeartSolidIcon className="h-6 w-6 text-blue-500" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
              </span>
            </Link>
          </button>
        </div>
      </nav>
    </footer>
  )
}
