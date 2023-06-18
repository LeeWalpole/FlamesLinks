import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"

import { db } from "@/lib/firebase/config"
import useAuth from "@/lib/firebase/useAuth"

export default function InputReactHookForm() {
  const [username, setUsername] = useState("")

  const user = useAuth()

  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (user && user.uid) {
          const profileRef = doc(db, "profiles", user.uid)
          const profileSnapshot = await getDoc(profileRef)
          if (profileSnapshot.exists()) {
            const profileData = profileSnapshot.data()
            const { username } = profileData
            setUsername(username)
          }
        }
      } catch (error) {
        console.error("Error retrieving profile data:", error)
      }
    }

    getProfileData()
  }, [user])

  return <p>{username}</p>
}
