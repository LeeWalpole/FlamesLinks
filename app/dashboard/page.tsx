"use client"

import { useEffect, useState } from "react"
import { auth } from "@/firebase/config"

export default function DashboardPage() {
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        const userId = user.uid
        console.log("User ID:", userId)
        setUserId(userId)
      } else {
        // No user is signed in
        console.log("No user is currently signed in.")
        setUserId("")
      }
    })

    // Clean up the listener on component unmount
    return () => unsubscribe()
  }, [])

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      ID: {userId ? userId : "No user"}
      New:
      <div>ID: {userId ? userId : "No user"}</div>
    </section>
  )
}
