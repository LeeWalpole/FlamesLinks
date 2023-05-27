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
      <section className="relative m-auto flex flex h-full flex-row  justify-center gap-7 align-middle  sm:w-96 ">
        <ProfileTabs />
      </section>
    </>
  )
}
