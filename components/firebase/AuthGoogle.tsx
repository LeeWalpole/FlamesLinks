"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { db } from "@/firebase/config"
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"

const GoogleAuthForm = () => {
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth()

    const handleLogin = async () => {
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        const uid = user.uid
        const displayName = user.displayName

        // Check if user already exists in Firestore
        const profileRef = doc(collection(db, "profiles"), uid)
        const profileDoc = await getDoc(profileRef)

        if (!profileDoc.exists()) {
          // If user doesn't exist, save their profile in Firestore
          await setDoc(profileRef, {
            uid: uid,
            displayName: displayName,
          })
        }

        // Redirect to the create profile page
        router.push("/firebase/profile/create")
      } catch (error) {
        console.log(error)
      }
    }

    // Attach event listener to the login button
    const loginButton = document.getElementById("login-button")
    if (loginButton) {
      loginButton.addEventListener("click", handleLogin)
    }

    return () => {
      // Clean up event listener
      if (loginButton) {
        loginButton.removeEventListener("click", handleLogin)
      }
    }
  }, [router])

  return (
    <div>
      <h1>Google Auth Form</h1>
      <button id="login-button">Login with Google</button>
    </div>
  )
}

export default GoogleAuthForm
