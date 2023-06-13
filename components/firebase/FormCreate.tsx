"use client"

import { useEffect, useState } from "react"
import { db } from "@/firebase/config"
import { getAuth } from "firebase/auth"
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"

const CreateProfileForm: React.FC = () => {
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is authenticated
    const auth = getAuth()
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // User not authenticated, redirect to step 1
        window.location.href = "/firebase/join"
      }
    })

    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check if username is unique
    const q = query(
      collection(db, "profiles"),
      where("username", "==", username)
    )
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // Display error message if username already exists
      setError("Username already exists")
      return
    }

    // Create a new profile document
    try {
      const auth = getAuth()
      const user = auth.currentUser

      const docRef = await addDoc(collection(db, "profiles"), {
        userId: user?.uid,
        username,
        display_name: displayName,
      })
      console.log("Profile created with ID: ", docRef.id)

      // Redirect to the update page
      window.location.href = "/firebase/update"
    } catch (error) {
      console.error("Error creating profile: ", error)
    }
  }

  return (
    <div>
      <h1>Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Display Name:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Create Profile</button>
      </form>
    </div>
  )
}

export default CreateProfileForm
