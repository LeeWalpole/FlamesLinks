"use client"

import { createContext, useEffect, useState } from "react"
import { app } from "@/firebase/config"
import { User, getAuth, onAuthStateChanged } from "firebase/auth"

// assuming you have already initialized Firebase

type AuthContextType = {
  uid: string | null
}

export const AuthContext = createContext<AuthContextType>({
  uid: null,
})

const AuthProvider: React.FC = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null)

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // User is signed in
        setUid(user.uid)
      } else {
        // User is signed out
        setUid(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ uid }}>{children}</AuthContext.Provider>
}

export default AuthProvider
