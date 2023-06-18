"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"

import { db } from "@/lib/firebase/config"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

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

        // Redirect based on user state
        if (profileDoc.exists()) {
          // User is signed in, redirect to the dashboard
          router.push("/dashboard")
        } else {
          // User is signing up, redirect to the create profile page
          router.push("/profile/create/")
        }
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
    <>
      <Button id="login-button" size="lg">
        {" "}
        <Icons.google className="mr-2 h-4 w-4" /> Sign Up with Google
      </Button>
    </>
  )
}

export default GoogleAuthForm
