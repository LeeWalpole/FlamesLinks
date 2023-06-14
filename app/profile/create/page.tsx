"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { db } from "@/firebase/config"
import useAuth from "@/firebase/useAuth"
import { doc, getDoc, updateDoc } from "firebase/firestore"

export default function ProfileForm() {
  const router = useRouter() // Access the router object
  const [displayName, setDisplayName] = useState("")
  const [username, setUsername] = useState("")
  const user = useAuth()
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const profileRef = doc(db, "profiles", user.uid)
        const profileSnapshot = await getDoc(profileRef)
        if (profileSnapshot.exists()) {
          const profileData = profileSnapshot.data()
          setDisplayName(profileData.displayName || "") // Set display name if exists, or empty string if not
          setUsername(profileData.username || "") // Set username if exists, or empty string if not
        }
      }
    }

    fetchUserProfile()
  }, [user])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (user) {
      const profileData = {
        displayName,
        username,
      }

      const profileRef = doc(db, "profiles", user.uid)

      try {
        setSaving(true)
        await updateDoc(profileRef, profileData) // Use updateDoc instead of setDoc
        console.log("Profile updated successfully!")
        router.push("/profile/create/gallery/")
      } catch (error) {
        console.error("Error updating profile:", error)
      } finally {
        setSaving(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Display Name:
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </form>
  )
}
