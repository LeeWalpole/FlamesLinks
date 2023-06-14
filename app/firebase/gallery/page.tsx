import { revalidatePath } from "next/cache"
import { db } from "@/firebase/config"
import { User } from "firebase/auth"
import { doc, getDoc, updateDoc } from "firebase/firestore"

import FirebaseNav from "@/components/firebase/Nav"

import Images from "./Grid"

const docID = "A8IlEuLSV8gfRP8WjiuDfahdbzm2"

async function fetchData() {
  const docRef = doc(db, "profiles", docID)
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
  const displayName = data.get("displayName")
  const username = data.get("username")

  const docRef = doc(db, "profiles", docID)

  const updateData = {
    displayName: displayName,
    username: username,
  }

  await updateDoc(docRef, updateData)

  console.log("Profile created / updated successfully!")

  // Revalidate
  // revalidatePath(`/dogs/${params.id}/edit`);
  revalidatePath(`/firebase/${docID}/view`)
}

export default function EditForm() {
  const fetchDataAndRender = async () => {
    const todoData = await fetchData()

    return (
      <>
        <div>
          <h1 className="bold mb-4 text-lg">
            Create / Edit: {todoData?.displayName} Profile
          </h1>

          <FirebaseNav />

          <form action={myAction} className="flex flex-col gap-8">
            <div className="flex flex-row justify-start gap-8">
              <label>displayName</label>
              <input
                name="displayName"
                type="text"
                defaultValue={todoData?.displayName}
                className="text-white"
              />
            </div>
            <div className="flex flex-row gap-8">
              <label>Username</label>
              <input
                name="username"
                type="text"
                defaultValue={todoData?.username}
                className="text-white"
              />
            </div>
            <button type="submit" className="bg-blue-500 p-4">
              Save Profile
            </button>
          </form>
        </div>

        <Images />
      </>
    )
  }

  return fetchDataAndRender()
}
