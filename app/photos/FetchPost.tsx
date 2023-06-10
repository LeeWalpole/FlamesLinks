"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Loading from "@/components/Loading"

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface FetchPostProps {
  url: string
}

const FetchPost: React.FC<FetchPostProps> = ({ url }) => {
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error("Error fetching post details:", error)
      }
    }

    fetchPost()
  }, [url])

  if (!post) {
    return <Loading />
  }

  return (
    <div>
      <h1>{post.id}</h1>
    </div>
  )
}

export default FetchPost
