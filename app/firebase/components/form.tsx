import { doc, getDoc, setDoc } from "firebase/firestore"

export interface Article {
  displayName: string
  username: string
}

export default function Form() {
  async function handleSubmit() {
    "use server"
  }

  //   async function submitImage() {
  //     "use server";
  //   }

  return (
    <form action={handleSubmit}>
      <input type="text" name="displayName" />
      {/* <input type="image" formAction={submitImage} /> */}
      <button type="submit">Submit</button>
    </form>
  )
}
