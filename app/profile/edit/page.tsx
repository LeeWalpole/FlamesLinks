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

import { EditLinks } from "./EditLinks"
import { EditProfile } from "./EditProfile"
import { EditSocials } from "./EditSocials"

const ProfilePage = () => {
  return (
    <>
      <div className="m-auto flex w-full flex-col gap-4 p-8 sm:w-96">
        <h1>Edit Profile</h1>

        <section className="rounded-xl border p-4">
          <Dialog>
            <DialogTrigger className="h-full w-full px-2">
              <Button className="w-full">
                {/* <Icons.link className="mr-2 h-5 w-5" /> */}
                Edit Profile Details
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl border px-6 py-8">
              <EditProfile />
            </DialogContent>
          </Dialog>
        </section>

        <section className="rounded-xl border p-4">
          <Dialog>
            <DialogTrigger className="h-full w-full px-2">
              <Button className="w-full">
                {/* <Icons.link className="mr-2 h-5 w-5" /> */}
                Edit Links / Websites
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl border px-6 py-8">
              <EditLinks />
            </DialogContent>
          </Dialog>
        </section>
        <section className="rounded-xl border p-4">
          <Dialog>
            <DialogTrigger className="h-full w-full px-2">
              <Button className="w-full">
                {/* <Icons.link className="mr-2 h-5 w-5" /> */}
                Edit Social Icons
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl border px-6 py-8">
              <EditSocials />
            </DialogContent>
          </Dialog>
        </section>
        <section className="flex flex-row gap-2 rounded-xl border p-4">
          <Dialog>
            <DialogTrigger className="h-full w-full px-2">
              <Button className="w-full"> Edit Photo Gallery</Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl border px-6 py-8">
              <EditSocials />
            </DialogContent>
          </Dialog>
        </section>
        <section className="rounded-xl border p-4">
          <Dialog>
            <DialogTrigger className="h-full w-full px-2">
              <Button className="w-full">
                {/* <Icons.tip className="mr-2 h-5 w-5" /> */}
                Edit Payment Link
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl border px-6 py-8">
              <EditSocials />
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </>
  )
}

export default ProfilePage
