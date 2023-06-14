"use client"

import { useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"

import GridAddItem from "./GridAddItem"
import GridItem from "./GridItem"

const Grid: React.FC = () => {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([])

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
  const onDragDropEnds = (oldIndex: number, newIndex: number) => {
    console.log("Drag and drop other tasks")
    console.log(oldIndex, newIndex)
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
          filter=".ignoreDrag"
          preventOnFilter={true}
          className="grid grid-cols-3 gap-8 "
          onEnd={({ oldIndex, newIndex }) => onDragDropEnds(oldIndex, newIndex)}
        >
          <>
            {users.map((user) => (
              <GridItem key={user.id} user={user} />
            ))}
            <GridAddItem />
          </>
        </ReactSortable>
      )}
    </div>
  )
}

export default Grid
