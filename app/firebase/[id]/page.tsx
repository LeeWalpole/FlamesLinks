import { usePathname } from "next/navigation"
import { db } from "@/firebase/config"
import { doc, getDoc } from "firebase/firestore"

async function fetchData() {
  const docRef = doc(db, "profiles", "BjFRbhoDhQJHpYsJmszT") // Need this to be the username
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data())
    return docSnap.data()
  } else {
    console.log("No such document!")
    return null
  }
}

async function myAction(data: FormData) {
  "use server"

  const display_name = data.get("display_name")
  const username = data.get("username")
}

export default async function Home() {
  const todoData = await fetchData()

  return (
    <>
      <div>
        <h2>Hello {todoData.username}</h2>
        <button type="submit">Edit me</button>
      </div>
    </>
  )
}
