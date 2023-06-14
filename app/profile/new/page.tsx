"use client"

import useAuth from "@/firebase/useAuth"

export default function DashboardPage() {
  const user = useAuth()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div>ID: {user ? user.uid : "No user"}</div>
    </section>
  )
}
