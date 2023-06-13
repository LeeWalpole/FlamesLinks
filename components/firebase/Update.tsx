import { useEffect, useState } from "react"
import firebase from "firebase/app"

import "firebase/auth"
import "firebase/firestore"
import firebaseConfig from "@/firebase/config"

const UpdateForm: React.FC = () => {
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")

  useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }

    const auth = firebase.auth()
    const db = firebase.firestore()

    // Get the currently logged-in user
    const user = auth.currentUser

    // Fetch the user's profile from Firestore
    const fetchProfile = async () => {
      if (user) {
        const docRef = db.collection("profiles").doc(user.uid)
        const doc = await docRef.get()

        if (doc.exists) {
          const profileData = doc.data()
          setUsername(profileData.username)
          setDisplayName(profileData.display_name)
        }
      }
    }

    fetchProfile()
  }, [])

  return (
    <div>
      <h1>Update Profile</h1>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" disabled value={username} />
      <br />
      <br />
      <label htmlFor="displayName">Display Name:</label>
      <input
        type="text"
        id="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <br />
      <br />
      <button>Update</button>
    </div>
  )
}

export default UpdateForm
