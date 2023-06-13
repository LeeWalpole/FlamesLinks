"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/firebase/config"
import { addDoc, collection } from "firebase/firestore"

export async function addTodo(data: FormData) {
  const displayName = data.get("displayName")
  const username = data.get("username")

  const docRef = await addDoc(collection(db, "profiles"), {
    displayName: displayName,
    username: username,
  })
  console.log("profiles written with ID: ", docRef.id)

  revalidatePath("/")
}
