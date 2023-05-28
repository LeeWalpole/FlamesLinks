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
    <section className="relative z-10 grid grid-cols-[auto,1fr,auto] gap-4 overflow-visible rounded-t-[20px] px-4">
      <div className="avatar z-10 mt-[-50px] ">
        <div className="ring-offset-base-100  h-28 w-28 rounded-full ring ring-primary">
          <Avatar className="h-28 w-28">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Colm Tuite"
              className="h-full w-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <header className="bg-grey-800 ml-2 flex flex-col items-start justify-center">
        <h5 className="text-lg font-bold">Display Name</h5>
        <p className="text-xs">@username</p>
      </header>

      <div className="flex items-center justify-end gap-4">
        <Dialog>
          <DialogTrigger className="h-full  px-4">
            <Icons.heart className="h-6 w-6" />
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
