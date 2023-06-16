"use client"

import { useEffect, useState } from "react"
import { db } from "@/firebase/config"
import useAuth from "@/firebase/useAuth"
import { doc, getDoc } from "firebase/firestore"

import { Skeleton } from "@/components/ui/skeleton"

import ProfileCard from "./Profile-Card"

export default function ProfilePage() {
  const user = useAuth()
  const [isLoading, setIsLoading] = useState(true) // Add a loading state
  const [displayName, setDisplayName] = useState("")
  const [username, setUsername] = useState("")
  const [images, setImages] = useState([])
  const [avatarSrc, setAvatarSrc] = useState("")

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const docRef = doc(db, "profiles", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setDisplayName(data.displayName)
          setImages(data.images || []) // Set an empty array if images are not available
          if (data.images && data.images.length > 0) {
            setAvatarSrc(data.images[0])
          } else {
            setAvatarSrc("")
          }
          setUsername(data.username)
        }
        setIsLoading(false) // Set loading state to false after data is loaded
      }
    }

    fetchUserProfile()
  }, [user])

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="relative top-[-4rem] flex justify-center">
          {isLoading ? ( // Show skeleton if isLoading is true
            <div className="flex flex-col items-center gap-8 space-x-4">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-[250px]" />
                <Skeleton className="h-6 w-[250px]" />
              </div>
            </div>
          ) : (
            <ProfileCard
              images={images}
              style="full"
              username={username}
              displayName={displayName}
              avatarSrc={avatarSrc}
            />
          )}
        </div>
      </section>
    </>
  )
}
