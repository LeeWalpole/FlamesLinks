import Image from "next/image"

import swagPhotos from "@/components/photos"

interface Photo {
  id: string
  imageSrc: string
  name: string
  username: string
}

interface PhotoModalProps {
  params: {
    id: string
  }
}

export default function PhotoModal({
  params: { id: photoId },
}: PhotoModalProps) {
  const photos: Photo[] = swagPhotos
  const photo: Photo | undefined =
    photoId !== "" ? photos.find((p) => p.id === photoId) : undefined

  if (!photo) {
    return null // or you can render a message indicating that the photo is not found
  }

  return (
    <>
      {" "}
      <h1>Not a Modal</h1>
      <Image
        alt=""
        src={photo.imageSrc}
        height={600}
        width={600}
        className="col-span-2 aspect-square w-full object-cover"
      />
      <div className="bg-white p-4 px-6">
        <h3>{photo.name}</h3>
        <p>Taken by {photo.username}</p>
      </div>
    </>
  )
}
