import Link from "next/link"
import { BellRing, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

export default function ProfileGrid() {
  return (
    <>
      <h2>Menu 0 - Template</h2>

      <section className="relative m-auto flex w-full flex-row gap-7 sm:w-96 ">
        <article className="w-full ">
          <Card>
            <CardContent>
              <nav>
                <Link
                  href=""
                  className="flex w-full items-center space-x-4 border-b p-4"
                >
                  <BellRing />
                  <div className="flex-1 space-y-1">
                    <p className="text-md font-medium leading-none">
                      Menu Item #02
                    </p>
                    <p className="text-xs text-muted-foreground">
                      This expains what the menu item is...
                    </p>
                  </div>
                </Link>
                <Link
                  href=""
                  className="flex w-full items-center space-x-4 border-b p-4"
                >
                  <BellRing />
                  <div className="flex-1 space-y-1">
                    <p className="text-md font-medium leading-none">
                      Menu Item #02
                    </p>
                    <p className="text-xs text-muted-foreground">
                      This expains what the menu item is...
                    </p>
                  </div>
                </Link>
              </nav>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-muted">Cancel</Button>
            </CardFooter>
          </Card>
        </article>
      </section>

      <h2>Menu 1 - Main Nav</h2>

      <section className="relative m-auto flex w-full flex-row gap-7 sm:w-96 ">
        <article className="w-full ">
          <Card>
            <CardContent>
              <nav>
                <Link
                  href=""
                  className="flex w-full items-center space-x-4 border-b p-4"
                >
                  <Icons.home className="h-6 w-6" />
                  <div className="flex-1 space-y-1">
                    <p className="text-lg font-bold">Home</p>
                  </div>
                </Link>
                <Link
                  href=""
                  className="flex w-full items-center space-x-4 border-b p-4"
                >
                  <Icons.home className="h-6 w-6" />
                  <div className="flex-1 space-y-1">
                    <p className="text-lg font-bold">Discover</p>
                  </div>
                </Link>
                <Link
                  href=""
                  className="flex w-full items-center space-x-4 border-b p-4"
                >
                  <Icons.home className="h-6 w-6" />
                  <div className="flex-1 space-y-1">
                    <p className="text-lg font-bold">Profile</p>
                  </div>
                </Link>
              </nav>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-muted">Cancel</Button>
            </CardFooter>
          </Card>
        </article>
      </section>

      <h2>Menu 3 - </h2>

      <section className="relative m-auto flex w-full flex-row gap-7 sm:w-96 ">
        <article className="w-full ">
          <Card>
            <CardContent>
              <nav>
                <Link
                  href=""
                  className="flex w-full items-center space-x-4 border-b p-4"
                >
                  <Icons.tip className="h-6 w-6 text-brand-normal" />
                  <div className="flex-1 space-y-1">
                    <p className="text-md font-medium leading-none">
                      Treat @username
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Show your love and support.
                    </p>
                  </div>
                </Link>
                <Link
                  href=""
                  className="flex w-full items-center space-x-4 border-b p-4"
                >
                  <Icons.message className="h-6 w-6" />
                  <div className="flex-1 space-y-1">
                    <p className="text-md font-medium leading-none">
                      Send Private Message
                    </p>
                    <p className="text-xs text-muted-foreground">
                      *$0.50 / Message (Coming soon).
                    </p>
                  </div>
                </Link>
                <Link
                  href=""
                  className="flex w-full items-center space-x-4 border-b p-4"
                >
                  <Icons.phone className="h-6 w-6" />
                  <div className="flex-1 space-y-1">
                    <p className="text-md font-medium leading-none">
                      Voice Call (Coming soon).
                    </p>
                    <p className="text-xs text-muted-foreground">
                      *$0.50 / 60 Seconds (Coming soon).
                    </p>
                  </div>
                </Link>
                <Link
                  href=""
                  className="flex w-full items-center space-x-4 border-b p-4"
                >
                  <Icons.video className="h-6 w-6" />
                  <div className="flex-1 space-y-1">
                    <p className="text-md font-medium leading-none">
                      Video Call
                    </p>
                    <p className="text-xs text-muted-foreground">
                      *$1.00 / 60 Seconds (Coming soon).
                    </p>
                  </div>
                </Link>
              </nav>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-muted">Go Back</Button>
            </CardFooter>
          </Card>
        </article>
      </section>
    </>
  )
}
