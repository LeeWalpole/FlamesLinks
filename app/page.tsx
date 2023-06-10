import Image from "next/image"
import Link from "next/link"

import swagPhotos from "@/components/photos"

export default function Home() {
  const photos = swagPhotos

  return (
    <main className="container mx-auto">
      <h1 className="m-10 text-center text-4xl font-bold">NextGram</h1>
      <div className="m-10 grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2	 md:grid-cols-3 lg:grid-cols-3">
        {photos.map(({ id, imageSrc }) => (
          <Link key={id} href={`/photos/${id}`}>
            <Image
              alt=""
              src={imageSrc}
              height={500}
              width={500}
              className="aspect-square w-full object-cover"
            />
          </Link>
        ))}
      </div>
    </main>
  )
}
