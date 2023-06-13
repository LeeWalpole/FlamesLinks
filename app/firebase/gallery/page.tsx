"use client"

import { useEffect, useState } from "react"
import { db, storage } from "@/firebase/config"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

const docID = "A8IlEuLSV8gfRP8WjiuDfahdbzm2"

async function fetchData() {
  const docRef = doc(db, "profiles", docID)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data())
    return docSnap.data()
  } else {
    console.log("No such document!")
    return null
  }
}

async function myAction(data) {
  // The `data` parameter should be a FormData object containing form inputs
  const displayName = data.get("displayName")
  const username = data.get("username")

  const docRef = doc(db, "profiles", docID)

  const updateData = {
    displayName: displayName,
    username: username,
  }

  await updateDoc(docRef, updateData)

  console.log("Profile created / updated successfully!")

  // Revalidate
  revalidatePath(`/firebase/${docID}/view`)
}

export default function EditForm() {
  const [images, setImages] = useState([])
  const [todoData, setTodoData] = useState(null)

  useEffect(() => {
    const fetchDataAndRender = async () => {
      const fetchedData = await fetchData()

      if (fetchedData && fetchedData.images) {
        setImages(fetchedData.images)
      }

      setTodoData(fetchedData)
    }

    fetchDataAndRender()
  }, [])

  async function handleImageUpload(event) {
    const files = event.target.files

    try {
      for (const file of files) {
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `images/${file.name}`)
        await uploadBytes(storageRef, file)

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef)

        // Update the images state variable
        setImages((prevImages) => [...prevImages, downloadURL])

        // Update the Firestore document with the updated images array
        const docRef = doc(db, "profiles", docID)
        await updateDoc(docRef, {
          images: [...images, downloadURL],
        })
      }

      console.log("Images uploaded successfully!")
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  return (
    <>
      <div>
        <h1 className="bold mb-4 text-lg">
          Create / Edit: {todoData?.displayName} Profile
        </h1>

        {/* Other form fields */}

        <div className="grid grid-cols-3 gap-8">
          <input
            name="images"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <input
            name="images"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <input
            name="images"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <input
            name="images"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <input
            name="images"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <input
            name="images"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <input
            name="images"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <input
            name="images"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <input
            name="images"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
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

        <button type="submit" className="bg-blue-500 p-3">
          Save and Continue
        </button>
      </div>
    </>
  )
}
