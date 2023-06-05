"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{post.id}</h1>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}

export default FetchPost
