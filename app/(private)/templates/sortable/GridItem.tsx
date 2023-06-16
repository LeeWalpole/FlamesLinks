import { useRef } from "react"
import Image from "next/image"

interface GridItemProps {
  user: {
    id: number
    name: string
    imageURL?: string
  }
  imageURL?: string // Add the imageURL property to the GridItemProps interface
}

const GridItem: React.FC<GridItemProps> = ({ user, imageURL }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    // Perform the necessary upload logic here

    // Assuming the upload was successful, update the user's imageURL
    if (file) {
      const imageURL = URL.createObjectURL(file)
      // Update the user's imageURL in the state or wherever it's stored
    }
  }

  return (
    <figure
      className={`dragHandle aspect-square bg-slate-400${
        imageURL ? "" : " no-drag"
      }`}
    >
      {imageURL ? (
        <Image
          height={100}
          width={100}
          src={imageURL}
          alt="User"
          className="h-full w-full object-fill"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <button
            type="button"
            className="flex h-full w-full items-center justify-center"
            onClick={handleFileUpload}
          >
            Upload Image
          </button>
        </div>
      )}
    </figure>
  )
}

export default GridItem
