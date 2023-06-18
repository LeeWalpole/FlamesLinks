"use client"

import useAuth from "@/lib/firebase/useAuth"

import ProfileForm from "./ProfileForm"

export default function CreateProfilePage() {
  const user = useAuth()

  // Check if user is not null
  if (!user) {
    return (
      <>
        <div className="container mx-auto my-20">Signup (Logged Out)</div>
      </>
    )
  }

  return (
    <>
      <div className="container mx-auto my-20">
        Account Dashboard (Logged In)
        <ProfileForm pushURL="/profile/create/links" />
      </div>
    </>
  )
}
