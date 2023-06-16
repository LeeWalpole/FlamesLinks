"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { db, storage } from "@/firebase/config"
import { doc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { ItemInterface, ReactSortable } from "react-sortablejs"

// Import the useRouter hook
interface ImageItem extends ItemInterface {
  id: string
  file: File
}

const ImageUploadForm = () => {
  const [images, setImages] = useState<ImageItem[]>([])
  const router = useRouter() // Access the router object
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileList = Array.from(files)
      const newImages = fileList
        .slice(0, 9)
        .map((file) => ({ id: file.name, file }))
      setImages((prevImages) => [...prevImages, ...newImages])
    }
  }

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages]
      updatedImages.splice(index, 1)
      return updatedImages
    })
  }

  const [saving, setSaving] = useState(false)
  const handleSaveImages = async () => {
    try {
      setSaving(true) // Update the saving state to true

      const uploadedImages = []

      for (const image of images) {
        const storageRef = ref(storage, `images/${image.id}`)
        await uploadBytes(storageRef, image.file)
        const downloadURL = await getDownloadURL(storageRef)
        uploadedImages.push(downloadURL)
      }

      const docRef = doc(db, "profiles", "A8IlEuLSV8gfRP8WjiuDfahdbzm2")
      router.push("/profile/")
      await updateDoc(docRef, { images: uploadedImages })
      console.log("Images saved to Firebase")
    } catch (error) {
      console.error("Error saving images to Firebase:", error)
    } finally {
      setSaving(false) // Update the saving state back to false
    }
  }

  useEffect(() => {
    // FileReader API for image preview
    const previewImages = async () => {
      const previewPromises = images.map((image) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(image.file)
        })
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
        preventOnFilter={true}
        list={images}
        setList={(newState: ItemInterface[]) => {
          setImages(newState as ImageItem[])
        }}
        className="col-span-3 grid grid-cols-3 gap-2"
      >
        {images.map((image, index) => (
          <div key={image.id}>
            <figure className="relative aspect-square">
              <img
                src={URL.createObjectURL(image.file)}
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
            </figure>
          </div>
        ))}
      </ReactSortable>

      <button
        onClick={handleSaveImages}
        disabled={saving}
        className="bg-blue-500 p-3"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </section>
  )
}

export default ImageUploadForm
