"use client"

import { useEffect, useState } from "react"
import { db } from "@/firebase/config"
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, storage, uploadBytes } from "firebase/storage"

export default function ImageGallery({ docID }) {
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "profiles", docID)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists() && docSnap.data().images) {
        setImages(docSnap.data().images)
      }
    }

    fetchData()
  }, [docID])

  async function handleImageUpload(event) {
    const file = event.target.files[0]

    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, `images/${file.name}`)
      await uploadBytes(storageRef, file)

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef)

      // Update the Firestore document with the image URL
      const docRef = doc(db, "profiles", docID)
      await updateDoc(docRef, {
        images: arrayUnion(downloadURL),
      })

      // Update the images state variable
      setImages((prevImages) => [...prevImages, downloadURL])
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  return (
    <div>
      <div className="flex flex-row gap-8">
        <label>Images:</label>
        <input
          name="images"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          multiple
        />
      </div>

      {images.length > 0 && (
        <div>
          <h2>Image Gallery:</h2>
          <div>
            {images.map((imageURL) => (
              <img key={imageURL} src={imageURL} alt="Gallery" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
