"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { db } from "@/firebase/config"
import { collection, getDocs } from "firebase/firestore"

interface Todo {
  id: string
  display_name: string
  username: string
}

export default function TodoList() {
  const [profiles, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async (): Promise<void> => {
    setLoading(true)

    const querySnapshot = await getDocs(collection(db, "profiles"))
    const todosData: Todo[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      display_name: doc.data().display_name, // Add the 'title' property
      username: doc.data().username, // Add the 'desc' property
    }))

    setTodos(todosData)
    setLoading(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <ul className="flex flex-col gap-8">
      {profiles.map((profile) => (
        <li key={profile.id} className="border-b p-4">
          <h3>Profile Title: {profile.display_name}</h3>
          <p>Profile Desc: {profile.username}</p>
          <p>Profile / Doc ID: {profile.id}</p>
          <button className="bg-blue-500 p-3">
            <Link href={`/firebase/${profile.id}/edit`}>Edit</Link>
          </button>
        </li>
      ))}
    </ul>
  )
}
