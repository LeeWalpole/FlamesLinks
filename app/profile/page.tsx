"use client"

import { useEffect, useState } from "react"
import { db } from "@/firebase/config"
import useAuth from "@/firebase/useAuth"
import { collection, doc, getDoc } from "firebase/firestore"

import ProfileCard from "./Profile-Card"

export default function ProfilePage() {
  const user = useAuth()
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
          setUsername(data.username)
          setImages(data.images)
          if (data.images && data.images.length > 0) {
            setAvatarSrc(data.images[0]) // Set the first image URL as the `avatarSrc`
          }
        }
      }
    }

    fetchUserProfile()
  }, [user])

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="relative top-[-4rem] flex">
          <ProfileCard
            images={images}
            style="full"
            username={username}
            displayName={displayName}
            avatarSrc={avatarSrc}
          />
        </div>
      </section>
    </>
  )
}
