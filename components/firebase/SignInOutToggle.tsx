"use client"

import useAuth from "@/lib/firebase/useAuth"
import { Button } from "@/components/ui/button"
import SignInGoogleAuthButton from "@/components/firebase/SignInGoogleAuthButton"
import SignOutButton from "@/components/firebase/SignOutButton"

// import AuthPasswordless from "@/components/firebase/AuthPasswordless"

export default function SignInOutToggle() {
  const user = useAuth()

  // Check if user is not null
  if (!user) {
    return (
      <>
        <SignInGoogleAuthButton />
      </>
    )
  }

  return (
    <>
      {/* <p>Hey: {user.uid}</p>
      <p>Hey: {user.displayName}</p>
      <p>Hey: {user.photoURL}</p> */}
      <SignOutButton />
    </>
  )
}
