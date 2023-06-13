"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/firebase/AuthContext"

function Page() {
  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (user == null) router.push("/")
  }, [user, router])

  return <h1>Only logged in users can view this page</h1>
}

export default Page
