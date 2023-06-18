"use server"

import { revalidatePath } from "next/cache"
import { addDoc, collection } from "firebase/firestore"

import { db } from "@/lib/firebase/config"

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
