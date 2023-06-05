"use client"

import { useAnalytics } from "@/lib/useAnalytics"

const Analytics = () => {
  const { analytics, isLoading, isError } = useAnalytics()

  if (isLoading) {
    return <div>Loading analytics...</div>
  }

  if (isError) {
    return <div>Error loading analytics</div>
  }

  return (
    <h1 className="text-white">
      {analytics && <p>Total visits: {analytics.visits}</p>}
    </h1>
  )
}

export default Analytics
