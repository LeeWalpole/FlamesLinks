"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"

interface ImageItem extends File {
  id: string
  url: string
}

const ImageUploadForm: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([])

  useEffect(() => {
    const loadImagePreviews = async () => {
      const updatedImages: ImageItem[] = []
      for (const image of images) {
        if (!image.url) {
          const imageUrl = await readFileAsDataURL(image)
          updatedImages.push({ ...image, url: imageUrl })
        } else {
          updatedImages.push(image)
        }
      }
      setImages(updatedImages)
    }

    loadImagePreviews()
  }, [images])

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result)
        } else {
          reject(new Error("Failed to read file as Data URL."))
        }
      }
      reader.onerror = () => {
        reject(new Error("Failed to read file as Data URL."))
      }
      reader.readAsDataURL(file)
    })
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImages = Array.from(event.target.files).map((file, index) => ({
        ...file,
        id: `image-${index}`,
        url: "",
      }))
      setImages((prevImages) => [...prevImages, ...newImages])
    }
  }

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages]
      newImages.splice(index, 1)
      return newImages
    })
  }

  const handleImageSort = (sortedImages: ImageItem[]) => {
    setImages(sortedImages)
  }

  return (
    <div>
      <input type="file" multiple onChange={handleImageUpload} />

      <div className="mt-4 grid grid-cols-3 gap-4">
        <ReactSortable list={images} setList={handleImageSort}>
          {images.map((image, index) => (
            <div
              key={image.id}
              className="dragHandle relative aspect-square overflow-auto bg-slate-600"
            >
              <img
                src={image.url}
                alt={`Image ${index}`}
                className="aspect-square h-full w-full object-cover"
              />
              <button
                className="absolute right-2 top-2 rounded bg-red-500 p-1 text-white"
                onClick={() => handleImageRemove(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </ReactSortable>
      </div>
    </div>
  )
}

export default ImageUploadForm
