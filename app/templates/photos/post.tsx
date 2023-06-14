import Image from "next/image"

interface PhotoProps {
  photo: {
    imageSrc: string
    name: string
    username: string
  }
}

export default function Photo({ photo }: PhotoProps) {
  return (
    <>
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
