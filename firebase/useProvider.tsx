"use client"

import React, { ReactNode, createContext, useEffect, useState } from "react"

interface UserContextProps {
  userId: string
  setUserId: (userId: string) => void
}

export const UserContext = createContext<UserContextProps>({
  userId: "",
  setUserId: () => {},
})

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId")
    if (storedUserId) {
      setUserId(storedUserId)
    }
  }, [])

  const handleSetUserId = (newUserId: string) => {
    setUserId(newUserId)
    localStorage.setItem("userId", newUserId)
  }

  return (
    <UserContext.Provider value={{ userId, setUserId: handleSetUserId }}>
      {children}
    </UserContext.Provider>
  )
}
