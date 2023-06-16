import Image from "next/image"
import Link from "next/link"

import swagPhotos from "@/components/photos"

export default function Home() {
  const photos = swagPhotos

  return (
    <div className="align-self-middle container mx-auto bg-red-500">
      <section className="bg-red-800">
        <h1 className="m-10 text-center text-4xl font-bold">Front Page</h1>
      </section>
    </div>
  )
}
