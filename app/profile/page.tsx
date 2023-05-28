import React from "react"
import Link from "next/link"

import ProfileCard from "@/components/Profile-Card"

const images = [
  "https://github.com/shadcn.png",
  "https://via.placeholder.com/400x500.png?text=Image+2",
  "https://via.placeholder.com/400x500.png?text=Image+3",
]

export default function ProfilePage() {
  return (
    <>
      <div className="flex">
        <ProfileCard images={images} style="card" />
        <ProfileCard images={images} style="full" />
        <ProfileCard images={images} style="simple" />
      </div>
    </>
  )
}
