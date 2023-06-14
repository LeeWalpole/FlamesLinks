"use client"

import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { db, storage } from "@/firebase/config"
import useAuth from "@/firebase/useAuth"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage"
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
    const fetchImages = async () => {
      try {
        const docRef = doc(db, "profiles", user?.uid ?? "")
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const imageData = docSnap.data()?.images
          if (Array.isArray(imageData) && imageData.length > 0) {
            const downloadURLPromises = imageData.map((imageUrl) =>
              getDownloadURL(ref(storage, imageUrl))
            )
            const downloadURLs = await Promise.all(downloadURLPromises)
            const firebaseImages = downloadURLs.map((url) => ({
              id: url,
              file: null,
            }))
            const initialGridItems = [...Array(9)].map((_, index) => {
              if (firebaseImages[index]) {
                return firebaseImages[index]
              } else {
                return {
                  id: `placeholder-${index}`,
                  file: null,
                }
              }
            })
            setGridItems(initialGridItems)
          }
        }
      } catch (error) {
        console.error("Error fetching images from Firebase:", error)
      }
    }

    fetchImages()
  }, [user])

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
      updatedGridItems[index] = {
        id: `placeholder-${index}`,
        file: null,
      }
      return updatedGridItems
    })
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const docRef = doc(db, "profiles", user?.uid ?? "")
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const imageData = docSnap.data()?.images
          if (Array.isArray(imageData) && imageData.length > 0) {
            const downloadURLPromises = imageData.map((imageUrl) =>
              getDownloadURL(ref(storage, imageUrl))
            )
            const downloadURLs = await Promise.all(downloadURLPromises)
            const firebaseImages = downloadURLs.map((url) => ({
              id: url, // Add the 'id' property with the URL as its value
              src: url,
              file: null,
            }))
            const initialGridItems = [...Array(9)].map((_, index) => {
              if (firebaseImages[index]) {
                return firebaseImages[index]
              } else {
                return {
                  id: `placeholder-${index}`,
                  src: "", // Set empty 'src' for placeholder images
                  file: null,
                }
              }
            })
            setGridItems(initialGridItems)
          }
        }
      } catch (error) {
        console.error("Error fetching images from Firebase:", error)
      }
    }

    fetchImages()
  }, [user])
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
                  src={item.src} // Use 'src' property instead of 'id'
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

        <button className="bg-blue-500 p-3">Save Gallery</button>
      </div>
    </section>
  )
}

export default ImageUploadForm
