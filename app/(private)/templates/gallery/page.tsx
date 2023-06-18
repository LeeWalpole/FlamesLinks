"use client"

import { useEffect, useRef, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"

import { db } from "@/lib/firebase/config"

import styles from "./grid.module.css"

const GridComponent: React.FC = () => {
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

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const newGrid = [...grid]
      newGrid[index].image = URL.createObjectURL(file)
      setGrid(newGrid)
    }
  }

  const handleClick = (index: number) => {
    if (fileInputsRef.current[index]) {
      fileInputsRef.current[index]?.click()
    }
  }

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    try {
      setSaving(true)
      const docRef = doc(db, "profiles", "A8IlEuLSV8gfRP8WjiuDfahdbzm2")
      await updateDoc(docRef, { images: grid.map((square) => square.image) })
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
              {square.image ? (
                <figure className={styles.feature_image}>
                  <img src={square.image} alt={`Square ${square.id}`} />
                  <figcaption>
                    {square.id} - New {index + 1}
                  </figcaption>
                </figure>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleFileChange(event, index)}
                    className={styles.fileInput}
                    ref={(ref) => (fileInputsRef.current[index] = ref)}
                  />
                  <label
                    htmlFor={`fileInput${square.id}`}
                    className={styles.fileInputLabel}
                  ></label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}

export default GridComponent
