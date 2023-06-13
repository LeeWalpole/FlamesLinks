"use client"

import { useEffect, useState } from "react"
import { app } from "@/firebase/config"
import { User, getAuth, onAuthStateChanged } from "firebase/auth"

// assuming you have already initialized Firebase

const useAuth = (): User | null => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user)
      } else {
        // User is signed out
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return user
}

export default useAuth
