"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { ItemInterface, ReactSortable } from "react-sortablejs"

interface ImageItem extends ItemInterface {
  id: string
  file: File | null
}

const ImageUploadForm = () => {
  const [images, setImages] = useState<ImageItem[]>([])
  const [gridItems, setGridItems] = useState<ItemInterface[]>([])

  useEffect(() => {
    // Generate the initial grid items with empty placeholders
    const initialGridItems = Array.from({ length: 9 }).map((_, index) => ({
      id: `placeholder-${index}`,
      file: null,
    }))
    setGridItems(initialGridItems)
  }, [])

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileList = Array.from(files)
      const newImages = fileList.slice(0, 9).map((file) => ({
        id: file.name,
        file,
      }))
      setImages((prevImages) => [...prevImages, ...newImages])
      setGridItems((prevGridItems) => {
        const updatedGridItems = [...prevGridItems]
        let nextGridItemIndex = 0

        // Find the next available grid item index
        for (let i = 0; i < updatedGridItems.length; i++) {
          if (!updatedGridItems[i].file) {
            nextGridItemIndex = i
            break
          }
        }

        // Assign the new images to the grid items starting from the next available index
        for (let i = 0; i < newImages.length; i++) {
          if (!updatedGridItems[nextGridItemIndex].file) {
            updatedGridItems[nextGridItemIndex] = newImages[i]
            nextGridItemIndex++
          }
        }

        return updatedGridItems
      })
    }
  }

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages]
      updatedImages.splice(index, 1)
      return updatedImages
    })
    setGridItems((prevGridItems) => {
      const updatedGridItems = [...prevGridItems]
      updatedGridItems[index] = { id: `placeholder-${index}`, file: null }
      return updatedGridItems
    })
  }

  useEffect(() => {
    // FileReader API for image preview
    const previewImages = async () => {
      const previewPromises = images.map((image) => {
        if (image.file) {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(image.file as File)
          })
        } else {
          return Promise.resolve("")
        }
      })
      try {
        const imagePreviews = await Promise.all(previewPromises)
        // Use imagePreviews as needed (e.g., display them in UI)
        console.log(imagePreviews)
      } catch (error) {
        console.log("Error occurred while previewing images:", error)
      }
    }

    previewImages()
  }, [images])

  return (
    <section>
      <label htmlFor="image-upload" className="cursor-pointer">
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="flex h-20 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-400 bg-gray-100">
          <span className="text-gray-500">Click to upload images</span>
        </div>
      </label>

      <ReactSortable<ItemInterface>
        animation={300}
        filter=".draggable" // Add filter option to prevent placeholders from being draggable
        preventOnFilter={false} // Allow reordering even if filter conditions are met
        list={gridItems}
        setList={(newState: ItemInterface[]) => {
          setGridItems(newState)
        }}
        className="col-span-3 grid grid-cols-3 gap-2"
      >
        {gridItems.map((item, index) => (
          <figure
            key={item.id}
            className={`dragHandle relative aspect-square border border-sky-100 bg-slate-400 ${
              item.file ? "" : " no-drag"
            }`}
          >
            {item.file ? (
              <>
                <img
                  src={URL.createObjectURL(item.file)}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute left-2 top-2 rounded-full bg-red-500 p-2 text-white"
                >
                  X
                </button>
              </>
            ) : (
              <div className="h-full w-full bg-gray-200" />
            )}
          </figure>
        ))}
      </ReactSortable>
    </section>
  )
}

export default ImageUploadForm
