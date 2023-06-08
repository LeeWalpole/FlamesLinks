import FetchPost from "./FetchPost"

interface PageProps {
  params: {
    id: number
  }
  searchParams: string
}

export default async function Page({ params, searchParams }: PageProps) {
  return (
    <FetchPost
      url={`https://jsonplaceholder.typicode.com/posts/${params.id}`}
    />
  )
}

/* Working Below 

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface PageProps {
  params: { id: string }
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [post, setPost] = useState<Post | null>(null)
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        )
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error("Error fetching post details:", error)
      }
    }

    fetchPost()
  }, [id])

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

export default Page



*/
