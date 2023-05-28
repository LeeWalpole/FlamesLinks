import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/icons"

export default function ProfileHeader() {
  return (
    <section className="relative z-10 grid grid-cols-[auto,1fr,auto] gap-4 overflow-visible rounded-t-[20px] px-2 ">
      <div className="avatar z-10 mt-[-50px] ">
        <div className="ring-offset-base-100  h-28 w-28 rounded-full ring ring-primary">
          <Link href="/profile">
            <Avatar className="h-28 w-28">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Colm Tuite"
                className="h-full w-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
      <Link href="/profile" className="bg-grey-800 flex ">
        <header className="bg-grey-800 ml-0 flex flex-col items-start justify-center">
          <h5 className="text-lg font-bold text-foreground">Display Name</h5>
          <p className="text-xs text-muted-foreground">@username</p>
        </header>
      </Link>

      <div className="flex items-center justify-end ">
        <Dialog>
          <DialogTrigger className="h-full px-2">
            <Icons.dots className="h-6 w-6 text-muted-foreground" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Do Something!</DialogTitle>
              <DialogDescription>This is a very smart modal.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
