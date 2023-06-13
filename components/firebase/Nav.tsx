"use client"

import useAuth from "@/firebase/useAuth"
import { User } from "firebase/auth"

const FirebaseNav = (): JSX.Element => {
  const user: User | null = useAuth()

  return (
    <nav>
      <ul>
        <li>{user ? "Logged In" : "Logged Out"}</li>
        {/* other navigation items */}
      </ul>
      <p>User ID (aka Doc / Profile ID): {user ? user.uid : "No ID?"} </p>
    </nav>
  )
}

export default FirebaseNav
