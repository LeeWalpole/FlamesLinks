"use client"

import { useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"

import GridAddItem from "./GridAddItem"
import GridItem from "./GridItem"

interface User {
  id: number
  name: string
  imageURL?: string // Make the imageURL property optional
}

const Grid: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])

  // Fetching the data from typicode
  // and setting it to "users" state
  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=7") // Fetching 7 images
      .then((res) => res.json())
      .then((data) =>
        setUsers((prev) => {
          const usersWithImages = data.slice(0, 7).map((item: any) => ({
            id: item.id,
            name: item.author,
            imageURL: item.download_url,
          }))
          const emptyUsers = Array.from({ length: 2 }).map((_, index) => ({
            id: index + 1,
            name: "",
            imageURL: undefined,
          }))
          return [...usersWithImages, ...emptyUsers]
        })
      )
  }, [])

  // Drag and Drop Handler
  const onDragDropEnds = (oldIndex?: number, newIndex?: number) => {
    if (oldIndex !== undefined && newIndex !== undefined) {
      console.log("Drag and drop other tasks")
      console.log(oldIndex, newIndex)
    }
  }

  return (
    <div className="rounded-3  border shadow">
      <section>
        <GridAddItem />
        <ReactSortable
          list={users}
          setList={(newlist) => setUsers(newlist)}
          ghostClass="dropArea"
          handle=".dragHandle"
          animation={300}
          preventOnFilter={true}
          className="m-auto grid w-96 grid-cols-3 gap-2"
          onEnd={({ oldIndex, newIndex }) => onDragDropEnds(oldIndex, newIndex)}
        >
          {/* Render 9 grid items */}
          {users.map((user) => (
            <GridItem key={user.id} user={user} imageURL={user.imageURL} />
          ))}
        </ReactSortable>
      </section>
    </div>
  )
}

export default Grid
