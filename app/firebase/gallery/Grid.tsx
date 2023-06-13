"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { db, storage } from "@/firebase/config"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

import styles from "./grid.module.css"

export default function Grid() {
  const [grid, setGrid] = useState<Array<{ id: number; image: string | null }>>(
    [
      { id: 1, image: null },
      { id: 2, image: null },
      { id: 3, image: null },
      { id: 4, image: null },
      { id: 5, image: null },
      { id: 6, image: null },
      { id: 7, image: null },
      { id: 8, image: null },
      { id: 9, image: null },
    ]
  )
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const fileInputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "profiles", "A8IlEuLSV8gfRP8WjiuDfahdbzm2")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const fetchedData = docSnap.data()
          const updatedGrid = [...grid]

          if (fetchedData?.images) {
            fetchedData.images.forEach((url: string, index: number) => {
              updatedGrid[index].image = url
            })
          }

          setGrid(updatedGrid)
        } else {
          console.log("No such document!")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, []) // Run only once on component mount

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.dataTransfer.setData("text/plain", index.toString())
    setDraggedIndex(index)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newIndex: number
  ) => {
    const index = parseInt(event.dataTransfer.getData("text/plain"))
    const newGrid = [...grid]
    const movedSquare = newGrid.splice(index, 1)[0]
    newGrid.splice(newIndex, 0, movedSquare)
    setGrid(newGrid)
    setDraggedIndex(null)
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number | null
  ) => {
    const file = event.target.files?.[0]
    if (file && typeof index === "number") {
      // Add null check for index
      try {
        const reader = new FileReader()
        reader.onload = (e) => {
          const previewURL = e.target?.result as string
          const newGrid = [...grid]
          if (newGrid[index]) {
            newGrid[index].image = previewURL
            setGrid(newGrid)

            const storageRef = ref(storage, `images/${file.name}`)
            uploadBytes(storageRef, file)
              .then(() => getDownloadURL(storageRef))
              .then((downloadURL) => {
                const updatedGrid = [...newGrid]
                if (updatedGrid[index]) {
                  updatedGrid[index].image = downloadURL
                  setGrid(updatedGrid) // Update the grid state with the downloadURL
                }
              })
              .catch((error) => {
                console.error("Error uploading file:", error)
              })
          }
        }
        reader.readAsDataURL(file)

        if (fileInputsRef.current && fileInputsRef.current[index]) {
          fileInputsRef.current[index]!.value = "" // Reset the input value to allow re-uploading the same image
        }
      } catch (error) {
        console.error("Error uploading file:", error)
      }
    }
  }

  const handleClick = (index: number) => {
    const inputElement = fileInputsRef.current[index]
    if (inputElement) {
      inputElement.click()
    }
  }

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    try {
      setSaving(true)

      const uploadPromises = grid.map(async (square) => {
        if (square.image && !square.image.startsWith("http")) {
          const response = await fetch(square.image)
          const blob = await response.blob() // Convert image data to Blob
          const storageRef = ref(storage, `images/${square.id}`)
          return uploadBytes(storageRef, blob)
            .then(() => getDownloadURL(storageRef))
            .then((downloadURL) => downloadURL)
            .catch((error) => {
              console.error("Error uploading file:", error)
              throw error
            })
        }
        return square.image // Return the existing URL for squares with valid URLs
      })

      const uploadedImages = await Promise.all(uploadPromises)

      const docRef = doc(db, "profiles", "A8IlEuLSV8gfRP8WjiuDfahdbzm2")
      await updateDoc(docRef, { images: uploadedImages })
      console.log("Data updated successfully!")
    } catch (error) {
      console.error("Error updating data:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className={styles.gridContainer}>
        <div className={styles.squareContainer}>
          {grid.map((square, index) => (
            <div
              key={square.id}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, index)}
              className={`${styles.square} ${
                index === draggedIndex ? styles.dragging : ""
              }`}
              onClick={() => handleClick(index)}
            >
              <figure className={styles.feature_image}>
                {square.image && ( // Add a null check for square.image
                  <Image
                    src={square.image}
                    alt={`Square ${square.id}`}
                    height="100"
                    width="100"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleFileChange(event, index)}
                  className={styles.fileInput}
                  id={`fileInput${square.id}`}
                  ref={(ref) => (fileInputsRef.current[index] = ref)}
                />
                <label
                  htmlFor={`fileInput${square.id}`}
                  className={styles.fileInputLabel}
                  id={`fileLabel${index}`}
                ></label>
              </figure>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-500 p-3"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}
