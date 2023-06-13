import { revalidatePath } from "next/cache"
import { db } from "@/firebase/config"
import { doc, getDoc, updateDoc } from "firebase/firestore"

const docID = "BjFRbhoDhQJHpYsJmszT"

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
  const display_name = data.get("display_name")
  const username = data.get("username")

  const docRef = doc(db, "profiles", docID)

  const updateData = {
    display_name: display_name,
    username: username,
  }

  await updateDoc(docRef, updateData)

  console.log("Document updated successfully!")

  // Revalidate
  // revalidatePath(`/dogs/${params.id}/edit`);
  revalidatePath(`/profiles/${docID}/edit`)
}

export default function EditForm() {
  const fetchDataAndRender = async () => {
    const todoData = await fetchData()

    return (
      <>
        <div>
          <h1 className="bold mb-4 text-lg">Edit: {todoData?.title}</h1>
          <form action={myAction} className="flex flex-col gap-8">
            <div className="flex flex-row justify-start gap-8">
              <label>display_name</label>
              <input
                name="display_name"
                type="text"
                defaultValue={todoData?.display_name}
                className="text-black"
              />
            </div>
            <div className="flex flex-row gap-8">
              <label>username</label>
              <input
                name="username"
                type="text"
                defaultValue={todoData?.username}
                className="text-black"
              />
            </div>
            <button type="submit" className="bg-blue-500 p-3">
              Save and Continue
            </button>
          </form>
        </div>
      </>
    )
  }

  return fetchDataAndRender()
}
