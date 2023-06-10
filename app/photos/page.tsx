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
// import Modal from "@/components/Modal"
import swagPhotos from "@/components/photos"

import Photo from "./post"

interface PhotoModalProps {
  params: {
    id: string
  }
}

export default function PhotoModal({
  params: { id: photoId },
}: PhotoModalProps) {
  const photos = swagPhotos
  const photo = photoId && photos.find((p) => p.id === photoId)

  return (
    <>
      <h1>Not a Modal</h1>
      <div className="w-[250px]">{photo ? <Photo photo={photo} /> : null}</div>
    </>
  )
}
