"use client"

import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { db, storage } from "@/firebase/config"
import useAuth from "@/firebase/useAuth"
import { collection, doc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { ItemInterface, ReactSortable } from "react-sortablejs"

interface ImageItem extends ItemInterface {
  id: string
  file: File | null
}

const ImageUploadForm = () => {
  const user = useAuth()

  const [images, setImages] = useState<ImageItem[]>([])
  const [gridItems, setGridItems] = useState<ItemInterface[]>([])
  const router = useRouter() // Access the router object

  useEffect(() => {
    // Generate the initial grid items with empty placeholders
    const initialGridItems = Array.from({ length: 9 }).map((_, index) => ({
      id: `placeholder-${index}`,
      file: null,
    }))
    setGridItems(initialGridItems)
  }, [])

  const [saving, setSaving] = useState(false)
  const handleSaveImages = async () => {
    try {
      setSaving(true) // Update the saving state to true

      const uploadedImages = []

      for (const image of images) {
        if (image.file) {
          const storageRef = ref(storage, `images/${image.id}`)
          await uploadBytes(storageRef, image.file)
          const downloadURL = await getDownloadURL(storageRef)
          uploadedImages.push(downloadURL)
        }
      }

      console.log("User UID:", user?.uid)
      console.log("Uploaded Images:", uploadedImages)

      const docRef = doc(db, "profiles", user?.uid ?? "")

      //   const docRef = doc(db, "profiles", "A8IlEuLSV8gfRP8WjiuDfahdbzm2")
      //
      await updateDoc(docRef, { images: uploadedImages })
      console.log("Images saved to Firebase")
      router.push("/profile/")
    } catch (error) {
      console.error("Error saving images to Firebase:", error)
    } finally {
      setSaving(false) // Update the saving state back to false
    }
  }

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
      const previewPromises = images.map((item) => {
        if (item.file) {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(item.file as File)
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
      {/* <label htmlFor="image-upload" className="cursor-pointer">
        <button
          type="button"
          className="mb-8 h-16 w-full rounded-full bg-blue-500 p-4 text-white"
        >
          Click to upload images
        </button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </label> */}

      <label htmlFor="image-upload" className="cursor-pointer">
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />

        <div className="mb-8 h-16 w-full rounded-full bg-blue-500 p-4 text-center text-white">
          Click Here to Upload Images
        </div>
      </label>

      <ReactSortable<ItemInterface>
        animation={300}
        filter=".draggable"
        preventOnFilter={false}
        list={gridItems}
        setList={(newState: ItemInterface[]) => {
          setGridItems(newState)
        }}
        className="col-span-3 mb-8 grid grid-cols-3 gap-2"
      >
        {gridItems.map((item, index) => (
          <figure
            key={item.id}
            className={`dragHandle relative aspect-square border border-dotted border-gray-700   ${
              item.file ? "" : " no-drag"
            }`}
          >
            {item.file ? (
              <>
                <Image
                  src={URL.createObjectURL(item.file)}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full object-cover"
                  width={100}
                  height={100}
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
              <div className="h-full w-full" />
            )}
          </figure>
        ))}
      </ReactSortable>

      <div className="flex justify-between">
        <button className="button-ghost p-3">Back</button>

        <button
          onClick={handleSaveImages}
          disabled={saving}
          className=" bg-blue-500 p-3"
        >
          {saving ? "Saving..." : "Save Gallery"}
        </button>
      </div>
    </section>
  )
}

export default ImageUploadForm
