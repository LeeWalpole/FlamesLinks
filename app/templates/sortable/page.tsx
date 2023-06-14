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
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())
      .then((data) =>
        setUsers((prev) =>
          data.map((item: any) => ({
            id: item.id,
            name: item.title,
          }))
        )
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
    <div className="rounded-3  border p-3 shadow">
      {users.length === 0 ? (
        <GridAddItem />
      ) : (
        <ReactSortable
          list={users}
          setList={(newlist) => setUsers(newlist)}
          ghostClass="dropArea"
          handle=".dragHandle"
          // filter=".ignoreDrag"
          animation={300}
          preventOnFilter={true}
          className="m-auto grid w-96 grid-cols-3 gap-8 "
          onEnd={({ oldIndex, newIndex }) => onDragDropEnds(oldIndex, newIndex)}
        >
          <>
            {users.map((user) => (
              <GridItem
                key={user.id}
                user={user}
                imageURL="https://github.com/shadcn.png"
              />
            ))}
            <GridAddItem />
          </>
        </ReactSortable>
      )}
    </div>
  )
}

export default Grid
