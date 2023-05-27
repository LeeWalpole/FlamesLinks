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
import Swiper from "@/components/Swiper"
import { ProfileTabs } from "@/components/Tabs"
import { Icons } from "@/components/icons"

// import Carousel from '$lib/components/Carousel.svelte';
const images = [
  "https://github.com/shadcn.png",
  "https://via.placeholder.com/400x500.png?text=Image+2",
  "https://via.placeholder.com/400x500.png?text=Image+3",
]

export default function IndexPage() {
  return (
    <>
      <section className="feed relative top-[-4rem] m-auto  flex flex-row gap-7  sm:w-96 ">
        <article className="w-full ">
          <figure className="relative aspect-[1/1] w-full">
            <Swiper
              images={images}
              imageClassName="object-fill w-full h-full aspect-[1/1]"
            />
          </figure>

          <section className="relative z-10 mt-[-20px] grid grid-cols-[auto,1fr,auto] gap-3.5 overflow-visible rounded-t-[20px] px-3.5">
            <div className="avatar z-10 mt-[-25px]">
              <div className="ring-offset-base-100 h-28 w-28 rounded-full ring ring-primary ring-offset-2">
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
            <header className="ml-1.5 flex flex-col items-start justify-center pt-3.5">
              <h5 className="text-lg font-bold">Display Name</h5>
              <p className="text-xs">@username</p>
            </header>

            <div className="flex items-center justify-end gap-3.5 pt-3.5">
              <Dialog>
                <DialogTrigger>
                  <Icons.heart className="h-6 w-6" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Do Something!</DialogTitle>
                    <DialogDescription>
                      This is a very smart modal.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </section>
          {/* <ProfileTabs /> */}
          <div className="cta-buttons flex items-center justify-between p-3.5">
            <div className="grid-cols-auto grid w-full grid-flow-col gap-3">
              <Button variant="secondary">
                <Icons.instagram className="h-6 w-6" />
              </Button>
              <Button variant="secondary">
                <Icons.instagram className="h-6 w-6" />
              </Button>
              <Button variant="secondary">
                <Icons.instagram className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="cta-buttons flex items-center justify-between p-3.5">
            <div className="grid-cols-auto grid w-full grid-flow-row gap-3">
              <Button>
                <Icons.email className="mr-2 h-4 w-4" />
                mywebsite.com
              </Button>
              <Button>
                <Icons.link className="mr-2 h-4 w-4" />
                mywebsite.com
              </Button>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}
